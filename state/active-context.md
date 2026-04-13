---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - ".basb/system/MEMORY.md"
  - "state/MEMORY.md"
  - ".basb/plans/2026-04-06-startup-context-happy-path-optimization.md"
  - ".basb/plans/2026-04-07-canonical-system-state-upgrade-path.md"
  - ".basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md"
  - ".github/workflows/publish-npm.yml"
  - "tests/package.test.js"
  - "tests/scaffold-workspace.test.js"
  - "package.json"
---
# Current Focus

The compiled-wiki upgrade from `.basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md` has landed across all six tasks. BASB now preserves immutable sources in `vault/sources/`, keeps compiled notes in P.A.R.A. with `artifact_kind` and provenance frontmatter, ingests one-source-to-many-derived-updates via `.basb/prompts/11-ingest-source.md`, persists durable expressed outputs back into the vault, and runs a weekly structural lint through `.basb/prompts/61-knowledge-lint.md`. `vault/index.md` and `vault/log.md` are the operational catalog and knowledge log. The next likely task is either a real-run exercise of the new ingest path on actual source material, or reviewing `state/review-queue.md` for design ambiguities that surfaced during implementation.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Keep the compiled-wiki upgrade local-first and markdown-first.
- Keep P.A.R.A. as the user-facing note organization model. `vault/sources/`, `vault/index.md`, and `vault/log.md` are operational support artifacts, not a fifth category.
- Do not expand into application services, databases, background jobs, or hidden state unless explicitly requested.

# Recommended Next Actions

1. Exercise the new ingest flow on a real durable source to confirm the dispatcher, source template, and provenance fields feel right end-to-end.
2. Scan `state/review-queue.md` for any ambiguity items that arose during implementation and either resolve or triage them.
3. Consider whether the compiled-wiki upgrade should be published as the next npm version; if so, run `npm test` and `npm run pack:check` before pushing.

# Recently Touched

- `.basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md`
- `.basb/prompts/10-capture.md`, `11-ingest-source.md`, `20-organize-route.md`, `21-human-review.md`, `30-32` distill chain, `40-express.md`, `50-daily-brief.md`, `60-weekly-maintenance.md`, `61-knowledge-lint.md`, `70-favorite-problems.md`, `README.md`
- `templates/source-note.md`, `project-note.md`, `area-note.md`, `resource-note.md`, `archive-note.md`, `inbox-note.md`, `daily-brief.md`, `weekly-review.md`
- `vault/index.md`, `vault/log.md`, `vault/sources/.gitkeep`
- `examples/expected-outputs/distillation-example.md`, `source-ingest-example.md`
- `tests/prompt-pack.test.js`, `package.test.js`, `scaffold-workspace.test.js`, `package.json`
- `AGENTS.md`, `README.md`, `bootstrap/README.md`, `BASBGuide.md`
- `state/active-context.md`, `state/decision-log.md`
