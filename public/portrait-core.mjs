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
}) {
  const high = new Set(highPriority)
  let recent = []
  let lastSentAt = null
  let sequence = 0

  async function trigger(action, itemId) {
    if (getCount() >= maxPerVisit) return
    const at = now()
    if (!high.has(action) && lastSentAt !== null && at - lastSentAt < minGapMs) return

    lastSentAt = at
    setCount(getCount() + 1)
    const mine = (sequence += 1)
    const situation = { action, itemId, recent: recent.slice() }
    recent = [...recent, { action, itemId }].slice(-RECENT_LIMIT)

    let response
    try {
      response = await send(situation)
    } catch {
      response = { react: true, expression: defaultFor(itemId), asideText: null, fallbackReason: "network" }
    }
    if (mine === sequence) apply(response, situation)
  }

  return {
    trigger,
    recent: () => recent.slice(),
  }
}
