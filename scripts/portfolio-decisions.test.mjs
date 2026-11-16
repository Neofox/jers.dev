import test from "node:test"
import assert from "node:assert/strict"
import { createDecisionService } from "./portfolio-decisions.mjs"

const input = {
  situation: "Revise a translation draft while keeping the previous version available.",
  ambiguity: 0,
  consequences: 0,
  reversibility: 2,
}
const answer = {
  type: "choice",
  name: "automation_mode",
  choice: "automate",
  probabilities: ["automate", "assist", "human_review"].map((value, i) => ({ value, probability: i === 0 ? 1 : 0 })),
}
test("validates inputs before calling OpenAI and shares cached requests", async () => {
  let calls = 0
  const decide = createDecisionService({
    apiKey: "test-key",
    fetchImpl: async () => {
      calls++
      return Response.json({ answers: [answer] })
    },
  })
  await assert.rejects(decide({ ...input, situation: undefined }), { status: 400 })
  await assert.rejects(decide({ ...input, consequences: 3 }), { status: 400 })
  const [first, second] = await Promise.all([decide(input), decide(input)])
  assert.equal(first.choice, "automate")
  assert.equal(second.cached, true)
  assert.equal(calls, 1)
})
test("handles refusals, invalid results, and upstream errors without exposing their bodies", async () => {
  for (const [response, status] of [
    [Response.json({ answers: [{ type: "refusal", name: "automation_mode" }] }), 422],
    [Response.json({ answers: [{ ...answer, probabilities: [] }] }), 502],
    [new Response("sensitive upstream error", { status: 401 }), 502],
  ]) {
    const decide = createDecisionService({ apiKey: "test-key", fetchImpl: async () => response })
    await assert.rejects(decide(input), (error) => error.status === status && !error.message.includes("sensitive"))
  }
})
test("failed requests can retry within the bounded request budget", async () => {
  const decide = createDecisionService({
    apiKey: "test-key",
    maxRequests: 1,
    fetchImpl: async () => {
      throw Error("network")
    },
  })
  await assert.rejects(decide(input), { status: 503 })
  await assert.rejects(decide(input), { status: 429 })
})

test("the service budget resets after its window without retaining old results", async () => {
  let time = 0
  let calls = 0
  const decide = createDecisionService({
    apiKey: "test-key",
    maxRequests: 1,
    windowMs: 1000,
    now: () => time,
    fetchImpl: async () => {
      calls++
      return Response.json({ answers: [answer] })
    },
  })
  await decide(input)
  await assert.rejects(decide({ ...input, situation: "A different situation to evaluate." }), { status: 429 })
  time = 1001
  assert.equal((await decide(input)).cached, false)
  assert.equal(calls, 2)
})

test("accepts a written situation, forwards it as evidence, and caches by its full text", async () => {
  const bodies = []
  const decide = createDecisionService({
    apiKey: "test-key",
    fetchImpl: async (_url, options) => {
      bodies.push(JSON.parse(options.body))
      return Response.json({ answers: [answer] })
    },
  })
  const first = { ...input, situation: "  Suggest a meeting time, but ask before sending any invitations.  " }
  await decide(first)
  const cached = await decide({ ...first, situation: first.situation.trim() })
  await decide({ ...first, situation: "Send an invitation automatically to everyone in my company." })
  assert.equal(cached.cached, true)
  assert.equal(bodies.length, 2)
  assert.match(bodies[0].input, /Suggest a meeting time, but ask before sending any invitations\./)
  assert.doesNotMatch(bodies[0].input, /Revise a translation/)
  assert.notEqual(bodies[0].input, bodies[1].input)
})

test("rejects empty, oversized, non-text, and control-character situations before network access", async () => {
  let calls = 0
  const decide = createDecisionService({
    apiKey: "test-key",
    fetchImpl: async () => {
      calls++
      return Response.json({ answers: [answer] })
    },
  })
  for (const situation of ["", "short", " ".repeat(20), "x".repeat(1201), 42, null, "bad\u0000situation text"]) {
    await assert.rejects(decide({ ...input, situation }), { status: 400 })
  }
  assert.equal(calls, 0)
})
