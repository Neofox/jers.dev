import { demoShell, motionEnabled } from "./shared.js"

// Translater · tone + refinement. Re-implements the documented behaviour: three tones (Casual default),
// toggle chips Softer/Direct/Shorter/Playful with a cap of 3 (other chips disable, no message),
// every change regenerates the whole result, a failed refinement restores the previous result and shows
// "Adjustment failed: Translation failed.", and the Breakdown reads from the same completed result.
// Output is pre-written sample text composed by simple rules — never a live translation.
function markup() {
  const tones = [["friends", "Friends"], ["casual", "Casual"], ["professional", "Professional"]]
  const chips = ["Softer", "Direct", "Shorter", "Playful"]
  return demoShell(
    "translater",
    "Translater tone and refinement",
    `<div class="tl">
      <div class="tl-source"><p class="illo-kicker">English → Korean</p><p class="tl-input">How are you doing today?</p></div>
      <div class="tl-controls">
        <div class="tl-seg" role="group" aria-label="Tone">${tones.map(([v, l]) => `<button type="button" data-tl-tone="${v}" aria-pressed="${v === "casual"}">${l}</button>`).join("")}</div>
        <div class="tl-refine" role="group" aria-label="Refine"><span class="illo-kicker">Refine</span>${chips.map((c) => `<button type="button" class="tl-chip" data-tl-chip="${c}" aria-pressed="false">${c}</button>`).join("")}</div>
        <label class="tl-fail"><input type="checkbox" data-tl="fail"> Simulate a failed adjustment</label>
      </div>
      <div class="tl-result" data-tl="result" aria-live="polite"><p class="illo-kicker">Result · pre-written sample</p><p class="tl-main" lang="ko" data-tl="main"></p><p class="tl-gloss" data-tl="gloss"></p><p class="tl-error" role="alert" data-tl="error" hidden></p></div>
      <div class="tl-learn"><p class="illo-kicker">Breakdown <span>· from the same result, no second request</span></p><ul data-tl="rows"></ul></div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = (k) => root.querySelector(`[data-tl="${k}"]`)
  const st = { tone: "casual", chips: [], open: -1 }
  let busy = null
  function compose({ tone, chips }) {
    const has = (c) => chips.includes(c)
    const soft = has("Softer"),
      direct = has("Direct")
    const q1 = direct ? "잘" : "어떻게"
    let verb, grammar, en
    if (tone === "friends") {
      verb = soft ? "지내고 있어" : "지내"
      grammar = soft ? "-고 있어: ongoing state, casual speech (반말)." : "-어: plain casual speech (반말) between friends."
    } else if (tone === "casual") {
      verb = soft ? "지내세요" : "지내요"
      grammar = soft ? "-시-: honorific, then polite -어요 (해요체)." : "-어요: polite everyday ending (해요체)."
    } else {
      verb = soft ? "지내고 계신가요" : "지내십니까"
      grammar = soft ? "-고 계시다 + -ㄴ가요: honorific, gently asked." : "-십니까: formal honorific question (하십시오체)."
    }
    const end = has("Playful") ? (tone === "friends" ? "? ㅎㅎ" : tone === "casual" ? "~?" : "? :)") : "?"
    const today = has("Shorter") ? "" : "오늘 "
    const main = `${today}${q1} ${verb}${end}`
    en = (direct ? "Doing well" : "How are you doing") + (has("Shorter") ? "" : " today") + "?"
    const rows = []
    if (!has("Shorter")) rows.push({ phrase: "오늘", gloss: "today", base: "오늘", grammar: "Time noun, no particle needed." })
    rows.push({
      phrase: `${q1} ${verb}`,
      gloss: direct ? "doing well?" : "how are you doing?",
      base: soft && tone !== "friends" ? "지내시다 (honorific of 지내다)" : "지내다 · to get along",
      grammar,
    })
    return { main, en, rows }
  }
  function draw(result) {
    q("main").textContent = result.main
    q("gloss").textContent = "≈ “" + result.en + "”"
    q("rows").innerHTML = result.rows
      .map(
        (r, i) =>
          `<li><button type="button" class="tl-row" aria-expanded="${st.open === i}" data-tl-row="${i}"><span lang="ko">${r.phrase}</span> → ${r.gloss}</button>${
            st.open === i
              ? `<dl class="tl-facts"><div><dt>In this sentence</dt><dd>${r.gloss}</dd></div><div><dt>Base form</dt><dd lang="ko">${r.base}</dd></div><div><dt>Grammar</dt><dd>${r.grammar}</dd></div></dl>`
              : ""
          }</li>`,
      )
      .join("")
    syncControls()
  }
  // Controls reflect the requested state immediately; the cap of 3 is enforced in state, not only in the DOM.
  function syncControls() {
    root.querySelectorAll("[data-tl-tone]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tlTone === st.tone)))
    const full = st.chips.length >= 3
    root.querySelectorAll("[data-tl-chip]").forEach((b) => {
      const on = st.chips.includes(b.dataset.tlChip)
      b.setAttribute("aria-pressed", String(on))
      b.disabled = full && !on // at the cap, unpressed chips disable; pressed ones stay removable
    })
  }
  let current = compose(st)
  // Last completed run: what a failed adjustment rolls back to.
  let committed = { tone: st.tone, chips: [...st.chips], result: current }
  let pendingRefinement = false
  function run(next, isRefinement) {
    Object.assign(st, next) // a newer request supersedes the one in flight, like a re-run in the app
    pendingRefinement = pendingRefinement || isRefinement
    q("error").hidden = true
    syncControls()
    const settle = () => {
      busy = null
      q("result").classList.remove("is-busy")
      if (pendingRefinement && q("fail").checked) {
        // snapshot restored: text, breakdown and the last completed refinement set
        st.tone = committed.tone
        st.chips = [...committed.chips]
        current = committed.result
        q("error").textContent = "Adjustment failed: Translation failed."
        q("error").hidden = false
      } else {
        current = compose(st)
        committed = { tone: st.tone, chips: [...st.chips], result: current }
      }
      pendingRefinement = false
      st.open = Math.min(st.open, current.rows.length - 1)
      draw(current)
    }
    clearTimeout(busy)
    if (motionEnabled()) {
      q("result").classList.add("is-busy")
      busy = setTimeout(settle, 450)
    } else settle()
  }
  root.querySelectorAll("[data-tl-tone]").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.tlTone !== st.tone) run({ tone: b.dataset.tlTone }, false)
    }),
  )
  root.querySelectorAll("[data-tl-chip]").forEach((b) =>
    b.addEventListener("click", () => {
      const c = b.dataset.tlChip
      const on = st.chips.includes(c)
      if (!on && st.chips.length >= 3) return // cap of 3, checked against current state synchronously
      run({ chips: on ? st.chips.filter((x) => x !== c) : [...st.chips, c] }, true)
    }),
  )
  q("rows").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tl-row]")
    if (!b) return
    const i = +b.dataset.tlRow
    st.open = st.open === i ? -1 : i // one row open at a time
    draw(current)
    root.querySelector(`[data-tl-row="${i}"]`)?.focus()
  })
  draw(current)
  return () => clearTimeout(busy)
}
