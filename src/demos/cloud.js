import { uiText } from "./demo-locale.js"
import { icon } from "../scripts/icons.js"
import { demoShell } from "./shared.js"

// Pivo Cloud · video gallery. Mirrors the Vue app's behaviour: "Cloud Gallery" / "Lesson Gallery" tabs, a
// "My cloud" panel, items grouped by day (Today, Yesterday, en-US long date) newest first, 4:3 cards with a play
// icon and status badges, "Select" / "Cancel" mode with select-all, Share (1+), Download (exactly 1) and Delete
// (1+) icon actions, the "Delete N files" dialog, a viewer with prev/next and Esc/←/→/A/D keys, and the storage
// bar in decimal units with 80% / 90% thresholds. Files are sample entries; nothing is uploaded or downloaded.
function markup() {
  return demoShell(
    "cloud",
    uiText("Pivo Cloud video gallery", "Pivo Cloud 동영상 갤러리"),
    `<div class="pc">
      <aside class="pc-side">
        <p class="pc-side-title">${uiText("My cloud", "내 클라우드")}</p>
        <button type="button" class="pc-folder" data-pc-tab="cloud">${icon("layers")}${uiText("Pivo Track Gallery", "Pivo Track 갤러리")}</button>
        <button type="button" class="pc-folder" data-pc-tab="lesson">${icon("layers")}${uiText("Pivo Lessons", "Pivo 레슨")}</button>
        <div class="pc-storage"><div class="pc-bar" aria-hidden="true"><i data-pc="bar"></i></div><p data-pc="usage"></p><p class="pc-more">${uiText("Want to have more storage?", "저장 공간이 더 필요하신가요?")}</p></div>
      </aside>
      <div class="pc-main">
        <div class="pc-tabs" role="tablist" aria-label="${uiText("Galleries", "갤러리 선택")}"><button type="button" role="tab" data-pc-tab="cloud">${uiText("Cloud Gallery", "클라우드 갤러리")}</button><button type="button" role="tab" data-pc-tab="lesson">${uiText("Lesson Gallery", "레슨 갤러리")}</button></div>
        <div class="pc-selectbar">
          <label class="pc-all" data-pc="all-wrap" hidden><input type="checkbox" data-pc="all"><span class="sr-only">${uiText("Select all", "전체 선택")}</span></label>
          <div class="pc-actions" data-pc="actions" hidden>
            <button type="button" class="pc-icon" data-pc-act="share" aria-label="${uiText("Share", "공유")}">${icon("share")}</button>
            <button type="button" class="pc-icon" data-pc-act="download" aria-label="${uiText("Download", "다운로드")}">${icon("download")}</button>
            <button type="button" class="pc-icon" data-pc-act="delete" aria-label="${uiText("Delete", "삭제")}">${icon("trash")}</button>
          </div>
          <button type="button" class="pc-select" data-pc="select">${uiText("Select", "선택")}</button>
        </div>
        <div class="pc-list" data-pc="list"></div>
        <p class="pc-toast" data-pc="toast" role="status" aria-live="polite" hidden></p>
      </div>
      <dialog class="pc-dialog" data-pc="modal" aria-labelledby="pc-dialog-title"></dialog>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = (k) => root.querySelector(`[data-pc="${k}"]`)
  const day = 86400000,
    now = new Date()
  // Sample files: [gallery, name, ext, bytes, daysAgo, status]
  const seed = [
    ["cloud", uiText("Flatwork warm-up", "평지 기승 준비 운동"), "mp4", 412_000_000, 0, ""],
    ["cloud", uiText("Canter transitions", "구보 전환 연습"), "mp4", 655_300_000, 0, uiText("Stabilized", "흔들림 보정 완료")],
    ["cloud", uiText("Lunging session", "조마삭 운동"), "mov", 298_700_000, 0, "validating"],
    ["cloud", uiText("Grid work", "연속 장애물 훈련"), "mp4", 520_000_000, 1, ""],
    ["cloud", uiText("Trail ride", "야외 기승"), "mp4", 187_400_000, 4, uiText("Processing", "처리 중")],
    ["cloud", uiText("Course walk", "코스 답사"), "mp4", 233_100_000, 9, uiText("Compressed", "압축 완료")],
    ["lesson", uiText("Lesson · seat and hands", "레슨 · 기승 자세와 고삐 잡기"), "mp4", 96_200_000, 0, ""],
    ["lesson", uiText("Lesson · lateral work", "레슨 · 횡운동"), "mp4", 141_800_000, 2, "Gigapixel"],
    ["lesson", uiText("Lesson · first jump", "레슨 · 첫 장애물 넘기"), "mp4", 88_500_000, 6, ""],
  ]
  let files = seed.map(([gallery, name, ext, bytes, ago, status], i) => ({ id: i + 1, gallery, name, ext, bytes, date: new Date(now - ago * day), status }))
  const TOTAL = 3_000_000_000
  const st = { tab: "cloud", selecting: false, selected: new Set(), open: null }
  let toastTimer = null
  const dialog = q("modal")
  const fmtBytes = (b) => {
    if (b <= 0) return "0 B"
    const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"]
    const i = Math.min(units.length - 1, Math.floor(Math.log10(b) / 3))
    return new Intl.NumberFormat(uiText("en", "ko"), { style: "unit", unit: units[i], unitDisplay: "short", maximumFractionDigits: 2 }).format(b / 1000 ** i)
  }
  const dayKey = (d) => d.toISOString().slice(0, 10)
  const header = (d) => {
    const diff = Math.round((new Date(dayKey(now)) - new Date(dayKey(d))) / day)
    return diff === 0 ? uiText("Today", "오늘") : diff === 1 ? uiText("Yesterday", "어제") : d.toLocaleDateString(uiText("en-US", "ko-KR"), { year: "numeric", month: "long", day: "numeric" })
  }
  const shade = (id) => `linear-gradient(135deg, oklch(${38 + (id % 4) * 6}% 0.05 ${150 + id * 23}), oklch(24% 0.03 ${200 + id * 11}))`
  const visible = () => files.filter((f) => f.gallery === st.tab)
  function toast(text) {
    q("toast").textContent = text
    q("toast").hidden = false
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (q("toast").hidden = true), 2600)
  }
  function draw() {
    const list = visible()
    const groups = new Map()
    ;[...list].sort((a, b) => b.date - a.date).forEach((f) => {
      const k = dayKey(f.date)
      if (!groups.has(k)) groups.set(k, [])
      groups.get(k).push(f)
    })
    q("list").innerHTML = list.length
      ? [...groups.values()]
          .map(
            (g) =>
              `<section class="pc-group"><h3>${header(g[0].date)}</h3><ul class="pc-grid">${g
                .map((f) => {
                  const locked = f.status === "validating"
                  const sel = st.selected.has(f.id)
                  return `<li><button type="button" class="pc-card${sel ? " is-selected" : ""}" data-pc-file="${f.id}" ${locked ? 'aria-disabled="true"' : ""} aria-label="${f.name}${f.status && !locked ? ", " + f.status : ""}${st.selecting ? (sel ? uiText(", selected", ", 선택됨") : uiText(", not selected", ", 선택 안 됨")) : ""}${locked ? uiText(", validating", ", 확인 중") : ""}" style="--thumb:${shade(f.id)}">
                    ${st.selecting && !locked ? `<span class="pc-check" aria-hidden="true">${sel ? icon("check") : ""}</span>` : ""}
                    ${f.status && !locked ? `<span class="pc-badge">${f.status}</span>` : ""}
                    ${locked ? '<span class="pc-lock" aria-hidden="true"><i></i></span>' : `<span class="pc-play" aria-hidden="true"></span>`}
                  </button></li>`
                })
                .join("")}</ul></section>`,
          )
          .join("")
      : `<div class="pc-empty"><p>${uiText("Please upload files from Pivo Track app", "Pivo Track 앱에서 파일을 업로드하세요.")}</p><p>${uiText("Once you upload, it will appear here.", "업로드한 파일이 여기에 표시됩니다.")}</p></div>`
    // storage across both galleries
    const used = files.reduce((a, f) => a + f.bytes, 0),
      pct = Math.round((used / TOTAL) * 10000) / 100
    q("usage").textContent = `${fmtBytes(used)} / ${fmtBytes(TOTAL)}`
    q("bar").style.width = Math.min(100, pct) + "%"
    q("bar").className = pct >= 90 ? "is-red" : pct >= 80 ? "is-yellow" : ""
    root.querySelectorAll("[data-pc-tab]").forEach((b) => {
      const on = b.dataset.pcTab === st.tab
      b.setAttribute(b.getAttribute("role") === "tab" ? "aria-selected" : "aria-current", String(on))
    })
    const selectable = list.filter((f) => f.status !== "validating")
    const n = st.selected.size
    q("select").textContent = st.selecting ? uiText("Cancel", "취소") : uiText("Select", "선택")
    q("select").hidden = list.length === 0
    q("all-wrap").hidden = !st.selecting
    q("actions").hidden = !st.selecting
    q("all").checked = st.selecting && n > 0 && n === selectable.length
    root.querySelector('[data-pc-act="share"]').disabled = n < 1
    root.querySelector('[data-pc-act="download"]').disabled = n !== 1 // Download is single-file only
    root.querySelector('[data-pc-act="delete"]').disabled = n < 1
  }
  function modal(html, viewer = false) {
    dialog.classList.toggle("is-viewer", viewer)
    dialog.innerHTML = html
    if (!dialog.open) dialog.showModal()
    dialog.querySelector("button:not([disabled])")?.focus()
  }
  function openViewer(id) {
    const list = [...visible()].sort((a, b) => b.date - a.date).filter((f) => f.status !== "validating")
    const i = list.findIndex((f) => f.id === id)
    if (i < 0) return
    const f = list[i]
    st.open = id
    const html = `<div class="pc-viewer"><header class="pc-vhead"><button type="button" class="pc-icon" data-pc-close aria-label="${uiText("Back", "뒤로")}">‹</button><h3 id="pc-dialog-title">${f.name}.${f.ext}</h3></header>
      <div class="pc-vbody"><div class="pc-player" style="--thumb:${shade(f.id)}"><span class="pc-play" aria-hidden="true"></span><p>${uiText("Sample video · no media", "동영상 예시 화면 · 실제 영상 없음")}</p>
        <button type="button" class="pc-nav prev" data-pc-step="-1" aria-label="${uiText("Previous", "이전")}" ${i === 0 ? "disabled" : ""}>‹</button><button type="button" class="pc-nav next" data-pc-step="1" aria-label="${uiText("Next", "다음")}" ${i === list.length - 1 ? "disabled" : ""}>›</button></div>
        <div class="pc-info"><div class="pc-itabs"><span>${uiText("Video Annotation", "영상 주석")}</span><span class="is-on">${uiText("Info", "정보")}</span></div><p class="pc-iname">${f.name}.${f.ext}</p>
        <dl><div><dt>${uiText("File type", "파일 형식")}</dt><dd>${f.ext}</dd></div><div><dt>${uiText("File size", "파일 크기")}</dt><dd>${fmtBytes(f.bytes)}</dd></div><div><dt>${uiText("Last modified", "마지막 수정일")}</dt><dd>${f.date.toLocaleDateString(uiText(undefined, "ko-KR"))}</dd></div></dl></div></div></div>`
    modal(html, true)
  }
  function step(dir) {
    const list = [...visible()].sort((a, b) => b.date - a.date).filter((f) => f.status !== "validating")
    const i = list.findIndex((f) => f.id === st.open)
    const next = list[i + dir]
    if (next) openViewer(next.id)
  }
  root.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-pc-tab]")
    if (tab) {
      st.tab = tab.dataset.pcTab
      st.selected.clear()
      st.selecting = false
      return draw()
    }
    const card = e.target.closest("[data-pc-file]")
    if (card) {
      const f = files.find((x) => x.id === +card.dataset.pcFile)
      if (f.status === "validating") return
      if (st.selecting) {
        if (st.selected.has(f.id)) st.selected.delete(f.id)
        else st.selected.add(f.id)
        draw()
        root.querySelector(`[data-pc-file="${f.id}"]`)?.focus()
      } else openViewer(f.id)
      return
    }
    if (e.target.closest('[data-pc="select"]')) {
      st.selecting = !st.selecting
      st.selected.clear() // leaving select mode clears the selection
      return draw()
    }
    const act = e.target.closest("[data-pc-act]")
    if (act && !act.disabled) {
      const n = st.selected.size
      if (act.dataset.pcAct === "delete")
        modal(`<h3 id="pc-dialog-title">${uiText(`Delete ${n} files`, `파일 ${n}개 삭제`)}</h3><p>${uiText("I understand that deleting is permanent and can't be undone.", "삭제한 파일은 복구할 수 없습니다.")}</p><p class="pc-note">${uiText("Demo: only the sample list changes.", "데모에서는 예시 파일 목록만 바뀝니다.")}</p><div class="pc-dbtns"><button type="button" class="button button-outline" data-pc-close>${uiText("Close", "닫기")}</button><button type="button" class="button pc-danger" data-pc-confirm="delete">${uiText("Delete", "삭제")}</button></div>`)
      else if (act.dataset.pcAct === "share")
        modal(`<h3 id="pc-dialog-title">${uiText(`Share ${n} files`, `파일 ${n}개 공유`)}</h3><p class="pc-link">https://example.invalid/share/sample</p><p class="pc-note">${uiText("Sample link · the real one expires after 30 days. Nothing is created or copied here.", "실제 공유 링크는 30일 후 만료됩니다. 이 데모에서는 링크를 만들거나 복사하지 않습니다.")}</p><div class="pc-dbtns"><button type="button" class="button button-outline" data-pc-close>${uiText("Cancel", "취소")}</button><button type="button" class="button button-primary" data-pc-confirm="copy">${uiText("Copy Link", "링크 복사")}</button></div>`)
      else toast(uiText("Download starts for a single file · demo, nothing is downloaded", "한 번에 파일 하나를 다운로드할 수 있습니다. 데모에서는 실제로 다운로드하지 않습니다."))
      return
    }
    const confirm = e.target.closest("[data-pc-confirm]")
    if (confirm) {
      if (confirm.dataset.pcConfirm === "delete") {
        files = files.filter((f) => !st.selected.has(f.id))
        st.selected.clear()
        st.selecting = false // deleting clears the selection and leaves select mode
        dialog.close()
        draw()
        const next = q("select").hidden ? root.querySelector('[role="tab"][aria-selected="true"]') : q("select")
        next.focus()
      } else {
        dialog.close()
        toast(uiText("Link Copied! · demo, clipboard untouched", "링크 복사 완료 예시입니다. 실제 클립보드는 바뀌지 않았습니다."))
      }
      return
    }
    if (e.target.closest("[data-pc-close]")) return dialog.close()
    const nav = e.target.closest("[data-pc-step]")
    if (nav && !nav.disabled) step(+nav.dataset.pcStep)
  })
  q("all").addEventListener("change", (e) => {
    st.selected = new Set(e.target.checked ? visible().filter((f) => f.status !== "validating").map((f) => f.id) : [])
    draw()
  })
  root.addEventListener("keydown", (e) => {
    if (!dialog.open || !dialog.classList.contains("is-viewer")) return
    if (st.open != null && (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")) step(-1)
    if (st.open != null && (e.key === "ArrowRight" || e.key === "d" || e.key === "D")) step(1)
  })
  draw()
  return () => clearTimeout(toastTimer)
}
