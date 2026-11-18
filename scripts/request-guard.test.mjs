import test from "node:test"
import assert from "node:assert/strict"
import { createGuardedJsonHandler } from "../lib/request-guard.mjs"
import { PortraitError, validateSituation } from "../lib/portrait-decision.mjs"

const input = { action: "open_project", itemId: "project:3i" }
function request(body = JSON.stringify(input), headers = {}) {
  return new Request("https://jers.dev/api/portrait", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://jers.dev", ...headers },
    body,
  })
}

test("rejects cross-site, malformed and oversized requests before invoking the handler", async () => {
  let calls = 0
  const handle = createGuardedJsonHandler(async (body) => {
    calls++
    return validateSituation(body)
  })
  assert.equal((await handle(request(undefined, { origin: "https://example.com" }))).status, 403)
  assert.equal((await handle(request(undefined, { "sec-fetch-site": "cross-site" }))).status, 403)
  assert.equal((await handle(request(undefined, { "content-type": "text/plain" }))).status, 415)
  assert.equal((await handle(request("{"))).status, 400)
  assert.equal((await handle(request("x".repeat(2049)))).status, 413)
  assert.equal(calls, 0)
  assert.equal((await handle(request("x".repeat(2048)))).status, 400)
})

test("enforces limits and permits requests after the window expires", async () => {
  let time = 0
  const handle = createGuardedJsonHandler(async () => ({ ok: true }), { now: () => time, perMinute: 1 })
  assert.equal((await handle(request())).status, 200)
  const limited = await handle(request())
  assert.equal(limited.status, 429)
  assert.equal(limited.headers.get("retry-after"), "60")
  assert.equal(limited.headers.get("cache-control"), "no-store")
  time = 60001
  assert.equal((await handle(request())).status, 200)
})

test("defaults to 12 requests per minute per IP", async () => {
  const handle = createGuardedJsonHandler(async () => ({ ok: true }), { now: () => 0 })
  for (let i = 0; i < 12; i++) assert.equal((await handle(request(undefined, { "x-real-ip": "1.1.1.1" }))).status, 200)
  assert.equal((await handle(request(undefined, { "x-real-ip": "1.1.1.1" }))).status, 429)
  assert.equal((await handle(request(undefined, { "x-real-ip": "2.2.2.2" }))).status, 200)
})

test("accepts the public host when Next uses an internal request URL", async () => {
  const handle = createGuardedJsonHandler(async () => ({ ok: true }))
  const req = new Request("http://localhost:43118/api/portrait", {
    method: "POST",
    headers: { origin: "http://127.0.0.1:43118", host: "127.0.0.1:43118", "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  assert.equal((await handle(req)).status, 200)
})

test("returns PortraitError status", async () => {
  const handle = createGuardedJsonHandler(async () => {
    throw new PortraitError(400, "Unknown item.")
  })
  const response = await handle(request())
  assert.equal(response.status, 400)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.deepEqual(await response.json(), { error: "Unknown item." })
})

test("passes the parsed body to the handler and returns its result as JSON", async () => {
  const handle = createGuardedJsonHandler(async (body) => ({ echo: body }))
  const response = await handle(request())
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.deepEqual(await response.json(), { echo: input })
})

test("unexpected internal failures never expose details", async () => {
  const handle = createGuardedJsonHandler(async () => {
    throw Error("secret")
  })
  const response = await handle(request())
  assert.equal(response.status, 500)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.doesNotMatch(await response.text(), /secret/)
})
