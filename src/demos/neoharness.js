import { uiText } from "./demo-locale.js"
import { demoShell, motionEnabled } from "./shared.js"

// Neoharness · one chat turn. Follows the documented event order: user message → "agent is thinking…" →
// reasoning ("Thought for X.XXs") → tool rows (name, args, → result) → streamed reply → stats bar
// (ctx · cache · tk/s · out · calls) → turn end. Stop cancels and drops the partial bubble; a heartbeat
// turn whose only call is end_task(skipped) is dropped. Messages, results and numbers are sample data.
function markup() {
  return demoShell(
    "neoharness",
    uiText("Neoharness chat turn", "Neoharness 대화 한 턴"),
    `<div class="nh-demo">
      <div class="nh-chat" data-nh="chat" data-empty-label="${uiText("Send the sample message to watch one turn.", "예시 메시지를 보내면 대화가 어떻게 진행되는지 볼 수 있습니다.")}" aria-live="polite"></div>
      <div class="nh-stats" data-nh="stats" role="group" aria-label="${uiText("Turn stats", "이번 턴의 사용 통계")}"></div>
      <div class="nh-actions">
        <button type="button" class="button button-primary" data-nh="send">${uiText("Send sample message", "예시 메시지 보내기")}</button>
        <button type="button" class="button button-outline" data-nh="step" hidden>${uiText("Next step", "다음 단계")}</button>
        <button type="button" class="button button-outline" data-nh="beat">${uiText("Heartbeat tick", "정기 점검 실행")}</button>
        <span class="nh-fact">${uiText("Tool loop limit · 120 calls per turn", "한 턴에서 도구를 최대 120회 호출할 수 있습니다.")}</span>
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
    { at: "user", text: uiText("We picked the train for Busan. Remember that, please.", "부산 갈 때는 기차를 타기로 했어. 기억해 줘.") },
    { at: "thinking" },
    { at: "reason", text: uiText("Thought for 1.24s", "1.24초 동안 생각했습니다.") },
    { at: "tool", name: "recall", args: JSON.stringify({ query: uiText("Busan trip", "부산 여행") }), result: uiText('1 memory · "Busan trip: transport undecided"', '메모 1개 · "부산 여행: 교통편 미정"') },
    { at: "tool", name: "memory", args: JSON.stringify({ action: "update", content: uiText("Busan trip: going by train", "부산 여행: 기차로 이동") }), result: '{"ok":true}' },
    { at: "reply", text: uiText("Noted — the Busan trip is now by train. I updated the earlier memory instead of adding a duplicate.", "부산에는 기차로 간다고 기억해 둘게요. 같은 메모가 두 개 생기지 않도록 전에 남긴 내용을 수정했어요.") },
    { at: "end", status: "ok" },
  ]
  const beatTurn = [
    { at: "user", text: uiText('[heartbeat] morning check. Decide whether to act; if nothing needs doing, call end_task(status: "skipped").', '[heartbeat] 아침 점검입니다. 처리할 일이 있는지 확인하고, 없으면 end_task(status: "skipped")를 호출하세요.'), system: true },
    { at: "thinking" },
    { at: "tool", name: "end_task", args: '{"status":"skipped"}', result: '{"ok":true}' },
    { at: "end", status: "skipped" },
  ]
  function stats(live, done) {
    q("stats").className = "nh-stats" + (live ? " live" : "")
    q("stats").innerHTML = done
      ? `<span>${uiText("ctx", "컨텍스트")} <b>12.3k</b></span><span>${uiText("cache", "캐시")} <b>64%</b></span><span>${uiText("tk/s", "토큰/초")} <b>41.2</b></span><span>${uiText("out", "출력")} <b>96</b></span><span>${uiText("calls", "호출")} <b>3</b></span>`
      : live
        ? `<span>${uiText("ctx", "컨텍스트")} <b>12.3k</b></span><span>${uiText("cache", "캐시")} <b>64%</b></span><span>${uiText("tk/s", "토큰/초")} <b>—</b></span><span>${uiText("out", "출력")} <b>0</b></span>`
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
      chat.insertAdjacentHTML("beforeend", `<div class="nh-msg agent nh-pending"><p class="nh-think">${uiText("agent is thinking…", "에이전트가 생각하는 중…")}</p></div>`)
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
        chat.insertAdjacentHTML("beforeend", `<p class="nh-note">${uiText("Heartbeat skipped · the whole turn is dropped", "정기 점검에서 할 일이 없어 이번 턴을 기록하지 않았습니다.")}</p>`)
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
    q("send").textContent = uiText("Send sample message", "예시 메시지 보내기")
    q("send").removeAttribute("title")
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
    q("send").textContent = uiText("Stop", "중지")
    q("send").title = uiText("Cancel the current turn", "현재 턴 취소")
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
      q("chat").insertAdjacentHTML("beforeend", `<p class="nh-note">${uiText("Turn cancelled · partial reply dropped", "턴을 취소하고 작성 중이던 답변을 지웠습니다.")}</p>`)
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
