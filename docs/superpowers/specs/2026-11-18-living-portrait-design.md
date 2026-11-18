# Living portrait: design

Date: 2026-11-18 · Status: draft for approval

## Intent

The résumé site should feel like it was built by an AI developer, and be more fun to use, without a separate "AI lab" section and without asking visitors to type anything.

The portrait of Jérôme becomes a companion. It follows the visitor across the site and reacts to what they look at with a facial expression and a short first-person aside, as if Jérôme were reading over their shoulder. Each reaction is decided live by OpenAI's Decisions API (`gpt-6-luna`). A "why this face?" drawer shows how the decision was made. That drawer is where the AI-tooling knowledge is on display.

Success: visitors notice it, smile, and click "why this face?". Recruiters spend longer in the work and career sections. The site still reads perfectly as a résumé if the feature is muted, slow, or unavailable.

## Goals

- A portrait that reacts to what the visitor is looking at, across every stage of the site.
- Live, typed decisions from the Decisions API: expression, aside, intensity, and whether to react at all.
- A transparent "why this face?" drawer showing the trigger, the questions asked, the probability of each expression, confidence, measured latency, estimated cost, and whether the cache was hit.
- A small evaluation script that runs fixed scenarios against the live API and reports how often the chosen face matches the expected one. It shows the feature was tuned, not guessed.
- Retire the current "Where should AI stop?" AI demo (the `playground` stage and `/api/decision`).

## Non-goals

- No chat, no text input, no voice.
- No text generated at runtime. Asides are pre-written and approved; the model only picks one.
- No face animation beyond swapping between still images (no lip sync, no morphing).
- No analytics or logging of visitor behaviour.
- No new language versions (the site is English-only today).

## Anti-goals (failure even if it technically works)

- **Annoying:** it reacts too often, covers content, or talks over the visitor.
- **Uncanny:** the faces look fake or jump around between images.
- **Inventing facts:** an aside claims something not on the résumé.
- **Slower site:** page load gets heavier, or the first paint waits on the feature.
- **Broken résumé:** any failure (no key, rate limit, timeout, offline) leaves a visibly broken element.

## Constraints

- Existing stack: Next.js 16 app router, Node.js 24, plain JS in `public/portfolio.js` (no framework on the client), trusted markup in `app/portfolio.json`, styles in `app/globals.css`.
- Server-only `OPENAI_API_KEY`; never exposed to the browser.
- Rate limits: in-code per-IP limiter (6/min today) plus a Vercel Firewall rule. The current rule targets only `POST /api/decision`.
- Existing motion toggle and `prefers-reduced-motion` must be respected (`motionEnabled()` in `portfolio.js`).
- The site labels synthetic or AI-made content honestly. The expression images are AI-generated variants of a real photo and must be labelled as such.
- Decisions API facts (GA, Oct 2026): up to 400 questions per call; question types `predicate`, `choice`, `score`; choice and score answers include `probabilities` and `confidence`; a `refusal` answer applies to one question only and carries no reason; prompt caching applies to the shared `input` prefix of at least 1,024 tokens; content in `questions` is never cached; output tokens are free, uncached input is $0.10 per 1M tokens.

## Approaches considered

- **A. Live reactions with a fixed fallback (chosen).** The browser reports a trigger to a new `/api/portrait` route; the server asks Luna; a fixed default face per item covers every failure. Only this option makes the drawer show real, live probabilities and latency, which is the point.
- **B. Precomputed at build time.** Free and instant, but never reacts to what the visitor did before, and the drawer would show old numbers. Rejected: it removes the live AI.
- **Hybrid (precomputed face first, corrected live).** Rejected: a face that changes twice in one beat looks glitchy.

## Design

### Expression assets (provided by Jérôme)

Claude generates the variants with the GPT Image edits API (`gpt-image-2.6-sunburst`) from `public/assets/jerome-portrait.jpeg`.

- 8 expressions: `neutral` (the current photo), `smile`, `grin`, `proud`, `wince`, `laugh`, `thinking`, `surprised`.
- 960×960, black and white, same background and lighting, same crop, head position and eye line as the current photo, so a crossfade reads as a change of expression rather than a jump.
- Files: `public/assets/portrait/portrait-<expression>.webp`, about 60 KB each.
- The current JPEG stays as the Open Graph image in `app/layout.tsx`.
- Only `neutral` loads with the page. The other seven load lazily after the visitor's first interaction.
- The portrait's caption or the drawer states that the expressions are AI-generated variants of Jérôme's photo.

### Where the portrait lives

- **Home:** the large portrait stays where it is today, with its existing pointer response.
- **Other stages (Work, About):** it docks as a small round bubble in the bottom-right corner. The aside appears as a short speech bubble next to it for about 4 seconds, then fades.
- The dock hides while a dialog or the lightbox is open, and must never cover a primary call to action. On narrow screens the bubble is smaller and the aside sits above it.
- The bubble is a button. Clicking it opens the "why this face?" drawer for the latest reaction.
- A "mute me" control turns reactions off (portrait stays neutral, no asides, no API calls). The choice persists in `localStorage`, wrapped in try/catch.

Sketch:

```
                         ┌──────────────────────────────┐
  [ Beamo 3D viewer ]    │ ◐  (wince)                    │
  Section box · BIM pick │ "Took 3 rewrites to get       │
                         │  the clipping right."         │
                         └───────────── why this face? ─┘
```

### Triggers

Each trigger is an `action` from a fixed list plus an `itemId` from the catalog (below).

| Action | When | Priority |
|---|---|---|
| `open_project` | A project or case study opens | high |
| `open_demo` | A demo chapter is selected (demos are inline) or a screenshot lightbox opens | high |
| `download_resume` | A résumé PDF link is clicked | high |
| `dwell` | Pointer hover or keyboard focus rests on a project card, home selection item or career entry for ≥ 700 ms | low |
| `reach_end` | The visitor reaches the end of the career timeline | low |
| `idle` | No interaction for 45 s (at most once per visit) | low |
| `return` | The tab becomes visible again after ≥ 60 s away (at most once per visit) | low |

Client throttle: at most one call every 10 s; high-priority triggers may skip the wait but still count. At most 20 calls per visit (tracked in `sessionStorage`). Low-priority triggers that arrive during the wait are dropped, not queued. Nothing is sent while muted, offline, or when the tab is hidden.

### Item catalog (single source of truth)

A new module, `lib/portrait-catalog.mjs`, lists every item the portrait can react to: each project, each working demo, each career entry, and the special items (`resume`, `idle`, `return`, `end`). The site is dark-only, so there is no theme trigger. Roughly 30 items.

Each entry has:
- `id`, prefixed by kind (`project:3i`, `career:3i`, `demo:translater`, `event:resume`) because some route IDs repeat across kinds (builder's call, from the review)
- `kind` (`project`, `demo`, `career`, `event`)
- `facts`: two or three short lines taken from the existing résumé copy
- `asides`: about three first-person lines, written by Claude and edited and approved by Jérôme. They may express feeling ("Still proud of this one.") but must not add claims that are not already on the résumé.
- `defaultExpression`: the fallback face

The client needs the `id`s and `defaultExpression`s for the fallback. How the client receives them without duplicating the catalog by hand (for example, a small static JSON file generated from the module, or a cached `GET` on the route) is left to the builder, as long as there is one source.

### The `/api/portrait` route

- `POST` with JSON `{ action, itemId, recent }`. `recent` is up to 4 previous `{ action, itemId }` pairs. Nothing else is sent: no free text, no URLs, no user agent.
- Validation: `action` must be in the trigger list, every `itemId` must be in the catalog; anything else is rejected with 400. Because only catalog IDs are accepted, visitor input can't steer the model with text (no prompt-injection surface).
- Same-origin, content-type, body-size and per-IP rate-limit checks as `lib/decision-handler.mjs` today. That handler can be generalised and reused.
- A bounded in-memory cache keyed by `(action, itemId, recent)` returns identical answers for repeated situations and marks them `cached: true`.
- An upstream timeout of about 4 s. A late reaction is worse than none.

### The Decisions request

- Called directly on OpenAI with the official `openai` Node SDK (v7.59+, `client.decisions.create`), not through Vercel AI Gateway and not with hand-written `fetch`. The client is injected so tests can pass a fake. Use `maxRetries: 0` and a ~4 s `timeout`: a late reaction is worse than none.
- `model: "gpt-6-luna"`.
- `input`: a developer message holding the instructions (who Jérôme is, the tone, that this is a playful portfolio companion), then a user message with the full catalog as `input_json`. This shared prefix is identical on every call and must exceed 1,024 tokens so prompt caching applies. Set `prompt_cache_key: "portrait-v1"`, and bump it whenever the catalog changes.
- The current situation (action, item, recent moves) goes last, after the cached prefix.
- Questions:
  - `should_react` (predicate): is a reaction welcome right now, or would it be noise?
  - `expression` (choice): one of the 8 expressions, each with a short description.
  - `aside` (choice): one of the current item's aside IDs, plus `none`.
  - `intensity` (score): 4 levels, from subtle to big.
- Decision rules:
  - If `should_react` probability is below the threshold, nothing changes.
  - If `expression` confidence is below its threshold, or the answer is a refusal, use the item's `defaultExpression`.
  - If `aside` is refused or `none`, show the face without an aside.
  - Starting thresholds: 0.5 for `should_react`, 0.4 for expression confidence. Final values come from the evaluation script.
- The route returns: `react`, `expression`, `asideText`, `intensity`, the probabilities and confidence for each question, `latencyMs` (measured on the server around the upstream call), `usage` (from the API), `estimatedCostUsd` (computed from `usage` with price constants kept in one place), and `cached`.

### Fallback behaviour

When there is no key, a 4xx/5xx, a timeout, a refusal, the per-visit cap is reached, or the visitor is offline, the portrait shows the item's `defaultExpression` with no aside. The drawer then says plainly that this face came from the fallback and why. No error UI is shown on the portrait itself.

### Motion and accessibility

- Expression change: crossfade of about 250 ms. Intensity adds a small scale or tilt only when `motionEnabled()` is true. With reduced motion, crossfade only.
- Asides are not announced through an `aria-live` region; announcing every reaction would be noisy for screen-reader users. The bubble button's accessible name includes the latest aside ("Jérôme's reaction: …"), and the drawer is a proper dialog.
- The portrait images keep meaningful alt text describing the current expression.

### "Why this face?" drawer

Opens from the bubble (and from the home portrait). Shows, for the latest reaction:
- the trigger (action and item, in plain words)
- the four questions as sent
- a bar for each expression's probability, plus `should_react` probability and confidence
- latency in ms, estimated cost, cache hit or miss, and cached input tokens
- whether the fallback was used, and why
- a note that only item IDs and action types are sent to OpenAI, and that the expressions are AI-generated variants of Jérôme's photo
- a link to the evaluation results

### Evaluation script

`scripts/portrait-eval.mjs` runs about 20 fixed scenarios (action, item, recent moves, expected expression or set of acceptable expressions, expected `should_react`) against the live API with the real request builder. It prints agreement, average latency and total cost. It is run by hand, not in CI, and needs `OPENAI_API_KEY`. Its latest summary is stored under `public/` and linked from the drawer. The expected answers are drafted by Claude and signed off by Jérôme, so the agreement score isn't circular.

### Retiring the AI demo

- Remove the `playground` stage, its markup in `app/portfolio.json`, its JS in `portfolio.js` and its CSS.
- Remove the "Try AI demo" link on Home, the `#playground` nav link and the "AI demo" links on case pages. Replace it with nothing, or with a small hint that the portrait reacts (builder's call on wording).
- Old `#playground…` links route to Home.
- Remove `app/api/decision/route.ts` and `lib/decisions.mjs`, and update or remove their tests. Keep `lib/decision-handler.mjs` only if it becomes the shared handler.
- Update the README sections about the decision endpoint, the firewall rule and the AI demo.

### Budget and limits

Jérôme is comfortable with $10–20/month; actual traffic is low, so this is a safety net, not an expected spend.

- Hard monthly budget of $20 on the OpenAI project (the real cap), with an alert at $10.
- Server: at most 1,000 upstream calls per hour per function instance (replaces today's 100/hour).
- Per visitor IP: 12 requests per minute, the same in code and in the Vercel Firewall rule. The client throttle (one call per 10 s, high-priority triggers excepted, 20 per visit) keeps normal browsing well under it.
- Expected cost: about 6–8k input tokens per call, mostly cached; at most about $0.015 for a 20-reaction visit.

### Deployment

- Add a Vercel Firewall rate-limit rule for `POST /api/portrait` (12 per IP per minute) and remove the old `/api/decision` rule.
- Set the $20 budget and $10 alert on the OpenAI project.

### Testing

- Unit tests (`node --test`, like the existing ones) for input validation, the request builder, decision rules (thresholds, refusals, fallbacks), the cache and the cost calculation, with a mocked `fetch`.
- Handler tests reusing the pattern in `scripts/decision-handler.test.mjs`.
- Manual check in the browser: every trigger, mute, reduced motion, no key, offline, narrow screen, keyboard only.

## Left to the builder

- Exact visual design of the dock, speech bubble and drawer, within the existing site style.
- Animation curves and timings within the limits above.
- How the client receives catalog IDs and default faces, as long as there is one source.
- Exact wording of descriptions inside the questions, tuned with the evaluation script.
- Final threshold values, from the evaluation script.
- Whether `lib/decision-handler.mjs` is generalised or replaced.
