// Turns a validated situation into a portrait reaction via the Decisions API, with an in-memory
// cache, an hourly upstream cap and a silent fallback to the item's default face.

import { ITEMS } from "./portrait-catalog.mjs"
import { buildRequest, estimateCostUsd, interpret } from "./portrait-decision.mjs"

const HOUR_MS = 3_600_000
const MAX_CACHE_ENTRIES = 500

function defaultResponse(situation, fallbackReason) {
  return {
    react: true,
    expression: ITEMS[situation.itemId].defaultExpression,
    asideText: null,
    intensity: 0,
    fallback: null,
    questions: { should_react: null, expression: null, aside: null, intensity: null },
    latencyMs: 0,
    usage: null,
    estimatedCostUsd: 0,
    cached: false,
    fallbackReason,
  }
}

export function createPortraitService({ client, now = Date.now, maxPerHour = 1000 }) {
  const cache = new Map()
  let windowStart = now()
  let upstreamCalls = 0

  async function ask(situation) {
    const start = performance.now()
    const decision = await client.decisions.create(buildRequest(situation))
    const latencyMs = Math.round(performance.now() - start)
    const usage = decision?.usage ?? null
    return {
      ...interpret(decision?.answers, situation),
      latencyMs,
      usage,
      estimatedCostUsd: estimateCostUsd(usage),
      cached: false,
    }
  }

  return async function react(situation) {
    if (!client) return defaultResponse(situation, "no_key")
    if (now() - windowStart >= HOUR_MS) {
      cache.clear()
      upstreamCalls = 0
      windowStart = now()
    }

    const key = JSON.stringify(situation)
    const pending = cache.get(key)
    if (pending) {
      try {
        return { ...(await pending), cached: true, latencyMs: 0 }
      } catch {
        return defaultResponse(situation, "upstream")
      }
    }

    if (upstreamCalls >= maxPerHour) return defaultResponse(situation, "limit")
    upstreamCalls++
    const promise = ask(situation)
    if (cache.size >= MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value)
    cache.set(key, promise)
    try {
      return await promise
    } catch {
      if (cache.get(key) === promise) cache.delete(key)
      return defaultResponse(situation, "upstream")
    }
  }
}
