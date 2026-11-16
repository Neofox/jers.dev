import test from "node:test"
import assert from "node:assert/strict"
import { createDecisionHandler } from "../lib/decision-handler.mjs"

const input = { situation: "Draft a reply for a person to approve.", ambiguity: 0, consequences: 1, reversibility: 2 }
function request(body = JSON.stringify(input), headers = {}) {
  return new Request("https://jers.dev/api/decision", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://jers.dev", ...headers },
    body,
  })
}
test("rejects cross-site, malformed and oversized requests before invoking the model", async () => {
  let calls = 0
  const handle = createDecisionHandler(async () => {
    calls++
    return {}
  })
  assert.equal((await handle(request(undefined, { origin: "https://example.com" }))).status, 403)
  assert.equal((await handle(request(undefined, { "content-type": "text/plain" }))).status, 415)
  assert.equal((await handle(request("{"))).status, 400)
  assert.equal((await handle(request("x".repeat(8193)))).status, 413)
  assert.equal((await handle(request(JSON.stringify({ ...input, situation: "" })))).status, 400)
  assert.equal(calls, 0)
})
test("enforces limits and permits requests after the window expires", async () => {
  let time = 0
  const handle = createDecisionHandler(async () => ({ choice: "assist" }), { now: () => time, perMinute: 1 })
  assert.equal((await handle(request())).status, 200)
  const limited = await handle(request())
  assert.equal(limited.status, 429)
  assert.equal(limited.headers.get("retry-after"), "60")
  time = 60001
  assert.equal((await handle(request())).status, 200)
})
test("accepts the public host when Next uses an internal request URL", async () => {
  const handle = createDecisionHandler(async () => ({ choice: "assist" }))
  const req = new Request("http://localhost:43118/api/decision", {
    method: "POST",
    headers: { origin: "http://127.0.0.1:43118", host: "127.0.0.1:43118", "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  assert.equal((await handle(req)).status, 200)
})
test("unexpected internal failures never expose details and responses are not cached publicly", async () => {
  const handle = createDecisionHandler(async () => {
    throw Error("secret")
  })
  const response = await handle(request())
  assert.equal(response.status, 500)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.doesNotMatch(await response.text(), /secret/)
})
