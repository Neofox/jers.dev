import { uiText } from "./demo-locale.js"
import { demoShell } from "./shared.js"

// Gleamstral · request builder. Mirrors src/gleamstral/chat.gleam and client.gleam: setters clamp
// (temperature 0.0…1.5, top_p 0.0…1.0, max_tokens ≥ 0, where 0 is sent as null), complete_request builds
// POST https://api.mistral.ai/v1/chat/completions with body_encoder's fields in order, and nothing is sent:
// your HTTP client sends it. handle_response maps 200 → decoded Response (or "Failed to decode response"),
// 401 → Unauthorized, 429 → RateLimitExceeded, anything else → Unknown(message). Replies are sample data.
function markup() {
  const models = [
    ["MistralLarge", "mistral-large-latest"], ["MistralMedium", "mistral-medium-latest"], ["MistralSmall", "mistral-small-latest"],
    ["Ministral3B", "ministral-3b-latest"], ["Ministral8B", "ministral-8b-latest"], ["PixtralLarge", "pixtral-large-latest"],
    ["Pixtral", "pixtral-12b-2409"], ["MistralNemo", "open-mistral-nemo"], ["MistralSaba", "mistral-saba-latest"],
  ]
  const formats = [["Text", "Text"], ["JsonObject", "JsonObject"], ["JsonSchema", "JsonSchema"]]
  const replies = [["200", "200 OK"], ["200bad", uiText("200 · missing field", "200 · 필드 누락")], ["401", "401"], ["429", "429"], ["503", "503"]]
  return demoShell(
    "gleamstral",
    uiText("Gleamstral chat request builder", "Gleamstral 채팅 요청 만들기"),
    `<div class="gs">
      <div class="gs-controls">
        <label class="kt-field"><span>${uiText("Model", "모델")}</span><select data-gs="model">${models.map(([c, s]) => `<option value="${c}|${s}"${c === "MistralSmall" ? " selected" : ""}>model.${c}</option>`).join("")}</select></label>
        <label class="gs-range"><span>set_temperature <output data-gs="t-out"></output></span><input type="range" min="-0.5" max="2" step="0.1" value="0.7" data-gs="t" aria-label="${uiText("Temperature", "샘플링 온도")}"></label>
        <label class="gs-range"><span>set_top_p <output data-gs="p-out"></output></span><input type="range" min="-0.2" max="1.2" step="0.05" value="1" data-gs="p" aria-label="${uiText("Top p", "누적 확률 상한(Top p)")}"></label>
        <label class="gs-range"><span>set_max_tokens <output data-gs="m-out"></output></span><input type="range" min="-50" max="300" step="10" value="100" data-gs="m" aria-label="${uiText("Maximum tokens", "최대 토큰 수")}"></label>
        <div class="gs-format"><span class="illo-kicker">${uiText("Response format", "응답 형식")}</span><div class="tl-seg" role="group" aria-label="${uiText("Response format", "응답 형식")}">${formats.map(([v, l]) => `<button type="button" data-gs-format="${v}" aria-pressed="${v === "JsonSchema"}">${l}</button>`).join("")}</div></div>
      </div>
      <div class="gs-panel gs-code"><p class="illo-kicker">${uiText("Your Gleam", "Gleam 코드")}</p><pre data-gs="code"></pre></div>
      <div class="gs-panel gs-req"><p class="illo-kicker">${uiText("complete_request → Request(String) · built, not sent", "complete_request → Request(String) · 요청 생성 완료, 전송 전")}</p><pre data-gs="req"></pre><p class="gs-note">${uiText("Body shown formatted;", "여기서는 본문을 읽기 쉽게 표시합니다.")} <code>json.to_string</code> ${uiText("sends it compact.", "호출 시에는 공백 없이 직렬화합니다.")}</p></div>
      <div class="gs-panel gs-send"><p class="illo-kicker">${uiText("Your HTTP client sends it · sample replies", "선택한 HTTP 클라이언트로 전송 · 응답 예시")}</p>
        <div class="tl-seg" role="group" aria-label="${uiText("Sample HTTP reply", "HTTP 응답 예시")}">${replies.map(([v, l]) => `<button type="button" data-gs-reply="${v}" aria-pressed="${v === "200"}">${l}</button>`).join("")}</div>
        <p class="illo-kicker">${uiText("Sample reply body", "응답 본문 예시")}</p><pre data-gs="raw"></pre>
        <p class="illo-kicker">chat.handle_response(response)</p><pre class="gs-decoded" data-gs="decoded" aria-live="polite"></pre>
      </div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = (k) => root.querySelector(`[data-gs="${k}"]`)
  const st = { format: "JsonSchema", reply: "200" }
  // Gleam prints floats with a decimal point (1.0, not 1)
  const F = (n) => ({ f: Math.round(n * 1000) / 1000 })
  const fmtF = (n) => (Number.isInteger(n) ? n.toFixed(1) : String(n))
  function toJson(v, ind = "") {
    const next = ind + "  "
    if (v === null) return "null"
    if (v && typeof v === "object" && "f" in v) return fmtF(v.f)
    if (typeof v === "string") return JSON.stringify(v)
    if (typeof v !== "object") return String(v)
    if (Array.isArray(v)) return v.length ? `[\n${v.map((x) => next + toJson(x, next)).join(",\n")}\n${ind}]` : "[]"
    const keys = Object.keys(v)
    return keys.length ? `{\n${keys.map((k) => `${next}${JSON.stringify(k)}: ${toJson(v[k], next)}`).join(",\n")}\n${ind}}` : "{}"
  }
  const bookSchema = {
    type: "object",
    properties: { name: { type: "string" }, authors: { type: "array", items: { type: "string" } } },
    required: ["name", "authors"],
  }
  function draw() {
    const [ctor, modelId] = q("model").value.split("|")
    const tRaw = +(+q("t").value).toFixed(2),
      pRaw = +(+q("p").value).toFixed(2),
      mRaw = +q("m").value
    const t = Math.min(1.5, Math.max(0, tRaw)), // float.clamp(temperature, 0.0, 1.5)
      p = Math.min(1, Math.max(0, pRaw)), // float.clamp(top_p, 0.0, 1.0)
      m = Math.max(0, mRaw) // int.max(max_tokens, 0)
    const note = (raw, val, extra = "") => (raw !== val ? `${fmtF(raw)} → ${fmtF(val)}${extra}` : fmtF(val))
    q("t-out").textContent = note(tRaw, t)
    q("p-out").textContent = note(pRaw, p)
    q("m-out").textContent = mRaw !== m ? `${mRaw} → ${m}` : String(m)
    const fmtCall =
      st.format === "Text" ? "" : st.format === "JsonObject" ? "\n  |> chat.set_response_format(chat.JsonObject)" : '\n  |> chat.set_response_format(\n    chat.JsonSchema(schema: book_schema, name: "book"),\n  )'
    const comment = (raw, val, lo) => (raw !== val ? uiText(`  // clamped to ${lo}`, `  // ${lo} 범위로 제한`) : "")
    q("code").textContent =
      `let chat_client =\n  chat.new(client)\n  |> chat.set_temperature(${fmtF(tRaw)})${comment(tRaw, t, "0.0…1.5")}\n  |> chat.set_top_p(${fmtF(pRaw)})${comment(pRaw, p, "0.0…1.0")}\n  |> chat.set_max_tokens(${mRaw})${mRaw !== m ? "  // int.max(_, 0)" : m === 0 ? uiText("  // 0 → sent as null", "  // 0은 null로 전송") : ""}${fmtCall}\n\nchat_client\n|> chat.complete_request(model.${ctor}, messages)\n|> httpc.send  // ${uiText("your client, your choice", "선택한 HTTP 클라이언트로 전송")}`
    const body = {
      model: modelId,
      temperature: F(t),
      top_p: F(p),
      max_tokens: m === 0 ? null : m,
      stream: false,
      stop: [],
      random_seed: null,
      messages: [
        { role: "system", content: uiText("Extract the book informations", "도서 제목과 저자를 추출해 줘.") },
        { role: "user", content: uiText("I recently read To Kill a Mockingbird by Harper Lee.", "최근에 하퍼 리의 『앵무새 죽이기』를 읽었어.") },
      ],
      response_format:
        st.format === "Text"
          ? { type: "text" }
          : st.format === "JsonObject"
            ? { type: "json_object" }
            : { type: "json_schema", json_schema: { name: "book", schema: bookSchema, strict: true } },
      tools: [],
      tool_choice: "auto",
      presence_penalty: F(0),
      frequency_penalty: F(0),
      n: 1,
      prediction: { type: "content", content: "" },
      safe_prompt: false,
    }
    q("req").textContent =
      "POST https://api.mistral.ai/v1/chat/completions\nauthorization: Bearer <your-api-key>\ncontent-type: application/json\n\n" + toJson(body)
    // Sample replies and what handle_response turns them into
    const content = st.format === "Text" ? uiText("To Kill a Mockingbird was written by Harper Lee.", "『앵무새 죽이기』의 저자는 하퍼 리입니다.") : JSON.stringify({ name: uiText("To Kill a Mockingbird", "앵무새 죽이기"), authors: [uiText("Harper Lee", "하퍼 리")] })
    const okBody = (withToolCalls) => ({
      id: "sample-0001",
      object: "chat.completion",
      created: 1700000000,
      model: modelId,
      choices: [{ index: 0, message: withToolCalls ? { role: "assistant", content, tool_calls: null } : { role: "assistant", content }, finish_reason: "stop" }],
      usage: { prompt_tokens: 31, completion_tokens: 17, total_tokens: 48 },
    })
    let raw, decoded
    if (st.reply === "200") {
      raw = toJson(okBody(true))
      decoded = `Ok(Response(\n  id: "sample-0001",\n  object: "chat.completion",\n  created: 1700000000,\n  model: "${modelId}",\n  choices: [\n    ChatCompletionChoice(\n      index: 0,\n      message: AssistantMessage(${JSON.stringify(content)}, None, False),\n      finish_reason: Stop,\n    ),\n  ],\n  usage: Usage(prompt_tokens: 31, completion_tokens: 17, total_tokens: 48),\n))`
    } else if (st.reply === "200bad") {
      raw = toJson(okBody(false))
      decoded = 'Error(Unknown("Failed to decode response"))\n// ' + uiText('assistant messages need a "tool_calls" field (it may be null)', '응답 메시지에 "tool_calls" 필드가 필요합니다. 값은 null이어도 됩니다.')
    } else if (st.reply === "401") {
      raw = toJson({ message: "Unauthorized" })
      decoded = "Error(Unauthorized)"
    } else if (st.reply === "429") {
      raw = toJson({ message: "Requests rate limit exceeded" })
      decoded = "Error(RateLimitExceeded)"
    } else {
      raw = toJson({ message: "Service unavailable" })
      decoded = 'Error(Unknown("Service unavailable"))\n// ' + uiText('any other status: the body\'s "message" field', '그 밖의 상태 코드에서는 본문의 "message" 필드를 사용합니다.')
    }
    q("raw").textContent = `HTTP ${st.reply === "200bad" ? "200" : st.reply} · ${uiText("sample, nothing was sent", "응답 예시 · 실제 요청은 보내지 않았습니다.")}\n${raw}`
    q("decoded").textContent = decoded
    q("decoded").classList.toggle("is-error", decoded.startsWith("Error"))
    root.querySelectorAll("[data-gs-format]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gsFormat === st.format)))
    root.querySelectorAll("[data-gs-reply]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gsReply === st.reply)))
  }
  ;["model", "t", "p", "m"].forEach((k) => q(k).addEventListener("input", draw))
  root.querySelectorAll("[data-gs-format]").forEach((b) => b.addEventListener("click", () => ((st.format = b.dataset.gsFormat), draw())))
  root.querySelectorAll("[data-gs-reply]").forEach((b) => b.addEventListener("click", () => ((st.reply = b.dataset.gsReply), draw())))
  draw()
}
