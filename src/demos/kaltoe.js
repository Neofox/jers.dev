import { icon } from "../scripts/icons.js"
import { demoShell } from "./shared.js"

// Kaltoe Timer · workday scrubber. Re-implements the documented WorkCalculator / DisplayState /
// LabelAppearance rules (defaults: 8h work, 1h break, lunch 11:30–12:30 with 10 min early leave,
// 12h weekly overtime cap, 22:00 cutoff, family day −2h, earliest start 07:00). Times are sample data.
function markup() {
  return demoShell(
    "kaltoe",
    "Kaltoe Timer workday",
    `<div class="kt-demo">
      <div class="kt-bar-preview" aria-hidden="true">
        <div class="kt-menubar"><span class="kt-label" data-kt="label"></span></div>
        <p class="kt-caption" data-kt="caption"></p>
      </div>
      <div class="kt-controls">
        <div class="kt-row"><label class="kt-field"><span>Clock-in</span><select data-kt="in"><option value="480">08:00</option><option value="540" selected>09:00</option><option value="600">10:00</option><option value="-1">Not clocked in</option></select></label>
        <label class="kt-field"><span>Week's overtime so far</span><select data-kt="week"><option value="0">0:00</option><option value="360">6:00</option><option value="690" >11:30</option></select></label></div>
        <div class="kt-row kt-toggles"><button type="button" class="cf-pill" data-kt="family" aria-pressed="false">Family day</button><button type="button" class="cf-pill" data-kt="out" aria-pressed="false">Clock out now</button>
          <span class="kt-seg" role="group" aria-label="Label style"><button type="button" data-kt-style="ring" aria-pressed="true">Ring</button><button type="button" data-kt-style="track" aria-pressed="false">Track</button></span></div>
        <dl class="kt-read" aria-live="polite"><div><dt>State</dt><dd data-kt="state"></dd></div><div><dt>Leave time</dt><dd data-kt="leave"></dd></div><div><dt>Fill</dt><dd data-kt="fill"></dd></div><div><dt>Day</dt><dd data-kt="day"></dd></div></dl>
      </div>
      <div class="kt-scrub"><label for="kt-time" class="kt-field"><span>Time of day</span><output data-kt="now"></output></label>
        <input id="kt-time" type="range" min="420" max="1395" step="5" value="645" data-kt="time">
        <div class="kt-marks" aria-hidden="true" data-kt="marks"></div></div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const R = { work: 480, brk: 60, cap: 720, cutoff: 1320, lunchStart: 690, lunchEnd: 750, early: 10, family: 120, earliest: 420 }
  const stops = [[0x25, 0x8e, 0xf7], [0x14, 0xcc, 0xb6], [0x51, 0xcc, 0x29], [0xf2, 0x9b, 0x0c]] // dark-bar spectrum
  const q = (k) => root.querySelector(`[data-kt="${k}"]`)
  const st = { clockOut: null, family: false, style: "ring" }
  const pad = (n) => String(n).padStart(2, "0")
  const clock = (m) => pad(Math.floor(m / 60)) + ":" + pad(m % 60)
  const hm = (m) => {
    const v = Math.max(0, Math.floor(m))
    return Math.floor(v / 60) + ":" + pad(v % 60)
  }
  const signed = (m) => (m < 0 ? "-" : "+") + hm(Math.abs(m))
  const clamp = (v) => Math.min(1, Math.max(0, v))
  function spectrum(p) {
    const x = clamp(p) * 3,
      i = Math.min(2, Math.floor(x)),
      t = x - i
    const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * t))
    return `rgb(${c.join(",")})`
  }
  function compute(now) {
    const clockIn = +q("in").value
    if (clockIn < 0 || now < clockIn) return { phase: "idle", text: "--:--", glyph: "clock", state: "Not clocked in", fill: 0, day: 0 }
    const start = Math.max(clockIn, R.earliest),
      target = Math.max(0, R.work - (st.family ? R.family : 0))
    const overlap = Math.max(0, Math.min(start + target, R.lunchEnd) - Math.max(start, R.lunchStart))
    const brk = target > R.work / 2 ? R.brk : Math.min(R.brk, overlap)
    const leave = start + target + brk
    const out = st.clockOut != null && now >= st.clockOut ? st.clockOut : null
    const at = out ?? now
    const day = leave > start ? clamp((at - start) / (leave - start)) : 0
    const base = { leave, day }
    if (out != null) {
      const net = Math.max(0, out - start - R.brk)
      return { ...base, phase: "settled", text: signed(net - target), glyph: "check", state: "Settled · clocked out", fill: day }
    }
    const left = leave - now
    if (left > 0) {
      const lunch = leave > R.lunchEnd
      const lunchGo = R.lunchStart - R.early
      let state, glyph, fill, to
      if (lunch && now < lunchGo) {
        ;[state, glyph, to] = ["To lunch", "fork", lunchGo]
        fill = (now - start) / (lunchGo - start)
      } else if (lunch && now < R.lunchEnd) {
        const from = Math.max(start, lunchGo)
        ;[state, glyph, to] = ["On break", "cup", R.lunchEnd]
        fill = (now - from) / (R.lunchEnd - from)
      } else {
        const from = lunch ? Math.max(start, R.lunchEnd) : start
        ;[state, glyph, to] = ["Counting to leave", left <= 30 ? "walk" : "clock", leave]
        fill = (now - from) / (leave - from)
      }
      return { ...base, phase: "working", text: hm(to - now), glyph, state, fill: clamp(fill) }
    }
    const daily = now - leave,
      weekly = +q("week").value + daily
    const atLimit = weekly >= R.cap || now >= R.cutoff
    const fresh = daily < 1
    return {
      ...base,
      phase: atLimit ? "atLimit" : "overtime",
      text: fresh ? "자유!" : signed(daily),
      glyph: fresh ? "walk" : "flame",
      state: atLimit ? (now >= R.cutoff ? "At limit · 22:00 cutoff" : "At limit · weekly cap") : fresh ? "Overtime · “자유!” (free!)" : "Overtime",
      fill: 1,
    }
  }
  function draw() {
    const now = +q("time").value,
      s = compute(now)
    const color =
      s.phase === "working" ? spectrum(s.day) : s.phase === "overtime" ? "#ff9500" : s.phase === "atLimit" ? "#ff3b30" : "#a0a0a8"
    const fill = Math.round(s.fill * 200) / 200 // the app quantises to 1/200
    const tint = s.phase === "overtime" || s.phase === "atLimit" ? color : "var(--fg)"
    const circ = 2 * Math.PI * 8
    const ring =
      s.phase === "idle"
        ? `<circle cx="11" cy="11" r="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="1.5 2.5"/>`
        : `<circle cx="11" cy="11" r="8" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/><circle cx="11" cy="11" r="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${(circ * fill).toFixed(2)} ${circ.toFixed(2)}" transform="rotate(-90 11 11)"/>`
    q("label").className = "kt-label is-" + st.style + " is-" + s.phase
    q("label").style.setProperty("--kt-color", color)
    q("label").style.setProperty("--kt-fill", fill)
    q("label").innerHTML =
      st.style === "ring"
        ? `<span class="kd-ring"><svg viewBox="0 0 22 22">${ring}</svg><span class="kt-glyph" style="color:${tint}">${icon(s.glyph)}</span></span><span class="kt-text">${s.text}</span>`
        : `<span class="kt-track"><i></i><span class="kt-glyph">${icon(s.glyph)}</span><span class="kt-text">${s.text}</span></span>`
    q("caption").textContent =
      s.phase === "idle" ? "Idle: neutral, dashed." : s.phase === "working" ? "Length = this phase. Color = the whole day." : s.phase === "settled" ? "Settled: neutral, solid." : s.phase === "atLimit" ? "At limit: red." : "Overtime: orange, counting up."
    q("state").textContent = s.state
    q("leave").textContent = s.leave != null ? clock(s.leave) : "—"
    q("fill").textContent = Math.round(fill * 100) + "%"
    q("day").textContent = Math.round((s.day || 0) * 100) + "%"
    q("now").textContent = clock(now)
    q("time").setAttribute("aria-valuetext", clock(now) + " · " + s.state)
    q("family").setAttribute("aria-pressed", String(st.family))
    q("out").setAttribute("aria-pressed", String(st.clockOut != null))
    q("out").textContent = st.clockOut != null ? "Clocked out " + clock(st.clockOut) : "Clock out now"
    root.querySelectorAll("[data-kt-style]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ktStyle === st.style)))
    const span = 1395 - 420,
      pct = (m) => ((m - 420) / span) * 100
    q("marks").innerHTML = [
      [680, "11:20"],
      [750, "12:30"],
      s.leave != null ? [s.leave, "Leave"] : null,
      [1320, "22:00"],
    ]
      .filter(Boolean)
      .map(([m, l]) => `<span style="left:${pct(m)}%">${l}</span>`)
      .join("")
  }
  q("time").addEventListener("input", draw)
  q("in").addEventListener("change", () => ((st.clockOut = null), draw()))
  q("week").addEventListener("change", draw)
  q("family").addEventListener("click", () => ((st.family = !st.family), draw()))
  q("out").addEventListener("click", () => {
    st.clockOut = st.clockOut != null ? null : +q("time").value
    draw()
  })
  root.querySelectorAll("[data-kt-style]").forEach((b) => b.addEventListener("click", () => ((st.style = b.dataset.ktStyle), draw())))
  draw()
}
