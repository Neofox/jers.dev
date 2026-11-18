import test from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { EXPRESSIONS, ITEMS, clientCatalog } from "../lib/portrait-catalog.mjs"

test("lists the 31 items with kind prefixes", () => {
  const ids = Object.keys(ITEMS)
  assert.equal(ids.length, 31)
  for (const id of ids) {
    assert.match(id, /^(project|demo|career|event):[a-z0-9/-]+$/)
    assert.equal(id.split(":")[0], ITEMS[id].kind)
  }
})

test("every item has 3 short asides and a valid default face", () => {
  for (const [id, item] of Object.entries(ITEMS)) {
    assert.deepEqual(
      item.asides.map((a) => a.id),
      ["a1", "a2", "a3"],
      id,
    )
    for (const aside of item.asides) assert.ok(aside.text.length <= 90, `${id} ${aside.id}: ${aside.text.length} chars`)
    assert.ok(EXPRESSIONS.includes(item.defaultExpression), id)
    assert.ok(item.facts.length >= 2 && item.facts.length <= 3, id)
    assert.ok(item.label.length > 0, id)
  }
})

test("expressions match the generated images", () => {
  assert.equal(EXPRESSIONS.length, 8)
  for (const e of EXPRESSIONS) assert.ok(existsSync(`public/assets/portrait/portrait-${e}.webp`), e)
})

test("client catalog exposes no asides or facts", () => {
  const client = clientCatalog()
  const json = JSON.stringify(client)
  for (const item of Object.values(ITEMS)) {
    for (const aside of item.asides) assert.ok(!json.includes(aside.text))
    for (const fact of item.facts) assert.ok(!json.includes(fact))
  }
  for (const id of Object.keys(ITEMS)) {
    assert.deepEqual(Object.keys(client.items[id]).sort(), ["defaultExpression", "label"])
  }
})
