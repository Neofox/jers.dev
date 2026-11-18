import test from "node:test"
import assert from "node:assert/strict"
import { ITEMS } from "../lib/portrait-catalog.mjs"
import { defaultBaseline, fallbackPasses } from "./portrait-eval-figures.mjs"

const face = (itemId) => ITEMS[itemId].defaultExpression
const other = (itemId) => (face(itemId) === "wince" ? "laugh" : "wince")

test("the default-face baseline scores each set's reacting scenarios against the item's default face", () => {
  const scenario = (set, itemId, acceptable) => ({
    set,
    situation: { itemId },
    expected: { shouldReact: Boolean(acceptable), acceptable },
  })
  const scenarios = [
    scenario("tuning", "project:3i", [face("project:3i")]),
    scenario("tuning", "career:flash", [other("career:flash")]),
    scenario("tuning", "event:end", undefined), // quiet: not scored
    scenario("heldOut", "event:idle", [other("event:idle"), face("event:idle")]),
  ]
  assert.deepEqual(defaultBaseline(scenarios, ["tuning", "heldOut"]), { tuning: 0.5, heldOut: 1 })
  assert.deepEqual(defaultBaseline([], ["tuning"]), { tuning: null })
})

test("counts expression passes that came from a fallback to the default face", () => {
  const result = (fallback, expression, acceptable) => ({
    expected: { shouldReact: Boolean(acceptable), acceptable },
    got: { expression, fallback },
  })
  const results = [
    result("low_confidence", "smile", ["smile"]), // counted
    result(null, "smile", ["smile"]), // the model's own choice
    result("low_confidence", "wince", ["laugh"]), // a miss
    result("low_confidence", "grin", undefined), // quiet scenario
    result("refused", "proud", ["proud", "grin"]), // counted
  ]
  assert.equal(fallbackPasses(results), 2)
})
