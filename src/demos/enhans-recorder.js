import { uiText } from "./demo-locale.js"
import { icon } from "../scripts/icons.js"
import { ehShell, ehQuery, ehEscape } from "./enhans-shared.js"

function markup() {
  return ehShell(
    uiText("Browser action recorder", "브라우저 동작 기록기"),
    `<div class="eh-head"><span class="eh-eyebrow">${uiText("CHROME EXTENSION / ACTION TRACES", "Chrome 확장 프로그램 / 동작 기록")}</span></div>
      <div class="eh-split eh-recorder-layout">
        <section class="eh-browser eh-recorder-browser" aria-label="${uiText("Sample browser window", "예시 브라우저 창")}">
          <div class="eh-window-heading"><span class="eh-window-dots" aria-hidden="true">● ● ●</span><strong>${uiText("Browser window", "브라우저 창")}</strong><span class="eh-window-tab">${uiText("Workspace", "업무 공간")}</span></div>
          <div class="eh-address-bar"><span aria-hidden="true">← &nbsp; → &nbsp; ↻</span><span class="eh-address">sample.example/workspace</span><span class="eh-extension-pin" title="${uiText("Action Recorder extension", "Action Recorder 확장 프로그램")}">${icon("puzzle")}</span></div>
          <div class="eh-browser-body eh-form"><span class="eh-eyebrow">${uiText("SAMPLE WEBSITE", "예시 웹사이트")}</span><h3>${uiText("Your next workspace.", "어디에서 일할까요?")}</h3><label>${uiText("Search destinations", "지역 검색")}<input type="text" data-eh="search" maxlength="80" placeholder="${uiText("Try Seoul, then click a workspace", "서울을 입력한 뒤 업무 공간을 선택하세요")}" autocomplete="off"></label><div class="eh-sample-cards"><button type="button" data-destination="Seoul"><span aria-hidden="true">↗</span><b>${uiText("Seoul", "서울")}</b><small>${uiText("City studio", "도심 스튜디오")}</small></button><button type="button" data-destination="Busan"><span aria-hidden="true">≈</span><b>${uiText("Busan", "부산")}</b><small>${uiText("Coastal desk", "바닷가 사무실")}</small></button></div><p data-eh="selection">${uiText("Try it: click a workspace and watch the extension log it.", "업무 공간을 선택하면 확장 프로그램에 어떤 동작이 기록되는지 볼 수 있습니다.")}</p><p class="eh-footnote">${uiText("Only interactions in this sample website are recorded.", "이 예시 사이트 안에서 한 동작만 기록합니다.")}</p></div>
        </section>
        <section class="eh-extension" aria-label="${uiText("Action Recorder Chrome extension", "Action Recorder Chrome 확장 프로그램")}">
          <div class="eh-extension-heading"><span class="eh-extension-mark" aria-hidden="true">${icon("puzzle")}</span><div><span class="eh-eyebrow">${uiText("CHROME EXTENSION", "Chrome 확장 프로그램")}</span><h3>Action Recorder</h3></div><span class="eh-extension-live" data-eh="live" aria-hidden="true"></span></div>
          <div class="eh-extension-body"><div class="eh-record-toolbar"><label class="eh-check"><input type="checkbox" data-eh="tracking" checked> ${uiText("Tracking enabled", "동작 기록 켜기")}</label><button type="button" class="demo-reset" data-eh="clear">${uiText("Clear trace", "기록 지우기")}</button></div><span class="eh-record-status" data-eh="status" role="status">${uiText("Tracking on · 0 events", "기록 중 · 이벤트 0개")}</span>
            <div class="eh-trace-heading"><span class="eh-eyebrow">${uiText("CAPTURED ACTIONS", "기록된 동작")}</span><span>${uiText("Newest first", "최신순")}</span></div><div class="eh-trace" data-eh="trace"></div><div class="eh-annotation" data-eh="annotation" hidden><label><span>${uiText("Comment for event", "이벤트 메모")} <span data-eh="event-number"></span></span><textarea data-eh="comment" rows="2" maxlength="240"></textarea></label></div>
            <button type="button" class="button button-outline eh-capture-action" data-eh="capture">${uiText("Add sample screenshot event", "예시 스크린샷 이벤트 추가")}</button><details class="eh-export"><summary>${uiText("Inspect JSONL export preview", "내보낼 JSONL 미리 보기")}</summary><pre data-eh="export">${uiText("No events yet.", "아직 기록된 이벤트가 없습니다.")}</pre></details><p class="eh-footnote">${uiText("Extension demo · no actual screenshots are taken.", "데모에서는 실제 화면을 캡처하지 않습니다.")}</p>
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
    q("export").textContent = records.length ? records.map((r) => JSON.stringify(r)).join("\n") : uiText("No events yet.", "아직 기록된 이벤트가 없습니다.")
  }
  function render() {
    q("status").textContent = `${q("tracking").checked ? uiText("Tracking on", "기록 중") : uiText("Tracking off", "기록 꺼짐")} · ${uiText(`${records.length} events`, `이벤트 ${records.length}개`)}`
    q("live").dataset.active = String(q("tracking").checked)
    q("trace").innerHTML = records.length
      ? [...records]
          .reverse()
          .map(
            (r) =>
              `<button type="button" class="eh-trace-item" data-event="${r.actionNumber}" aria-pressed="${selected === r.actionNumber}"><span>${String(r.actionNumber).padStart(2, "0")}</span><span><b>${uiText(r.action.type, { KEYBOARD_INPUT: "키보드 입력", CLICK: "클릭", SCREENSHOT: "스크린샷" }[r.action.type])}</b><small>${ehEscape(r.action.data.text || r.action.data.target)}</small></span><span class="eh-note"${r.comment ? "" : " hidden"}>${uiText("Note", "메모")}</span></button>`,
          )
          .join("")
      : `<div class="eh-empty"><b>${q("tracking").checked ? uiText("Listening to the browser…", "브라우저 동작을 기다리는 중…") : uiText("Tracking paused", "기록 일시 정지")}</b><p>${q("tracking").checked ? uiText("Click Seoul or Busan in the sample website. Your first action will appear here.", "예시 사이트에서 서울이나 부산을 선택하면 첫 동작이 여기에 표시됩니다.") : uiText("Enable tracking to record actions from the sample website.", "기록을 켜면 예시 사이트에서 한 동작이 여기에 표시됩니다.")}</p></div>`
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
      q("status").textContent = `${uiText("Tracking off · not recorded", "기록이 꺼져 있어 저장하지 않았습니다.")} · ${uiText(`${records.length} events`, `이벤트 ${records.length}개`)}`
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
    record("KEYBOARD_INPUT", { text: q("search").value, target: uiText("Search destinations", "지역 검색") }),
  )
  root.querySelectorAll("[data-destination]").forEach((el) =>
    el.addEventListener("click", () => {
      root
        .querySelectorAll("[data-destination]")
        .forEach((button) => button.setAttribute("aria-pressed", String(button === el)))
      const destination = el.querySelector("b").textContent
      const logged = record("CLICK", { target: uiText(`${destination} workspace`, `${destination} 업무 공간`) })
      q("selection").textContent = logged
        ? uiText(`${destination} workspace selected · logged by the extension.`, `${destination} 업무 공간 선택을 확장 프로그램에 기록했습니다.`)
        : uiText(`${destination} workspace selected · not recorded, tracking is off.`, `${destination} 업무 공간을 선택했습니다. 기록이 꺼져 있어 저장하지 않았습니다.`)
    }),
  )
  q("capture").addEventListener("click", () =>
    record("SCREENSHOT", { target: uiText("Sample workspace illustration · no screenshot captured", "예시 업무 공간 이미지 · 실제 화면 캡처 없음") }),
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
