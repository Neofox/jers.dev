import { uiText } from "./demo-locale.js"
import { demoShell, motionEnabled } from "./shared.js"

// Translater · tone + refinement. Re-implements the documented behaviour: three tones (Casual default),
// toggle chips Softer/Direct/Shorter/Playful with a cap of 3 (other chips disable, no message),
// every change regenerates the whole result, a failed refinement restores the previous result and shows
// "Adjustment failed: Translation failed.", and the Breakdown reads from the same completed result.
// Output is pre-written sample text composed by simple rules — never a live translation.
function markup() {
  const tones = [["friends", uiText("Friends", "친구에게")], ["casual", uiText("Casual", "일상 대화")], ["professional", uiText("Professional", "격식 있게")]]
  const chips = [["Softer", "부드럽게"], ["Direct", "직설적으로"], ["Shorter", "짧게"], ["Playful", "장난스럽게"]]
  return demoShell(
    "translater",
    uiText("Translater tone and refinement", "Translater 말투 선택과 번역 조정"),
    `<div class="tl">
      <div class="tl-source"><p class="illo-kicker">${uiText("English → Korean", "영어 → 한국어")}</p><p class="tl-input" lang="en">How are you doing today?</p></div>
      <div class="tl-controls">
        <div class="tl-seg" role="group" aria-label="${uiText("Tone", "말투")}">${tones.map(([v, l]) => `<button type="button" data-tl-tone="${v}" aria-pressed="${v === "casual"}">${l}</button>`).join("")}</div>
        <div class="tl-refine" role="group" aria-label="${uiText("Refine", "표현 조정")}"><span class="illo-kicker">${uiText("Refine", "표현 조정")}</span>${chips.map(([c, korean]) => `<button type="button" class="tl-chip" data-tl-chip="${c}" aria-pressed="false">${uiText(c, korean)}</button>`).join("")}</div>
        <label class="tl-fail"><input type="checkbox" data-tl="fail"> ${uiText("Simulate a failed adjustment", "표현 조정 실패 재현")}</label>
      </div>
      <div class="tl-result" data-tl="result" aria-live="polite"><p class="illo-kicker">${uiText("Result · pre-written sample", "번역 결과 · 미리 작성한 예시")}</p><p class="tl-main" lang="ko" data-tl="main"></p><p class="tl-gloss" lang="en" data-tl="gloss"></p><p class="tl-error" role="alert" data-tl="error" hidden></p></div>
      <div class="tl-learn"><p class="illo-kicker">${uiText("Breakdown", "구절별 풀이")} <span>${uiText("· from the same result, no second request", "· 처음 받은 결과로 표시")}</span></p><ul data-tl="rows"></ul></div>
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
      grammar = soft ? uiText("-고 있어: ongoing state, casual speech (반말).", "‘-고 있어’는 이어지는 상태를 반말로 나타냅니다.") : uiText("-어: plain casual speech (반말) between friends.", "‘-어’는 친구 사이에서 편하게 쓰는 반말 어미입니다.")
    } else if (tone === "casual") {
      verb = soft ? "지내세요" : "지내요"
      grammar = soft ? uiText("-시-: honorific, then polite -어요 (해요체).", "높임 표현 ‘-시-’에 해요체 어미 ‘-어요’가 결합했습니다.") : uiText("-어요: polite everyday ending (해요체).", "‘-어요’는 일상에서 두루 쓰는 해요체 어미입니다.")
    } else {
      verb = soft ? "지내고 계신가요" : "지내십니까"
      grammar = soft ? uiText("-고 계시다 + -ㄴ가요: honorific, gently asked.", "‘-고 계시다’에 ‘-ㄴ가요’를 붙여 상대를 높이면서 부드럽게 묻습니다.") : uiText("-십니까: formal honorific question (하십시오체).", "‘-십니까’는 하십시오체로 상대를 높여 묻는 표현입니다.")
    }
    const end = has("Playful") ? (tone === "friends" ? "? ㅎㅎ" : tone === "casual" ? "~?" : "? :)") : "?"
    const today = has("Shorter") ? "" : "오늘 "
    const main = `${today}${q1} ${verb}${end}`
    en = (direct ? "Doing well" : "How are you doing") + (has("Shorter") ? "" : " today") + "?"
    const rows = []
    if (!has("Shorter")) rows.push({ phrase: "오늘", gloss: uiText("today", "말하는 바로 그날"), base: "오늘", grammar: uiText("Time noun, no particle needed.", "시간을 나타내는 명사로, 여기서는 조사 없이 씁니다.") })
    rows.push({
      phrase: `${q1} ${verb}`,
      gloss: direct ? uiText("doing well?", "잘 지내는지 묻는 말") : uiText("how are you doing?", "상대의 안부를 묻는 말"),
      base: soft && tone !== "friends" ? uiText("지내시다 (honorific of 지내다)", "지내시다(‘지내다’의 높임 표현)") : uiText("지내다 · to get along", "지내다 · 생활하다"),
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
              ? `<dl class="tl-facts"><div><dt>${uiText("In this sentence", "문장 속 의미")}</dt><dd>${r.gloss}</dd></div><div><dt>${uiText("Base form", "기본형")}</dt><dd lang="ko">${r.base}</dd></div><div><dt>${uiText("Grammar", "문법")}</dt><dd>${r.grammar}</dd></div></dl>`
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
        q("error").textContent = uiText("Adjustment failed: Translation failed.", "번역에 실패해 조정한 내용을 적용하지 못했습니다.")
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
