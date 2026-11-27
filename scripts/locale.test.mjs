import assert from "node:assert/strict"
import test from "node:test"
import { ITEMS, EXPRESSIONS } from "../lib/portrait-catalog.mjs"
import { localeFromPath, localPath } from "../src/i18n/locale.js"
import { asides, asideText, expressionsAlt, faces } from "../src/i18n/portrait-ko.js"

test("switch languages on the same portfolio page, including legacy project fragments", () => {
  for (const [en, ko] of [
    ["/", "/ko/"],
    ["/work/#3i", "/ko/work/#3i"],
    ["/work/side-projects/gleamstral/", "/ko/work/side-projects/gleamstral/"],
    ["/?from=resume#work/rubiwin/pricing", "/ko/?from=resume#work/rubiwin/pricing"],
  ]) {
    for (const path of [en, ko]) {
      assert.equal(localPath(path, "en"), en)
      assert.equal(localPath(path, "ko"), ko)
    }
    assert.equal(localeFromPath(en), "en")
    assert.equal(localeFromPath(ko), "ko")
  }
  assert.equal(localeFromPath("/ko"), "ko")
  assert.equal(localeFromPath("/korea/"), "en")
})

test("each portrait decision has a Korean face label, image description and authored aside", () => {
  assert.deepEqual(Object.keys(asides).sort(), Object.keys(ITEMS).sort())
  for (const expression of EXPRESSIONS) {
    assert.match(faces[expression], /[가-힣]/)
    assert.match(expressionsAlt[expression], /[가-힣]/)
  }
  for (const [id, item] of Object.entries(ITEMS)) {
    for (const { id: choice } of item.asides) assert.match(asideText(id, choice), /[가-힣]/)
    assert.equal(asideText(id, "none"), null)
  }
})
