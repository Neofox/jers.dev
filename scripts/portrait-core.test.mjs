import test from "node:test"
import assert from "node:assert/strict"
import {
  createAsideHold,
  createScheduler,
  fallbackReasonForStatus,
  formatCost,
  formatCount,
  formatLatency,
} from "../public/portrait-core.mjs"

const highPriority = ["open_project", "open_demo", "download_resume"]
const flush = () => new Promise((resolve) => setImmediate(resolve))

function setup(options = {}) {
  const clock = { t: 0 }
  const sent = []
  const applied = []
  let count = 0
  const scheduler = createScheduler({
    now: () => clock.t,
    send: options.send ?? (async (situation) => (sent.push(situation), { react: true, tag: situation.itemId })),
    apply: (response, situation) => applied.push({ response, situation }),
    defaultFor: (itemId) => `default:${itemId}`,
    highPriority,
    getCount: () => count,
    setCount: (value) => {
      count = value
    },
    ...options.scheduler,
  })
  return { clock, sent, applied, scheduler, count: () => count }
}

test("drops low-priority triggers inside the gap", async () => {
  const { clock, sent, scheduler } = setup()
  scheduler.trigger("dwell", "project:3i")
  clock.t = 5000
  scheduler.trigger("dwell", "project:enhans")
  await flush()
  assert.equal(sent.length, 1)
  clock.t = 10000
  scheduler.trigger("dwell", "project:enhans")
  await flush()
  assert.equal(sent.length, 2)
})

test("high priority skips the gap but counts", async () => {
  const { clock, sent, scheduler, count } = setup()
  scheduler.trigger("dwell", "project:3i")
  clock.t = 1000
  scheduler.trigger("open_project", "project:3i")
  await flush()
  assert.equal(sent.length, 2)
  assert.equal(count(), 2)
})

test("stops at the per-visit cap", async () => {
  const { sent, scheduler } = setup({ scheduler: { maxPerVisit: 2 } })
  scheduler.trigger("open_project", "project:3i")
  scheduler.trigger("open_demo", "project:3i")
  scheduler.trigger("download_resume", "resume")
  await flush()
  assert.equal(sent.length, 2)
})

test("applies only the latest response", async () => {
  const resolvers = []
  const { clock, applied, scheduler } = setup({
    send: (situation) => new Promise((resolve) => resolvers.push(() => resolve({ tag: situation.itemId }))),
  })
  scheduler.trigger("open_project", "A")
  clock.t = 1
  scheduler.trigger("open_project", "B")
  resolvers[1]()
  await flush()
  resolvers[0]()
  await flush()
  assert.equal(applied.length, 1)
  assert.equal(applied[0].response.tag, "B")
  assert.equal(applied[0].situation.itemId, "B")
})

test("sends the last four moves as recent", async () => {
  const { sent, scheduler } = setup()
  for (let i = 1; i <= 6; i += 1) scheduler.trigger("open_project", `item${i}`)
  await flush()
  assert.deepEqual(sent[0].recent, [])
  assert.equal(sent[5].recent.length, 4)
  assert.deepEqual(sent[5].recent.at(-1), { action: "open_project", itemId: "item5" })
  assert.deepEqual(scheduler.recent().at(-1), { action: "open_project", itemId: "item6" })
})

test("falls back silently when the request fails", async () => {
  let calls = 0
  const { applied, scheduler } = setup({
    send: async () => {
      calls += 1
      throw new Error("HTTP 400")
    },
  })
  scheduler.trigger("open_project", "project:gone")
  await flush()
  assert.equal(calls, 1)
  assert.deepEqual(applied[0].situation, {
    action: "open_project",
    itemId: "project:gone",
    recent: [],
  })
  assert.deepEqual(applied[0].response, {
    react: true,
    expression: "default:project:gone",
    asideText: null,
    fallbackReason: "network",
  })
})

test("does not apply a stale failure after a newer success", async () => {
  const settle = []
  const { clock, applied, scheduler } = setup({
    send: (situation) => new Promise((resolve, reject) => settle.push({ resolve, reject, situation })),
  })
  scheduler.trigger("open_project", "A")
  clock.t = 1
  scheduler.trigger("open_project", "B")
  settle[1].resolve({ tag: "B" })
  await flush()
  settle[0].reject(new Error("network"))
  await flush()
  assert.equal(applied.length, 1)
  assert.equal(applied[0].response.tag, "B")
})

test("a high-priority send resets the gap", async () => {
  const { clock, sent, scheduler } = setup()
  scheduler.trigger("dwell", "a")
  clock.t = 1000
  scheduler.trigger("open_project", "b")
  clock.t = 10500
  scheduler.trigger("dwell", "c")
  await flush()
  assert.equal(sent.length, 2)
})

test("a failed send counts toward the cap", async () => {
  const { scheduler, count } = setup({
    send: async () => {
      throw new Error("boom")
    },
    scheduler: { maxPerVisit: 1 },
  })
  scheduler.trigger("open_project", "a")
  scheduler.trigger("open_project", "b")
  await flush()
  assert.equal(count(), 1)
})

test("respects a pre-seeded count", async () => {
  const { sent, scheduler } = setup({
    scheduler: { maxPerVisit: 3, getCount: () => 3 },
  })
  scheduler.trigger("open_project", "a")
  await flush()
  assert.equal(sent.length, 0)
})

test("a throwing apply or storage never causes an unhandled rejection", async () => {
  const unhandled = []
  const listener = (reason) => unhandled.push(reason)
  process.on("unhandledRejection", listener)
  const errors = []
  try {
    const { sent, scheduler } = setup({
      scheduler: {
        apply: () => {
          throw new Error("apply")
        },
        getCount: () => {
          throw new Error("get")
        },
        setCount: () => {
          throw new Error("set")
        },
        onError: (error) => errors.push(error.message),
      },
    })
    scheduler.trigger("open_project", "a")
    await flush()
    await flush()
    assert.equal(sent.length, 1)
    assert.deepEqual(unhandled, [])
    assert.ok(errors.includes("apply") && errors.includes("get") && errors.includes("set"))
  } finally {
    process.off("unhandledRejection", listener)
  }
})

test("a failed request carries its own fallback reason, defaulting to network", async () => {
  const errors = [Object.assign(new Error("HTTP 429"), { fallbackReason: "rate_limited" }), new TypeError("offline")]
  const { clock, applied, scheduler } = setup({
    send: async () => {
      throw errors.shift()
    },
  })
  scheduler.trigger("open_project", "a")
  await flush()
  clock.t = 1
  scheduler.trigger("open_project", "b")
  await flush()
  assert.deepEqual(
    applied.map((a) => a.response.fallbackReason),
    ["rate_limited", "network"],
  )
})

test("maps HTTP statuses to fallback reasons", () => {
  assert.equal(fallbackReasonForStatus(429), "rate_limited")
  for (const status of [400, 403, 413, 500, 502]) assert.equal(fallbackReasonForStatus(status), "http_error")
})

test("local fallbacks: only high priority, at most once per gap, never sent or counted", async () => {
  const { clock, sent, applied, scheduler, count } = setup()
  assert.equal(scheduler.fallback("dwell", "a", "cap"), false)
  assert.equal(scheduler.fallback("open_project", "b", "cap"), true)
  clock.t = 5000
  assert.equal(scheduler.fallback("open_demo", "c", "cap"), false)
  assert.equal(scheduler.fallback("dwell", "d", "cap"), false)
  clock.t = 10000
  assert.equal(scheduler.fallback("download_resume", "e", "network"), true)
  await flush()
  assert.equal(sent.length, 0)
  assert.equal(count(), 0)
  assert.deepEqual(
    applied.map((a) => [a.situation.itemId, a.response.expression, a.response.fallbackReason, a.response.asideText]),
    [
      ["b", "default:b", "cap", null],
      ["e", "default:e", "network", null],
    ],
  )
})

test("a local fallback waits out the gap after a real send and supersedes it", async () => {
  const resolvers = []
  const { clock, applied, scheduler } = setup({
    send: (situation) => new Promise((resolve) => resolvers.push(() => resolve({ tag: situation.itemId }))),
  })
  scheduler.trigger("open_project", "a")
  clock.t = 3000
  assert.equal(scheduler.fallback("open_project", "b", "network"), false)
  clock.t = 10000
  assert.equal(scheduler.fallback("open_project", "c", "network"), true)
  resolvers[0]()
  await flush()
  assert.deepEqual(
    applied.map((a) => a.situation.itemId),
    ["c"],
  )
})

test("holds an aside until it is taken, and drops it once stale", () => {
  const clock = { t: 0 }
  const hold = createAsideHold({ now: () => clock.t, maxAgeMs: 30000 })
  assert.equal(hold.take(), null)
  hold.hold("hi")
  clock.t = 30000
  assert.equal(hold.take(), "hi")
  assert.equal(hold.take(), null)
  hold.hold("stale")
  clock.t = 60001
  assert.equal(hold.take(), null)
  hold.hold("cleared")
  hold.clear()
  assert.equal(hold.take(), null)
  hold.hold("first")
  hold.hold(null)
  assert.equal(hold.take(), null)
})

test("drawer readouts render a dash for anything but a finite, non-negative number", () => {
  for (const bad of [NaN, Infinity, -1, "12", null, undefined]) {
    assert.equal(formatCost(bad), "—", String(bad))
    assert.equal(formatLatency(bad), "—", String(bad))
    assert.equal(formatCount(bad), "—", String(bad))
  }
  assert.equal(formatCost(0), "$0")
  assert.equal(formatCost(0.000106), "$0.00011")
  assert.equal(formatLatency(0), "—")
  assert.equal(formatLatency(420), "420 ms")
  assert.equal(formatCount(0), "0")
  assert.equal(formatCount(7000), "7,000")
})
