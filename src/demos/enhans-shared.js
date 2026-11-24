import { demoShell, motionEnabled } from "./shared.js"

// Enhans demos re-create observed interactions with invented data. See docs/work-demos-evidence.md.
export const ehEscape = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])
export const ehQuery = (root) => (key) => root.querySelector(`[data-eh="${key}"]`)
// The body gets its own block so the sticky phone controls can never ride up over the demo header (Restart).
export const ehShell = (label, body) => demoShell("enhans", label, `<div class="eh-body">${body}</div>`)
export function ehControls(label) {
  return `<div class="eh-controls"><button type="button" class="button button-primary" data-eh="play">${label}</button><button type="button" class="button button-outline" data-eh="next">Next step</button><span data-eh="status" role="status">Ready to explore</span></div>`
}
// Shared stepper. With motion on: Run/Pause/Continue/Replay + Next step. With motion off the run button would only
// repeat Next step, so it is hidden until Replay. Next stays focusable at the end (aria-disabled), so keyboard focus
// never drops to <body> and an extra Enter cannot restart the demo; focus only moves when Run itself is hidden.
export function ehPlayback(root, { label, length, draw }) {
  const q = ehQuery(root)
  let step = 0,
    timer = null
  function paint() {
    const had = document.activeElement
    draw(step)
    const total = length()
    const done = total > 0 && step >= total
    q("play").textContent = timer ? "Pause" : done ? "Replay" : step ? "Continue" : label
    q("play").hidden = !motionEnabled() && !done
    q("next").setAttribute("aria-disabled", String(!total || done))
    if (had === q("play") && q("play").hidden) q("next").focus()
  }
  function stop() {
    clearTimeout(timer)
    timer = null
  }
  function advance(auto) {
    stop()
    step = Math.min(step + 1, length())
    if (auto && motionEnabled() && !document.hidden && step < length()) {
      timer = setTimeout(() => advance(motionEnabled() && !document.hidden), 1100)
    }
    paint()
  }
  q("play").addEventListener("click", () => {
    if (timer) {
      stop()
      paint()
      return
    }
    if (step >= length()) step = 0
    advance(true)
  })
  q("next").addEventListener("click", () => {
    if (step < length()) advance(false)
  })
  // Pause when hidden, off the Work stage or when motion is turned off; repaint either way so the run button
  // reappears as soon as motion is enabled again.
  const suspend = () => {
    if (document.hidden || document.body.dataset.stage !== "work" || !motionEnabled()) stop()
    paint()
  }
  document.addEventListener("visibilitychange", suspend)
  const observer = new MutationObserver(suspend)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] })
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-stage"] })
  paint()
  return {
    reset() {
      stop()
      step = 0
      paint()
    },
    cleanup() {
      stop()
      observer.disconnect()
      document.removeEventListener("visibilitychange", suspend)
    },
  }
}
