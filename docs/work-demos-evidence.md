# Work demos: source evidence

The Work page has eight working demos. Each one re-implements observed product behaviour in the portfolio's own code, using sample data only. No private code, SVG, screenshots, customer or site data, credentials, or network calls were copied or used.

Company repositories were read in read-only mode (CodeGraph first where an index exists). Personal repositories were read locally.

Every demo is labelled "Working demo · sample data" on the page. Real captures stay in their window frame, and illustrations keep their dashed "Illustration" tag.

## Beamo viewer (3i case, `#work/3i/beamo`)

**Sources**
- `frontend.web.beamo.beamo-viewer`:
  - `react/src/components/catalog/GsMeasureOverlay/useGsMeasureTool.ts` (with `gsMeasureFormat.ts`)
  - `MeasurementToolbar.tsx` (toolbar labels and keys)
  - `ViewerToolbarContainer.tsx` (mode mapping)
  - `RailHelp` content, used as a behaviour reference only
- `frontend.web.common.3dgs-viewer`:
  - `src/measure/MeasureTool.ts`, `snapMath.ts`, `boxMath.ts`, `overlay360.ts`
  - `src/camera/CameraController.ts`
  - `src/section/SectionController.ts`
  - `src/picking/BimPicker.ts`

**Reproduced**
- **Toolbar:** Select / Measure / Build objects, with keys 1·2·3.
- **Measure:**
  - Each click adds a point, with a dashed live preview to the cursor.
  - Points snap to existing points within about 30 px, or lock to a world axis within 10° (with a guide line).
  - Clicking the first point closes the shape when there are 3 or more points.
  - Escape or Finish keeps a line of 2 or more points; Backspace removes the last point.
  - Lines stay until Clear all, which becomes Delete when something is selected. Save shows the count.
- **Build objects:** a box in 4 clicks: corner, edge, depth, height. Labels show `s:` area and `v:` volume.
- **Units:** metres to 2 decimals, or feet as `5' 3"`. Area converts with ×10.7639 and volume with ×35.31467.
- **Cameras:**
  - Orbit: drag rotates the view the opposite way, so it feels like grabbing the world; polar angle clamped to 0.1…π/2+0.35.
  - First-person: W A S D or arrow keys move, Shift is faster, Q/E change eye height, drag looks around, and clicking the floor glides there in 0.55 s.
  - Switching between the two is instant.
- **Section box:** one box clips the whole scene, adjusted with X/Y/Z sliders as in the library demo panel.
- **BIM pick:** clicking an element highlights it orange (`#ff7a18`) and shows its IFC type, Name, GlobalId, ObjectType, Tag and PredefinedType. Picking is off in first-person.
- **Keyboard path (portfolio addition):** `]` / `[` (or the ‹ › buttons) step through snap targets: room, door, window and column corners. In Select they step through measurements and elements instead. Enter or "Place point" / "Select item" places the point or selects the item. Arrow keys orbit, and W A S D / Q E move in first-person.

**Simplified or synthetic**
- The room, elements, GlobalIds and capture dots are invented. Rendering is a small SVG projection, not Three.js or Gaussian splats.
- Snapping is limited to points and axes; the drafter's 2D plan snapping is not shown.
- There is no point dragging in Select mode, and only the X/Y/Z max sliders.
- Save is disabled.
- The readout pill's imperial format (`5.3 ft`) is not shown; only the in-scene label format is.

## Pivo Coaches (3i case, `#work/3i/coaches`; `#work/3i/finder` is an alias)

Coaches is one presentation. The working demo is primary, and "View real capture" opens the current product capture in the existing lightbox.

**Sources**
- `frontend.web.pivo.pivo-coaches`:
  - `src/components/coaches/{filter-pills,coach-list-header,coach-results,coach-card,coach-grid}.tsx`
  - `src/components/ui/Combobox.tsx`
  - `src/types/coach.ts`
  - `src/data/disciplines.ts`

**Reproduced**
- **Discipline:** a single-select filter with the real eight main options.
- **Language:** multi-select. The trigger shows the names when 1–2 are picked, otherwise "N selected".
- **Toggles:** "Pivo Certified", and "Accept New Students", which is on by default.
- **Sort:** Relevance (a stable seeded order), Popularity, Oldest first and Newest first.
- **Results:** a "Found N Coaches" header, pages of 6, "Loading more coaches..." and the empty-state text. The product loads further pages by infinite scroll; the demo uses an explicit "Load more coaches" button.
- **Card:** the "Pivo Certified" / "Accepting Students" badges, then name, city and country, a two-line bio and "See More".

**Simplified or synthetic**
- The coaches are fictional, and filtering runs locally; the product filters on the server.
- AND across categories and OR within languages is an assumption, because the matching logic is in the backend.
- AI search is left out because it calls a live endpoint.
- The header says "1 Coach" in the singular; the product shows "1 Coaches".
- "See More" opens an in-demo sample profile built from the same fictional record (discipline, languages, certification, new students); the product navigates to the coach's page. There are no profile images.

## Pivo Meet (3i case, `#work/3i/live`; `#work/3i/recordings` is an alias)

**Sources**
- `frontend.web.pivo.pivo-meet` (read-only; AGENTS.md read, nothing installed or run):
  - `components/cameras/CamerasLayout.vue`, `ParticipantBadge.vue`
  - `controls/RoomControls.vue`, `controls/ToggleRecordingButton.vue`, `LeaveRoomButton.vue`
  - `stores/ui.ts`, `store/guest-control.ts`, `use-pod-controls.ts`
  - `use-cloud-recording-rtm.ts`, `recorder/cloud.ts`, `RoomElapsedTimer.vue`, `RateYourMeet.vue`

**Reproduced**
- **Participants and layouts:** exactly two people ("Me" and "Guest"). The three layouts are side by side, small preview and large preview.
- **Mic and camera:** toggles with "Microphone on/off" and "Camera on/off" toasts and the badge mic state.
- **Camera control:** it refuses with "You can't move their camera. Ask guest to turn "Guest Control" on." until the other side grants it. Then a bar shows Rotate (← →) and Zoom in/out (↑ ↓), and the arrow keys move their camera view.
- **Recording:**
  - "Start recording" opens "Where to save?". Cloud shows hours remaining; Desktop (BETA) is shown but disabled in the demo.
  - The button then goes "Starting..." → `HH:MM / HH:MM` → "Stopping..." → "Processing...".
  - Toasts: "Recording Started" / "This meeting is now being recorded", and "Cloud recording saved successfully".
- **Room timer:** MM:SS.
- **Leaving:** Leave asks "Are you sure you want to leave this video call?", then "How was your call?" with 5 stars, "Tell us how we can improve?" and Skip/Submit. "Ready to start?" / "Start now" rejoins.

**Simplified or synthetic**
- No camera, microphone, device permission, Agora, network or recording is used. Videos are drawn sample tiles.
- The guest's grant is a local checkbox.
- The recording clock runs in real time from 00:00.
- The thank-you heading is paraphrased; the source shows a thank-you popup with "Go to customer support for help".
- Not shown: settings, background effects, the time-limit countdown, network warnings, subscription gating and desktop recording.

## Pivo Cloud (3i case, `#work/3i/library`)

**Sources**
- `frontend.web.pivo.pivo-cloud` (read-only; AGENTS.md read, nothing installed or run):
  - `features/dashboard/components/{CategoryTab,LeftPanel}.vue`, `content/{FileList,SelectFile,NoFile}.vue`
  - `file-operations/{delete,share,info}`
  - `components/ui/FileCarousel.vue`, `components/shared/StorageUsageBar.vue`
  - `lib/utils/file.ts`, `store/object.store.ts`

**Reproduced**
- **Navigation:** "Cloud Gallery" / "Lesson Gallery" tabs, and the "My cloud" panel with "Pivo Track Gallery" / "Pivo Lessons".
- **Grouping:** items are grouped by day, newest first, with "Today", "Yesterday", or an en-US long date as headers.
- **Cards:** 4:3 with a play icon and the status badges (Stabilized, Processing, Compressed, Gigapixel). A validating file has a spinner and can't be clicked or selected.
- **Select mode:**
  - "Select" / "Cancel"; leaving select mode clears the selection. There is a select-all box.
  - Share and Delete need 1 or more files; Download needs exactly 1.
  - "Delete N files" with "I understand that deleting is permanent and can't be undone." and Close/Delete. Deleting leaves select mode.
  - "Share N files" with Cancel/Copy Link.
- **Viewer:** back button, file name, prev/next disabled at the ends, Esc/←/→/A/D keys, and the Info fields File type, File size and Last modified.
- **Storage:** "used / total" in decimal units via `Intl.NumberFormat`, coloured blue below 80%, yellow from 80% and red from 90%. Deleting files lowers it.
- **Empty state:** "Please upload files from Pivo Track app".

**Simplified or synthetic**
- The files, sizes and thumbnails are samples, with no media.
- Share shows a placeholder `example.invalid` link; nothing is created or copied to the clipboard. Download does nothing beyond a labelled toast. Delete only changes the local sample list.
- Not shown: the 20-item infinite scroll, skeleton loading, video annotation, and the Stabilizer/Gigapixel actions.

## Kaltoe Timer workday (`#work/kaltoe-timer/phases`)

**Sources**
- `perso/timer`:
  - `Sources/KaltoeCore/WorkCalculator.swift`
  - `DisplayState.swift`
  - `LabelAppearance.swift`
  - `MenuBarLabel.swift`
  - `Formatting.swift`

**Reproduced**
- **Default rules:**
  - 8 h of work and a 1 h break.
  - Lunch is 11:30–12:30, and you may leave for it 10 min early.
  - The weekly overtime cap is 12 h, with a 22:00 cutoff.
  - Family day removes 2 h, and the earliest counted start is 07:00.
- **Break deduction:** the full hour if the target is more than half the daily work; otherwise only the overlap with lunch.
- **States:** to lunch, on break, counting, overtime ("자유!" for the first minute, then `+h:mm`), at limit (weekly cap or cutoff), settled after clocking out, and `--:--` when not clocked in.
- **Fill:** shows progress through the current phase, quantised to 1/200.
- **Colour:**
  - Working colour follows whole-day progress across the dark-bar spectrum: blue `#258ef7`, teal `#14ccb6`, green `#51cc29`, amber `#f29b0c`.
  - Overtime is orange `#ff9500`, at limit is red `#ff3b30`, and idle or settled is neutral `#a0a0a8`.
- **Shape:** idle is drawn dashed; there are ring and track styles.

**Simplified or synthetic**
- The clock-in times and the week's overtime are sample values.
- Time off, weekends and light-bar colours are not shown.
- Glyphs are drawn in the portfolio's own icon style, not SF Symbols.

## Translater refinement (`#work/translater/refine`)

**Sources**
- `perso/neotranslate`:
  - `web/static/js/{refine,adjust,learning,prefs,composer}.js`
  - `internal/web/{header,refine,learning}.templ`
  - `shared/translation/i18n/strings.json`
  - `shared/translation/schemas/sentence.json`
  - `e2e/tests/refine.spec.ts`, plus the fixtures, used only to understand the data shape

**Reproduced**
- **Tone:** Friends / Casual / Professional, with Casual as the default.
- **Refinements:** Softer / Direct / Shorter / Playful toggles, capped at 3. Unpressed chips disable with no message; pressed chips stay removable.
- **Regeneration:** every change regenerates the whole result; a newer change supersedes one still running.
- **Cap enforcement:** the cap of 3 is enforced in state the moment you click, so rapid clicks can't select a fourth chip.
- **Failure:** a failed adjustment shows "Adjustment failed: Translation failed." and restores the last completed result and chip set.
- **Breakdown:** rows read as `phrase → gloss`, one open at a time, with In this sentence, Base form and Grammar. It reads from the same result, with no second request.

**Simplified or synthetic**
- All output is pre-written sample Korean, composed by simple rules and labelled "pre-written sample". There is never a live translation.
- The custom refinement input, alternatives, rationale and the word-lookup mode are left out.

## Neoharness turn (`#work/neoharness/turn`)

**Sources**
- `perso/neoharness` (its AGENTS.md was followed):
  - `lib/neoharness_web/live/chat_live.ex`
  - `chat_live/{turn_state,message_stream}.ex`
  - `components/chat_ui/messages.ex` and `components/chat_ui.ex`
  - `agent/loop.ex`, `agent/server/turn.ex`
  - `tools/builtin/{memory,recall}.ex`
  - `scheduler/heartbeat_worker.ex`
  - `config/config.exs`
  - `docs/{memory,schedules}.md`

**Reproduced**
- **Event order:** the user message, then "agent is thinking…", "Thought for X.XXs", tool rows (status dot, name, args and `→` result, expandable), the reply, and the stats bar (`ctx`, `cache`, `tk/s`, `out`, `calls`).
- **Stop:** the "Stop" button cancels the turn and drops the partial reply.
- **Heartbeat:** the nudge text leads to `end_task(status: "skipped")`, and the whole turn is dropped.
- **Tool loop limit:** 120 calls per turn, per the config override.
- **Tools used:** `recall` and `memory` (action `update`).

**Simplified or synthetic**
- The conversation, memory contents and stats numbers are sample values.
- Streaming is stepped rather than token-by-token.
- No model call happens.

## Gleamstral request builder (`#work/gleamstral/request`)

**Sources**
- `perso/gleamstral` (read-only; no `.codegraph`, no AGENTS.md):
  - `README.md`
  - `src/gleamstral/{chat,client,model,message,tool}.gleam`
  - `examples/src/structured_output.gleam`

**Reproduced**
- **Setters and clamps:**
  - `set_temperature` clamps to 0.0…1.5 and `set_top_p` to 0.0…1.0.
  - `set_max_tokens` uses `int.max(_, 0)`, and 0 is encoded as `null`.
  - Out-of-range slider values show the clamp, both in the code and in the body.
- **Request:** `complete_request` builds `POST https://api.mistral.ai/v1/chat/completions` with `authorization: Bearer …` and `content-type: application/json`. The body follows `body_encoder`'s fields in order and defaults: `stream: false`, `stop: []`, `random_seed: null`, `tools: []`, `tool_choice: "auto"`, penalties 0.0, `n: 1`, `prediction` content "", and `safe_prompt: false`. Floats print with a decimal point.
- **Response formats:** Text → `{"type":"text"}`, JsonObject → `{"type":"json_object"}`, and JsonSchema → `{"type":"json_schema","json_schema":{"name","schema","strict":true}}`.
- **Models:** the chat models from `model.gleam`, with their API ids.
- **Sending:** nothing is sent. The code ends with `|> httpc.send` to show that the caller's HTTP client sends the request.
- **`handle_response`:**
  - 200 decodes to a `Response` with `AssistantMessage(content, None, False)` and `finish_reason: Stop`.
  - A 200 reply whose assistant message lacks the required `tool_calls` field gives `Error(Unknown("Failed to decode response"))`.
  - 401 gives `Error(Unauthorized)`, and 429 gives `Error(RateLimitExceeded)`.
  - Any other status gives `Error(Unknown(message))` from the body's `message` field.

**Simplified or synthetic**
- The messages come from the public structured-output example.
- The schema is written by hand; the example builds it with `json/blueprint`.
- The replies, ids, timestamps and token counts are samples. No API key is asked for or used, and no network call happens.
- `MistralEmbed` is left out of the model list because this is the chat endpoint.
- Tools, streaming and the embeddings and agent modules are not shown.

## Not given demos

Enhans and Rubiwin/Supplier Portal keep their captures and illustrations, because no local source was available for a grounded demo. Gleamstral keeps its library-interface illustration as a second screen (`#work/gleamstral/interface`).
