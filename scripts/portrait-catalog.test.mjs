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

// The `{ … }` block that starts at the first "{" at or after `from`, by brace depth.
function blockAt(source, from) {
  const start = source.indexOf("{", from)
  for (let i = start, depth = 0; i < source.length; i++) {
    if (source[i] === "{") depth++
    else if (source[i] === "}" && --depth === 0) return source.slice(start, i + 1)
  }
  throw new Error("unbalanced block")
}

test("every demo item matches a demo chapter", () => {
  const source = readFileSync(new URL("../src/scripts/portfolio.js", import.meta.url), "utf8")
  const visuals = blockAt(source, source.indexOf("const visuals = {"))
  const demos = Object.keys(ITEMS).filter((id) => id.startsWith("demo:"))
  assert.ok(demos.length > 0)
  for (const id of demos) {
    const [project, chapter] = id.slice("demo:".length).split("/")
    // A chapter entry: `"<c>",` opening a chapters array row or a setChapter call.
    assert.match(source, new RegExp(`(?:\\[|^\\s*)"${chapter}",`, "m"), `${id}: no "${chapter}" chapter entry`)
    // visuals[<project>][<chapter>] is a working demo.
    const key = new RegExp(`^ {4}(?:${project}|"${project}"): \\{`, "m").exec(visuals)
    assert.ok(key, `${id}: no visuals entry for ${project}`)
    const projectVisuals = blockAt(visuals, key.index)
    assert.match(
      projectVisuals,
      new RegExp(`\\b${chapter}: \\{ demo: "`),
      `${id}: "${chapter}" is not a ${project} demo`,
    )
  }
})

test("every portfolio demo loads a standalone mount function", async () => {
  const source = readFileSync(new URL("../src/scripts/portfolio.js", import.meta.url), "utf8")
  const visuals = blockAt(source, source.indexOf("const visuals = {"))
  const names = [...new Set([...visuals.matchAll(/demo: "([^"]+)"/g)].map((match) => match[1]))]
  assert.deepEqual(names.sort(), Object.keys(demoLoaders).sort())
  for (const name of names) assert.equal(typeof (await demoLoaders[name]()).mount, "function", name)
})

test("project and career items match projectOrder and the career chapters in portfolio.js", () => {
  const source = readFileSync(new URL("../src/scripts/portfolio.js", import.meta.url), "utf8")
  const order = /const projectOrder = (\[[^\]]*\])/.exec(source)
  assert.ok(order, "no projectOrder")
  const projects = JSON.parse(order[1]).map((id) => `project:${id}`)
  // Career chapters: the `id: "<chapter>"` entries of the `const chapters = [` array only.
  const start = source.indexOf("const chapters = [")
  const end = source.indexOf("\n  ]\n", start)
  assert.ok(start >= 0 && end > start, "no career chapters")
  const block = source.slice(start, end)
  const careers = [...block.matchAll(/^ {6}id: "([a-z0-9-]+)",$/gm)].map((m) => `career:${m[1]}`)
  assert.ok(careers.length >= 5, `found ${careers.length} chapters`)
  const ids = (kind) =>
    Object.keys(ITEMS)
      .filter((id) => id.startsWith(`${kind}:`))
      .sort()
  assert.deepEqual(ids("project"), [...projects].sort())
  assert.deepEqual(ids("career"), [...careers].sort())
})
