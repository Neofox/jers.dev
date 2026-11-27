import { uiText } from "./demo-locale.js"
import { demoShell } from "./shared.js"

function markup() {
  return demoShell("cs", uiText("Pivo CS report triage", "Pivo 고객 지원 문의 분류"), `
    <div class="eh-panel eh-form" data-cs-queue>
      <h3>${uiText("CS reports", "고객 지원 문의")}</h3>
      <div class="eh-controls" role="group" aria-label="${uiText("Filter reports by status", "처리 상태별 문의 보기")}" data-cs-filters></div>
      <div data-cs-list></div>
    </div>
    <section class="eh-panel eh-form" data-cs-report hidden></section>
    <span class="sr-only" role="status" data-cs-notice></span>`)
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const statuses = ["Unresolved", "Pending", "On Hold", "Resolved"]
  const statusLabels = { All: "전체", Unresolved: "미해결", Pending: "처리 대기", "On Hold": "보류", Resolved: "해결 완료" }
  const statusLabel = (status) => uiText(status, statusLabels[status])
  const reports = [
    ["DEMO-104", uiText("Preview freezes after rotation", "화면을 회전하면 미리보기가 멈춤"), uiText("Video", "동영상"), uiText("Android tablet", "안드로이드 태블릿"), "Unresolved", uiText("Rotating the tablet during playback leaves the preview on its last frame.", "동영상 재생 중에 태블릿을 돌리면 미리보기가 마지막 프레임에서 멈춥니다.")],
    ["DEMO-103", uiText("Pairing takes a second attempt", "두 번째 시도에서 기기 연결"), uiText("Connection", "연결"), "iPhone", "Pending", uiText("The sample pod connects on the second attempt after waking from sleep.", "절전 모드에서 나온 Pod가 두 번째 시도에서 연결됩니다.")],
    ["DEMO-102", uiText("Gallery thumbnail stays blank", "갤러리 썸네일이 비어 있음"), uiText("Gallery", "갤러리"), uiText("Android phone", "안드로이드 스마트폰"), "On Hold", uiText("A new clip appears in the library before its thumbnail is available.", "새 영상이 보관함에 추가됐지만 썸네일이 아직 표시되지 않습니다.")],
    ["DEMO-101", uiText("Lesson timer overlaps the controls", "레슨 시간이 조작 버튼을 가림"), uiText("Lessons", "레슨"), "iPad", "Resolved", uiText("In landscape orientation the elapsed time overlapped the mute control.", "가로 화면에서 경과 시간 표시가 음소거 버튼과 겹쳤습니다.")],
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
      button.textContent = statusLabel(key) + " (" + count + ")"
      button.setAttribute("aria-pressed", String(key === filter))
      button.className = key === filter ? "button button-primary" : "button button-outline"
    }
    const visible = reports.filter(r => filter === "All" || r.status === filter)
    list.innerHTML = visible.map(r => `<button type="button" class="eh-trace-item" data-report="${r.id}"><span>${r.id}</span><span><b>${r.title}</b><small>${r.category} · ${statusLabel(r.status)}</small></span></button>`).join("") || `<p>${uiText("No reports with this status.", "이 상태의 문의가 없습니다.")}</p>`
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
    panel.innerHTML = `<button type="button" class="demo-reset" data-back>${uiText("Back to reports", "문의 목록으로")}</button>
      <span class="eh-eyebrow">${selected.id} · ${detail ? uiText("Report detail", "문의 상세") : uiText("Report preview", "문의 미리보기")}</span>
      <h3 tabindex="-1">${selected.title}</h3><p>${selected.summary}</p>
      <p>${selected.category} · ${selected.device}</p>`
    panel.querySelector("[data-back]").onclick = backToQueue
    if (detail) {
      panel.insertAdjacentHTML("beforeend", `<label>${uiText("Status", "처리 상태")}<select data-status>${statuses.map(key => `<option value="${key}">${statusLabel(key)}</option>`).join("")}</select></label>
        <div><b>${uiText("Internal discussion", "내부 논의")}</b><ul data-notes></ul></div>
        <form class="eh-form"><label>${uiText("Internal note", "내부 메모")}<textarea required maxlength="280" rows="2"></textarea></label>
        <button class="button button-outline" type="submit">${uiText("Add note", "메모 추가")}</button></form>`)
      const status = panel.querySelector("[data-status]")
      status.value = selected.status
      status.onchange = () => {
        selected.status = status.value
        notice.textContent = uiText(`${selected.id} marked ${status.value}`, `${selected.id} 처리 상태를 ‘${statusLabel(status.value)}’로 변경했습니다.`)
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
        notice.textContent = uiText(`Internal note added to ${selected.id}`, `${selected.id}에 내부 메모를 추가했습니다.`)
      }
    } else {
      panel.insertAdjacentHTML("beforeend", `<p>${uiText("Status ·", "처리 상태 ·")} ${statusLabel(selected.status)}</p><button type="button" class="button button-primary" data-open>${uiText("Open full report", "문의 상세 보기")}</button>`)
      panel.querySelector("[data-open]").onclick = () => openReport(true)
    }
    panel.querySelector("h3").focus()
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
