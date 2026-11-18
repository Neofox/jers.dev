// Runs the fixed portrait scenarios (scripts/portrait-scenarios.json) against the live Decisions API
// with the production request builder and interpreter, prints a table and writes the public summary
// to public/portrait-eval.json. Usage: bun run eval:portrait (30 calls, ~$0.003 per run).
//
// Scenarios come in two sets: "tuning" (question wording and thresholds may be adjusted against it)
// and "heldOut" (never tuned against). The summary's top-level agreement figures are the tuning set;
// `heldOut` carries the same figures for the held-out set. A failed call counts as a miss.
// - react: the portrait reacts (should_react probability at or above the threshold) when expected.
// - expression: scored only where the portrait is expected to react. The face it would show (the
//   model's choice when its confidence clears the threshold, otherwise the item's default face) must
//   be one of the acceptable faces.
// `status` is copied from the scenarios file: "draft" until Jérôme signs the expectations off.
// If any call fails, the summary is printed but public/portrait-eval.json is left untouched.

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
const SETS = ["tuning", "heldOut"]
const STATUSES = ["draft", "signed-off"]
const SCENARIOS_URL = new URL("./portrait-scenarios.json", import.meta.url)
const SUMMARY_URL = new URL("../public/portrait-eval.json", import.meta.url)

const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.error("OPENAI_API_KEY is missing (expected in .env.local).")
  process.exit(1)
}
// Longer than production's 4 s so slow answers are measured instead of cut off.
const client = new OpenAI({ apiKey, maxRetries: 0, timeout: 15000 })

function loadScenarios(file) {
  if (!STATUSES.includes(file.status)) throw new Error(`status must be one of ${STATUSES.join(", ")}`)
  const ids = new Set()
  const scenarios = SETS.flatMap((set) =>
    file[set].map((s) => {
      if (typeof s.id !== "string" || ids.has(s.id)) throw new Error(`Missing or duplicate scenario id: ${s.id}`)
      ids.add(s.id)
      if (typeof s.shouldReact !== "boolean") throw new Error(`${s.id}: shouldReact must be a boolean`)
      const acceptable = s.shouldReact ? s.acceptable : undefined
      if (s.shouldReact && !(acceptable?.length && acceptable.every((e) => EXPRESSIONS.includes(e)))) {
        throw new Error(`${s.id}: acceptable must list known expressions`)
      }
      if (!s.shouldReact && s.acceptable !== undefined) throw new Error(`${s.id}: quiet scenarios have no faces`)
      return {
        id: s.id,
        set,
        situation: validateSituation(s.situation),
        expected: { shouldReact: s.shouldReact, acceptable },
      }
    }),
  )
  return { status: file.status, scenarios }
}

const round = (n, digits) => (n === null || n === undefined ? null : Number(n.toFixed(digits)))

async function run({ id, set, situation, expected }) {
  const start = performance.now()
  let decision
  try {
    decision = await client.decisions.create(buildRequest(situation))
  } catch (error) {
    // Only the status: an authentication error message can echo part of the key.
    const got = { error: String(error?.status ?? error?.name ?? "error"), latencyMs: null, costUsd: 0 }
    return { id, set, expected, got, ok: false, reactOk: false, faceOk: expected.shouldReact ? false : null }
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
  const faceOk = expected.shouldReact ? expected.acceptable.includes(got.expression) : null
  return { id, set, expected, got, ok: reactOk && faceOk !== false, reactOk, faceOk }
}

const cell = (value, width) => String(value ?? "–").padEnd(width)
const mark = (ok) => (ok === false ? " ✗" : "")

function printRow(r) {
  const { got, expected } = r
  const react = got.error
    ? `error ${got.error}`
    : `${got.react ? "react" : "quiet"} (${got.reactProbability ?? "–"})${mark(r.reactOk)}`
  const face = got.error
    ? ""
    : `${got.expression}${got.fallback ? ` [${got.fallback}: ${got.choice ?? "–"} ${got.confidence ?? "–"}]` : ` (${got.confidence})`}${mark(r.faceOk)}`
  console.log(
    [
      cell(r.id, 28),
      cell(expected.shouldReact ? "react" : "quiet", 6),
      cell(react, 18),
      cell(expected.acceptable?.join("|") ?? "", 25),
      cell(face, 40),
      cell(got.latencyMs === null ? "" : `${got.latencyMs} ms`, 8),
    ].join(" "),
  )
}

// Agreement for one set: react over every scenario, expression over the scenarios expected to react.
function agreement(results) {
  const faces = results.filter((r) => r.faceOk !== null)
  const ratio = (hits, total) => (total ? round(hits / total, 3) : null)
  const react = results.filter((r) => r.reactOk).length
  const face = faces.filter((r) => r.faceOk).length
  return {
    figures: {
      scenarios: results.length,
      expressionAgreement: ratio(face, faces.length),
      reactAgreement: ratio(react, results.length),
    },
    text: `expression ${face}/${faces.length} · react ${react}/${results.length}`,
  }
}

const { status, scenarios } = loadScenarios(JSON.parse(await readFile(SCENARIOS_URL, "utf8")))
console.log(`${scenarios.length} scenarios (${status}) · ${MODEL} · catalog v${CATALOG_VERSION}`)

const results = []
for (const set of SETS) {
  console.log(`\n${set}`)
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
  for (const scenario of scenarios.filter((s) => s.set === set)) {
    const result = await run(scenario)
    printRow(result)
    results.push(result)
  }
}

const tuning = agreement(results.filter((r) => r.set === "tuning"))
const heldOut = agreement(results.filter((r) => r.set === "heldOut"))
const answered = results.filter((r) => !r.got.error)
const latencies = answered.map((r) => r.got.latencyMs)
const summary = {
  status,
  ranAt: new Date().toISOString(),
  model: MODEL,
  catalogVersion: CATALOG_VERSION,
  ...tuning.figures,
  heldOut: heldOut.figures,
  avgLatencyMs: latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : null,
  totalCostUsd: round(
    results.reduce((sum, r) => sum + r.got.costUsd, 0),
    6,
  ),
  thresholds: { shouldReact: REACT_THRESHOLD, expressionConfidence: EXPRESSION_CONFIDENCE_THRESHOLD },
  results: results.map(({ id, set, expected, got, ok }) => ({ id, set, expected, got, ok })),
}

const failed = results.length - answered.length
const slow = latencies.filter((ms) => ms > PRODUCTION_TIMEOUT_MS).length
const fallbacks = answered.filter((r) => r.got.fallback).length
console.log(`\ntuning   ${tuning.text}`)
console.log(`held-out ${heldOut.text}`)
console.log(
  `avg ${summary.avgLatencyMs ?? "–"} ms, max ${latencies.length ? Math.max(...latencies) : "–"} ms, ${slow} over the production` +
    ` ${PRODUCTION_TIMEOUT_MS} ms timeout · ${failed} failed · default-face fallbacks ${fallbacks} · $${summary.totalCostUsd}`,
)
console.log(`thresholds: react ≥ ${REACT_THRESHOLD}, face confidence ≥ ${EXPRESSION_CONFIDENCE_THRESHOLD}`)
if (failed) {
  console.error(`${failed} call(s) failed: ${SUMMARY_URL.pathname} left unchanged.`)
  process.exitCode = 1
} else {
  await writeFile(SUMMARY_URL, `${JSON.stringify(summary, null, 2)}\n`)
  console.log(`wrote ${SUMMARY_URL.pathname}`)
}
