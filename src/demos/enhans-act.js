import { uiText } from "./demo-locale.js"
import { ehShell, ehControls, ehQuery, ehPlayback } from "./enhans-shared.js"

function markup() {
  return ehShell(
    uiText("ACT-1 task execution", "ACT-1 작업 실행"),
    `<div class="eh-head"><span class="eh-eyebrow">${uiText("ACT-1 / WEB AGENT", "ACT-1 / 웹 에이전트")}</span></div>
      <div class="eh-split"><div class="eh-panel eh-act-panel"><div class="eh-message"><span>${uiText("You", "나")}</span><p>${uiText("Find a compact desk lamp under $80. Compare three options.", "80달러 미만인 작은 책상 조명 세 가지를 찾아서 비교해 줘.")}</p></div>
        <div class="eh-task-state"><span class="eh-dot" data-eh="dot"></span><b data-eh="activity">${uiText("Waiting for your instruction", "요청 대기 중")}</b><span data-eh="count">0 / 4</span></div>
        <div class="eh-log">${[uiText("Open the catalog", "제품 목록 열기"), uiText("Apply the budget", "가격 조건 적용"), uiText("Compare the options", "후보 비교"), uiText("Summarize the findings", "비교 결과 정리")].map((label, i) => `<details data-act-step="${i}"><summary><span class="eh-step-number">0${i + 1}</span><b>${label}</b><span class="eh-step-state">${uiText("Pending", "대기 중")}</span><span class="eh-chevron" aria-hidden="true"></span></summary><p>${uiText("Not run yet.", "아직 실행하지 않았습니다.")}</p></details>`).join("")}</div>
        <p class="eh-answer" data-eh="answer" data-state="pending">${uiText("The result appears here when the task completes.", "작업이 끝나면 여기에 결과가 표시됩니다.")}</p></div>
        <div class="eh-browser"><div class="eh-browser-bar"><span aria-hidden="true">● ● ●</span><span>studio.example / lighting</span></div><div class="eh-browser-body"><span class="eh-eyebrow">${uiText("SAMPLE STOREFRONT", "예시 쇼핑몰")}</span><h3>${uiText("A brighter workspace.", "내 책상을 밝혀 줄 조명")}</h3><div class="eh-budget" data-eh="budget">${uiText("All desk lamps", "책상 조명 전체")}</div><div class="eh-products">${[
          ["Loop", "58", "loop"],
          ["Fold", "72", "fold"],
          ["Pebble", "64", "pebble"],
          ["Arc", "96", "arc"],
        ]
          .map(
            ([name, price, shape], i) =>
              `<div class="eh-product" data-product="${i}"><div class="eh-lamp ${shape}" aria-hidden="true"><i></i><b></b></div><strong>${name}</strong><span>$${price}</span><em class="eh-over" hidden>${uiText("Over $80", "80달러 초과")}</em></div>`,
          )
          .join(
            "",
          )}</div><div class="eh-snapshot" data-eh="snapshot">${uiText("Illustrated browser view · no real website is opened", "브라우저 화면을 재현한 예시입니다. 실제 사이트에는 접속하지 않습니다.")}</div></div></div></div>${ehControls(uiText("Run sample task", "예시 작업 실행"))}`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = ehQuery(root)
  const player = ehPlayback(root, {
    label: uiText("Run sample task", "예시 작업 실행"),
    length: () => 4,
    draw(step) {
      // Each step is a finished action, so the progress line reports what just happened.
      const labels = [uiText("Waiting for your instruction", "요청 대기 중"), uiText("Catalog opened", "제품 목록을 열었습니다."), uiText("Budget applied", "가격 조건을 적용했습니다."), uiText("Options compared", "세 가지 조명을 비교했습니다."), uiText("Task completed", "작업을 마쳤습니다.")]
      const details = [
        uiText("Navigated to the sample lighting catalog and inspected the available products.", "예시 쇼핑몰의 조명 목록을 열고 상품을 확인했습니다."),
        uiText("Set the maximum price to $80. The $96 Arc lamp is excluded.", "최고가를 80달러로 설정했습니다. 96달러인 Arc는 제외했습니다."),
        uiText("Read the price and size of each remaining lamp and compared the three candidates.", "남은 조명 세 개의 가격과 크기를 확인해 비교했습니다."),
        uiText("Returned a short recommendation with the compared prices.", "세 조명의 가격을 정리하고 하나를 추천했습니다."),
      ]
      q("activity").textContent = labels[step]
      // The in-panel line and counter carry progress; the footer only speaks for start and completion
      // (it stays in the accessibility tree as the live status).
      q("status").textContent =
        step === 4 ? uiText("Completed · sample recommendation", "완료 · 예시 추천 결과") : step ? uiText(`Step ${step} of 4 · ${labels[step]}`, `전체 4단계 중 ${step}단계 · ${labels[step]}`) : uiText("Ready to explore", "실행할 준비가 됐습니다.")
      q("status").classList.toggle("eh-status-quiet", step > 0 && step < 4)
      q("count").textContent = `${step} / 4`
      q("dot").dataset.state = step === 4 ? "completed" : step ? "processing" : "pending"
      root.querySelectorAll("[data-act-step]").forEach((el, i) => {
        const state = i < step ? "completed" : i === step ? "next" : "pending"
        el.dataset.state = state
        el.querySelector(".eh-step-state").textContent = { completed: uiText("Done", "완료"), next: uiText("Next", "다음"), pending: uiText("Pending", "대기 중") }[state]
        el.querySelector("p").textContent = i < step ? details[i] : uiText("Not run yet.", "아직 실행하지 않았습니다.")
      })
      q("budget").textContent = step >= 2 ? uiText("Budget ≤ $80 · 3 of 4 match", "80달러 이하 · 상품 4개 중 3개") : uiText("All desk lamps", "책상 조명 전체")
      const arc = root.querySelector('[data-product="3"]')
      arc.classList.toggle("is-excluded", step >= 2)
      arc.querySelector(".eh-over").hidden = step < 2
      root
        .querySelectorAll("[data-product]")
        .forEach((el, i) => el.classList.toggle("is-picked", step >= 3 && i === 0))
      q("snapshot").textContent = [
        uiText("Illustrated browser view · no real website is opened", "브라우저 화면을 재현한 예시입니다. 실제 사이트에는 접속하지 않습니다."),
        uiText("Snapshot 01 · catalog opened", "화면 01 · 제품 목록 열기"),
        uiText("Snapshot 02 · budget applied", "화면 02 · 가격 조건 적용"),
        uiText("Snapshot 03 · options compared", "화면 03 · 후보 비교"),
        uiText("Final view · Loop selected for the sample recommendation", "최종 화면 · 추천 제품으로 Loop 선택"),
      ][step]
      q("answer").dataset.state = step === 4 ? "completed" : "pending"
      q("answer").textContent =
        step === 4
          ? uiText("Loop is the lowest-priced option at $58. Fold ($72) and Pebble ($64) also fit the budget. All products and findings are fictional.", "Loop가 58달러로 가장 저렴합니다. Fold(72달러)와 Pebble(64달러)도 예산 안에 들어옵니다. 모두 데모를 위해 만든 상품과 비교 결과입니다.")
          : uiText("The result appears here when the task completes.", "작업이 끝나면 여기에 결과가 표시됩니다.")
    },
  })
  return player.cleanup
}
