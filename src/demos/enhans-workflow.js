import { uiText } from "./demo-locale.js"
import { ehShell, ehControls, ehQuery, ehPlayback } from "./enhans-shared.js"

function markup() {
  return ehShell(
    uiText("AIAP visual workflow", "AIAP 시각적 워크플로"),
    `<div class="eh-head"><span class="eh-eyebrow">${uiText("AIAP / VISUAL WORKFLOWS", "AIAP / 시각적 워크플로")}</span></div>
      <div class="eh-flow" aria-label="${uiText("Workflow blocks", "워크플로 블록")}">${[uiText("Input", "입력"), uiText("Text Translation", "텍스트 번역"), uiText("Output", "출력")].map((name, i) => `<button type="button" class="eh-node" data-node="${i}" aria-pressed="${i === 1}"><span class="eh-node-port" aria-hidden="true"></span><span class="eh-eyebrow">${uiText("BLOCK", "블록")} 0${i + 1}</span><strong>${name}</strong><span class="eh-node-state">${uiText("pending", "대기 중")}</span><span class="eh-node-port out" aria-hidden="true"></span></button>${i < 2 ? '<span class="eh-wire" aria-hidden="true"><i></i>→</span>' : ""}`).join("")}</div>
      <div class="eh-split"><div class="eh-panel eh-form"><span class="eh-eyebrow">${uiText("FLOW SETTINGS", "워크플로 설정")}</span><label>${uiText("Sample input", "입력 예시")}<select data-eh="input" lang="en"><option value="meeting">The meeting starts at ten.</option><option value="delivery">Your order arrives tomorrow.</option></select></label><label>${uiText("Target language", "번역할 언어")}<select data-eh="language"><option value="ko">${uiText("Korean", "한국어")}</option><option value="fr">${uiText("French", "프랑스어")}</option></select></label><label class="eh-check"><input type="checkbox" data-eh="failure"> ${uiText("Simulate a translation error", "번역 오류 재현")}</label><p class="eh-footnote">${uiText("Pre-written translations · no model call", "미리 작성한 번역문을 사용합니다. 모델을 호출하지 않습니다.")}</p></div>
      <div class="eh-panel"><span class="eh-eyebrow">${uiText("BLOCK INSPECTOR", "블록 상세")}</span><h3 data-eh="node-title">${uiText("Text Translation", "텍스트 번역")}</h3><p data-eh="node-description"></p><pre class="eh-output" data-eh="output"></pre></div></div>${ehControls(uiText("Run workflow", "워크플로 실행"))}`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = ehQuery(root)
  let selected = 1,
    current = 0
  const samples = {
    meeting: { ko: "회의는 열 시에 시작합니다.", fr: "La réunion commence à dix heures." },
    delivery: { ko: "주문하신 상품은 내일 도착합니다.", fr: "Votre commande arrive demain." },
  }
  const inputText = () => q("input").selectedOptions[0].textContent
  function inspect() {
    q("node-title").textContent = [uiText("Input", "입력"), uiText("Text Translation", "텍스트 번역"), uiText("Output", "출력")][selected]
    q("node-description").textContent = [
      uiText("Supplies the sample text to the next connected block.", "예시 문장을 다음 블록에 전달합니다."),
      uiText("Uses the previous block’s output and the selected target language.", "이전 블록에서 받은 문장을 선택한 언어로 번역합니다."),
      uiText("Receives the translation when the preceding block completes.", "이전 블록의 처리가 끝나면 번역문을 받습니다."),
    ][selected]
    q("output").textContent =
      selected === 0
        ? inputText()
        : q("failure").checked && current >= 3
          ? uiText("No output · translation failed", "번역에 실패해 출력이 없습니다.")
          : current >= (selected === 1 ? 3 : 4)
            ? samples[q("input").value][q("language").value]
            : uiText("Output will appear here.", "실행 결과가 여기에 표시됩니다.")
    q("output").lang = selected === 0 ? "en" : !q("failure").checked && current >= (selected === 1 ? 3 : 4) ? q("language").value : document.documentElement.lang
    root.querySelectorAll("[data-node]").forEach((el, i) => el.setAttribute("aria-pressed", String(i === selected)))
  }
  const player = ehPlayback(root, {
    label: uiText("Run workflow", "워크플로 실행"),
    length: () => (q("failure").checked ? 3 : 4),
    draw(step) {
      current = step
      const failed = q("failure").checked && step >= 3
      const states = [
        step ? "completed" : "pending",
        failed ? "error" : step >= 3 ? "completed" : step >= 2 ? "processing" : "pending",
        !failed && step >= 4 ? "completed" : !failed && step === 3 ? "processing" : "pending",
      ]
      root.querySelectorAll("[data-node]").forEach((el, i) => {
        el.dataset.state = states[i]
        el.querySelector(".eh-node-state").textContent = uiText(states[i], { completed: "완료", pending: "대기 중", processing: "처리 중", error: "오류" }[states[i]])
      })
      root
        .querySelectorAll(".eh-wire")
        .forEach((el, i) => el.classList.toggle("is-active", step > i && step < 4 && !failed))
      q("status").textContent = failed
        ? uiText("Translation failed · uncheck the error and run again", "번역에 실패했습니다. 오류 재현을 해제하고 다시 실행하세요.")
        : step === 4
          ? uiText("Completed · output received", "완료 · 번역문을 받았습니다.")
          : step
            ? uiText("Processing connected blocks", "연결된 블록을 처리하는 중입니다.")
            : uiText("Ready to explore", "실행할 준비가 됐습니다.")
      inspect()
    },
  })
  root.querySelectorAll("[data-node]").forEach((el) =>
    el.addEventListener("click", () => {
      selected = Number(el.dataset.node)
      inspect()
    }),
  )
  // Settings feed the run, so a change clears it; say so instead of silently wiping the result.
  ;["input", "language", "failure"].forEach((key) =>
    q(key).addEventListener("change", () => {
      const ran = current > 0
      player.reset()
      if (ran) q("status").textContent = uiText("Settings changed · run the workflow again", "설정이 바뀌었습니다. 워크플로를 다시 실행하세요.")
    }),
  )
  return player.cleanup
}
