---
title: "BASB Capture"
purpose: "Normalize raw material, including new user prompts, route it immediately when possible, and use inbox only as a temporary fallback."
stage: "capture"
updated_at: "2026-04-05T16:04:15.9555516+03:00"
inputs:
  - "A new user prompt, idea, instruction, question, or plan that introduces durable information"
  - "Raw pasted text, article content, meeting notes, or other source material"
  - "Optional source metadata"
outputs:
  - "A routed note in its final P.A.R.A. destination, or a temporary note in vault/inbox/ if automatic routing is blocked"
requires_review_when:
  - "The raw material contains multiple unrelated captures that should be split"
  - "The source is too incomplete to title or summarize safely"
  - "The next intended use cannot be inferred with confidence of at least 0.80"
related_docs:
  - "templates/inbox-note.md"
  - "templates/project-note.md"
  - "templates/area-note.md"
  - "templates/resource-note.md"
  - "templates/archive-note.md"
  - ".basb/prompts/20-organize-route.md"
tags:
  - "basb"
  - "prompt"
  - "capture"
---
# Goal

Convert raw material into a normalized note and route it immediately when the next use is clear. Treat new user prompts as capture material when they add information the second brain should retain.

# Capture Rules

1. Treat a new user prompt as source material when it introduces durable information, commitments, ideas, questions, or reference content that belongs in the second brain.
2. Only skip capture when the prompt is clearly BASB-system maintenance, work on an existing note, or transient conversation.
3. Preserve the source material in the note body.
4. Run the routing decision during capture by applying `.basb/prompts/20-organize-route.md`.
5. If routing confidence is `0.80` or higher, place the note directly in its final `vault/projects/`, `vault/areas/`, `vault/resources/`, or `vault/archives/` destination in the same session.
6. Use `vault/inbox/` only when automatic routing cannot be done responsibly because the source is incomplete, ambiguous, or below the routing confidence threshold.
7. Infer a concise title from the material.
8. Generate a stable id using `YYYYMMDD-HHMMSS-short-slug`.
9. Add an initial summary of one to three sentences.
10. Add useful tags, but keep them broad and few.
11. When a note remains in `vault/inbox/`, append a review case to `state/review-queue.md` explaining what blocked routing.

# Required Frontmatter

Fill at least:

- `id`
- `title`
- `created_at`
- `updated_at`
- `source`
- `source_title`
- `summary`
- `tags`
- `related_docs`
- `route_reason`
- `confidence`

If the note routes successfully during capture:

- use the destination template that matches the final P.A.R.A. classification
- set `type` and `status` to the final routed state
- fill `route_reason` with the actionability-based justification

If the note cannot be routed automatically:

- use the inbox template
- set `type: inbox`
- set `status: review`
- fill `route_reason` with the missing evidence or ambiguity that blocked routing
- leave the note in `vault/inbox/` temporarily until clarified

# Recommended Body Shape

```markdown
# Executive Summary

# Source Material

# Initial Interpretation

# Possible Related Notes

# Next Actions
```

# Output Rule

Produce the routing JSON before any move across P.A.R.A. boundaries. Prefer writing the final note directly to its routed destination. Only write under `vault/inbox/` when routing is blocked, and in that case also record the blocked route in `state/review-queue.md`. If the source was a new user prompt, make sure the durable content is persisted as a BASB artifact before the session ends.
