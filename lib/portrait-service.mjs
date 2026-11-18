// Turns a validated situation into a portrait reaction via the Decisions API, with an in-memory
// cache, an hourly upstream cap and a silent fallback to the item's default face.

import { APIConnectionTimeoutError } from "openai"
import { ITEMS } from "./portrait-catalog.mjs"
import { buildRequest, estimateCostUsd, interpret } from "./portrait-decision.mjs"

const HOUR_MS = 3_600_000
const MAX_CACHE_ENTRIES = 500

// The SDK's own 4 s timeout (or an aborted fetch) versus any other upstream failure, so the drawer
// can say which one happened.
export function upstreamReason(error) {
  return error instanceof APIConnectionTimeoutError || error?.name === "TimeoutError"
    ? "upstream_timeout"
    : "upstream_error"
}

function defaultResponse(situation, fallbackReason, latencyMs = 0) {
  return {
    react: true,
    expression: ITEMS[situation.itemId].defaultExpression,
    asideText: null,
    intensity: 0,
    fallback: null,
    questions: { should_react: null, expression: null, aside: null, intensity: null },
    latencyMs,
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
    const start = performance.now()
    const elapsed = () => Math.round(performance.now() - start)
    const pending = cache.get(key)
    if (pending) {
      try {
        // This call cost nothing: report no usage, no cost and no latency of its own.
        return { ...(await pending), cached: true, latencyMs: 0, usage: null, estimatedCostUsd: 0 }
      } catch (error) {
        return defaultResponse(situation, upstreamReason(error), elapsed())
      }
    }

    if (upstreamCalls >= maxPerHour) return defaultResponse(situation, "limit")
    upstreamCalls++
    const promise = ask(situation)
    if (cache.size >= MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value)
    cache.set(key, promise)
    try {
      const result = await promise
      // A defaulted face (refused, invalid, low confidence) is not worth pinning for an hour.
      if (result.fallback !== null && cache.get(key) === promise) cache.delete(key)
      return result
    } catch (error) {
      if (cache.get(key) === promise) cache.delete(key)
      return defaultResponse(situation, upstreamReason(error), elapsed())
    }
  }
}
