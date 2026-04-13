---
title: "BASB Knowledge Lint"
purpose: "Run structural checks across compiled notes and source lineage, then produce a concrete maintenance report."
stage: "maintain"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - "All compiled notes in vault/projects/, vault/areas/, vault/resources/, vault/archives/"
  - "All immutable source notes under vault/sources/"
  - "vault/index.md"
  - "vault/log.md"
outputs:
  - "A concrete maintenance report embedded into the weekly review note or returned inline when run on demand"
  - "Optional frontmatter updates when a finding is unambiguous (for example, adding a missing `contradicts` entry that is already written in the body)"
requires_review_when:
  - "A contradiction appears between compiled notes and the resolution is not obvious"
  - "Two compiled notes look like duplicates but merging them would lose structure"
  - "A source has been captured but has no derived note links and it is unclear whether that is intentional"
related_docs:
  - ".basb/prompts/60-weekly-maintenance.md"
  - ".basb/prompts/20-organize-route.md"
  - "vault/index.md"
  - "vault/log.md"
tags:
  - "basb"
  - "prompt"
  - "lint"
---
# Goal

Act as a structural linter over the compiled wiki. The output must be a concrete maintenance report with specific note paths and specific repairs, not vague commentary.

# Checks

Run each check. For each finding, record the affected note paths, the problem in one line, and the proposed repair.

1. **Orphan compiled notes** — compiled notes with empty `related_docs`, empty `linked_projects`, and no incoming backlinks from other compiled notes. Flag as either "promote to a hub", "link into existing hub", or "archive".
2. **Missing related_docs on linked material** — compiled notes whose body references another compiled note by path, title, or obvious synonym but whose frontmatter `related_docs` does not reflect the link. Propose the specific links to add.
3. **Stale summaries after ingest** — compiled notes whose `last_ingested_at` is newer than `updated_at` on the `summary`, or whose distillation layers predate the most recent source added to `derived_from`. Propose a Layer 4 refresh.
4. **Contradictions recorded in body but not in frontmatter** — notes whose body mentions disagreeing with another note but whose `contradicts` frontmatter is empty. Propose the specific `contradicts` entries.
5. **Sources with no derived notes** — files under `vault/sources/` whose `derived_notes` is empty and which have no incoming `source_ids` references from any compiled note, despite meaningful content. Propose either a compiled note to create or an explicit note that this source is intentionally standalone.
6. **Duplicated concept pages** — compiled notes whose titles, summaries, or source lineage overlap heavily. Propose either a merge, a canonical-page declaration plus backlinks, or a clear split rationale.
7. **Broken source lineage** — compiled notes whose `source_ids` point to source notes that no longer exist, or whose `# Source Lineage` section lists paths that do not resolve. Propose either re-ingesting the missing source or removing the stale reference with a logged explanation.
8. **Index drift** — entries in `vault/index.md` that point to missing or archived notes, or notable high-value compiled notes that are not yet listed. Propose specific additions or removals.

# Output Pattern

```markdown
# Knowledge Lint Report — YYYY-MM-DD

## Orphan compiled notes
- vault/<path>.md — <one-line problem> — <proposed repair>

## Missing related_docs
- vault/<path>.md — references <target>, missing in related_docs — add link

## Stale summaries
- vault/<path>.md — last_ingested_at newer than summary — propose Layer 4 refresh

## Contradictions in body only
- vault/<path>.md — body disagrees with vault/<other>.md — add contradicts entry

## Sources without derived notes
- vault/sources/<id>.md — no derived notes and no incoming source_ids — propose compiled note or mark standalone

## Duplicated concept pages
- vault/<a>.md and vault/<b>.md — heavy overlap — propose merge or canonical declaration

## Broken source lineage
- vault/<path>.md — source_ids <id> not found — propose re-ingest or cleanup

## Index drift
- vault/index.md — stale entry for vault/<path>.md — remove
- vault/index.md — missing entry for high-value note vault/<path>.md — add
```

# Write Rules

1. Make the report concrete. Every finding cites at least one vault path.
2. Do not silently rewrite compiled notes. Apply frontmatter changes only when the repair is unambiguous and consistent with the body.
3. When lint fires during weekly maintenance, the report is embedded in the weekly review note and the maintenance prompt decides which repairs to carry out.
4. When lint fires on demand, return the report inline and leave repairs to the caller.
5. Append an entry to `vault/log.md` when lint-driven repairs materially change the vault.
