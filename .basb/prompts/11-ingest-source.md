---
title: "BASB Ingest Source"
purpose: "Capture durable source material as an immutable note in vault/sources/ and update or create derived compiled notes in P.A.R.A."
stage: "capture"
updated_at: "2026-04-22T10:05:29.4606977+03:00"
inputs:
  - "Durable source material such as an article, transcript, paste, file, or external research"
  - "Optional source metadata such as URL, author, capture timestamp, content hash"
  - "The current vault/index.md so existing high-value compiled notes can be considered"
outputs:
  - "An immutable source note in vault/sources/"
  - "Zero or more new or updated compiled notes in vault/projects/, vault/areas/, vault/resources/, or vault/archives/"
  - "An entry in vault/log.md describing the ingest event"
  - "An optional refresh of vault/index.md if a high-value compiled note was created or substantially changed"
requires_review_when:
  - "The source material is too incomplete or ambiguous to summarize responsibly"
  - "More than one existing compiled note appears to be partially superseded by the source"
  - "The source contradicts an existing compiled note and the resolution is not obvious"
related_docs:
  - "templates/source-note.md"
  - ".basb/prompts/10-capture.md"
  - ".basb/prompts/62-retrieval-refresh.md"
  - ".basb/prompts/20-organize-route.md"
  - ".basb/prompts/70-favorite-problems.md"
  - "vault/index.md"
  - "vault/log.md"
  - "vault/retrieval/catalog.md"
tags:
  - "basb"
  - "prompt"
  - "ingest"
  - "source"
---
# Goal

Treat durable source material as a first-class, immutable artifact. Preserve the source under `vault/sources/`, then create or update derived compiled notes in P.A.R.A. so one source can drive many updates without overwriting raw input.

# Ingest Rules

1. Create the immutable source note first. Use `templates/source-note.md` and write to `vault/sources/<id>.md` where `<id>` follows `YYYYMMDD-HHMMSS-short-slug`.
2. Preserve the raw source text verbatim inside `# Source Material`. Do not edit it after capture. Re-ingest under a new id if the upstream source changes.
3. Set `artifact_kind: "source"` and keep `type` consistent with the package convention (`type: "resource"` plus `artifact_kind: "source"` is the default).
4. Extract a one-to-three sentence `summary`, broad `tags`, and any source metadata available.
5. Run `.basb/prompts/70-favorite-problems.md` against the source. Record only genuinely useful matches in the source note's `# Favorite Problem Matches` section.
6. Identify candidate compiled notes to update by reading `vault/index.md` and the relevant P.A.R.A. directories.
7. For each affected compiled note:
   - update or create the note using the appropriate routed template
   - add `vault/sources/<id>.md` to `derived_from` and the source's id to `source_ids`
   - bump `source_count` and set `last_ingested_at`
   - review the current synthesis against the newly ingested evidence; if the ingest materially changes the synthesis, refresh frontmatter `summary` and `# Executive Summary`, and in all cases set `summary_last_refreshed_at` once the summary has been checked against the latest evidence
   - record the source under `# Source Lineage`
   - record any new contradictions in `contradicts` and any superseded notes in `supersedes`
8. Append an entry to `vault/log.md` summarizing the ingest, the affected compiled notes, and any contradictions resolved.
9. If any affected compiled note is high-value or materially changed, run `.basb/prompts/62-retrieval-refresh.md` against that bounded note set and update `vault/retrieval/`.
10. Refresh `vault/index.md` only when a high-value compiled note was created, became a hub, or substantially changed its synthesis.
11. Append a concise entry to `state/decision-log.md`. If routing of a derived note is below `0.80` confidence, add a case to `state/review-queue.md` instead of guessing.

# Required Frontmatter for the Source Note

Fill at least:

- `id`
- `title`
- `type`
- `status` (use `captured`)
- `artifact_kind` (use `source`)
- `created_at`
- `updated_at`
- `source`
- `source_title`
- `summary`
- `tags`
- `captured_from`
- `derived_notes`
- `confidence`

`content_hash` is optional but recommended when the source is a stable file or URL snapshot.

# Body Shape for the Source Note

```markdown
# Source Material

# Derived Notes

# Favorite Problem Matches

# Ingest Notes
```

# Output Rule

Always write the immutable source note before the derived compiled notes. If derived updates cannot be completed in this session, leave the source note in place and queue the missing follow-up in `state/review-queue.md`. Never rewrite the source note to match a later interpretation; create a new compiled note or revise an existing one instead.
