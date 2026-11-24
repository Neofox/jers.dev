import { chapters } from "../src/data/career.js"
import { demoPortraitItems, visuals } from "../src/data/project-visuals.js"
import test from "node:test"
import { demoLoaders } from "../src/scripts/demo-loaders.js"
import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
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

test("every demo item matches a demo chapter", () => {
  const source = readFileSync(new URL("../src/scripts/portfolio.js", import.meta.url), "utf8")
  const demos = Object.keys(ITEMS).filter((id) => id.startsWith("demo:"))
  assert.ok(demos.length > 0)
  for (const id of demos) {
    const [project, chapter] = id.slice("demo:".length).split("/")
    // A chapter entry: `"<c>",` opening a chapters array row or a setChapter call.
    assert.match(source, new RegExp(`(?:\\[|^\\s*)"${chapter}",`, "m"), `${id}: no "${chapter}" chapter entry`)
    const demo = visuals[project]?.[chapter]?.demo
    assert.ok(demo, `${id}: missing demo`)
    assert.equal(demoPortraitItems[demo], id)
  }
})

test("every portfolio demo loads a standalone mount function", async () => {
  const names = Object.keys(demoPortraitItems)
  assert.deepEqual(names.sort(), Object.keys(demoLoaders).sort())
  for (const name of names) assert.equal(typeof (await demoLoaders[name]()).mount, "function", name)
})

test("project and career items match the portfolio projects and career timeline", () => {
  const source = readFileSync(new URL("../src/scripts/portfolio.js", import.meta.url), "utf8")
  const order = /const projectOrder = (\[[^\]]*\])/.exec(source)
  assert.ok(order, "no projectOrder")
  const projects = JSON.parse(order[1]).map((id) => `project:${id}`)
  const careers = chapters.map(chapter => `career:${chapter.id}`)
  assert.ok(careers.length >= 5, `found ${careers.length} chapters`)
  const ids = (kind) =>
    Object.keys(ITEMS)
      .filter((id) => id.startsWith(`${kind}:`))
      .sort()
  assert.deepEqual(ids("project"), [...projects].sort())
  assert.deepEqual(ids("career"), [...careers].sort())
})
