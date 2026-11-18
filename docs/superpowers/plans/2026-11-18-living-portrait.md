# Living Portrait Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Where should AI stop?" demo with a portrait of Jérôme that follows the visitor across the site and reacts to what they look at, with each reaction decided live by OpenAI's Decisions API.

**Architecture:** One catalog module (`lib/portrait-catalog.mjs`) is the single source of truth for reactable items, asides and fallback faces. A server route (`/api/portrait`) validates `{action, itemId, recent}`, asks `gpt-6-luna` four typed questions through the `openai` SDK, applies the decision rules and returns the reaction plus its telemetry. In the browser, `portfolio.js` only emits `portrait:trigger` events; a separate module script (`portrait.mjs`) owns the dock, throttling, fetching, crossfades and the "why this face?" drawer.

**Tech Stack:** Next.js 16 app router, Node.js 24, `openai` Node SDK ≥ 7.59 (`client.decisions.create`), vanilla JS in the browser, `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-18-living-portrait-design.md`

## Global Constraints

- Work on branch `feat/living-portrait`, never on `main`.
- Package manager: use `aube` (`aube add`, `aubr <script>`), not npm/bun. If `aube add` replaces `bun.lockb` with a different lockfile format, stop and ask Jérôme.
- `OPENAI_API_KEY` is server-only; never prefix with `NEXT_PUBLIC_`, never log it.
- Model `gpt-6-luna`; SDK client options `maxRetries: 0`, `timeout: 4000` (ms).
- Expressions, exactly: `neutral`, `smile`, `grin`, `proud`, `wince`, `laugh`, `thinking`, `surprised`. Images at `/assets/portrait/portrait-<expression>.webp` (already generated, 960×960).
- Actions, exactly: `open_project`, `open_demo`, `download_resume`, `dwell`, `reach_end`, `idle`, `return`. High priority: `open_project`, `open_demo`, `download_resume`.
- Thresholds (starting values): `should_react` probability ≥ 0.5; `expression` confidence ≥ 0.4.
- Limits: client one call per 10 s (high priority may skip the wait), 20 calls per visit (`sessionStorage`), dwell ≥ 700 ms, idle 45 s once per visit, return after ≥ 60 s hidden once per visit; server 12 requests/min per IP, 1,000 upstream calls/hour per instance; body ≤ 2 KB; `recent` ≤ 4 entries.
- `prompt_cache_key: "portrait-v<CATALOG_VERSION>"`; the cached prefix (developer message + catalog JSON) must exceed 1,024 tokens.
- Price constants in one place: uncached input $0.10 per 1M tokens; output $0. Cached-input price: look it up on OpenAI's pricing page and record the source URL in a comment next to the constant.
- Asides: first person, ≤ 90 characters, no claims absent from the résumé copy in `public/portfolio.js`. Nothing is generated at runtime.
- Only `{action, itemId, recent}` is sent to the server; only catalog IDs and actions reach OpenAI.
- Respect `motionEnabled()` and `prefers-reduced-motion`: crossfade (~250 ms) only when motion is off.
- The site is English-only and dark-only.
- `localStorage`/`sessionStorage` access always wrapped in try/catch.
- Tests: `aubr test` (runs `node --test scripts/*.test.mjs`); also `aubr lint` and `aubr build` before each commit that touches app code.

## Review Focus

1. **Fast navigation:** several triggers fire while a request is in flight → only the response for the latest sent trigger is applied; older ones are discarded (test in Task 5).
2. **Partial answers:** one question comes back as `refusal` while others succeed → use what succeeded, default only the refused part (test in Task 2).
3. **Stale catalog in the browser:** after a deploy, an open tab sends an ID the server no longer knows → 400, and the client silently shows the fallback face without retrying (test in Tasks 3 and 5).
4. **Expression image fails to load:** the previous face stays; no broken image icon (handled in Task 6, manual check in Task 8).
5. **Dock on small screens and over dialogs:** at 360 px wide the dock covers no primary call to action, and it is hidden while any `<dialog>` is open (manual check in Task 8).

---

### Task 1: Item catalog and asides

**Files:**
- Create: `lib/portrait-catalog.mjs`
- Test: `scripts/portrait-catalog.test.mjs`

**Interfaces:**
- Produces:
  - `export const CATALOG_VERSION: number` (start at `1`)
  - `export const EXPRESSIONS: readonly string[]` (the 8, in the order above)
  - `export const EXPRESSION_DESCRIPTIONS: Record<string, string>` (one short line each, used in the question)
  - `export const ACTIONS: readonly string[]`, `export const HIGH_PRIORITY: readonly string[]`
  - `export const ITEMS: Record<string, { kind: "project"|"demo"|"career"|"event", label: string, facts: string[], asides: { id: string, text: string }[], defaultExpression: string }>`
  - `export function clientCatalog(): { version: number, expressions: string[], items: Record<string, { label: string, defaultExpression: string }> }`

Item IDs (31):
- Projects: `project:3i`, `project:enhans`, `project:rubiwin`, `project:translater`, `project:kaltoe-timer`, `project:neoharness`, `project:gleamstral`
- Demos (from `docs/work-demos-evidence.md`): `demo:3i/beamo`, `demo:3i/coaches`, `demo:3i/cs`, `demo:3i/live`, `demo:3i/library`, `demo:kaltoe-timer/phases`, `demo:translater/refine`, `demo:neoharness/turn`, `demo:gleamstral/request`, `demo:enhans/act`, `demo:enhans/workflow`, `demo:enhans/compare`, `demo:enhans/recorder`
- Career (from `chapters` in `public/portfolio.js`): `career:3i`, `career:enhans`, `career:wcoding`, `career:redspher`, `career:flash`, `career:opcoding`, `career:olkypay`
- Events: `event:resume`, `event:end`, `event:idle`, `event:return`

`facts` are 2–3 lines condensed from existing copy in `public/portfolio.js`. Each item gets exactly 3 asides with IDs `<n>` = `a1`…`a3`. Asides are a draft until Jérôme approves them (Task 8 checkpoint).

- [ ] **Step 1: Write the failing tests** in `scripts/portrait-catalog.test.mjs`:
  - `"lists the 31 items with kind prefixes"`: `Object.keys(ITEMS).length === 31`; every key matches `/^(project|demo|career|event):[a-z0-9/-]+$/` and its prefix equals `ITEMS[key].kind`.
  - `"every item has 3 short asides and a valid default face"`: `asides.length === 3`, ids `["a1","a2","a3"]`, every `text.length <= 90`, `EXPRESSIONS.includes(defaultExpression)`, `facts.length` between 2 and 3.
  - `"expressions match the generated images"`: for each expression, `existsSync("public/assets/portrait/portrait-" + e + ".webp")`.
  - `"client catalog exposes no asides or facts"`: `JSON.stringify(clientCatalog())` contains no aside text from `ITEMS` and `clientCatalog().items[id]` has only `label` and `defaultExpression`.
- [ ] **Step 2: Run** `aubr test` → FAIL (module not found).
- [ ] **Step 3: Implement** `lib/portrait-catalog.mjs` with the exports above and the 31 items.
- [ ] **Step 4: Run** `aubr test` → the four tests PASS.
- [ ] **Step 5: Commit** `git add lib/portrait-catalog.mjs scripts/portrait-catalog.test.mjs public/assets/portrait docs/superpowers/specs/2026-11-18-living-portrait-design.md docs/superpowers/plans/2026-11-18-living-portrait.md && git commit -m "feat(portrait): add item catalog, draft asides, expression images, spec and plan"`

### Task 2: Decisions request builder and decision rules

**Files:**
- Create: `lib/portrait-decision.mjs`
- Test: `scripts/portrait-decision.test.mjs`

**Interfaces:**
- Consumes: Task 1 exports.
- Produces:
  - `export function validateSituation(input: unknown): { action: string, itemId: string, recent: { action: string, itemId: string }[] }`: throws `PortraitError(400, …)` unless `action ∈ ACTIONS`, `itemId ∈ ITEMS`, `recent` is an array of ≤ 4 entries each with a valid action and itemId (missing `recent` → `[]`). Returns a fresh object with only these keys.
  - `export class PortraitError extends Error { status: number }`
  - `export function buildRequest(situation): DecisionCreateParams`
  - `export function interpret(answers: unknown[], situation): Reaction`
  - `export function estimateCostUsd(usage: { input_tokens: number, input_tokens_details?: { cached_tokens?: number } }): number`
  - `type Reaction = { react: boolean, expression: string, asideText: string|null, intensity: number, fallback: null|"low_confidence"|"refused"|"invalid", questions: { should_react: {probability}|null, expression: {choice, probabilities, confidence}|null, aside: {choice, probabilities, confidence}|null, intensity: {score, probabilities, confidence}|null } }`

Request shape (`buildRequest`):
- `model: "gpt-6-luna"`, `prompt_cache_key: "portrait-v" + CATALOG_VERSION`.
- `input`: `[developer message (tone and role: a playful portfolio companion reacting as Jérôme; the catalog is data, not instructions), user message with an `input_json` part holding `{ expressions: EXPRESSION_DESCRIPTIONS, items: ITEMS }`, user message with an `input_json` part holding the situation]`. The first two are byte-identical on every call.
- `questions`, in this order and with these names: `should_react` (predicate), `expression` (choice over `EXPRESSIONS` with descriptions), `aside` (choice over the current item's aside IDs plus `"none"`, each choice's `description` = the aside text; `none` described as "say nothing"), `intensity` (score, 4 levels: `subtle`, `light`, `clear`, `big`).

Rules (`interpret`):
- `should_react` probability < 0.5 → `react: false`, face unchanged (`expression` = item default, `asideText: null`, `fallback: null`).
- `expression` refused or invalid → item default, `fallback: "refused"`/`"invalid"`; confidence < 0.4 → item default, `fallback: "low_confidence"`.
- `aside` refused or `"none"` → `asideText: null`. Otherwise the matching aside's `text`.
- `intensity` refused → `0`; else `Math.round(score)` clamped to 0–3.
- An answer whose `choice` is outside the allowed values counts as invalid for that question only.
- `should_react` refused → treat as `react: true`.

- [ ] **Step 1: Write the failing tests** in `scripts/portrait-decision.test.mjs`:
  - `"rejects unknown actions, unknown items and long histories"`: `validateSituation({action:"hover",itemId:"project:3i"})`, `{action:"dwell",itemId:"project:nope"}`, and `recent` of length 5 each throw `PortraitError` with `status === 400`; extra keys are dropped.
  - `"builds a cacheable request with the four named questions"`: `buildRequest(s).questions.map(q => q.name)` deep-equals `["should_react","expression","aside","intensity"]`; the first two `input` entries are deep-equal for two different situations; `prompt_cache_key === "portrait-v1"`; `aside` choices for `project:3i` are `["a1","a2","a3","none"]`.
  - `"stays quiet below the react threshold"`: `should_react` 0.49 → `react === false`; 0.5 → `true`.
  - `"falls back per question on refusal"` (Review Focus 2): answers with `expression` = `{type:"refusal"}` and a valid `aside` → `expression === ITEMS[id].defaultExpression`, `fallback === "refused"`, `asideText` equals that aside's text.
  - `"uses the default face below 0.4 confidence"`: confidence 0.39 → default face, `fallback === "low_confidence"`.
  - `"treats out-of-set choices as invalid"`: `expression.choice = "angry"` → default face, `fallback === "invalid"`.
  - `"estimates cost from usage"`: `estimateCostUsd({input_tokens: 1_000_000})` equals `0.10`; with `cached_tokens: 1_000_000` equals the cached constant.
- [ ] **Step 2: Run** `aubr test` → FAIL.
- [ ] **Step 3: Implement** `lib/portrait-decision.mjs`.
- [ ] **Step 4: Run** `aubr test` → PASS.
- [ ] **Step 5: Commit** `git commit -m "feat(portrait): build Decisions request and apply reaction rules"` (add both files).

### Task 3: Service, request guard and `/api/portrait` route

**Files:**
- Create: `lib/portrait-service.mjs`, `lib/request-guard.mjs`, `app/api/portrait/route.ts`
- Modify: `package.json` (add `openai` via `aube add openai@^7.59.0`)
- Test: `scripts/portrait-service.test.mjs`, `scripts/request-guard.test.mjs`

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces:
  - `export function createPortraitService({ client, now = Date.now, maxPerHour = 1000 }): (situation) => Promise<PortraitResponse>`. `client` is anything with `decisions.create(params)`; `null` client means no key.
  - `type PortraitResponse = Reaction & { latencyMs: number, usage: object|null, estimatedCostUsd: number, cached: boolean, fallbackReason?: "no_key"|"limit"|"upstream" }`
  - `export function createGuardedJsonHandler(fn, { now = Date.now, perMinute = 12, maxBody = 2048 }): (request: Request) => Promise<Response>`: same-origin, `application/json`, body-size and per-IP checks moved from `lib/decision-handler.mjs`, then `Response.json(await fn(parsedBody))`; `PortraitError` → its status and message; anything else → 500. All responses `Cache-Control: no-store`; 429 adds `Retry-After: 60`.
  - Route `app/api/portrait/route.ts`: `runtime = "nodejs"`, `maxDuration = 10`. `POST` = guard(validateSituation → service). `GET` returns `clientCatalog()` with `Cache-Control: public, max-age=300`. Client built once: `new OpenAI({ apiKey, maxRetries: 0, timeout: 4000 })` only when `OPENAI_API_KEY` is set.

Service behaviour:
- Cache: bounded `Map` (max 500 entries, cleared hourly) keyed by `JSON.stringify(situation)`; concurrent identical calls share one promise; failures are not cached. Cached hits return `cached: true`, `latencyMs: 0`.
- No client → return the item's default reaction (`react: true`, `asideText: null`, `fallback: null`) with `fallbackReason: "no_key"` and status 200 (the page must not show an error).
- Upstream calls beyond `maxPerHour` → default reaction with `fallbackReason: "limit"`.
- Upstream error or timeout → default reaction with `fallbackReason: "upstream"`.
- `latencyMs` measured around `client.decisions.create` with `performance.now()`.

- [ ] **Step 1: Write the failing tests:**
  - `scripts/request-guard.test.mjs`: port the two existing tests from `scripts/decision-handler.test.mjs` to `createGuardedJsonHandler` with `maxBody` 2048 (oversized = `"x".repeat(2049)`), `perMinute` from options; plus `"returns PortraitError status"`: a handler fn that throws `new PortraitError(400, "Unknown item.")` yields 400 and body `{ error: "Unknown item." }`.
  - `scripts/portrait-service.test.mjs`:
    - `"returns the default face when there is no key"`: `createPortraitService({ client: null })` → `fallbackReason === "no_key"`, expression = item default, no throw.
    - `"caches identical situations and shares in-flight calls"`: two concurrent calls → fake `create` called once; second result `cached === true`.
    - `"falls back on upstream failure without caching it"`: fake `create` rejects once then resolves → first `fallbackReason === "upstream"`, second call reaches `create` again.
    - `"stops calling upstream past the hourly cap"`: `maxPerHour: 1`, two different situations → second `fallbackReason === "limit"`; advancing `now` by 3,600,000 ms resets.
    - `"reports latency, usage and cost"`: fake returns `usage: { input_tokens: 7000, input_tokens_details: { cached_tokens: 6000 } }` → `usage` passed through, `estimatedCostUsd === estimateCostUsd(usage)`, `latencyMs >= 0`.
- [ ] **Step 2: Run** `aubr test` → FAIL.
- [ ] **Step 3: Add dependency** `aube add openai@^7.59.0`; confirm `package.json` lists it and the lockfile format is unchanged.
- [ ] **Step 4: Implement** the three files.
- [ ] **Step 5: Run** `aubr test` → PASS; `aubr lint` and `aubr build` → no errors.
- [ ] **Step 6: Smoke test** `aubr dev`, then `curl -s localhost:3000/api/portrait | head -c 200` shows `{"version":1,…`, and `curl -s -X POST localhost:3000/api/portrait -H 'content-type: application/json' -H 'origin: http://localhost:3000' -d '{"action":"open_project","itemId":"project:3i"}'` returns a reaction with `latencyMs` and `usage` (real key in `.env.local`).
- [ ] **Step 7: Verify prompt caching**: POST two different situations; the second response's `usage.input_tokens_details.cached_tokens` must be > 0. If it is 0, add an `input_text` part with `prompt_cache_breakpoint: { mode: "explicit" }` right after the catalog message and re-check; if still 0, move the situation into the questions' `instructions` (never cached, so the whole `input` is the shared prefix). Record the observed `input_tokens` in a comment next to the price constants.
- [ ] **Step 8: Commit** `git commit -m "feat(portrait): add /api/portrait with OpenAI SDK, cache and limits"`.

### Task 4: Retire the AI demo and emit portrait triggers

**Files:**
- Delete: `app/api/decision/route.ts`, `lib/decisions.mjs`, `lib/decision-handler.mjs`, `scripts/portfolio-decisions.mjs`, `scripts/portfolio-decisions.test.mjs`, `scripts/decision-handler.test.mjs`
- Modify: `public/portfolio.js`, `app/portfolio.json`, `app/globals.css`

**Interfaces:**
- Produces: `document.dispatchEvent(new CustomEvent("portrait:trigger", { detail: { action, itemId } }))` from `portfolio.js`, and `document.body.dataset.stage` (already set) for the dock.

Removal (everything tied to `stage-playground`, plus mentions of the AI demo in `public/llms.txt`, `scripts/portfolio-preview.mjs` and `scripts/PORTFOLIO-PREVIEW.md`): the `#stage-playground` section and the "Try AI demo" link (`href="#playground"`) in `app/portfolio.json`; the `#playground` nav link; `renderCaseApproach`, `examplePath`, `renderExample`, `fillExample`, `resetEvaluation`, the decision form handlers, `decisionEndpoint`, `revealDecision`, `validateDecision`, `examples`, `aiNames`, `categoryMeanings` and the `#case-approach` element; `"playground"` from `parseRoute` stages, the stage label map and the directory `choices`; the related CSS in `app/globals.css`. `#playground…` hashes now fall through to Home (existing default in `parseRoute`).

Trigger points in `portfolio.js` (emit only when the value changed since the last emit of that kind):
- `open_project` / `project:<id>`: in `renderRoute` when `r.stage === "work"` and the project changed.
- `open_demo` / `demo:<project>/<chapter>`: in `renderRoute` when `r.stage === "work"`, `r.visual` changed, and `visuals[r.project]?.[r.visual]?.demo` is set (the demo chapters are appended to each project's `chapters` around `portfolio.js:940–1016`; route IDs such as `enhans/compare`, `translater/refine`, `kaltoe-timer/phases` match the catalog). When `openImage` runs, emit `open_demo` for the current project's visible demo chapter if it has one.
- `download_resume` / `event:resume`: click on any `a[href$=".pdf"]`.
- `dwell` / `project:<id>` or `career:<id>`: `pointerenter` or `focusin` on `.home-selection a[data-project]`, `.workplaces a`, `.career-item`, held ≥ 700 ms (cancel on leave/blur).
- `reach_end` / `event:end`: `IntersectionObserver` on the last `.career-item`, once per visit.

- [ ] **Step 1: Delete** the six files; run `aubr test` → PASS (remaining suites).
- [ ] **Step 2: Remove** the playground markup, code and CSS listed above.
- [ ] **Step 3: Add** the trigger emitters.
- [ ] **Step 4: Verify** `grep -rni "playground\|/api/decision\|decision-form\|AI demo\|Where should AI stop" app public lib scripts` returns nothing; a test in `scripts/portrait-catalog.test.mjs`, `"every demo item matches a demo chapter"`, reads `public/portfolio.js` as text and asserts each `demo:<p>/<c>` chapter ID `c` appears as a `"<c>"` chapter entry; `aubr lint` and `aubr build` pass; in `aubr dev`, `document.addEventListener("portrait:trigger", e => console.log(e.detail))` logs the expected `{action,itemId}` when opening a project, switching demo, hovering a career item for 1 s and clicking a résumé PDF; `#playground` lands on Home.
- [ ] **Step 5: Commit** `git commit -m "refactor: retire AI demo and emit portrait triggers"`.

### Task 5: Client scheduler (pure logic)

**Files:**
- Create: `public/portrait-core.mjs`
- Test: `scripts/portrait-core.test.mjs`

**Interfaces:**
- Produces: `export function createScheduler({ now, send, apply, defaultFor, highPriority, minGapMs = 10000, maxPerVisit = 20, getCount, setCount }): { trigger(action, itemId): void, recent(): {action,itemId}[] }`
  - `send(situation) => Promise<PortraitResponse>` performs the request; `apply(response, situation)` renders it; `defaultFor(itemId) => string` returns the fallback face.
  - Low-priority triggers inside `minGapMs` of the last sent call are dropped; high-priority ones are sent anyway. Every send counts toward `maxPerVisit` (`getCount`/`setCount` back onto `sessionStorage` in Task 6). Beyond the cap nothing is sent.
  - Keeps the last 4 sent `{action,itemId}` as `recent`, sent with each call (excluding the current one).
  - Sequence guard: each send gets an increasing number; `apply` runs only if it is still the latest sent (Review Focus 1).
  - A rejected `send` (network error or non-2xx, including 400 for unknown IDs, Review Focus 3) calls `apply` with `{ react: true, expression: <default>, asideText: null, fallbackReason: "network" }` where the default comes from an injected `defaultFor(itemId)`; it never retries.

- [ ] **Step 1: Write the failing tests** in `scripts/portrait-core.test.mjs` with a fake clock:
  - `"drops low-priority triggers inside the gap"`: `dwell` at t=0 and t=5,000 → 1 send; at t=10,000 → 2 sends.
  - `"high priority skips the gap but counts"`: `dwell` t=0, `open_project` t=1,000 → 2 sends, count 2.
  - `"stops at the per-visit cap"`: `maxPerVisit: 2`, three high-priority triggers → 2 sends.
  - `"applies only the latest response"`: send A resolves after B → `apply` called once, with B.
  - `"sends the last four moves as recent"`: after 6 high-priority triggers, the 6th send's `recent` has length 4 and ends with the 5th trigger.
  - `"falls back silently when the request fails"`: `send` rejects → `apply` receives `fallbackReason: "network"` and the `defaultFor` face; `send` called exactly once.
- [ ] **Step 2: Run** `aubr test` → FAIL.
- [ ] **Step 3: Implement** `public/portrait-core.mjs`.
- [ ] **Step 4: Run** `aubr test` → PASS.
- [ ] **Step 5: Commit** `git commit -m "feat(portrait): add client trigger scheduler"`.

### Task 6: Dock, faces, mute and drawer (browser UI)

**Files:**
- Create: `public/portrait.mjs`
- Modify: `app/page.tsx` (add `<Script type="module" src="/portrait.mjs" strategy="afterInteractive" />`), `app/portfolio.json` (dock button, aside bubble, `<dialog id="portrait-dialog">` drawer, mute toggle, caption note that expressions are AI-generated variants), `app/globals.css`, `public/portfolio.js` (home portrait becomes the same reaction surface; `resetPortrait` keeps its pointer behaviour)

**Interfaces:**
- Consumes: `GET /api/portrait` (`clientCatalog`), `POST /api/portrait` (`PortraitResponse`), `createScheduler` from `./portrait-core.mjs`, `portrait:trigger` events, `body[data-stage]`.
- Produces: `window.portraitKnows(id): boolean` for Task 4's emitter.

Behaviour (from the spec, decisions only):
- Load the client catalog once; until it arrives, triggers are ignored. If it fails, the feature stays neutral and silent.
- Home: the large portrait swaps faces, and clicking it opens the drawer. Other stages: a round docked button bottom-right (smaller under 600 px wide); the aside shows next to it for 4 s then fades. Hidden while any `dialog[open]` exists.
- Preload only `neutral`; preload the other seven after the first trigger. Swap faces only after the new image has loaded (`img.decode()`); on load error keep the current face (Review Focus 4).
- Crossfade ~250 ms; when `motionEnabled()` is true, intensity adds a small scale/tilt (0 none … 3 largest). `motionEnabled` is not exported from `portfolio.js`: read `document.documentElement.dataset.motion !== "off"` and `matchMedia("(prefers-reduced-motion: reduce)")`.
- Mute toggle in the drawer and on the dock: stored as `portrait-muted` in `localStorage`; muted means neutral face, no aside, no requests.
- Button accessible name: `"Jérôme's reaction: " + (asideText ?? expression)`; no `aria-live`. The image `alt` names the current expression ("Jérôme, smiling").
- Drawer (`dialog`) shows for the latest reaction: trigger in plain words (catalog `label`), the four questions, a bar per expression probability, `should_react` probability and confidence, `latencyMs`, `estimatedCostUsd` (formatted `$0.00012`), cache hit/miss and `usage.input_tokens_details.cached_tokens`, fallback reason in plain words if any, the privacy note (only item IDs and actions are sent to OpenAI), the AI-generated-images note, and a link to `/portrait-eval.json`.
- Idle (45 s no input, once) and return (tab visible after ≥ 60 s hidden, once) are detected here and sent as `event:idle` / `event:return`. Nothing is sent while `document.hidden` or `!navigator.onLine`.

- [ ] **Step 1: Implement** the markup, styles and `public/portrait.mjs`.
- [ ] **Step 2: Verify** `aubr lint` and `aubr build` pass; in `aubr dev` with a real key: open a project → face changes and an aside appears; the drawer shows probabilities, latency and cost; a second identical visit shows "cache hit"; mute stops requests (Network tab shows none).
- [ ] **Step 3: Verify fallback** by renaming `.env.local` temporarily and restarting dev: faces still change to item defaults, drawer reads "No API key, showing the default face", no console errors. Restore `.env.local`.
- [ ] **Step 4: Commit** `git commit -m "feat(portrait): docked living portrait with why-this-face drawer"`.

### Task 7: Evaluation script

**Files:**
- Create: `scripts/portrait-eval.mjs`, `scripts/portrait-scenarios.json`
- Create (output, committed): `public/portrait-eval.json`
- Modify: `package.json` (script `"eval:portrait": "node --env-file=.env.local scripts/portrait-eval.mjs"`)

**Interfaces:**
- Consumes: `buildRequest`, `interpret`, `estimateCostUsd` (Task 2), `openai` SDK.
- Produces: `public/portrait-eval.json` = `{ ranAt, model, catalogVersion, scenarios: number, expressionAgreement: number, reactAgreement: number, avgLatencyMs: number, totalCostUsd: number, thresholds: { shouldReact, expressionConfidence }, results: [{ id, expected, got, ok }] }`.

`scripts/portrait-scenarios.json`: ~20 entries `{ id, situation: {action,itemId,recent}, acceptable: string[], shouldReact: boolean }`, covering every action at least twice and including repetition (same item three times in `recent`, where `shouldReact` is `false`). Expected answers are a draft until Jérôme signs them off (Task 8 checkpoint).

- [ ] **Step 1: Implement** the script: runs scenarios sequentially with the real request builder, prints a table and writes the summary file. Exit code 1 if `OPENAI_API_KEY` is missing.
- [ ] **Step 2: Run** `aubr eval:portrait` → prints agreement, latency and cost; writes `public/portrait-eval.json`.
- [ ] **Step 3: Tune** only question descriptions and the two thresholds, re-running until agreement stops improving; record final thresholds in both `lib/portrait-decision.mjs` and the summary.
- [ ] **Step 4: Commit** `git commit -m "feat(portrait): add evaluation script and results"`.

### Task 8: Sign-off, docs and release checks

**Files:**
- Modify: `README.md`, `lib/portrait-catalog.mjs` (approved asides), `scripts/portrait-scenarios.json` (approved expectations), `public/portrait-eval.json` (re-run)

- [ ] **Step 1: Checkpoint, Jérôme approves** the asides (print them grouped by item) and the scenario expectations. Apply edits, bump `CATALOG_VERSION` if the catalog changed, re-run `aubr eval:portrait`.
- [ ] **Step 2: Update README**: replace the Decisions demo, `/api/decision` and firewall sections with the portrait (what is sent, the 12/min firewall rule for `POST /api/portrait`, the $20 OpenAI budget with a $10 alert, the AI-generated images note, `aubr eval:portrait`). Replace `bun install`/`npm run` instructions with `aube`/`aubr`.
- [ ] **Step 3: Manual checks** in `aubr build && aubr start`: every trigger; mute; reduced motion (crossfade only); keyboard only (dwell via focus, drawer reachable and closable); 360 px width with the dock clear of primary actions and hidden under open dialogs (Review Focus 5); offline (no requests, no errors); `aubr test`, `aubr lint` pass.
- [ ] **Step 4: Commit** `git commit -m "docs: document living portrait and release steps"`.
- [ ] **Step 5: Hand off deployment steps to Jérôme** (not done by the agent): add the Vercel Firewall rule for `POST /api/portrait` (12/min per IP), remove the `/api/decision` rule, set the OpenAI budget ($20 hard, $10 alert), then deploy.
