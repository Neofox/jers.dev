const RECENT_LIMIT = 4

// Why a request never produced an answer, in the drawer's words (see FALLBACK_COPY in portrait.mjs).
export function fallbackReasonForStatus(status) {
  return status === 429 ? "rate_limited" : "http_error"
}

// Drawer readout formatters: anything that is not a finite, non-negative number renders as "—".
const usable = (n) => typeof n === "number" && Number.isFinite(n) && n >= 0
export const formatCount = (n) => (usable(n) ? n.toLocaleString("en-US") : "—")
export const formatLatency = (ms) => (usable(ms) && ms > 0 ? `${Math.round(ms)} ms` : "—")
export const formatCost = (usd) => (!usable(usd) ? "—" : usd === 0 ? "$0" : `$${usd.toFixed(5)}`)

// Holds the latest aside while nobody can see it (a dialog is open, the tab is hidden) and hands it
// back once the portrait is visible again, unless it has gone stale.
export function createAsideHold({ now, maxAgeMs = 30000 }) {
  let held = null
  return {
    hold(text) {
      held = text ? { text, at: now() } : null
    },
    clear() {
      held = null
    },
    take() {
      const current = held
      held = null
      return current && now() - current.at <= maxAgeMs ? current.text : null
    },
  }
}

export function createScheduler({
  now,
  send,
  apply,
  defaultFor,
  highPriority,
  minGapMs = 10000,
  maxPerVisit = 20,
  getCount,
  setCount,
  onError = () => {},
}) {
  const high = new Set(highPriority)
  let recent = []
  let lastSentAt = null
  let lastLocalAt = null
  let sequence = 0

  function report(error) {
    try {
      onError(error)
    } catch {
      // reporting must never throw
    }
  }

  function readCount() {
    try {
      const value = getCount()
      return Number.isFinite(value) ? value : 0
    } catch (error) {
      report(error)
      return 0
    }
  }

  function finish(mine, itemId, situation, outcome) {
    if (mine !== sequence) return
    try {
      const response = outcome.ok
        ? outcome.value
        : {
            react: true,
            expression: defaultFor(itemId),
            asideText: null,
            fallbackReason: outcome.error?.fallbackReason ?? "network",
          }
      apply(response, situation)
    } catch (error) {
      report(error)
    }
  }

  function trigger(action, itemId) {
    try {
      const count = readCount()
      if (count >= maxPerVisit) return
      const at = now()
      if (!high.has(action) && lastSentAt !== null && at - lastSentAt < minGapMs) return

      lastSentAt = at
      try {
        setCount(count + 1)
      } catch (error) {
        report(error)
      }
      const mine = (sequence += 1)
      const situation = { action, itemId, recent: recent.slice() }
      recent = [...recent, { action, itemId }].slice(-RECENT_LIMIT)

      new Promise((resolve) => resolve(send(situation))).then(
        (value) => finish(mine, itemId, situation, { ok: true, value }),
        (error) => {
          report(error)
          finish(mine, itemId, situation, { ok: false, error })
        },
      )
    } catch (error) {
      report(error)
    }
  }

  // Capped or offline: nothing is sent. Low-priority moves keep the current face; a high-priority one
  // shows the item's default face, at most once per gap (shared with real sends). It supersedes any
  // response still in flight. Returns whether the fallback was applied.
  function fallback(action, itemId, fallbackReason) {
    try {
      if (!high.has(action)) return false
      const at = now()
      const last = Math.max(lastSentAt ?? -Infinity, lastLocalAt ?? -Infinity)
      if (at - last < minGapMs) return false
      lastLocalAt = at
      sequence += 1
      const response = { react: true, expression: defaultFor(itemId), asideText: null, intensity: 0, fallbackReason }
      apply(response, { action, itemId, recent: recent.slice() })
      return true
    } catch (error) {
      report(error)
      return false
    }
  }

  return {
    trigger,
    fallback,
    recent: () => recent.slice(),
  }
}

// The full-size originals are 960px. Astro prerenders the smaller WebPs at build time.
export const portraitWidths = [96, 192, 320, 400, 640, 800]
export const portraitSizes = {
  home: "(max-width: 767px) clamp(112px, 33vw, 220px), (max-width: 1023px) 38vw, min(34vw, 400px)",
  dock: "(max-width: 599px) 46px, 56px",
  drawer: "72px",
}

export function portraitSources(expression) {
  const src = `/assets/portrait/portrait-${expression}.webp`
  const candidates = portraitWidths.map(width => `/assets/portrait/resized/${expression}-${width}.webp ${width}w`)
  return { src, srcset: [...candidates, `${src} 960w`].join(", ") }
}
