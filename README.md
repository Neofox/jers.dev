# jers.dev

Jérôme Schaeffer’s portfolio. Astro serves the approved OpenDesign experience and a living portrait whose reactions are decided server-side by OpenAI's Decisions API.

## Run

Use Node.js 24 and the existing dependency lockfile. Install with `bun install --frozen-lockfile`, then run `bun run dev`.

Set `OPENAI_API_KEY` in the git-ignored `.env.local`. It is server-only. No key is embedded in the browser bundle. Without a key the site works normally and the portrait simply keeps each item's default face with no aside.

## Verify

- `bun run test`
- `bun run lint`
- `bun run build`
- `bun run start` serves the app locally with Astro’s development server. The production build is written to `.vercel/output`.

The homepage is English. Old `/en`, `/fr` and `/ko` URLs redirect to the new homepage; both English and Korean résumé PDFs are available from the résumé dialog. Project views use shareable URL fragments.

The November 2026 Open Design refresh uses visual case summaries, screenshot thumbnails, labelled animated illustrations, expandable full case studies and a complete career timeline. Illustrations respect the motion toggle and reduced-motion preferences, and pause offscreen. Existing project, screenshot and story-section fragments still resolve; legacy detail-section links open the full case automatically, and legacy story page numbers are accepted. The Korean résumé is current; the English PDF is explicitly labelled as an earlier version.

The updated professional content follows the latest Korean résumé, including Beamo and AI/AX at 3i. Thirteen working demos cover five 3i products, four Enhans projects and four independent projects. The Enhans case includes ACT-1, the AIAP workflow editor, Select LLM and the browser action recorder. The Pivo demos also link to their product captures. They use synthetic data and local behavior with no production API calls. The AI/AX overview is labelled as an illustration. See [the source evidence and simplifications](docs/work-demos-evidence.md). Private 3i repositories were consulted read-only; their code and private site captures are not included in the portfolio.

## Source

- `src/pages/index.astro` and `src/components/`: prerendered portfolio pages and sections.
- `src/styles/globals.css`: local fonts, layout and motion preferences.
- `src/scripts/portfolio.js`: navigation, case studies, accessible dialogs, and the `portrait:trigger` events the living portrait reacts to.
- `src/demos/`: one on-demand module per working demo. A demo exports `mount(stage)` and can return a cleanup function. The loader disposes it on navigation or restart. Pivo Meet can return a Solid renderer’s disposal function from the same entry point when the v8 integration is available.
- `src/scripts/portrait.js`: the living portrait in the browser (faces, dock, speech bubble, mute, "why this face?" drawer).
- `public/portrait-core.mjs`: the portrait's request scheduler (gap, per-visit cap, latest-response-wins, local fallbacks) and other DOM-free helpers, unit-tested.
- `src/pages/api/portrait.js`: `POST /api/portrait` (one reaction for `{action, itemId, recent}`) and `GET /api/portrait` (the browser catalog: item IDs, labels and default faces, plus the model name and the question text the drawer shows; no facts or asides).
- `lib/portrait-catalog.mjs`: the catalog of items, default faces and the approved asides (versioned by `CATALOG_VERSION`).
- `lib/portrait-decision.mjs`: request builder, thresholds, refusal and fallback rules, cost calculation.
- `lib/portrait-service.mjs`: bounded cache and upstream limits around the OpenAI call.
- `lib/request-guard.mjs`: same-origin checks, body limits and per-visitor throttling.
- `scripts/portrait-eval.mjs`, `scripts/portrait-scenarios.json`, `scripts/portrait-eval-figures.mjs`: evaluation script, its signed-off scenarios and the figures it reports.
- `public/assets`: product captures, portrait, fonts and current résumé PDFs. `public/assets/portrait` holds the expression images.

## Living portrait

The portrait follows visitors and reacts to what they look at: opening a project or demo, downloading the résumé, dwelling on a section, reaching the end, idling, coming back to the tab, or landing after a flick. A firm toss can request one reaction every 30 seconds. The gesture sends the same catalog event format as the other triggers. Each reaction is a facial expression plus, sometimes, a short first-person aside. The decision is made live by OpenAI's Decisions API (`gpt-6-luna`) through `POST /api/portrait`. The asides are written and approved ahead of time in `lib/portrait-catalog.mjs`; nothing is generated at runtime. A "why this face?" drawer shows the trigger, the questions asked, the probabilities, latency, estimated cost and whether the cache was hit. The drawer shows the `should_react` probability only, since predicates carry no confidence.

What is sent: the browser posts only `{action, itemId, recent}`, and only catalog item IDs and action types reach OpenAI. No text, URLs, identifiers or other visitor data are sent, and requests are not logged by the application. If anything fails (no key, timeout, refusal, server error) the portrait shows the item's default face with no aside and no error UI; the drawer says why in plain words. Past the per-visit cap or while offline nothing is sent: the face stays as it is, and only opening a project, a demo or the résumé switches to that item's default face, at most once every 10 seconds. An aside that arrives while a dialog is open or the tab is hidden waits until the page is visible again (and is dropped after 30 seconds). On phones a tap on the speech bubble dismisses it. A mute control turns reactions off, and with reduced motion or the motion toggle off the face only crossfades.

The expression images are AI-generated variants of Jérôme's own photo, and the portrait caption and drawer say so.

Evaluation: `bun run eval:portrait` runs the signed-off scenarios against the live API (needs `OPENAI_API_KEY` in `.env.local`, costs well under a cent) and rewrites `public/portrait-eval.json`, which the drawer links to. It is run by hand, not in CI. Scenarios are split into a tuning set and a held-out set, and misses are published as they come. The summary also gives a `defaultBaseline` (the expression agreement if each item's default face were always shown) and `fallbackPasses` (passes that came from that default face after a low-confidence or refused answer), so the model's figures can be read against what a fixed face would score.

## Release on Vercel

Production: https://www.jers.dev (jers.dev redirects here). Released on 2026-10-08 KST to the existing `neofoxs-projects/jersdev` project. Deployment: `dpl_6YfxJw3MSX31EoPBMgmFm2g3K2jQ`.

The approved `OPENAI_API_KEY` is configured as a production Secret. The repository selects the Astro preset for Vercel. Build with Node.js 24 and keep the key server-only.

Add a Vercel Firewall rule that rate-limits `POST /api/portrait` to 12 requests per IP per minute, and remove the old `/api/decision` rule. The code’s in-memory limits are defense in depth: 12 requests per IP per minute and 1,000 upstream requests per hour per function instance. They reset on cold starts and are not a global spending cap. Set a budget on the OpenAI project that holds the key: $20 hard limit with a $10 alert.

After deployment, verify one live portrait reaction (and its drawer), both résumé PDFs, the contact dialog and navigation on the deployed URL. Keep the API key out of logs. Requests and visitor situations are not logged by the application.

Product screenshots remain attributed to their actual sources. ACT-2 imagery is explicitly identified as a current product reference; Jérôme’s contribution was to ACT-1. Kaltoe’s repository screenshots contain demonstration data, not claimed usage metrics.

## Optional design preview

`scripts/portfolio-preview.mjs` is local development tooling for the OpenDesign artifact and is not included in the public site. The Astro application has no dependency on the OpenDesign server or any local preview port.
