import { demoShell, motionEnabled } from "./shared.js"

// Neoharness · one chat turn. Follows the documented event order: user message → "agent is thinking…" →
// reasoning ("Thought for X.XXs") → tool rows (name, args, → result) → streamed reply → stats bar
// (ctx · cache · tk/s · out · calls) → turn end. Stop cancels and drops the partial bubble; a heartbeat
// turn whose only call is end_task(skipped) is dropped. Messages, results and numbers are sample data.
function markup() {
  return demoShell(
    "neoharness",
    "Neoharness chat turn",
    `<div class="nh-demo">
      <div class="nh-chat" data-nh="chat" aria-live="polite"></div>
      <div class="nh-stats" data-nh="stats" aria-label="Turn stats"></div>
      <div class="nh-actions">
        <button type="button" class="button button-primary" data-nh="send">Send sample message</button>
        <button type="button" class="button button-outline" data-nh="step" hidden>Next step</button>
        <button type="button" class="button button-outline" data-nh="beat">Heartbeat tick</button>
        <span class="nh-fact">Tool loop limit · 120 calls per turn</span>
      </div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = (k) => root.querySelector(`[data-nh="${k}"]`)
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;")
  let timer = null,
    steps = [],
    i = 0,
    running = false
  const userTurn = [
    { at: "user", text: "We picked the train for Busan. Remember that, please." },
    { at: "thinking" },
    { at: "reason", text: "Thought for 1.24s" },
    { at: "tool", name: "recall", args: '{"query":"Busan trip"}', result: '1 memory · "Busan trip: transport undecided"' },
    { at: "tool", name: "memory", args: '{"action":"update","content":"Busan trip: going by train"}', result: '{"ok":true}' },
    { at: "reply", text: "Noted — the Busan trip is now by train. I updated the earlier memory instead of adding a duplicate." },
    { at: "end", status: "ok" },
  ]
  const beatTurn = [
    { at: "user", text: '[heartbeat] morning check. Decide whether to act; if nothing needs doing, call end_task(status: "skipped").', system: true },
    { at: "thinking" },
    { at: "tool", name: "end_task", args: '{"status":"skipped"}', result: '{"ok":true}' },
    { at: "end", status: "skipped" },
  ]
  function stats(live, done) {
    q("stats").className = "nh-stats" + (live ? " live" : "")
    q("stats").innerHTML = done
      ? "<span>ctx <b>12.3k</b></span><span>cache <b>64%</b></span><span>tk/s <b>41.2</b></span><span>out <b>96</b></span><span>calls <b>3</b></span>"
      : live
        ? "<span>ctx <b>12.3k</b></span><span>cache <b>64%</b></span><span>tk/s <b>—</b></span><span>out <b>0</b></span>"
        : ""
  }
  function bubble() {
    return q("chat").querySelector(".nh-pending")
  }
  function apply(s) {
    const chat = q("chat")
    if (s.at === "user") {
      chat.insertAdjacentHTML("beforeend", `<div class="nh-msg user${s.system ? " sys" : ""}"><p>${esc(s.text)}</p></div>`)
      stats(true, false)
    } else if (s.at === "thinking") {
      chat.insertAdjacentHTML("beforeend", '<div class="nh-msg agent nh-pending"><p class="nh-think">agent is thinking…</p></div>')
    } else if (s.at === "reason") {
      bubble().querySelector(".nh-think").textContent = s.text
    } else if (s.at === "tool") {
      bubble().insertAdjacentHTML(
        "beforeend",
        `<details class="nh-tool"><summary><i class="nh-dot done" aria-hidden="true"></i><b>${s.name}</b><code>${esc(s.args)}</code><span>→ ${esc(s.result).slice(0, 90)}</span></summary><pre>${esc(s.args)}\n→ ${esc(s.result)}</pre></details>`,
      )
    } else if (s.at === "reply") {
      bubble().insertAdjacentHTML("beforeend", `<p class="nh-reply">${esc(s.text)}</p>`)
      stats(true, true)
    } else if (s.at === "end") {
      const b = bubble()
      if (s.status === "skipped") {
        chat.querySelector(".nh-msg.sys")?.remove()
        b?.remove()
        chat.insertAdjacentHTML("beforeend", '<p class="nh-note">Heartbeat skipped · the whole turn is dropped</p>')
        stats(false, false)
      } else {
        b?.classList.remove("nh-pending")
        stats(false, true)
      }
      finish()
    }
  }
  function finish() {
    running = false
    clearTimeout(timer)
    q("send").textContent = "Send sample message"
    q("send").disabled = false
    q("beat").disabled = false
    q("step").hidden = true
  }
  function start(list) {
    q("chat").innerHTML = ""
    stats(false, false)
    steps = list
    i = 0
    running = true
    q("send").textContent = "Stop"
    q("send").title = "Cancel the current turn"
    q("beat").disabled = true
    q("step").hidden = false
    advance(true)
  }
  function advance(auto) {
    if (!running) return
    apply(steps[i++])
    if (running && auto && motionEnabled()) timer = setTimeout(() => advance(true), 900)
  }
  q("send").addEventListener("click", () => {
    if (running) {
      // Stop: cancel the turn; the partial bubble is dropped
      bubble()?.remove()
      q("chat").insertAdjacentHTML("beforeend", '<p class="nh-note">Turn cancelled · partial reply dropped</p>')
      stats(false, false)
      finish()
      q("send").focus()
    } else start(userTurn)
  })
  q("beat").addEventListener("click", () => start(beatTurn))
  q("step").addEventListener("click", () => {
    clearTimeout(timer)
    advance(false)
  })
  return () => clearTimeout(timer)
}
