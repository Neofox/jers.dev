import { DecisionError, validateInput } from "./decisions.mjs"

const MAX_BODY = 8192

export function createDecisionHandler(decide, { now = Date.now, perMinute = 6 } = {}) {
  const visitors = new Map()
  const json = (status, body) =>
    Response.json(body, {
      status,
      headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
    })
  return async function handle(request) {
    try {
      const origin = request.headers.get("origin")
      const requestUrl = new URL(request.url)
      const host = request.headers.get("host") || requestUrl.host
      const protocol = request.headers.get("x-forwarded-proto") || requestUrl.protocol.slice(0, -1)
      if ((origin && origin !== protocol + "://" + host) || request.headers.get("sec-fetch-site") === "cross-site") {
        return json(403, { error: "Please evaluate from the portfolio website." })
      }
      if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
        return json(415, { error: "Send a JSON request." })
      }
      if (Number(request.headers.get("content-length")) > MAX_BODY) return json(413, { error: "Request too large." })
      // Best-effort per-instance limiter, add an edge rule when deploying.
      const timestamp = now()
      for (const [key, value] of visitors) if (value.reset <= timestamp) visitors.delete(key)
      const ip =
        request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
      const visitor = visitors.get(ip) || { count: 0, reset: timestamp + 60000 }
      if (visitor.count >= perMinute || (!visitors.has(ip) && visitors.size >= 1000)) {
        return json(429, { error: "Please wait a minute before evaluating another situation." })
      }
      visitor.count++
      visitors.set(ip, visitor)
      const reader = request.body?.getReader()
      if (!reader) return json(400, { error: "Describe a situation first." })
      const chunks = []
      let size = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > MAX_BODY) {
          await reader.cancel()
          return json(413, { error: "Request too large." })
        }
        chunks.push(Buffer.from(value))
      }
      let input
      try {
        input = JSON.parse(Buffer.concat(chunks).toString("utf8"))
      } catch {
        return json(400, { error: "The request could not be read." })
      }
      return json(200, await decide(validateInput(input)))
    } catch (error) {
      if (error instanceof DecisionError) return json(error.status, { error: error.message })
      return json(500, { error: "The evaluation could not be completed. Please try again." })
    }
  }
}
