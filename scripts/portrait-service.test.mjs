import test from "node:test"
import assert from "node:assert/strict"
import { ITEMS } from "../lib/portrait-catalog.mjs"
import { estimateCostUsd, validateSituation } from "../lib/portrait-decision.mjs"
import { createPortraitService } from "../lib/portrait-service.mjs"
import { createGuardedJsonHandler } from "../lib/request-guard.mjs"

const situation = { action: "open_project", itemId: "project:3i", recent: [] }
const other = { action: "dwell", itemId: "project:enhans", recent: [] }
const usage = { input_tokens: 7000, input_tokens_details: { cached_tokens: 6000 } }

function decision() {
  return {
    model: "gpt-6-luna",
    usage,
    answers: [
      { type: "predicate", name: "should_react", probability: 0.9 },
      { type: "choice", name: "expression", choice: "laugh", probabilities: [], confidence: 0.8 },
      { type: "choice", name: "aside", choice: "a1", probabilities: [], confidence: 0.7 },
      { type: "score", name: "intensity", score: 2, probabilities: [], confidence: 0.6 },
    ],
  }
}

function fakeClient(respond = async () => decision()) {
  const calls = []
  return {
    calls,
    decisions: {
      create: async (params) => {
        calls.push(params)
        return respond(params, calls.length)
      },
    },
  }
}

test("returns the default face when there is no key", async () => {
  const react = createPortraitService({ client: null })
  const r = await react(situation)
  assert.equal(r.fallbackReason, "no_key")
  assert.equal(r.react, true)
  assert.equal(r.expression, ITEMS["project:3i"].defaultExpression)
  assert.equal(r.asideText, null)
  assert.equal(r.fallback, null)
  assert.equal(r.usage, null)
  assert.equal(r.estimatedCostUsd, 0)
  assert.equal(r.cached, false)
})

test("caches identical situations and shares in-flight calls", async () => {
  const client = fakeClient()
  const react = createPortraitService({ client })
  const [first, second] = await Promise.all([react(situation), react({ ...situation })])
  assert.equal(client.calls.length, 1)
  assert.equal(first.cached, false)
  assert.equal(first.expression, "laugh")
  assert.equal(second.cached, true)
  assert.equal(second.latencyMs, 0)
  assert.equal(second.expression, "laugh")
  const third = await react(situation)
  assert.equal(client.calls.length, 1)
  assert.equal(third.cached, true)
  // A cache hit cost nothing: it must not repeat the original call's usage or cost.
  assert.deepEqual(first.usage, usage)
  assert.ok(first.estimatedCostUsd > 0)
  for (const hit of [second, third]) {
    assert.equal(hit.usage, null)
    assert.equal(hit.estimatedCostUsd, 0)
    assert.equal(hit.latencyMs, 0)
  }
})

test("falls back on upstream failure without caching it", async () => {
  const client = fakeClient(async (_params, n) => {
    if (n === 1) throw new Error("timeout")
    return decision()
  })
  const react = createPortraitService({ client })
  const failed = await react(situation)
  assert.equal(failed.fallbackReason, "upstream")
  assert.equal(failed.expression, ITEMS["project:3i"].defaultExpression)
  assert.equal(failed.react, true)
  const retried = await react(situation)
  assert.equal(client.calls.length, 2)
  assert.equal(retried.fallbackReason, undefined)
  assert.equal(retried.expression, "laugh")
})

test("upstream fallbacks report the measured elapsed time", async () => {
  const client = fakeClient(() => new Promise((_resolve, reject) => setTimeout(() => reject(new Error("timeout")), 40)))
  const react = createPortraitService({ client })
  const failed = await react(situation)
  assert.equal(failed.fallbackReason, "upstream")
  assert.ok(failed.latencyMs >= 35, `latencyMs was ${failed.latencyMs}`)
  assert.equal(failed.usage, null)
  assert.equal(failed.estimatedCostUsd, 0)
})

test("does not cache reactions that fell back to the default face", async () => {
  const client = fakeClient(async (_params, n) => {
    const d = decision()
    if (n === 1) d.answers[1] = { ...d.answers[1], confidence: 0.1 }
    return d
  })
  const react = createPortraitService({ client })
  const low = await react(situation)
  assert.equal(low.fallback, "low_confidence")
  assert.equal(low.expression, ITEMS["project:3i"].defaultExpression)
  const retried = await react(situation)
  assert.equal(client.calls.length, 2)
  assert.equal(retried.cached, false)
  assert.equal(retried.fallback, null)
  assert.equal(retried.expression, "laugh")
  assert.equal((await react(situation)).cached, true)
  assert.equal(client.calls.length, 2)
})

test("stops calling upstream past the hourly cap", async () => {
  let time = 0
  const client = fakeClient()
  const react = createPortraitService({ client, now: () => time, maxPerHour: 1 })
  assert.equal((await react(situation)).fallbackReason, undefined)
  const limited = await react(other)
  assert.equal(limited.fallbackReason, "limit")
  assert.equal(limited.expression, ITEMS["project:enhans"].defaultExpression)
  assert.equal(client.calls.length, 1)
  time = 3_600_000
  assert.equal((await react(other)).fallbackReason, undefined)
  assert.equal(client.calls.length, 2)
})

test("reports latency, usage and cost", async () => {
  const client = fakeClient()
  const react = createPortraitService({ client })
  const r = await react(situation)
  assert.deepEqual(r.usage, usage)
  assert.equal(r.estimatedCostUsd, estimateCostUsd(usage))
  assert.ok(r.latencyMs >= 0)
  assert.equal(client.calls[0].model, "gpt-6-luna")
  assert.equal(client.calls[0].questions.length, 4)
})

test("keeps at most 500 cached situations, evicting the oldest", async () => {
  const client = fakeClient()
  const react = createPortraitService({ client, maxPerHour: 10_000 })
  for (let i = 0; i <= 500; i++) await react({ ...situation, n: i })
  assert.equal(client.calls.length, 501)
  await react({ ...situation, n: 500 })
  assert.equal(client.calls.length, 501)
  await react({ ...situation, n: 0 })
  assert.equal(client.calls.length, 502)
})

test("rejects a stale catalog item with 400 without calling upstream", async () => {
  const client = fakeClient()
  const react = createPortraitService({ client })
  const handle = createGuardedJsonHandler((body) => react(validateSituation(body)))
  const post = (body) =>
    handle(
      new Request("https://jers.dev/api/portrait", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://jers.dev" },
        body: JSON.stringify(body),
      }),
    )
  const stale = await post({ action: "open_project", itemId: "project:removed-last-deploy" })
  assert.equal(stale.status, 400)
  assert.ok((await stale.json()).error)
  assert.equal(client.calls.length, 0)
  const ok = await post({ action: "open_project", itemId: "project:3i" })
  assert.equal(ok.status, 200)
  assert.equal((await ok.json()).expression, "laugh")
  assert.equal(client.calls.length, 1)
})
