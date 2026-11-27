import assert from "node:assert/strict"
import test from "node:test"
import { preferredLanguage, languageSwitchHref } from "../src/i18n/preference.js"

test("choose between supported browser languages using priority, region and list order", () => {
  for (const [header, expected] of [
    ["ko-KR,ko;q=0.9,en-US;q=0.8", "ko"],
    ["ko;q=0.2, en-GB;q=0.9", "en"],
    ["fr-CA, KO-kr;q=0.8, en;q=0.5", "ko"],
    ["en-US,ko", "en"], ["ko,en-US", "ko"],
    ["KO;q=0, en;q=0.8", "en"], ["ko;q=oops", "en"],
    ["*;q=1, ko;q=0.1", "en"], ["en;q=0, *;q=0.4", "ko"],
    ["fr-FR", "en"], [null, "en"],
  ]) assert.equal(preferredLanguage(null, header), expected, header)
})

test("only an explicit supported choice overrides the browser", () => {
  assert.equal(preferredLanguage("en", "ko-KR"), "en")
  assert.equal(preferredLanguage("ko", "en-US"), "ko")
  assert.equal(preferredLanguage("other", "ko-KR"), "ko")
})

test("switch a case study without losing its query or section", () => {
  const href = languageSwitchHref("/ko/work/beamo/", "?from=resume&tag=x&tag=y", "#demo-title")
  const url = new URL(href, "https://www.jers.dev")
  assert.equal(url.pathname, "/")
  assert.equal(url.searchParams.get("switchTo"), "/ko/work/beamo/")
  assert.equal(url.searchParams.get("from"), "resume")
  assert.deepEqual(url.searchParams.getAll("tag"), ["x", "y"])
  assert.equal(url.hash, "#demo-title")
})
