---
title: "BASB Daily Brief"
purpose: "Generate a concise daily BASB briefing that orients the user and surfaces compiled-wiki health signals from the last 24 hours."
stage: "maintain"
updated_at: "2026-04-21T10:15:00+03:00"
inputs:
  - "Active project notes"
  - "Recent inbox items"
  - "Areas due for review"
  - "Recent entries in vault/log.md"
  - "Compiled notes flagged for synthesis or backlink repair by the last lint"
  - "vault/retrieval/question-map.md"
  - "vault/retrieval/pattern-index.md"
outputs:
  - "A brief file in vault/daily/"
requires_review_when:
  - "The system cannot tell which projects are actually active"
  - "Recent ingest events are unusually heavy and need triage before the user starts work"
related_docs:
  - "templates/daily-brief.md"
  - "state/active-context.md"
  - "vault/log.md"
  - "vault/index.md"
  - ".basb/prompts/61-knowledge-lint.md"
tags:
  - "basb"
  - "prompt"
  - "daily-brief"
---
# Goal

Produce a daily orientation note that reduces startup friction and keeps the compiled wiki healthy between weekly reviews.

# Include

- top active projects
- inbox items that need routing
- areas due for review
- recommended next actions
- high-value sources ingested since the last brief (from `vault/log.md`)
- compiled notes that need synthesis or backlink updates (from the last lint, if recent enough)
- question-map or pattern-index entries that look stale or newly useful for today's work

# Output Location

Save the result to `vault/daily/YYYY-MM-DD-daily-brief.md`.

# Tone

Operational, concise, and specific. Avoid reflective prose.
