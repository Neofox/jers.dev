const lastStudyKey = "jers.lastStudy"
let currentStudy

function track(name, properties) {
  const send = () => window.rybbit?.event?.(name, { ...properties, locale: document.documentElement.lang })
  if (window.rybbit) send()
  else if (document.readyState !== "complete") {
    document.querySelector("script[data-site-id]")?.addEventListener("load", send, { once: true })
  }
}

function recordStudyView(project) {
  try {
    sessionStorage.setItem(lastStudyKey, project)
  } catch { /* Storage can be disabled. */ }
  track("case_study_open", { project })
}

export function selectAnalyticsStudy(project) {
  if (project === currentStudy) return
  currentStudy = project
  if (project) recordStudyView(project)
}

window.addEventListener("pageshow", event => {
  if (event.persisted && currentStudy) recordStudyView(currentStudy)
})

// Install after a successful launch. Listeners survive a demo restart until
// the first control is used, even when that control replaces itself on click.
export function watchDemoInteraction(stage) {
  const listeners = new AbortController()
  function interacted() {
    listeners.abort()
    track("demo_first_interaction", { project: stage.closest("[data-case-study]").dataset.caseStudy })
  }
  const capture = { capture: true, signal: listeners.signal }
  stage.addEventListener("click", event => {
    const control = event.target.closest("button, input, select, textarea, summary, a[href], [role=button], [role=application]")
    if (control && !control.matches(":disabled, [data-demo-reset]")) interacted()
  }, capture)
  stage.addEventListener("input", interacted, capture)
  stage.addEventListener("change", interacted, capture)
  // The 3D viewer also handles keyboard navigation and number-key tools directly.
  stage.addEventListener("keydown", event => {
    if (event.target.matches("[role=application]") && (event.defaultPrevented || ["1", "2", "3"].includes(event.key))) interacted()
  }, { signal: listeners.signal })
}

export function watchContactLinks(dialog) {
  function activated(event) {
    if (event.type === "auxclick" && event.button !== 1) return
    const channel = event.target.closest("a[data-contact-channel]")?.dataset.contactChannel
    if (!channel) return
    let project = currentStudy
    try {
      project ??= sessionStorage.getItem(lastStudyKey)
    } catch { /* A direct contact click needs no project attribution. */ }
    track("contact_click", project ? { channel, project } : { channel })
  }
  dialog.addEventListener("click", activated)
  dialog.addEventListener("auxclick", activated)
}
