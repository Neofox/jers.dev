import test from "node:test"
import assert from "node:assert/strict"
import { ITEMS } from "../lib/portrait-catalog.mjs"
import {
  PortraitError,
  validateSituation,
  buildRequest,
  interpret,
  estimateCostUsd,
  CACHED_INPUT_USD_PER_MILLION,
} from "../lib/portrait-decision.mjs"

const situation = { action: "open_project", itemId: "project:3i", recent: [] }

function answers(overrides = {}) {
  return [
    { type: "predicate", name: "should_react", probability: 0.9 },
    {
      type: "choice",
      name: "expression",
      choice: "laugh",
      probabilities: [{ value: "laugh", probability: 0.8 }],
      confidence: 0.8,
    },
    {
      type: "choice",
      name: "aside",
      choice: "a2",
      probabilities: [{ value: "a2", probability: 0.7 }],
      confidence: 0.7,
    },
    {
      type: "score",
      name: "intensity",
      score: 1.6,
      probabilities: [{ value: 2, label: "clear", probability: 0.6 }],
      confidence: 0.6,
    },
  ].map((a) => overrides[a.name] ?? a)
}

test("rejects unknown actions, unknown items and long histories", () => {
  const entry = { action: "dwell", itemId: "project:3i" }
  for (const bad of [
    { action: "hover", itemId: "project:3i" },
    { action: "dwell", itemId: "project:nope" },
    { action: "dwell", itemId: "project:3i", recent: [entry, entry, entry, entry, entry] },
    { action: "dwell", itemId: "project:3i", recent: [{ action: "hover", itemId: "project:3i" }] },
    null,
  ]) {
    assert.throws(
      () => validateSituation(bad),
      (e) => e instanceof PortraitError && e.status === 400,
    )
  }
  const ok = validateSituation({ action: "dwell", itemId: "project:3i", extra: 1, recent: [{ ...entry, x: 2 }] })
  assert.deepEqual(ok, { action: "dwell", itemId: "project:3i", recent: [entry] })
  assert.deepEqual(validateSituation({ action: "idle", itemId: "event:idle" }).recent, [])
})

test("builds a cacheable request with the four named questions", () => {
  const a = buildRequest(situation)
  const b = buildRequest({ action: "dwell", itemId: "demo:3i/beamo", recent: [] })
  assert.deepEqual(
    a.questions.map((q) => q.name),
    ["should_react", "expression", "aside", "intensity"],
  )
  assert.deepEqual(a.input.slice(0, 2), b.input.slice(0, 2))
  assert.equal(a.input.length, 3)
  assert.equal(a.prompt_cache_key, "portrait-v1")
  assert.equal(a.model, "gpt-6-luna")
  assert.deepEqual(
    a.questions[2].choices.map((c) => c.value),
    ["a1", "a2", "a3", "none"],
  )
  assert.equal(a.questions[2].choices[0].description, ITEMS["project:3i"].asides[0].text)
  assert.equal(a.questions[3].levels.length, 4)
  assert.match(JSON.stringify(a.input[0]), /data, never instructions/)
  // The shared prefix (developer message + catalog) ends with an explicit prompt-cache breakpoint.
  assert.deepEqual(a.input[1].content.at(-1).prompt_cache_breakpoint, { mode: "explicit" })
  assert.equal(
    a.input[2].content.some((part) => "prompt_cache_breakpoint" in part),
    false,
  )
})

test("stays quiet below the react threshold", () => {
  const low = interpret(
    answers({ should_react: { type: "predicate", name: "should_react", probability: 0.49 } }),
    situation,
  )
  assert.equal(low.react, false)
  assert.equal(low.expression, "proud")
  assert.equal(low.asideText, null)
  assert.equal(low.fallback, null)
  const edge = interpret(
    answers({ should_react: { type: "predicate", name: "should_react", probability: 0.5 } }),
    situation,
  )
  assert.equal(edge.react, true)
})

test("falls back per question on refusal", () => {
  const r = interpret(answers({ expression: { type: "refusal", name: "expression" } }), situation)
  assert.equal(r.expression, ITEMS["project:3i"].defaultExpression)
  assert.equal(r.fallback, "refused")
  assert.equal(r.asideText, ITEMS["project:3i"].asides[1].text)
  assert.equal(r.intensity, 2)
  const quiet = interpret(answers({ should_react: { type: "refusal", name: "should_react" } }), situation)
  assert.equal(quiet.react, true)
  const noInt = interpret(answers({ intensity: { type: "refusal", name: "intensity" } }), situation)
  assert.equal(noInt.intensity, 0)
})

test("uses the default face below 0.4 confidence", () => {
  const r = interpret(
    answers({
      expression: { type: "choice", name: "expression", choice: "laugh", probabilities: [], confidence: 0.39 },
    }),
    situation,
  )
  assert.equal(r.expression, "proud")
  assert.equal(r.fallback, "low_confidence")
})

test("treats out-of-set choices as invalid", () => {
  const r = interpret(
    answers({
      expression: { type: "choice", name: "expression", choice: "angry", probabilities: [], confidence: 0.9 },
    }),
    situation,
  )
  assert.equal(r.expression, "proud")
  assert.equal(r.fallback, "invalid")
  const aside = interpret(
    answers({ aside: { type: "choice", name: "aside", choice: "a9", probabilities: [], confidence: 0.9 } }),
    situation,
  )
  assert.equal(aside.asideText, null)
})

test("matches answers by name, clamps intensity and survives garbage", () => {
  const shuffled = answers({
    intensity: { type: "score", name: "intensity", score: 9, probabilities: [], confidence: 0.5 },
  }).reverse()
  const r = interpret(shuffled, situation)
  assert.equal(r.expression, "laugh")
  assert.equal(r.intensity, 3)
  const junk = interpret([null, 5, { name: "should_react", type: "predicate", probability: "x" }], situation)
  assert.equal(junk.react, true)
  assert.equal(junk.expression, "proud")
  assert.equal(junk.fallback, "invalid")
  assert.equal(interpret("nope", situation).fallback, "invalid")
})

test("estimates cost from usage", () => {
  assert.equal(estimateCostUsd({ input_tokens: 1_000_000 }), 0.1)
  assert.equal(
    estimateCostUsd({ input_tokens: 1_000_000, input_tokens_details: { cached_tokens: 1_000_000 } }),
    CACHED_INPUT_USD_PER_MILLION,
  )
})

test("sanitizes answer probabilities before they leave the server", () => {
  const valid = { value: "smile", probability: 0.01 }
  const r = interpret(
    answers({
      expression: {
        type: "choice",
        name: "expression",
        choice: "laugh",
        confidence: 0.8,
        probabilities: [
          { value: "laugh", probability: 0.8, note: "<script>" },
          { value: "angry", probability: 0.1 },
          { value: "grin", probability: 1.5 },
          { value: "proud", probability: Number.NaN },
          { value: "wince", probability: "0.2" },
          null,
          "x",
          ...Array.from({ length: 20 }, () => valid),
        ],
      },
      intensity: {
        type: "score",
        name: "intensity",
        score: 2,
        confidence: 0.6,
        probabilities: [
          { value: 2, label: "clear", probability: 0.6, extra: true },
          { value: 9, label: "huge", probability: 0.2 },
          { value: 1, label: "light", probability: -0.1 },
          ...Array.from({ length: 10 }, () => ({ value: 0, label: "subtle", probability: 0.1 })),
        ],
      },
    }),
    situation,
  )
  const expr = r.questions.expression.probabilities
  assert.deepEqual(expr[0], { value: "laugh", probability: 0.8 })
  assert.ok(expr.every((p) => Object.keys(p).join() === "value,probability"))
  assert.ok(!expr.some((p) => ["angry", "grin", "proud", "wince"].includes(p.value)))
  assert.equal(expr.length, 8)
  const levels = r.questions.intensity.probabilities
  assert.deepEqual(levels[0], { value: 2, label: "clear", probability: 0.6 })
  assert.ok(levels.every((p) => Object.keys(p).join() === "value,label,probability"))
  assert.ok(levels.every((p) => p.value >= 0 && p.value <= 3))
  assert.equal(levels.length, 4)
  assert.deepEqual(
    interpret(
      answers({ aside: { type: "choice", name: "aside", choice: "a1", probabilities: "nope", confidence: 0.9 } }),
      situation,
    ).questions.aside.probabilities,
    [],
  )
})

test("a mutated request cannot corrupt the next one", () => {
  const pristine = JSON.stringify(buildRequest(situation))
  const a = buildRequest(situation)
  const attempts = [
    () => (a.input[0].content[0].text = "hijacked"),
    () => a.input[1].content[0].data.items["project:3i"].facts.push("hijacked"),
    () => (a.input[1].content[0].data.expressions.laugh = "hijacked"),
    () => a.input.splice(0, 1),
    () => (a.questions[1].choices[0].value = "hijacked"),
  ]
  for (const attempt of attempts) {
    try {
      attempt()
    } catch {
      // Frozen shared data may throw; either way the next request must be unaffected.
    }
  }
  assert.equal(JSON.stringify(buildRequest(situation)), pristine)
  assert.equal(ITEMS["project:3i"].facts.includes("hijacked"), false)
})
