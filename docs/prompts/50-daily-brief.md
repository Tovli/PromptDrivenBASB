---
title: "BASB Daily Brief"
purpose: "Generate a concise daily BASB briefing from active notes and recent captures."
stage: "maintain"
inputs:
  - "Active project notes"
  - "Recent inbox items"
  - "Areas due for review"
outputs:
  - "A brief file in vault/daily/"
requires_review_when:
  - "The system cannot tell which projects are actually active"
related_docs:
  - "templates/daily-brief.md"
  - "state/active-context.md"
tags:
  - "basb"
  - "prompt"
  - "daily-brief"
---
# Goal

Produce a daily orientation note that reduces startup friction.

# Include

- top active projects
- inbox items that need routing
- areas due for review
- recommended next actions

# Output Location

Save the result to `vault/daily/YYYY-MM-DD-daily-brief.md`.

# Tone

Operational, concise, and specific. Avoid reflective prose.
