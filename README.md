# jers.dev

Jérôme Schaeffer’s portfolio. Next.js serves the approved OpenDesign experience and a server-side OpenAI Decisions endpoint.

## Run

Use Node.js 24 and the existing dependency lockfile. Install with `bun install --frozen-lockfile`, then run `npm run dev`.

Set `OPENAI_API_KEY` in the git-ignored `.env.local`. It is server-only. No key is embedded in the browser bundle. The UI remains usable without a key and reports that evaluations are temporarily unavailable.

## Verify

- `node --test scripts/*.test.mjs`
- `npm run lint`
- `npm run build`
- `npm start`

The homepage is English. Old `/en`, `/fr` and `/ko` URLs redirect to the new homepage; both English and Korean résumé PDFs are available from the résumé dialog. Project views use shareable URL fragments.

## Source

- `app/portfolio.json`: trusted, server-rendered markup from the approved design; never populate it with user content.
- `app/globals.css`: local fonts, layout and motion preferences.
- `public/portfolio.js`: navigation, case studies, accessible dialogs and the live decision interaction.
- `lib/decisions.mjs`: validated OpenAI request, refusal handling and bounded cache.
- `lib/decision-handler.mjs`: same-origin checks, body limits and per-visitor throttling.
- `public/assets`: product captures, portrait, fonts and current résumé PDFs.

Example cards only prefill editable text. Every displayed evaluation comes from OpenAI (or a previously cached identical request), and cached results are labelled. Probability bars are model estimates; category descriptions are labelled as general interpretation. No product action is executed.

## Release on Vercel

Production: https://www.jers.dev (jers.dev redirects here). Released on 2026-10-08 KST to the existing `neofoxs-projects/jersdev` project. Deployment: `dpl_6YfxJw3MSX31EoPBMgmFm2g3K2jQ`.

The approved `OPENAI_API_KEY` is configured as a production Secret. Future deployments should use the Next.js preset and Node.js 24. Never prefix the key with `NEXT_PUBLIC_`.

The active Vercel Firewall rule limits POST `/api/decision` to 6 requests per IP per minute (`rule_decision_api_rate_limit_FSSI0b`). The code’s in-memory limits are defense in depth: 6 requests per IP per minute and 100 upstream requests per hour per function instance. They reset on cold starts and are not a global spending cap. Set the desired project budget/alerts on the OpenAI side as well.

After deployment, verify one live example, both résumé PDFs, the contact dialog and navigation on the deployed URL. Keep the API key out of logs. Requests and visitor situations are not logged by the application.

Product screenshots remain attributed to their actual sources. ACT-2 imagery is explicitly identified as a current product reference; Jérôme’s contribution was to ACT-1. Kaltoe’s repository screenshots contain demonstration data, not claimed usage metrics.

## Optional design preview

`scripts/portfolio-preview.mjs` is local development tooling for the OpenDesign artifact and is not included in the public site. The Next.js application has no dependency on the OpenDesign server or any local preview port.
