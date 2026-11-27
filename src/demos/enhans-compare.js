import { uiText } from "./demo-locale.js"
import { motionEnabled } from "./shared.js"
import { ehShell, ehControls, ehQuery, ehPlayback } from "./enhans-shared.js"

function markup() {
  return ehShell(
    uiText("Select LLM comparison", "Select LLM 모델 비교"),
    `<div class="eh-head"><span class="eh-eyebrow">${uiText("SELECT LLM / EXPERIMENTS", "Select LLM / 실험")}</span></div>
      <div class="eh-experiment"><div><span class="eh-eyebrow">${uiText("INSTRUCTION", "요청")}</span><p>${uiText("Summarize this delivery update in one short sentence.", "다음 배송 안내를 짧은 한 문장으로 요약해 줘.")}</p><blockquote>${uiText("Order dispatched today. Estimated arrival: Thursday. Tracking becomes available this evening.", "상품을 오늘 발송했습니다. 목요일 도착 예정이며, 오늘 저녁부터 배송을 조회할 수 있습니다.")}</blockquote></div><fieldset><legend>${uiText("Fictional models", "가상 모델")}</legend>${["A", "B", "C"].map((name) => `<label class="eh-check"><input type="checkbox" data-model="${name}" checked> ${uiText("Model", "모델")} ${name}</label>`).join("")}</fieldset></div>
      <div class="eh-results" data-eh="results"></div><details class="eh-evaluation" data-eh="evaluation" hidden><summary>${uiText("Sample evaluation · why this order?", "예시 평가 · 순위는 어떻게 정했나요?")}</summary><p>${uiText("Model B keeps the dispatch, arrival and tracking details in one sentence. Model A omits tracking; Model C is less concise. This is an authored example, not an actual model benchmark.", "모델 B는 발송일, 도착일, 배송 조회 시점을 한 문장에 담았습니다. 모델 A는 조회 시점을 빠뜨렸고 모델 C는 답이 더 깁니다. 이 평가는 데모용으로 작성한 예시입니다.")}</p></details>${ehControls(uiText("Run comparison", "비교 실행"))}<p class="eh-footnote">${uiText("Pre-written outputs, fictional model names and invented price/latency figures.", "응답을 미리 작성했으며 모델 이름과 비용, 응답 시간은 모두 예시입니다.")}</p>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = ehQuery(root)
  const records = {
    A: {
      price: "$0.002",
      latency: "820 ms",
      output: [uiText("Your order shipped today and should arrive Thursday.", "주문하신 상품은 오늘 발송했으며 목요일에 도착할 예정입니다."), uiText("Dispatched today; expected Thursday.", "오늘 발송, 목요일 도착 예정입니다.")],
    },
    B: {
      price: "$0.004",
      latency: "1,240 ms",
      output: [
        uiText("Your order shipped today, arrives Thursday, and can be tracked this evening.", "오늘 발송한 상품은 목요일 도착 예정이며, 오늘 저녁부터 배송 조회가 가능합니다."),
        uiText("Expect Thursday delivery for today’s shipment, with tracking available tonight.", "오늘 발송한 상품은 목요일에 도착할 예정이고 배송 조회는 오늘 밤부터 가능합니다."),
      ],
    },
    C: {
      price: "$0.001",
      latency: "640 ms",
      output: [
        uiText("Your order has been dispatched today. It is expected on Thursday. Tracking will be available this evening.", "주문하신 상품을 오늘 발송했습니다. 목요일에 도착할 예정입니다. 오늘 저녁부터 배송을 조회할 수 있습니다."),
        uiText("The parcel is on its way; Thursday is the estimated arrival date, and tracking opens this evening.", "배송 중인 상품은 목요일에 도착할 예정이며 오늘 저녁부터 배송을 조회할 수 있습니다."),
      ],
    },
  }
  const variants = { A: 0, B: 0, C: 0 }
  const selected = () => [...root.querySelectorAll("[data-model]:checked")].map((el) => el.dataset.model)
  let current = 0,
    wasRanked = false
  function results(step) {
    const models = selected()
    const ranked = models.length > 0 && step > models.length
    // The authored evaluation judges Output 01, so the ranking reveal shows exactly what was ranked.
    if (ranked && !wasRanked) Object.keys(variants).forEach((m) => (variants[m] = 0))
    const reordered = ranked !== wasRanked
    wasRanked = ranked
    const order = ranked ? ["B", "A", "C"].filter((m) => models.includes(m)) : models
    const focus = document.activeElement?.dataset.variant
    const before = new Map(
      [...q("results").querySelectorAll("[data-model-card]")].map((el) => [el.dataset.modelCard, el.getBoundingClientRect()]),
    )
    q("results").innerHTML = order.length
      ? order
          .map((name, i) => {
            const loaded = step > models.indexOf(name)
            const record = records[name]
            return `<article class="eh-result" data-model-card="${name}" data-state="${loaded ? "completed" : "pending"}"${ranked ? ` data-rank="${i + 1}"` : ""}><div class="eh-result-title"><strong>${uiText("Model", "모델")} ${name}</strong><span>${ranked ? uiText(`Best ${i + 1}`, `${i + 1}위`) : loaded ? uiText("Ready", "준비 완료") : step ? uiText("Processing…", "처리 중…") : uiText("Waiting", "대기 중")}</span></div>${loaded ? `<div class="eh-variants" role="group" aria-label="${uiText(`Model ${name} outputs`, `모델 ${name} 응답`)}">${[0, 1].map((v) => `<button type="button" data-variant="${name}-${v}" aria-pressed="${variants[name] === v}">${uiText("Output", "응답")} 0${v + 1}</button>`).join("")}${ranked && variants[name] !== 0 ? `<span class="eh-ranked-on">${uiText("Ranked on Output 01", "첫 번째 응답 기준 순위")}</span>` : ""}</div><p>${record.output[variants[name]]}</p><div class="eh-metrics"><span>${uiText("Price", "비용")} <b>${record.price}</b></span><span>${uiText("Latency", "응답 시간")} <b>${record.latency}</b></span></div>` : '<div class="eh-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>'}</article>`
          })
          .join("")
      : `<p class="eh-empty">${uiText("Select at least one model to run the experiment.", "실험할 모델을 하나 이상 선택하세요.")}</p>`
    // Slide cards into their ranked order so the reshuffle can be followed (instant when motion is off).
    if (reordered && motionEnabled())
      q("results")
        .querySelectorAll("[data-model-card]")
        .forEach((el) => {
          const from = before.get(el.dataset.modelCard)
          if (!from) return
          const to = el.getBoundingClientRect()
          const dx = from.left - to.left,
            dy = from.top - to.top
          if (dx || dy)
            el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
              duration: 420,
              easing: "cubic-bezier(.2,.7,.2,1)",
            })
        })
    if (focus) q("results").querySelector(`[data-variant="${focus}"]`)?.focus({ preventScroll: true })
    q("evaluation").hidden = !ranked
    q("evaluation").querySelector("p").textContent =
      (models.length === 1
        ? uiText("Only one candidate is selected; there is no cross-model comparison. ", "모델을 하나만 선택해 다른 모델과 비교할 수 없습니다. ")
        : uiText("Sample order: ", "예시 순위: ") + order.map((m) => uiText("Model ", "모델 ") + m).join(" → ") + ". ") +
      models
        .map(
          (m) =>
            ({
              A: uiText("Model A’s first output omits tracking.", "모델 A의 첫 번째 응답에는 배송 조회 시점이 빠졌습니다."),
              B: uiText("Model B’s first output keeps all three details in one sentence.", "모델 B의 첫 번째 응답은 세 가지 정보를 모두 한 문장에 담았습니다."),
              C: uiText("Model C’s first output keeps the details but uses three sentences.", "모델 C의 첫 번째 응답은 정보를 모두 담았지만 세 문장으로 나누었습니다."),
            })[m],
        )
        .join(" ") +
      uiText(" This authored evaluation uses Output 01; it is not an actual model benchmark.", " 첫 번째 응답을 바탕으로 작성한 예시 평가입니다.")
    q("play").disabled = !models.length
    q("status").textContent = ranked
      ? uiText("Sample ranking · on Output 01", "예시 순위 · 첫 번째 응답 기준")
      : step
        ? uiText(`${Math.min(step, models.length)} / ${models.length} results received`, `응답 ${models.length}개 중 ${Math.min(step, models.length)}개 도착`)
        : uiText("Ready to compare", "비교할 준비가 됐습니다.")
  }
  const player = ehPlayback(root, {
    label: uiText("Run comparison", "비교 실행"),
    length: () => (selected().length ? selected().length + 1 : 0),
    draw(step) {
      current = step
      results(step)
    },
  })
  root.querySelectorAll("[data-model]").forEach((el) =>
    el.addEventListener("change", () => {
      q("evaluation").open = false
      player.reset()
    }),
  )
  q("results").addEventListener("click", (event) => {
    const button = event.target.closest("[data-variant]")
    if (!button) return
    const [model, variant] = button.dataset.variant.split("-")
    variants[model] = Number(variant)
    results(current)
  })
  return player.cleanup
}
