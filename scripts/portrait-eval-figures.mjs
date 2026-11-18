// Side-effect-free figures for the portrait evaluation (scripts/portrait-eval.mjs), kept apart so
// they can be tested and recomputed from a saved summary without calling the API.

import { ITEMS } from "../lib/portrait-catalog.mjs"

const ratio = (hits, total) => (total ? Number((hits / total).toFixed(3)) : null)

// Expression agreement if the portrait always showed the item's default face, per set: the bar the
// model has to clear. Scenarios are { set, situation: { itemId }, expected: { shouldReact, acceptable } }.
export function defaultBaseline(scenarios, sets) {
  const forSet = (set) => {
    const scored = scenarios.filter((s) => s.set === set && s.expected.shouldReact)
    const hits = scored.filter((s) => s.expected.acceptable.includes(ITEMS[s.situation.itemId].defaultExpression))
    return ratio(hits.length, scored.length)
  }
  return Object.fromEntries(sets.map((set) => [set, forSet(set)]))
}

// Expression passes that only happened because the model fell back to the item's default face
// (refused, invalid or low confidence) and that face was acceptable. Results are
// { expected: { shouldReact, acceptable }, got: { expression, fallback } }.
export function fallbackPasses(results) {
  return results.filter(
    (r) => r.expected.shouldReact && r.got.fallback && r.expected.acceptable.includes(r.got.expression),
  ).length
}
