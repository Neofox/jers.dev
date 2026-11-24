import { icon } from "../scripts/icons.js"
import { ehShell, ehQuery, ehEscape } from "./enhans-shared.js"

function markup() {
  return ehShell(
    "Browser action recorder",
    `<div class="eh-head"><span class="eh-eyebrow">CHROME EXTENSION / ACTION TRACES</span></div>
      <div class="eh-split eh-recorder-layout">
        <section class="eh-browser eh-recorder-browser" aria-label="Sample browser window">
          <div class="eh-window-heading"><span class="eh-window-dots" aria-hidden="true">● ● ●</span><strong>Browser window</strong><span class="eh-window-tab">Workspace</span></div>
          <div class="eh-address-bar"><span aria-hidden="true">← &nbsp; → &nbsp; ↻</span><span class="eh-address">sample.example/workspace</span><span class="eh-extension-pin" title="Action Recorder extension">${icon("puzzle")}</span></div>
          <div class="eh-browser-body eh-form"><span class="eh-eyebrow">SAMPLE WEBSITE</span><h4>Your next workspace.</h4><label>Search destinations<input type="text" data-eh="search" maxlength="80" placeholder="Try Seoul, then click a workspace" autocomplete="off"></label><div class="eh-sample-cards"><button type="button" data-destination="Seoul"><span aria-hidden="true">↗</span><b>Seoul</b><small>City studio</small></button><button type="button" data-destination="Busan"><span aria-hidden="true">≈</span><b>Busan</b><small>Coastal desk</small></button></div><p data-eh="selection">Try it: click a workspace and watch the extension log it.</p><p class="eh-footnote">Only interactions in this sample website are recorded.</p></div>
        </section>
        <section class="eh-extension" aria-label="Action Recorder Chrome extension">
          <div class="eh-extension-heading"><span class="eh-extension-mark" aria-hidden="true">${icon("puzzle")}</span><div><span class="eh-eyebrow">CHROME EXTENSION</span><h4>Action Recorder</h4></div><span class="eh-extension-live" data-eh="live" aria-hidden="true"></span></div>
          <div class="eh-extension-body"><div class="eh-record-toolbar"><label class="eh-check"><input type="checkbox" data-eh="tracking" checked> Tracking enabled</label><button type="button" class="demo-reset" data-eh="clear">Clear trace</button></div><span class="eh-record-status" data-eh="status" role="status">Tracking on · 0 events</span>
            <div class="eh-trace-heading"><span class="eh-eyebrow">CAPTURED ACTIONS</span><span>Newest first</span></div><div class="eh-trace" data-eh="trace"></div><div class="eh-annotation" data-eh="annotation" hidden><label><span>Comment for event <span data-eh="event-number"></span></span><textarea data-eh="comment" rows="2" maxlength="240"></textarea></label></div>
            <button type="button" class="button button-outline eh-capture-action" data-eh="capture">Add sample screenshot event</button><details class="eh-export"><summary>Inspect JSONL export preview</summary><pre data-eh="export">No events yet.</pre></details><p class="eh-footnote">Extension demo · no actual screenshots are taken.</p>
          </div>
        </section>
      </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = ehQuery(root)
  let records = [],
    selected = null,
    nextId = 1
  function exportPreview() {
    q("export").textContent = records.length ? records.map((r) => JSON.stringify(r)).join("\n") : "No events yet."
  }
  function render() {
    q("status").textContent = `${q("tracking").checked ? "Tracking on" : "Tracking off"} · ${records.length} events`
    q("live").dataset.active = String(q("tracking").checked)
    q("trace").innerHTML = records.length
      ? [...records]
          .reverse()
          .map(
            (r) =>
              `<button type="button" class="eh-trace-item" data-event="${r.actionNumber}" aria-pressed="${selected === r.actionNumber}"><span>${String(r.actionNumber).padStart(2, "0")}</span><span><b>${r.action.type}</b><small>${ehEscape(r.action.data.text || r.action.data.target)}</small></span><span class="eh-note"${r.comment ? "" : " hidden"}>Note</span></button>`,
          )
          .join("")
      : `<div class="eh-empty"><b>${q("tracking").checked ? "Listening to the browser…" : "Tracking paused"}</b><p>${q("tracking").checked ? "Click Seoul or Busan in the sample website. Your first action will appear here." : "Enable tracking to record actions from the sample website."}</p></div>`
    const record = records.find((r) => r.actionNumber === selected)
    q("annotation").hidden = !record
    if (record) {
      q("event-number").textContent = `#${selected}`
      q("comment").value = record.comment
    }
    exportPreview()
  }
  function record(type, data) {
    if (!q("tracking").checked) {
      q("status").textContent = `Tracking off · not recorded · ${records.length} events`
      return false
    }
    const item = {
      actionNumber: nextId++,
      timestamp: new Date().toISOString(),
      imagePath: null,
      comment: "",
      action: { type, data },
    }
    records.push(item)
    if (records.length > 30) records.shift()
    selected = item.actionNumber
    render()
    return true
  }
  q("tracking").addEventListener("change", render)
  q("search").addEventListener("change", () =>
    record("KEYBOARD_INPUT", { text: q("search").value, target: "Search destinations" }),
  )
  root.querySelectorAll("[data-destination]").forEach((el) =>
    el.addEventListener("click", () => {
      root
        .querySelectorAll("[data-destination]")
        .forEach((button) => button.setAttribute("aria-pressed", String(button === el)))
      const logged = record("CLICK", { target: `${el.dataset.destination} workspace` })
      q("selection").textContent = logged
        ? `${el.dataset.destination} workspace selected · logged by the extension.`
        : `${el.dataset.destination} workspace selected · not recorded, tracking is off.`
    }),
  )
  q("capture").addEventListener("click", () =>
    record("SCREENSHOT", { target: "Sample workspace illustration · no screenshot captured" }),
  )
  q("trace").addEventListener("click", (event) => {
    const button = event.target.closest("[data-event]")
    if (!button) return
    selected = Number(button.dataset.event)
    render()
    q("trace").querySelector(`[data-event="${selected}"]`)?.focus()
  })
  q("comment").addEventListener("input", () => {
    const item = records.find((r) => r.actionNumber === selected)
    if (item) item.comment = q("comment").value
    const note = q("trace").querySelector(`[data-event="${selected}"] .eh-note`)
    if (note) note.hidden = !q("comment").value
    exportPreview()
  })
  q("clear").addEventListener("click", () => {
    records = []
    selected = null
    nextId = 1
    render()
  })
  render()
}
