import test from "node:test"
import assert from "node:assert/strict"
import { createScheduler } from "../public/portrait-core.mjs"

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
  assert.deepEqual(applied[0].response, {
    react: true,
    expression: "default:project:gone",
    asideText: null,
    fallbackReason: "network",
  })
})
