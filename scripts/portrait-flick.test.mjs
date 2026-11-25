import assert from "node:assert/strict"
import test from "node:test"
import { launchVelocity } from "../src/scripts/portrait-flick.js"

const bounds = { left: -600, right: 0, top: -800, bottom: 0 }

test("releasing a stationary portrait gives it no momentum", () => {
  const { vx, vy } = launchVelocity(-3, -4, 0, bounds)
  assert.equal(Math.hypot(vx, vy), 0)
})

test("a tenfold increase in release speed carries through to the throw", () => {
  const gentle = launchVelocity(-3, -4, 100, bounds)
  const firm = launchVelocity(-3, -4, 1000, bounds)
  assert.ok(gentle.vx < 0 && gentle.vy < 0)
  assert.ok(Math.hypot(firm.vx, firm.vy) >= 9 * Math.hypot(gentle.vx, gentle.vy))
  assert.ok(Math.abs(firm.vx / firm.vy - 0.75) < 1e-6)
})
