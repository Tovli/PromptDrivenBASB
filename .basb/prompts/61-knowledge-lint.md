---
title: "BASB Knowledge Lint"
purpose: "Run structural checks across compiled notes, source lineage, and retrieval artifacts, then produce a concrete maintenance report."
stage: "maintain"
updated_at: "2026-04-22T10:05:29.4606977+03:00"
inputs:
  - "All compiled notes in vault/projects/, vault/areas/, vault/resources/, vault/archives/"
  - "All immutable source notes under vault/sources/"
  - "vault/index.md"
  - "vault/log.md"
  - "vault/retrieval/catalog.md"
  - "vault/retrieval/question-map.md"
  - "vault/retrieval/pattern-index.md"
  - "vault/retrieval/relationship-index.md"
outputs:
  - "A concrete maintenance report embedded into the weekly review note or returned inline when run on demand"
  - "Optional frontmatter updates when a finding is unambiguous"
requires_review_when:
  - "A contradiction appears between compiled notes and the resolution is not obvious"
  - "Two compiled notes look like duplicates but merging them would lose structure"
  - "A source has been captured but has no derived note links and it is unclear whether that is intentional"
related_docs:
  - ".basb/prompts/60-weekly-maintenance.md"
  - ".basb/prompts/20-organize-route.md"
  - ".basb/prompts/62-retrieval-refresh.md"
  - "vault/index.md"
  - "vault/log.md"
  - "vault/retrieval/catalog.md"
tags:
  - "basb"
  - "prompt"
  - "lint"
---
# Goal

Act as a structural linter over the compiled wiki and its retrieval layer. The output must be a concrete maintenance report with specific note paths and specific repairs, not vague commentary.

# Checks

Run each check. For each finding, record the affected note paths, the problem in one line, and the proposed repair.

1. **Orphan compiled notes** - compiled notes with empty `related_docs`, empty `linked_projects`, and no incoming backlinks from other compiled notes. Flag as either "promote to a hub", "link into existing hub", or "archive".
2. **Missing related_docs on linked material** - compiled notes whose body references another compiled note by path, title, or obvious synonym but whose frontmatter `related_docs` does not reflect the link. Propose the specific links to add.
3. **Stale summaries after ingest** - compiled notes with a non-null `last_ingested_at` whose `summary_last_refreshed_at` is null or older than `last_ingested_at`, or whose frontmatter `summary` is still empty after ingest. Treat `summary_last_refreshed_at` as the latest review of the current summary against ingested evidence, even when the summary text stays unchanged. Propose a Layer 4 refresh or summary review and set `summary_last_refreshed_at` once the note has been checked against the latest evidence.
4. **Contradictions recorded in body but not in frontmatter** - notes whose body mentions disagreeing with another note but whose `contradicts` frontmatter is empty. Propose the specific `contradicts` entries.
5. **Sources with no derived notes** - files under `vault/sources/` whose `derived_notes` is empty and which have no incoming `source_ids` references from any compiled note, despite meaningful content. Propose either a compiled note to create or an explicit note that this source is intentionally standalone.
6. **Duplicated concept pages** - compiled notes whose titles, summaries, or source lineage overlap heavily. Propose either a merge, a canonical-page declaration plus backlinks, or a clear split rationale.
7. **Broken source lineage** - compiled notes whose `source_ids` point to source notes that no longer exist, or whose `# Source Lineage` section lists paths that do not resolve. Propose either re-ingesting the missing source or removing the stale reference with a logged explanation.
8. **Index drift** - entries in `vault/index.md` that point to missing or archived notes, or notable high-value compiled notes that are not yet listed. Propose specific additions or removals.
9. **Retrieval coverage drift** - high-value compiled notes missing `canonical_id` or a corresponding entry in `vault/retrieval/catalog.md`. Propose specific metadata or catalog repairs.
10. **Broken question map links** - entries in `vault/retrieval/question-map.md` that point to missing notes, stale aliases, or questions no longer represented in the contributing note set. Propose specific fixes.
11. **Relationship index drift** - entries in `vault/retrieval/relationship-index.md` or `vault/retrieval/pattern-index.md` that point to missing notes, stale aliases, or duplicate patterns. Propose cleanup or a canonical-page decision.

# Output Pattern

```markdown
# Knowledge Lint Report - YYYY-MM-DD

## Orphan compiled notes
- vault/<path>.md - <one-line problem> - <proposed repair>

## Missing related_docs
- vault/<path>.md - references <target>, missing in related_docs - add link

## Stale summaries
- vault/<path>.md - `last_ingested_at` is newer than `summary_last_refreshed_at`, `summary_last_refreshed_at` is null, or `summary` is empty after ingest - propose a Layer 4 refresh or evidence review, then update `summary_last_refreshed_at`

## Contradictions in body only
- vault/<path>.md - body disagrees with vault/<other>.md - add contradicts entry

## Sources without derived notes
- vault/sources/<id>.md - no derived notes and no incoming source_ids - propose compiled note or mark standalone

## Duplicated concept pages
- vault/<a>.md and vault/<b>.md - heavy overlap - propose merge or canonical declaration

## Broken source lineage
- vault/<path>.md - source_ids <id> not found - propose re-ingest or cleanup

## Index drift
- vault/index.md - stale entry for vault/<path>.md - remove
- vault/index.md - missing entry for high-value note vault/<path>.md - add

## Retrieval coverage drift
- vault/<path>.md - missing canonical_id or catalog entry - add canonical_id and refresh retrieval catalog

## Broken question map links
- vault/retrieval/question-map.md - question or note link stale - update mapped note set

## Relationship index drift
- vault/retrieval/relationship-index.md - edge points to missing note or duplicated pattern - repair or collapse to canonical entry
```

# Write Rules

1. Make the report concrete. Every finding cites at least one vault path.
2. Do not silently rewrite compiled notes. Apply frontmatter changes only when the repair is unambiguous and consistent with the body.
3. When lint fires during weekly maintenance, the report is embedded in the weekly review note and the maintenance prompt decides which repairs to carry out.
4. When lint fires on demand, return the report inline and leave repairs to the caller.
5. Append an entry to `vault/log.md` when lint-driven repairs materially change the vault or the retrieval layer.
