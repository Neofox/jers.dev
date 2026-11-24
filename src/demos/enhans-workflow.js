import { ehShell, ehControls, ehQuery, ehPlayback } from "./enhans-shared.js"

function markup() {
  return ehShell(
    "AIAP visual workflow",
    `<div class="eh-head"><span class="eh-eyebrow">AIAP / VISUAL WORKFLOWS</span></div>
      <div class="eh-flow" aria-label="Workflow blocks">${["Input", "Text Translation", "Output"].map((name, i) => `<button type="button" class="eh-node" data-node="${i}" aria-pressed="${i === 1}"><span class="eh-node-port" aria-hidden="true"></span><span class="eh-eyebrow">BLOCK 0${i + 1}</span><strong>${name}</strong><span class="eh-node-state">pending</span><span class="eh-node-port out" aria-hidden="true"></span></button>${i < 2 ? '<span class="eh-wire" aria-hidden="true"><i></i>→</span>' : ""}`).join("")}</div>
      <div class="eh-split"><div class="eh-panel eh-form"><span class="eh-eyebrow">FLOW SETTINGS</span><label>Sample input<select data-eh="input"><option value="meeting">The meeting starts at ten.</option><option value="delivery">Your order arrives tomorrow.</option></select></label><label>Target language<select data-eh="language"><option value="ko">Korean</option><option value="fr">French</option></select></label><label class="eh-check"><input type="checkbox" data-eh="failure"> Simulate a translation error</label><p class="eh-footnote">Pre-written translations · no model call</p></div>
      <div class="eh-panel"><span class="eh-eyebrow">BLOCK INSPECTOR</span><h4 data-eh="node-title">Text Translation</h4><p data-eh="node-description"></p><pre class="eh-output" data-eh="output"></pre></div></div>${ehControls("Run workflow")}`,
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
    q("node-title").textContent = ["Input", "Text Translation", "Output"][selected]
    q("node-description").textContent = [
      "Supplies the sample text to the next connected block.",
      "Uses the previous block’s output and the selected target language.",
      "Receives the translation when the preceding block completes.",
    ][selected]
    q("output").textContent =
      selected === 0
        ? inputText()
        : q("failure").checked && current >= 3
          ? "No output · translation failed"
          : current >= (selected === 1 ? 3 : 4)
            ? samples[q("input").value][q("language").value]
            : "Output will appear here."
    root.querySelectorAll("[data-node]").forEach((el, i) => el.setAttribute("aria-pressed", String(i === selected)))
  }
  const player = ehPlayback(root, {
    label: "Run workflow",
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
        el.querySelector(".eh-node-state").textContent = states[i]
      })
      root
        .querySelectorAll(".eh-wire")
        .forEach((el, i) => el.classList.toggle("is-active", step > i && step < 4 && !failed))
      q("status").textContent = failed
        ? "Translation failed · uncheck the error and run again"
        : step === 4
          ? "Completed · output received"
          : step
            ? "Processing connected blocks"
            : "Ready to explore"
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
      if (ran) q("status").textContent = "Settings changed · run the workflow again"
    }),
  )
  return player.cleanup
}
