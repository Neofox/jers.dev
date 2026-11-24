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
    "Pivo Cloud video gallery",
    `<div class="pc">
      <aside class="pc-side">
        <p class="pc-side-title">My cloud</p>
        <button type="button" class="pc-folder" data-pc-tab="cloud">${icon("layers")}Pivo Track Gallery</button>
        <button type="button" class="pc-folder" data-pc-tab="lesson">${icon("layers")}Pivo Lessons</button>
        <div class="pc-storage"><div class="pc-bar" aria-hidden="true"><i data-pc="bar"></i></div><p data-pc="usage"></p><p class="pc-more">Want to have more storage?</p></div>
      </aside>
      <div class="pc-main">
        <div class="pc-tabs" role="tablist" aria-label="Galleries"><button type="button" role="tab" data-pc-tab="cloud">Cloud Gallery</button><button type="button" role="tab" data-pc-tab="lesson">Lesson Gallery</button></div>
        <div class="pc-selectbar">
          <label class="pc-all" data-pc="all-wrap" hidden><input type="checkbox" data-pc="all"><span class="sr-only">Select all</span></label>
          <div class="pc-actions" data-pc="actions" hidden>
            <button type="button" class="pc-icon" data-pc-act="share" aria-label="Share">${icon("share")}</button>
            <button type="button" class="pc-icon" data-pc-act="download" aria-label="Download">${icon("download")}</button>
            <button type="button" class="pc-icon" data-pc-act="delete" aria-label="Delete">${icon("trash")}</button>
          </div>
          <button type="button" class="pc-select" data-pc="select">Select</button>
        </div>
        <div class="pc-list" data-pc="list"></div>
        <p class="pc-toast" data-pc="toast" role="status" aria-live="polite" hidden></p>
      </div>
      <div class="pc-modal" data-pc="modal" hidden></div>
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
    ["cloud", "Flatwork warm-up", "mp4", 412_000_000, 0, ""],
    ["cloud", "Canter transitions", "mp4", 655_300_000, 0, "Stabilized"],
    ["cloud", "Lunging session", "mov", 298_700_000, 0, "validating"],
    ["cloud", "Grid work", "mp4", 520_000_000, 1, ""],
    ["cloud", "Trail ride", "mp4", 187_400_000, 4, "Processing"],
    ["cloud", "Course walk", "mp4", 233_100_000, 9, "Compressed"],
    ["lesson", "Lesson · seat and hands", "mp4", 96_200_000, 0, ""],
    ["lesson", "Lesson · lateral work", "mp4", 141_800_000, 2, "Gigapixel"],
    ["lesson", "Lesson · first jump", "mp4", 88_500_000, 6, ""],
  ]
  let files = seed.map(([gallery, name, ext, bytes, ago, status], i) => ({ id: i + 1, gallery, name, ext, bytes, date: new Date(now - ago * day), status }))
  const TOTAL = 3_000_000_000
  const st = { tab: "cloud", selecting: false, selected: new Set(), open: null }
  let toastTimer = null,
    lastFocus = null
  const fmtBytes = (b) => {
    if (b <= 0) return "0 B"
    const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"]
    const i = Math.min(units.length - 1, Math.floor(Math.log10(b) / 3))
    return new Intl.NumberFormat("en", { style: "unit", unit: units[i], unitDisplay: "short", maximumFractionDigits: 2 }).format(b / 1000 ** i)
  }
  const dayKey = (d) => d.toISOString().slice(0, 10)
  const header = (d) => {
    const diff = Math.round((new Date(dayKey(now)) - new Date(dayKey(d))) / day)
    return diff === 0 ? "Today" : diff === 1 ? "Yesterday" : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
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
              `<section class="pc-group"><h4>${header(g[0].date)}</h4><ul class="pc-grid">${g
                .map((f) => {
                  const locked = f.status === "validating"
                  const sel = st.selected.has(f.id)
                  return `<li><button type="button" class="pc-card${sel ? " is-selected" : ""}" data-pc-file="${f.id}" ${locked ? 'aria-disabled="true"' : ""} aria-label="${f.name}${st.selecting ? (sel ? ", selected" : ", not selected") : ""}${locked ? ", validating" : ""}" style="--thumb:${shade(f.id)}">
                    ${st.selecting && !locked ? `<span class="pc-check" aria-hidden="true">${sel ? icon("check") : ""}</span>` : ""}
                    ${f.status && !locked ? `<span class="pc-badge">${f.status}</span>` : ""}
                    ${locked ? '<span class="pc-lock" aria-hidden="true"><i></i></span>' : `<span class="pc-play" aria-hidden="true"></span>`}
                  </button></li>`
                })
                .join("")}</ul></section>`,
          )
          .join("")
      : '<div class="pc-empty"><p>Please upload files from Pivo Track app</p><p>Once you upload, it will appear here.</p></div>'
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
    q("select").textContent = st.selecting ? "Cancel" : "Select"
    q("select").hidden = list.length === 0
    q("all-wrap").hidden = !st.selecting
    q("actions").hidden = !st.selecting
    q("all").checked = st.selecting && n > 0 && n === selectable.length
    root.querySelector('[data-pc-act="share"]').disabled = n < 1
    root.querySelector('[data-pc-act="download"]').disabled = n !== 1 // Download is single-file only
    root.querySelector('[data-pc-act="delete"]').disabled = n < 1
  }
  function modal(html) {
    lastFocus = document.activeElement
    q("modal").innerHTML = `<div class="pc-dialog" role="dialog" aria-modal="true" aria-labelledby="pc-dialog-title">${html}</div>`
    q("modal").hidden = false
    q("modal").querySelector("button:not([disabled])")?.focus()
  }
  function closeModal() {
    q("modal").hidden = true
    q("modal").innerHTML = ""
    st.open = null
    if (lastFocus?.isConnected) lastFocus.focus()
    else root.querySelector("[data-pc-file]")?.focus()
  }
  function openViewer(id) {
    const list = [...visible()].sort((a, b) => b.date - a.date).filter((f) => f.status !== "validating")
    const i = list.findIndex((f) => f.id === id)
    if (i < 0) return
    const f = list[i]
    st.open = id
    const wasOpen = !q("modal").hidden
    const html = `<div class="pc-viewer"><header class="pc-vhead"><button type="button" class="pc-icon" data-pc-close aria-label="Back">‹</button><h4 id="pc-dialog-title">${f.name}.${f.ext}</h4></header>
      <div class="pc-vbody"><div class="pc-player" style="--thumb:${shade(f.id)}"><span class="pc-play" aria-hidden="true"></span><p>Sample video · no media</p>
        <button type="button" class="pc-nav prev" data-pc-step="-1" aria-label="Previous" ${i === 0 ? "disabled" : ""}>‹</button><button type="button" class="pc-nav next" data-pc-step="1" aria-label="Next" ${i === list.length - 1 ? "disabled" : ""}>›</button></div>
        <div class="pc-info"><div class="pc-itabs"><span>Video Annotation</span><span class="is-on">Info</span></div><p class="pc-iname">${f.name}.${f.ext}</p>
        <dl><div><dt>File type</dt><dd>${f.ext}</dd></div><div><dt>File size</dt><dd>${fmtBytes(f.bytes)}</dd></div><div><dt>Last modified</dt><dd>${f.date.toLocaleDateString()}</dd></div></dl></div></div></div>`
    if (wasOpen) {
      q("modal").innerHTML = `<div class="pc-dialog is-viewer" role="dialog" aria-modal="true" aria-labelledby="pc-dialog-title">${html}</div>`
      q("modal").querySelector("[data-pc-close]").focus()
    } else {
      modal(html)
      q("modal").querySelector(".pc-dialog").classList.add("is-viewer")
    }
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
        modal(`<h4 id="pc-dialog-title">Delete ${n} files</h4><p>I understand that deleting is permanent and can't be undone.</p><p class="pc-note">Demo: only the sample list changes.</p><div class="pc-dbtns"><button type="button" class="button button-outline" data-pc-close>Close</button><button type="button" class="button pc-danger" data-pc-confirm="delete">Delete</button></div>`)
      else if (act.dataset.pcAct === "share")
        modal(`<h4 id="pc-dialog-title">Share ${n} files</h4><p class="pc-link">https://example.invalid/share/sample</p><p class="pc-note">Sample link · the real one expires after 30 days. Nothing is created or copied here.</p><div class="pc-dbtns"><button type="button" class="button button-outline" data-pc-close>Cancel</button><button type="button" class="button button-primary" data-pc-confirm="copy">Copy Link</button></div>`)
      else toast("Download starts for a single file · demo, nothing is downloaded")
      return
    }
    const confirm = e.target.closest("[data-pc-confirm]")
    if (confirm) {
      if (confirm.dataset.pcConfirm === "delete") {
        files = files.filter((f) => !st.selected.has(f.id))
        st.selected.clear()
        st.selecting = false // deleting clears the selection and leaves select mode
        closeModal()
        draw()
        q("select").focus()
      } else {
        closeModal()
        toast("Link Copied! · demo, clipboard untouched")
      }
      return
    }
    if (e.target.closest("[data-pc-close]")) return closeModal()
    const nav = e.target.closest("[data-pc-step]")
    if (nav && !nav.disabled) step(+nav.dataset.pcStep)
  })
  q("all").addEventListener("change", (e) => {
    st.selected = new Set(e.target.checked ? visible().filter((f) => f.status !== "validating").map((f) => f.id) : [])
    draw()
  })
  root.addEventListener("keydown", (e) => {
    if (q("modal").hidden) return
    if (e.key === "Escape") return e.preventDefault(), closeModal()
    if (st.open != null && (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")) step(-1)
    if (st.open != null && (e.key === "ArrowRight" || e.key === "d" || e.key === "D")) step(1)
  })
  draw()
  return () => clearTimeout(toastTimer)
}
