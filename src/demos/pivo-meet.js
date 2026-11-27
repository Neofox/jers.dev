import { uiText } from "./demo-locale.js"
import { icon } from "../scripts/icons.js"
import { demoShell, motionEnabled } from "./shared.js"

// Pivo Meet · a two-person remote lesson. Mirrors the Vue/Agora app's behaviour: exactly two participants,
// three layouts (side-by-side, small preview, large preview), mic/camera toggles with "Microphone on/off"
// toasts, "Camera control" that only works after the other side grants "Guest Control" (then arrow keys rotate
// and zoom their pod), "Start recording" → "Where to save?" (Cloud) → "Starting..." → HH:MM / HH:MM →
// "Stopping..." → "Processing...", a MM:SS room timer, and Leave → confirm → "How was your call?".
// Participants and video are samples: no camera, microphone, network or recording is used.
function markup() {
  return demoShell(
    "meet",
    uiText("Pivo Meet remote lesson", "Pivo Meet 원격 레슨"),
    `<div class="pm" data-pm="root">
      <div class="pm-call" data-pm="call">
        <div class="pm-top"><span class="pm-room">${uiText("Lesson · sample room", "레슨 · 예시 통화방")}</span>
          <div class="pm-layouts" role="group" aria-label="${uiText("Layout", "화면 배치")}"><button type="button" data-pm-layout="fifty" aria-pressed="true">${uiText("Side by side", "나란히 보기")}</button><button type="button" data-pm-layout="small" aria-pressed="false">${uiText("Small preview", "작은 미리보기")}</button><button type="button" data-pm-layout="large" aria-pressed="false">${uiText("Large preview", "큰 미리보기")}</button></div></div>
        <div class="pm-stage" data-pm="stage" data-layout="fifty">
          <div class="pm-tile self" data-pm="self"></div>
          <div class="pm-tile remote" data-pm="remote"></div>
        </div>
        <div class="pm-podbar" data-pm="podbar" hidden><span>${uiText("Rotate (← →)", "회전 (← →)")}</span><span>${uiText("Zoom in/out (↑ ↓)", "확대·축소 (↑ ↓)")}</span><span class="pm-podbtns"><button type="button" data-pm-pod="left" aria-label="${uiText("Rotate left", "왼쪽으로 회전")}">←</button><button type="button" data-pm-pod="right" aria-label="${uiText("Rotate right", "오른쪽으로 회전")}">→</button><button type="button" data-pm-pod="in" aria-label="${uiText("Zoom in", "확대")}">↑</button><button type="button" data-pm-pod="out" aria-label="${uiText("Zoom out", "축소")}">↓</button></span></div>
        <div class="pm-controls">
          <div class="pm-ctl-mid">
            <button type="button" class="pm-btn" data-pm="mic" aria-pressed="true" title="${uiText("Turn on/off microphone", "마이크 켜기 또는 끄기")}">${icon("mic")}<span>${uiText("Mic", "마이크")}</span></button>
            <button type="button" class="pm-btn" data-pm="cam" aria-pressed="true" title="${uiText("Turn on/off camera", "카메라 켜기 또는 끄기")}">${icon("video")}<span>${uiText("Camera", "카메라")}</span></button>
            <button type="button" class="pm-btn" data-pm="pod" aria-pressed="false" aria-describedby="pm-pod-tip">${icon("refresh")}<span>${uiText("Camera control", "카메라 제어")}</span></button>
            <div class="pm-rec-wrap"><button type="button" class="pm-btn pm-rec" data-pm="rec" aria-haspopup="true" aria-expanded="false"><span data-pm="rec-label">${uiText("Start recording", "녹화 시작")}</span></button>
              <div class="pm-pop" data-pm="where" hidden><p class="illo-kicker">${uiText("Where to save?", "어디에 저장할까요?")}</p><button type="button" data-pm-save="cloud"><strong>${uiText("Cloud", "클라우드")}</strong><small>${uiText("02:00 hours remaining", "2시간 남음")}</small></button><button type="button" disabled><strong>${uiText("Desktop", "내 컴퓨터")} <em>${uiText("BETA", "베타")}</em></strong><small>${uiText("Records your screen · not in this demo", "화면 녹화 · 데모에서 사용 불가")}</small></button></div></div>
          </div>
          <div class="pm-ctl-right"><span class="pm-timer" data-pm="timer" title="${uiText("Room age", "통화 경과 시간")}">00:00</span><button type="button" class="pm-leave" data-pm="leave" title="${uiText("Leave call", "통화 나가기")}">${uiText("Leave", "나가기")}</button></div>
        </div>
        <p class="pm-tip" id="pm-pod-tip" data-pm="tip"></p>
        <div class="pm-guest"><label class="tl-fail"><input type="checkbox" data-pm="grant"> ${uiText("Guest turns “Guest Control” on", "게스트가 카메라 원격 제어를 허용함")}</label></div>
      </div>
      <div class="pm-sheet" data-pm="sheet" hidden></div>
      <p class="pc-toast" data-pm="toast" role="status" aria-live="polite" hidden></p>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = (k) => root.querySelector(`[data-pm="${k}"]`)
  const st = { layout: "fifty", mic: true, cam: true, grant: false, pod: false, pan: 0, zoom: 1, rec: "idle", recStart: 0, joinedAt: Date.now() }
  let tick = null,
    toastTimer = null,
    recTimer = null,
    // bumped on every genuine leave/rejoin so a pending recording step from the old call can never land
    session = 0
  const pad = (n) => String(n).padStart(2, "0")
  const busy = () => st.rec === "starting" || st.rec === "stopping" || st.rec === "processing"
  function toast(title, body = "") {
    q("toast").innerHTML = `<strong>${title}</strong>${body ? `<span>${body}</span>` : ""}`
    q("toast").hidden = false
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (q("toast").hidden = true), 2800)
  }
  function tile(who) {
    const me = who === "self"
    const camOn = me ? st.cam : true
    const micOn = me ? st.mic : true
    const scene = me
      ? ""
      : `<img class="pm-scene" src="/assets/pivo-meet-arena.webp" alt="${uiText("A rider on horseback in an indoor arena", "실내 마장에서 말을 탄 기수")}" draggable="false">`
    return `${camOn ? `<div class="pm-video">${scene}${me ? '<span class="pm-avatar sample">C</span>' : ""}</div>` : `<div class="pm-off"><span class="pm-avatar">C</span></div>`}
      <span class="pm-badge"><b>${me ? uiText("Me", "나") : uiText("Guest", "게스트")}</b><i class="pm-mic${micOn ? "" : " off"}" aria-label="${micOn ? uiText("Microphone on", "마이크 켜짐") : uiText("Microphone off", "마이크 꺼짐")}"></i></span>
      <span class="pm-sample">${me ? uiText("Sample video", "예시 영상") : uiText("Sample photo", "예시 사진")}</span>`
  }
  function draw() {
    q("stage").dataset.layout = st.layout
    q("self").innerHTML = tile("self")
    root.querySelectorAll("[data-pm-layout]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pmLayout === st.layout)))
    q("mic").setAttribute("aria-pressed", String(st.mic))
    q("cam").setAttribute("aria-pressed", String(st.cam))
    q("pod").setAttribute("aria-pressed", String(st.pod))
    q("podbar").hidden = !st.pod
    q("tip").textContent = st.grant
      ? st.pod
        ? uiText("Hold an arrow button or arrow key to pan or zoom the guest camera.", "화살표 버튼이나 방향키를 길게 누르면 게스트 카메라를 회전하거나 확대·축소할 수 있습니다.")
        : uiText("Guest Control is on. Press Camera control to move their camera.", "게스트가 원격 제어를 허용했습니다. ‘카메라 제어’를 눌러 카메라를 움직여 보세요.")
      : uiText("You can't move their camera. Ask guest to turn “Guest Control” on.", "게스트가 원격 제어를 허용해야 카메라를 움직일 수 있습니다.")
    const label = { idle: uiText("Start recording", "녹화 시작"), starting: uiText("Starting...", "녹화 시작 중…"), stopping: uiText("Stopping...", "녹화 종료 중…"), processing: uiText("Processing...", "처리 중…") }[st.rec]
    if (label) q("rec-label").textContent = label
    q("rec").classList.toggle("is-on", st.rec === "on")
    // aria-disabled (not disabled) so keyboard focus stays on the button through Starting/Stopping/Processing
    q("rec").setAttribute("aria-disabled", String(busy()))
    q("rec").setAttribute("aria-busy", String(busy()))
  }
  function clocks() {
    const s = Math.floor((Date.now() - st.joinedAt) / 1000)
    q("timer").textContent = `${pad(Math.floor(s / 60))}:${pad(s % 60)}`
    if (st.rec === "on") {
      const m = Math.floor((Date.now() - st.recStart) / 60000)
      q("rec-label").textContent = `${pad(Math.floor(m / 60))}:${pad(m % 60)} / 02:00`
    }
  }
  const wait = (ms, fn) => {
    const gen = session
    clearTimeout(recTimer)
    recTimer = setTimeout(() => {
      if (gen !== session) return
      fn()
      // if focus fell to <body> while the call was visible, hand it back to the recording button
      if (!q("call").hidden && (document.activeElement === document.body || !document.activeElement)) q("rec").focus()
    }, motionEnabled() ? ms : 0)
  }
  function setWhere(open) {
    q("where").hidden = !open
    q("rec").setAttribute("aria-expanded", String(open))
    if (open) q("where").querySelector("[data-pm-save]").focus()
  }
  const remote = q("remote")
  remote.innerHTML = tile("remote")
  let frame = 0
  let heldInput = null
  function drawCamera() {
    remote.style.setProperty("--pan", `${st.pan}%`)
    remote.style.setProperty("--zoom", st.zoom)
  }
  function moveCamera(dir, seconds) {
    if (dir === "left") st.pan = Math.min(10, st.pan + seconds * 12)
    if (dir === "right") st.pan = Math.max(-10, st.pan - seconds * 12)
    if (dir === "in") st.zoom = Math.min(1.8, st.zoom + seconds * 0.48)
    if (dir === "out") st.zoom = Math.max(1, st.zoom - seconds * 0.48)
    drawCamera()
  }
  function stopCamera() {
    cancelAnimationFrame(frame)
    heldInput = null
  }
  function holdCamera(dir, input) {
    stopCamera()
    heldInput = input
    moveCamera(dir, 0.1)
    let previous = performance.now()
    function advance(now) {
      moveCamera(dir, Math.max(0, Math.min(now - previous, 50)) / 1000)
      previous = now
      frame = requestAnimationFrame(advance)
    }
    frame = requestAnimationFrame(advance)
  }
  function sheet(html) {
    stopCamera()
    q("call").hidden = true
    q("sheet").innerHTML = html
    q("sheet").hidden = false
    q("sheet").querySelector("button, input, textarea")?.focus()
  }
  function closeSheet() {
    q("sheet").hidden = true
    q("sheet").innerHTML = ""
    q("call").hidden = false
  }
  // Cancel on "leave this call?": the call never stopped, so nothing is reset; timers and recording carry on.
  function resume() {
    closeSheet()
    q("leave").focus()
  }
  // A genuine leave ends the call: drop pending recording steps, stop recording and revoke guest control.
  function endCall() {
    session++
    clearTimeout(recTimer)
    clearTimeout(toastTimer)
    q("toast").hidden = true
    setWhere(false)
    q("grant").checked = false
    Object.assign(st, { rec: "idle", grant: false, pod: false, pan: 0, zoom: 1 })
    drawCamera()
    draw()
  }
  // "Start now" after leaving: a fresh call with a new clock and the same clean state.
  function rejoin() {
    endCall()
    st.joinedAt = Date.now()
    closeSheet()
    draw()
    clocks()
    q("leave").focus()
  }
  root.addEventListener("click", (e) => {
    const t = e.target
    const lay = t.closest("[data-pm-layout]")
    if (lay) return ((st.layout = lay.dataset.pmLayout), draw())
    if (t.closest('[data-pm="mic"]')) return ((st.mic = !st.mic), draw(), toast(st.mic ? uiText("Microphone on", "마이크 켜짐") : uiText("Microphone off", "마이크 꺼짐")))
    if (t.closest('[data-pm="cam"]')) return ((st.cam = !st.cam), draw(), toast(st.cam ? uiText("Camera on", "카메라 켜짐") : uiText("Camera off", "카메라 꺼짐")))
    if (t.closest('[data-pm="pod"]')) {
      if (!st.grant) return toast(uiText("Camera control", "카메라 제어"), uiText("You can't move their camera. Ask guest to turn “Guest Control” on.", "게스트가 원격 제어를 허용해야 카메라를 움직일 수 있습니다."))
      st.pod = !st.pod
      if (!st.pod) stopCamera()
      return draw()
    }
    const pb = t.closest("[data-pm-pod]")
    if (pb && st.pod && e.detail === 0) return moveCamera(pb.dataset.pmPod, 0.1)
    if (t.closest('[data-pm="rec"]')) {
      if (busy()) return
      if (st.rec === "idle") return setWhere(q("where").hidden)
      if (st.rec === "on") {
        st.rec = "stopping"
        draw()
        wait(700, () => {
          st.rec = "processing"
          draw()
          wait(900, () => {
            st.rec = "idle"
            draw()
            toast(uiText("Cloud recording saved successfully", "클라우드 녹화 저장 완료"), uiText("Demo · nothing was recorded or saved", "데모에서는 영상을 녹화하거나 저장하지 않습니다."))
          })
        })
      }
      return
    }
    if (t.closest('[data-pm-save="cloud"]')) {
      setWhere(false)
      st.rec = "starting"
      draw()
      q("rec").focus()
      wait(800, () => {
        st.rec = "on"
        st.recStart = Date.now()
        draw()
        clocks()
        toast(uiText("Recording Started", "녹화 시작"), uiText("This meeting is now being recorded · demo, nothing is captured", "녹화 중인 화면의 예시입니다. 실제 통화 내용은 기록하지 않습니다."))
      })
      return
    }
    if (t.closest('[data-pm="leave"]'))
      return sheet(`<div class="pm-card" role="dialog" aria-modal="true" aria-labelledby="pm-leave-t"><h4 id="pm-leave-t">${uiText("Are you sure you want to leave this video call?", "영상 통화에서 나갈까요?")}</h4><div class="pc-dbtns"><button type="button" class="button button-outline" data-pm-back>${uiText("Cancel", "취소")}</button><button type="button" class="button pc-danger" data-pm-left>${uiText("Leave", "나가기")}</button></div></div>`)
    if (t.closest("[data-pm-back]")) return resume()
    if (t.closest("[data-pm-left]")) {
      // leaving stops your own recording and ends guest control
      endCall()
      return sheet(`<form class="pm-card" data-pm-survey><h4>${uiText("How was your call?", "통화는 어떠셨나요?")}</h4><div class="pm-stars" role="radiogroup" aria-label="${uiText("Rating", "통화 평점")}">${[1, 2, 3, 4, 5].map((n) => `<label><input type="radio" name="pm-stars" value="${n}"><span aria-hidden="true">★</span><span class="sr-only">${uiText(`${n} star${n > 1 ? "s" : ""}`, `별 ${n}개`)}</span></label>`).join("")}</div><label class="kt-field"><span>${uiText("Tell us how we can improve?", "개선할 점을 알려 주세요.")}</span><textarea rows="2"></textarea></label><div class="pc-dbtns"><button type="button" class="button button-outline" data-pm-skip>${uiText("Skip", "건너뛰기")}</button><button type="submit" class="button button-primary">${uiText("Submit", "제출")}</button></div><p class="pc-note">${uiText("Demo · nothing is submitted.", "데모에서는 의견이 전송되지 않습니다.")}</p></form>`)
    }
    if (t.closest("[data-pm-skip]")) return sheet(`<div class="pm-card"><h4>${uiText("Ready to start?", "레슨을 시작할까요?")}</h4><p class="pc-note">${uiText("Sample lesson room.", "예시 레슨 통화방입니다.")}</p><button type="button" class="button button-primary" data-pm-rejoin>${uiText("Start now", "지금 시작")}</button></div>`)
    if (t.closest("[data-pm-rejoin]")) return rejoin()
    if (t.closest("[data-pm-close]")) return sheet(`<div class="pm-card"><h4>${uiText("Ready to start?", "레슨을 시작할까요?")}</h4><p class="pc-note">${uiText("Sample lesson room.", "예시 레슨 통화방입니다.")}</p><button type="button" class="button button-primary" data-pm-rejoin>${uiText("Start now", "지금 시작")}</button></div>`)
  })
  root.addEventListener("submit", (e) => {
    if (!e.target.matches("[data-pm-survey]")) return
    e.preventDefault()
    sheet(`<div class="pm-card"><h4>${uiText("Thanks for your feedback", "의견을 남겨 주셔서 감사합니다.")}</h4><p class="pc-note">${uiText("Go to customer support for help · demo, nothing was sent.", "도움이 필요하면 고객 지원에 문의하세요. 데모에서는 의견이 전송되지 않았습니다.")}</p><button type="button" class="button button-outline" data-pm-close>${uiText("Close", "닫기")}</button></div>`)
  })
  q("grant").addEventListener("change", (e) => {
    st.grant = e.target.checked
    if (!st.grant) {
      st.pod = false
      stopCamera()
    }
    draw()
  })
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !q("where").hidden) return setWhere(false), q("rec").focus()
    if (e.key === "Escape" && q("sheet").querySelector("[data-pm-back]")) return resume()
    if (!st.pod || q("call").hidden || e.target.closest("input, textarea, select")) return
    const map = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "in", ArrowDown: "out" }
    const buttonKey = e.key === " " || e.key === "Enter"
    const dir = map[e.key] || (buttonKey && e.target.closest("[data-pm-pod]")?.dataset.pmPod)
    if (dir) {
      e.preventDefault()
      if (!e.repeat) holdCamera(dir, e.key)
    }
  })
  root.addEventListener("keyup", (e) => {
    if (heldInput === e.key) {
      e.preventDefault()
      stopCamera()
    }
  })
  const podbar = q("podbar")
  podbar.addEventListener("pointerdown", (e) => {
    const button = e.target.closest("[data-pm-pod]")
    if (!button || !st.pod || !e.isPrimary || e.button !== 0) return
    button.setPointerCapture(e.pointerId)
    holdCamera(button.dataset.pmPod, e.pointerId)
  })
  function releasePointer(e) {
    if (heldInput === e.pointerId) stopCamera()
  }
  podbar.addEventListener("pointerup", releasePointer)
  podbar.addEventListener("pointercancel", releasePointer)
  podbar.addEventListener("lostpointercapture", releasePointer)
  root.addEventListener("focusout", () => {
    if (typeof heldInput === "string") stopCamera()
  })
  window.addEventListener("blur", stopCamera)
  document.addEventListener("visibilitychange", stopCamera)
  draw()
  clocks()
  tick = setInterval(clocks, 1000)
  return () => {
    stopCamera()
    window.removeEventListener("blur", stopCamera)
    document.removeEventListener("visibilitychange", stopCamera)
    clearInterval(tick)
    clearTimeout(toastTimer)
    clearTimeout(recTimer)
  }
}
