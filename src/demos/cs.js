import { demoShell } from "./shared.js"

function markup() {
  return demoShell("cs", "Pivo CS report triage", `
    <div class="eh-panel eh-form" data-cs-queue>
      <h4>CS reports</h4>
      <div class="eh-controls" role="group" aria-label="Filter reports by status" data-cs-filters></div>
      <div data-cs-list></div>
    </div>
    <section class="eh-panel eh-form" data-cs-report hidden></section>
    <span class="sr-only" role="status" data-cs-notice></span>`)
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const statuses = ["Unresolved", "Pending", "On Hold", "Resolved"]
  const reports = [
    ["DEMO-104", "Preview freezes after rotation", "Video", "Android tablet", "Unresolved", "Rotating the tablet during playback leaves the preview on its last frame."],
    ["DEMO-103", "Pairing takes a second attempt", "Connection", "iPhone", "Pending", "The sample pod connects on the second attempt after waking from sleep."],
    ["DEMO-102", "Gallery thumbnail stays blank", "Gallery", "Android phone", "On Hold", "A new clip appears in the library before its thumbnail is available."],
    ["DEMO-101", "Lesson timer overlaps the controls", "Lessons", "iPad", "Resolved", "In landscape orientation the elapsed time overlapped the mute control."],
  ].map(([id, title, category, device, status, summary]) => ({ id, title, category, device, status, summary, notes: [] }))
  const queue = root.querySelector("[data-cs-queue]")
  const filters = root.querySelector("[data-cs-filters]")
  const list = root.querySelector("[data-cs-list]")
  const panel = root.querySelector("[data-cs-report]")
  const notice = root.querySelector("[data-cs-notice]")
  let filter = "All"
  let selected = null
  function renderQueue() {
    for (const button of filters.children) {
      const key = button.dataset.csFilter
      const count = reports.filter(r => key === "All" || r.status === key).length
      button.textContent = key + " (" + count + ")"
      button.setAttribute("aria-pressed", String(key === filter))
      button.className = key === filter ? "button button-primary" : "button button-outline"
    }
    const visible = reports.filter(r => filter === "All" || r.status === filter)
    list.innerHTML = visible.map(r => `<button type="button" class="eh-trace-item" data-report="${r.id}"><span>${r.id}</span><span><b>${r.title}</b><small>${r.category} · ${r.status}</small></span></button>`).join("") || "<p>No reports with this status.</p>"
  }
  function backToQueue() {
    panel.hidden = true
    panel.replaceChildren()
    queue.hidden = false
    renderQueue()
    const target = list.querySelector(`[data-report="${selected.id}"]`) || filters.querySelector('[aria-pressed="true"]')
    target.focus()
    selected = null
  }
  function openReport(detail) {
    queue.hidden = true
    panel.hidden = false
    panel.innerHTML = `<button type="button" class="demo-reset" data-back>Back to reports</button>
      <span class="eh-eyebrow">${selected.id} · ${detail ? "Report detail" : "Report preview"}</span>
      <h4 tabindex="-1">${selected.title}</h4><p>${selected.summary}</p>
      <p>${selected.category} · ${selected.device}</p>`
    panel.querySelector("[data-back]").onclick = backToQueue
    if (detail) {
      panel.insertAdjacentHTML("beforeend", `<label>Status<select data-status>${statuses.map(key => `<option>${key}</option>`).join("")}</select></label>
        <div><b>Internal discussion</b><ul data-notes></ul></div>
        <form class="eh-form"><label>Internal note<textarea required maxlength="280" rows="2"></textarea></label>
        <button class="button button-outline" type="submit">Add note</button></form>`)
      const status = panel.querySelector("[data-status]")
      status.value = selected.status
      status.onchange = () => {
        selected.status = status.value
        notice.textContent = selected.id + " marked " + status.value
      }
      const showNotes = () => {
        panel.querySelector("[data-notes]").replaceChildren(...selected.notes.map(text => {
          const li = document.createElement("li")
          li.textContent = text
          return li
        }))
      }
      showNotes()
      panel.querySelector("form").onsubmit = event => {
        event.preventDefault()
        const field = panel.querySelector("textarea")
        if (!field.value.trim()) return field.focus()
        selected.notes.push(field.value.trim())
        field.value = ""
        showNotes()
        field.focus()
        notice.textContent = "Internal note added to " + selected.id
      }
    } else {
      panel.insertAdjacentHTML("beforeend", `<p>Status · ${selected.status}</p><button type="button" class="button button-primary" data-open>Open full report</button>`)
      panel.querySelector("[data-open]").onclick = () => openReport(true)
    }
    panel.querySelector("h4").focus()
  }
  for (const key of ["All", ...statuses]) {
    const button = document.createElement("button")
    button.type = "button"
    button.dataset.csFilter = key
    button.onclick = () => { filter = key; renderQueue() }
    filters.append(button)
  }
  list.onclick = event => {
    const button = event.target.closest("[data-report]")
    if (!button) return
    selected = reports.find(r => r.id === button.dataset.report)
    openReport(false)
  }
  renderQueue()
}
