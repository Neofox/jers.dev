const RECENT_LIMIT = 4

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
        : { react: true, expression: defaultFor(itemId), asideText: null, fallbackReason: "network" }
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
          finish(mine, itemId, situation, { ok: false })
        },
      )
    } catch (error) {
      report(error)
    }
  }

  return {
    trigger,
    recent: () => recent.slice(),
  }
}
