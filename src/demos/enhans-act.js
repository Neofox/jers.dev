import { ehShell, ehControls, ehQuery, ehPlayback } from "./enhans-shared.js"

function markup() {
  return ehShell(
    "ACT-1 task execution",
    `<div class="eh-head"><span class="eh-eyebrow">ACT-1 / WEB AGENT</span></div>
      <div class="eh-split"><div class="eh-panel eh-act-panel"><div class="eh-message"><span>You</span><p>Find a compact desk lamp under $80. Compare three options.</p></div>
        <div class="eh-task-state"><span class="eh-dot" data-eh="dot"></span><b data-eh="activity">Waiting for your instruction</b><span data-eh="count">0 / 4</span></div>
        <div class="eh-log">${["Open the catalog", "Apply the budget", "Compare the options", "Summarize the findings"].map((label, i) => `<details data-act-step="${i}"><summary><span class="eh-step-number">0${i + 1}</span><b>${label}</b><span class="eh-step-state">Pending</span><span class="eh-chevron" aria-hidden="true"></span></summary><p>Not run yet.</p></details>`).join("")}</div>
        <p class="eh-answer" data-eh="answer" data-state="pending">The result appears here when the task completes.</p></div>
        <div class="eh-browser"><div class="eh-browser-bar"><span aria-hidden="true">● ● ●</span><span>studio.example / lighting</span></div><div class="eh-browser-body"><span class="eh-eyebrow">SAMPLE STOREFRONT</span><h4>A brighter workspace.</h4><div class="eh-budget" data-eh="budget">All desk lamps</div><div class="eh-products">${[
          ["Loop", "58", "loop"],
          ["Fold", "72", "fold"],
          ["Pebble", "64", "pebble"],
          ["Arc", "96", "arc"],
        ]
          .map(
            ([name, price, shape], i) =>
              `<div class="eh-product" data-product="${i}"><div class="eh-lamp ${shape}" aria-hidden="true"><i></i><b></b></div><strong>${name}</strong><span>$${price}</span><em class="eh-over" hidden>Over $80</em></div>`,
          )
          .join(
            "",
          )}</div><div class="eh-snapshot" data-eh="snapshot">Illustrated browser view · no real website is opened</div></div></div></div>${ehControls("Run sample task")}`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = ehQuery(root)
  const player = ehPlayback(root, {
    label: "Run sample task",
    length: () => 4,
    draw(step) {
      // Each step is a finished action, so the progress line reports what just happened.
      const labels = ["Waiting for your instruction", "Catalog opened", "Budget applied", "Options compared", "Task completed"]
      const details = [
        "Navigated to the sample lighting catalog and inspected the available products.",
        "Set the maximum price to $80. The $96 Arc lamp is excluded.",
        "Read the price and size of each remaining lamp and compared the three candidates.",
        "Returned a short recommendation with the compared prices.",
      ]
      q("activity").textContent = labels[step]
      // The in-panel line and counter carry progress; the footer only speaks for start and completion
      // (it stays in the accessibility tree as the live status).
      q("status").textContent =
        step === 4 ? "Completed · sample recommendation" : step ? `Step ${step} of 4 · ${labels[step]}` : "Ready to explore"
      q("status").classList.toggle("eh-status-quiet", step > 0 && step < 4)
      q("count").textContent = `${step} / 4`
      q("dot").dataset.state = step === 4 ? "completed" : step ? "processing" : "pending"
      root.querySelectorAll("[data-act-step]").forEach((el, i) => {
        const state = i < step ? "completed" : i === step ? "next" : "pending"
        el.dataset.state = state
        el.querySelector(".eh-step-state").textContent = { completed: "Done", next: "Next", pending: "Pending" }[state]
        el.querySelector("p").textContent = i < step ? details[i] : "Not run yet."
      })
      q("budget").textContent = step >= 2 ? "Budget ≤ $80 · 3 of 4 match" : "All desk lamps"
      const arc = root.querySelector('[data-product="3"]')
      arc.classList.toggle("is-excluded", step >= 2)
      arc.querySelector(".eh-over").hidden = step < 2
      root
        .querySelectorAll("[data-product]")
        .forEach((el, i) => el.classList.toggle("is-picked", step >= 3 && i === 0))
      q("snapshot").textContent = [
        "Illustrated browser view · no real website is opened",
        "Snapshot 01 · catalog opened",
        "Snapshot 02 · budget applied",
        "Snapshot 03 · options compared",
        "Final view · Loop selected for the sample recommendation",
      ][step]
      q("answer").dataset.state = step === 4 ? "completed" : "pending"
      q("answer").textContent =
        step === 4
          ? "Loop is the lowest-priced option at $58. Fold ($72) and Pebble ($64) also fit the budget. All products and findings are fictional."
          : "The result appears here when the task completes."
    },
  })
  return player.cleanup
}
