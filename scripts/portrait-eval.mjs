// Runs the fixed portrait scenarios (scripts/portrait-scenarios.json) against the live Decisions API
// with the production request builder and interpreter, prints a table and writes the public summary
// to public/portrait-eval.json. Usage: bun run eval:portrait (about 20 calls, ~$0.002 per run).
//
// Both agreement figures are over every scenario; a failed call counts as a miss.
// - react: the portrait reacts (should_react probability at or above the threshold) when expected.
// - expression: the face the portrait would show if it reacts (the model's choice when its
//   confidence clears the threshold, otherwise the item's default face) is one of the acceptable
//   faces. It is scored even where the expected answer is to stay quiet.

import { readFile, writeFile } from "node:fs/promises"
import OpenAI from "openai"
import { CATALOG_VERSION, EXPRESSIONS } from "../lib/portrait-catalog.mjs"
import {
  EXPRESSION_CONFIDENCE_THRESHOLD,
  MODEL,
  REACT_THRESHOLD,
  buildRequest,
  estimateCostUsd,
  interpret,
  validateSituation,
} from "../lib/portrait-decision.mjs"

const PRODUCTION_TIMEOUT_MS = 4000
const SCENARIOS_URL = new URL("./portrait-scenarios.json", import.meta.url)
const SUMMARY_URL = new URL("../public/portrait-eval.json", import.meta.url)

const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.error("OPENAI_API_KEY is missing (expected in .env.local).")
  process.exit(1)
}
// Longer than production's 4 s so slow answers are measured instead of cut off.
const client = new OpenAI({ apiKey, maxRetries: 0, timeout: 15000 })

function loadScenarios(list) {
  const ids = new Set()
  return list.map((s) => {
    if (typeof s.id !== "string" || ids.has(s.id)) throw new Error(`Missing or duplicate scenario id: ${s.id}`)
    ids.add(s.id)
    if (typeof s.shouldReact !== "boolean") throw new Error(`${s.id}: shouldReact must be a boolean`)
    if (!Array.isArray(s.acceptable) || !s.acceptable.length || !s.acceptable.every((e) => EXPRESSIONS.includes(e))) {
      throw new Error(`${s.id}: acceptable must list known expressions`)
    }
    return { id: s.id, situation: validateSituation(s.situation), acceptable: s.acceptable, shouldReact: s.shouldReact }
  })
}

const round = (n, digits) => (n === null || n === undefined ? null : Number(n.toFixed(digits)))

async function run(scenario) {
  const { situation } = scenario
  const expected = { shouldReact: scenario.shouldReact, acceptable: scenario.acceptable }
  const start = performance.now()
  let decision
  try {
    decision = await client.decisions.create(buildRequest(situation))
  } catch (error) {
    // Only the status: an authentication error message can echo part of the key.
    const got = { error: String(error?.status ?? error?.name ?? "error"), latencyMs: null, costUsd: 0 }
    return { id: scenario.id, expected, got, ok: false, reactOk: false, faceOk: false }
  }
  const latencyMs = Math.round(performance.now() - start)
  const answers = decision?.answers
  const shown = interpret(answers, situation)
  // Without a should_react answer interpret() always reacts, so this is the face shown on a reaction.
  const face = interpret(
    Array.isArray(answers) ? answers.filter((a) => a?.name !== "should_react") : answers,
    situation,
  )
  const got = {
    react: shown.react,
    expression: face.expression,
    fallback: face.fallback,
    reactProbability: round(shown.questions.should_react?.probability, 3),
    choice: face.questions.expression?.choice ?? null,
    confidence: round(face.questions.expression?.confidence, 3),
    latencyMs,
    costUsd: round(estimateCostUsd(decision?.usage), 7),
  }
  const reactOk = got.react === expected.shouldReact
  const faceOk = expected.acceptable.includes(got.expression)
  return { id: scenario.id, expected, got, ok: reactOk && faceOk, reactOk, faceOk }
}

const cell = (value, width) => String(value ?? "–").padEnd(width)

function printRow(r) {
  const { got, expected } = r
  const react = got.error
    ? `error ${got.error}`
    : `${got.react ? "react" : "quiet"} (${got.reactProbability ?? "–"})${r.reactOk ? "" : " ✗"}`
  const face = got.error
    ? ""
    : `${got.expression}${got.fallback ? ` [${got.fallback}: ${got.choice ?? "–"} ${got.confidence ?? "–"}]` : ` (${got.confidence})`}${r.faceOk ? "" : " ✗"}`
  console.log(
    [
      cell(r.id, 28),
      cell(expected.shouldReact ? "react" : "quiet", 6),
      cell(react, 18),
      cell(expected.acceptable.join("|"), 25),
      cell(face, 40),
      cell(got.latencyMs === null ? "" : `${got.latencyMs} ms`, 8),
    ].join(" "),
  )
}

const scenarios = loadScenarios(JSON.parse(await readFile(SCENARIOS_URL, "utf8")))
console.log(`${scenarios.length} scenarios · ${MODEL} · catalog v${CATALOG_VERSION}\n`)
console.log(
  [
    cell("scenario", 28),
    cell("want", 6),
    cell("got (p)", 18),
    cell("acceptable", 25),
    cell("face", 40),
    "latency",
  ].join(" "),
)

const results = []
for (const scenario of scenarios) {
  const result = await run(scenario)
  printRow(result)
  results.push(result)
}

const answered = results.filter((r) => !r.got.error)
const latencies = answered.map((r) => r.got.latencyMs)
const share = (key) => round(results.filter((r) => r[key]).length / results.length, 3)
const summary = {
  ranAt: new Date().toISOString(),
  model: MODEL,
  catalogVersion: CATALOG_VERSION,
  scenarios: results.length,
  expressionAgreement: share("faceOk"),
  reactAgreement: share("reactOk"),
  avgLatencyMs: latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : null,
  totalCostUsd: round(
    results.reduce((sum, r) => sum + r.got.costUsd, 0),
    6,
  ),
  thresholds: { shouldReact: REACT_THRESHOLD, expressionConfidence: EXPRESSION_CONFIDENCE_THRESHOLD },
  results: results.map(({ id, expected, got, ok }) => ({ id, expected, got, ok })),
}
await writeFile(SUMMARY_URL, `${JSON.stringify(summary, null, 2)}\n`)

const count = (key) => `${results.filter((r) => r[key]).length}/${results.length}`
const failed = results.length - answered.length
const slow = latencies.filter((ms) => ms > PRODUCTION_TIMEOUT_MS).length
const fallbacks = answered.filter((r) => r.got.fallback).length
console.log(
  `\nexpression ${count("faceOk")} (${summary.expressionAgreement}) · react ${count("reactOk")} (${summary.reactAgreement})` +
    ` · all ok ${count("ok")} · default-face fallbacks ${fallbacks}`,
)
console.log(
  `avg ${summary.avgLatencyMs} ms, max ${latencies.length ? Math.max(...latencies) : "–"} ms, ${slow} over the production` +
    ` ${PRODUCTION_TIMEOUT_MS} ms timeout · ${failed} failed · $${summary.totalCostUsd}`,
)
console.log(`thresholds: react ≥ ${REACT_THRESHOLD}, face confidence ≥ ${EXPRESSION_CONFIDENCE_THRESHOLD}`)
console.log(`wrote ${SUMMARY_URL.pathname}`)
if (failed) process.exitCode = 1
