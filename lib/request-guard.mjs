// Guards a JSON POST endpoint: same-origin only, JSON only, bounded body, per-IP rate limit.
// The wrapped function receives the parsed body; a PortraitError maps to its status and message.

import { PortraitError } from "./portrait-decision.mjs"

const MAX_TRACKED_VISITORS = 1000

export function createGuardedJsonHandler(fn, { now = Date.now, perMinute = 12, maxBody = 2048 } = {}) {
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
        return json(403, { error: "Please use the portfolio website." })
      }
      if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
        return json(415, { error: "Send a JSON request." })
      }
      if (Number(request.headers.get("content-length")) > maxBody) return json(413, { error: "Request too large." })
      // Best-effort per-instance limiter, add an edge rule when deploying.
      const timestamp = now()
      for (const [key, value] of visitors) if (value.reset <= timestamp) visitors.delete(key)
      const ip =
        request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
      const visitor = visitors.get(ip) || { count: 0, reset: timestamp + 60000 }
      if (visitor.count >= perMinute || (!visitors.has(ip) && visitors.size >= MAX_TRACKED_VISITORS)) {
        return json(429, { error: "Too many requests. Please wait a minute." })
      }
      visitor.count++
      visitors.set(ip, visitor)
      const reader = request.body?.getReader()
      if (!reader) return json(400, { error: "The request could not be read." })
      const chunks = []
      let size = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > maxBody) {
          await reader.cancel()
          return json(413, { error: "Request too large." })
        }
        chunks.push(Buffer.from(value))
      }
      let body
      try {
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
      } catch {
        return json(400, { error: "The request could not be read." })
      }
      return json(200, await fn(body))
    } catch (error) {
      if (error instanceof PortraitError) return json(error.status, { error: error.message })
      return json(500, { error: "Something went wrong. Please try again." })
    }
  }
}
