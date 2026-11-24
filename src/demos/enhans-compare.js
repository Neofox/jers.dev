import { motionEnabled } from "./shared.js"
import { ehShell, ehControls, ehQuery, ehPlayback } from "./enhans-shared.js"

function markup() {
  return ehShell(
    "Select LLM comparison",
    `<div class="eh-head"><span class="eh-eyebrow">SELECT LLM / EXPERIMENTS</span></div>
      <div class="eh-experiment"><div><span class="eh-eyebrow">INSTRUCTION</span><p>Summarize this delivery update in one short sentence.</p><blockquote>Order dispatched today. Estimated arrival: Thursday. Tracking becomes available this evening.</blockquote></div><fieldset><legend>Fictional models</legend>${["A", "B", "C"].map((name) => `<label class="eh-check"><input type="checkbox" data-model="${name}" checked> Model ${name}</label>`).join("")}</fieldset></div>
      <div class="eh-results" data-eh="results"></div><details class="eh-evaluation" data-eh="evaluation" hidden><summary>Sample evaluation · why this order?</summary><p>Model B keeps the dispatch, arrival and tracking details in one sentence. Model A omits tracking; Model C is less concise. This is an authored example, not an actual model benchmark.</p></details>${ehControls("Run comparison")}<p class="eh-footnote">Pre-written outputs, fictional model names and invented price/latency figures.</p>`,
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
      output: ["Your order shipped today and should arrive Thursday.", "Dispatched today; expected Thursday."],
    },
    B: {
      price: "$0.004",
      latency: "1,240 ms",
      output: [
        "Your order shipped today, arrives Thursday, and can be tracked this evening.",
        "Expect Thursday delivery for today’s shipment, with tracking available tonight.",
      ],
    },
    C: {
      price: "$0.001",
      latency: "640 ms",
      output: [
        "Your order has been dispatched today. It is expected on Thursday. Tracking will be available this evening.",
        "The parcel is on its way; Thursday is the estimated arrival date, and tracking opens this evening.",
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
            return `<article class="eh-result" data-model-card="${name}" data-state="${loaded ? "completed" : "pending"}"${ranked ? ` data-rank="${i + 1}"` : ""}><div class="eh-result-title"><strong>Model ${name}</strong><span>${ranked ? `Best ${i + 1}` : loaded ? "Ready" : step ? "Processing…" : "Waiting"}</span></div>${loaded ? `<div class="eh-variants" role="group" aria-label="Model ${name} outputs">${[0, 1].map((v) => `<button type="button" data-variant="${name}-${v}" aria-pressed="${variants[name] === v}">Output 0${v + 1}</button>`).join("")}${ranked && variants[name] !== 0 ? '<span class="eh-ranked-on">Ranked on Output 01</span>' : ""}</div><p>${record.output[variants[name]]}</p><div class="eh-metrics"><span>Price <b>${record.price}</b></span><span>Latency <b>${record.latency}</b></span></div>` : '<div class="eh-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>'}</article>`
          })
          .join("")
      : '<p class="eh-empty">Select at least one model to run the experiment.</p>'
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
        ? "Only one candidate is selected; there is no cross-model comparison. "
        : "Sample order: " + order.map((m) => "Model " + m).join(" → ") + ". ") +
      models
        .map(
          (m) =>
            ({
              A: "Model A’s first output omits tracking.",
              B: "Model B’s first output keeps all three details in one sentence.",
              C: "Model C’s first output keeps the details but uses three sentences.",
            })[m],
        )
        .join(" ") +
      " This authored evaluation uses Output 01; it is not an actual model benchmark."
    q("play").disabled = !models.length
    q("status").textContent = ranked
      ? "Sample ranking · on Output 01"
      : step
        ? `${Math.min(step, models.length)} / ${models.length} results received`
        : "Ready to compare"
  }
  const player = ehPlayback(root, {
    label: "Run comparison",
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
