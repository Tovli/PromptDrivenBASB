---
title: "BASB Express"
purpose: "Produce scoped outputs such as plans, briefs, or syntheses, and persist durable ones back into the vault so the compiled wiki keeps growing."
stage: "express"
updated_at: "2026-04-21T18:52:14.8991301+03:00"
inputs:
  - "A clear output goal"
  - "A bounded set of relevant compiled notes, plus the immutable source notes those notes cite when needed"
outputs:
  - "A grounded synthesis or durable output with source references"
  - "For durable outputs: a new or updated compiled note plus a vault/log.md entry"
requires_review_when:
  - "The context set is too broad to support a reliable output"
  - "The requested output would require unsupported claims"
  - "It is unclear whether the output is a one-off answer or a durable compiled note"
related_docs:
  - ".basb/prompts/02-context-selection.md"
  - ".basb/prompts/11-ingest-source.md"
  - ".basb/prompts/62-retrieval-refresh.md"
  - "templates/daily-brief.md"
  - "vault/index.md"
  - "vault/log.md"
  - "vault/retrieval/question-map.md"
tags:
  - "basb"
  - "prompt"
  - "express"
---
# Goal

Turn stored knowledge into useful output without losing traceability. When the output is durable, persist it back into the vault by default so future sessions can reuse it.

# Rules

1. Start with distilled notes and only pull raw source if needed.
2. Cite compiled-note paths in a final `Sources` section. Cite immutable source notes under `vault/sources/` only when the expression leaned directly on the raw material.
3. Keep the output scoped to the requested task.
4. Decide whether the output is durable before writing it. If the answer has durable future value, persist it.

# Persistence Rule

An expressed output has durable value when any of the following is true:

- it will be reused more than once (a brief, a plan, a recurring decision record)
- it merges or synthesizes claims from multiple compiled notes in a way that did not exist before
- it is a canonical answer to a favorite problem
- it resolves or explicitly records a contradiction

When the output is durable, treat expression as a vault-writing act:

1. Save the output as a routed compiled note in the appropriate P.A.R.A. folder using the matching template.
2. Set `artifact_kind` (often `synthesis`), fill `derived_from` with the contributing compiled notes, fill `source_ids` with any immutable source notes transitively cited, bump `source_count`, and set `last_ingested_at`. If the durable output writes or refreshes the note's `# Executive Summary`, also set `summary_last_refreshed_at`.
3. Back-link the contributing compiled notes by adding the new note to their `express_outputs` and, when appropriate, their `related_docs`.
4. Append an entry to `vault/log.md` describing the durable output, the contributing notes, and why it now lives in the vault.
5. Run `.basb/prompts/62-retrieval-refresh.md` against the new or materially changed compiled note so `vault/retrieval/` stays aligned.
6. Refresh `vault/index.md` if the new output is a hub, a canonical summary, or otherwise a high-value page.
7. Append a concise entry to `state/decision-log.md`.

When the output is not durable, return it inline and do not persist it. Do not produce low-value noise notes just to satisfy the persistence rule.

# Good Outputs

- project plans
- research syntheses
- comparison briefs
- argument outlines

# Output Pattern

```markdown
# Title

# Answer or Brief

# Recommended Next Actions

# Sources
- vault/<compiled-note-path>.md
- vault/sources/<source-id>.md (only when raw source was used directly)
```
