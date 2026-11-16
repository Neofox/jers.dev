# OpenDesign portfolio preview

The design remains in the local OpenDesign project. This server adds a live
OpenAI Decisions exercise using visitor-written situations and serves the
same HTML and assets. It does not replace or deploy the Next.js portfolio.

Requires Node 24 and the confirmed `OPENAI_API_KEY` in the repository's ignored
`.env.local`. The server deliberately reads that file instead of an inherited
shell key. It never sends the key to the browser.

```sh
node scripts/portfolio-preview.mjs --design-dir "/absolute/path/to/OpenDesign/project" --entry jerome-portfolio-v6.html
```

Open `http://127.0.0.1:43117/#playground`, or use the v6 preview inside OpenDesign.
Describe a hypothetical situation and evaluate it after adjusting its constraints.
Only that situation (10–1200 characters) and those three constraints are sent to OpenAI.
Changing any input clears the prior answer; requests are explicit, not made
automatically by the sliders or sample prompts. Earlier versions can still send
their named sample scenarios to the same endpoint.

The preview binds to loopback only. Its origin allowlist includes the local
OpenDesign port and the opaque origin of its sandboxed preview. Bounded inputs,
input validation, in-flight request deduplication, cached results, and a limit of
100 upstream calls per server process bound local usage. This is a local preview,
not a public endpoint: deployment needs a same-origin server route and persistent
rate limiting rather than this local origin policy and in-memory budget.

```sh
node --test scripts/portfolio-decisions.test.mjs
npx eslint scripts/portfolio-*.mjs
```

API contract: https://developers.openai.com/api/reference/resources/decisions/methods/create
