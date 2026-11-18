# Enhans demos implementation plan

**Goal:** Add the four source-grounded demos selected by the user, matching the existing 3i treatment.
**Architecture:** Extend the existing demo registry and lifecycle in public/portfolio.js, with scoped styles in app/globals.css. No dependencies or production service calls.
**Design:** ACT-1 replaces its successor capture as the primary chapter; add visual workflow, comparison and recorder chapters. Following review, remove the redundant Model Generator/Product example tabs and product-range overview; old model/usecase links open Compare models. All new demos use synthetic data and label simulated outputs.

## Constraints and review focus
- Source repositories are reference only; recreate behavior without copying private code or assets.
- Manual Next step works with motion disabled; timers stop on reset, navigation and cleanup.
- Controls have accessible names and retain keyboard focus as results update.
- Mobile stacks panels without page overflow; styles use existing portfolio tokens.
- Sample responses, rankings and metrics cannot imply real model performance.

## Tasks
- [x] Add ACT-1: sample task, grouped expandable logs, browser snapshots, completion, replay and manual advancement.
- [x] Add workflow: Input → Text Translation → Output, language and sample-input choices, node inspector, sequential processing and recoverable sample failure.
- [x] Add comparison: model selection, per-model staged results, two output variants, sample metrics and final evaluation/ranking.
- [x] Add recorder: tracking enabled by default, clearly labeled browser and Chrome extension panels, sandbox click/input actions, newest-first records, editable comments, local JSONL preview and reset.
- [x] Update chapter copy, visuals and docs/work-demos-evidence.md with exact source paths and simplifications.
- [x] Verify browser interactions, restart/navigation cleanup, reduced motion, desktop/mobile, tests, lint and production build.

Execution: inline in the existing clean workspace, as authorized by “Proceed with your selection.” No deployment requested. Browser behavior checks suit these reversible presentation changes; existing automated checks also run.

Verification: browser checks passed for completion, replay, timer reset, workflow error/recovery, comparison variants/ranking/empty selection, recorder tracking/comments/escaping/reset, reduced motion, and all four routes at 390px without horizontal overflow or browser errors. Existing automated suite: 10/10. Lint passed. Production build passed. Independent review found no blocking issues; its annotation-retention wording correction was applied. Playback suspension on leaving Work and changing the motion setting was also browser-verified.

Follow-up on 18 November 2026: the Open Design review identified lost keyboard focus on the final manual step. After the fix, Enter through ACT-1, Workflow and Compare lands on Replay. With reduced motion, ACT-1 advances manually and Replay returns focus to Next step. Mobile playback controls stay above the bottom navigation.
