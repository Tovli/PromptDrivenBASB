---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-22T10:08:56.3412608+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - ".basb/system/MEMORY.md"
  - "state/MEMORY.md"
  - ".basb/plans/2026-04-06-startup-context-happy-path-optimization.md"
  - ".basb/plans/2026-04-07-canonical-system-state-upgrade-path.md"
  - ".basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md"
  - ".basb/plans/2026-04-20-storage-and-retrieval-adr.md"
  - ".basb/prompts/62-retrieval-refresh.md"
  - ".github/workflows/publish-npm.yml"
  - "tests/package.test.js"
  - "tests/prompt-pack.test.js"
  - "tests/scaffold-workspace.test.js"
  - "package.json"
---
# Current Focus

The compiled-wiki upgrade and retrieval-layer ADR are now in a tighter state after the review-driven follow-up. BASB preserves immutable sources in `vault/sources/`, keeps compiled notes in P.A.R.A. with `artifact_kind`, provenance, and a single retrieval-specific frontmatter field (`canonical_id`), and now treats `summary_last_refreshed_at` as the latest summary review against ingested evidence rather than only a text-rewrite marker. Layer 4 explicitly refreshes retrieval artifacts when it materially changes a note summary, and the packaged docs plus scaffold tests now agree that provenance fields (`derived_from`, `source_ids`) point back to sources while retrieval refresh applies to any materially changed bounded note set. The next likely task is still to exercise the retrieval layer on a real compiled-note set so the placeholder retrieval artifacts turn into durable catalog, question-map, and relationship entries.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Keep the compiled-wiki upgrade local-first and markdown-first.
- Keep P.A.R.A. as the user-facing note organization model. `vault/sources/`, `vault/index.md`, `vault/log.md`, and `vault/retrieval/` are operational support artifacts, not a fifth category.
- Do not expand into application services, databases, background jobs, or hidden state unless explicitly requested.

# Recommended Next Actions

1. Run `.basb/prompts/62-retrieval-refresh.md` against a real set of compiled notes and populate the first durable retrieval entries under `vault/retrieval/`.
2. Confirm whether any repeated retrieval-artifact patterns justify stricter conventions for catalog, question-map, or relationship entries now that the retrieval and summary-freshness contracts are aligned.
3. Decide whether a small optional local search script is justified now that the retrieval layer, docs, and lint semantics are settled.

# Recently Touched

- `.basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md`
- `.basb/plans/2026-04-20-storage-and-retrieval-adr.md`
- `.basb/prompts/62-retrieval-refresh.md`
- `.basb/prompts/10-capture.md`, `11-ingest-source.md`, `20-organize-route.md`, `21-human-review.md`, `30-32` distill chain, `40-express.md`, `50-daily-brief.md`, `60-weekly-maintenance.md`, `61-knowledge-lint.md`, `70-favorite-problems.md`, `README.md`
- `vault/retrieval/catalog.md`, `question-map.md`, `pattern-index.md`, `relationship-index.md`
- `templates/source-note.md`, `project-note.md`, `area-note.md`, `resource-note.md`, `archive-note.md`, `inbox-note.md`, `daily-brief.md`, `weekly-review.md`
- `vault/index.md`, `vault/log.md`, `vault/sources/.gitkeep`
- `examples/expected-outputs/distillation-example.md`, `source-ingest-example.md`
- `tests/prompt-pack.test.js`, `package.test.js`, `scaffold-workspace.test.js`, `package.json`
- `AGENTS.md`, `README.md`, `bootstrap/README.md`, `BASBGuide.md`
- `state/active-context.md`, `state/decision-log.md`
