---
title: "BASB Capture"
purpose: "Dispatch new user input to the right flow: transient conversation, direct compiled-note update, or durable source ingest."
stage: "capture"
updated_at: "2026-04-21T18:52:14.8991301+03:00"
inputs:
  - "A new user prompt, idea, instruction, question, plan, paste, article, or transcript"
  - "Optional source metadata"
outputs:
  - "One of: no persistence (transient), an updated compiled note in P.A.R.A., or an immutable source note plus derived compiled-note updates"
requires_review_when:
  - "The input contains multiple unrelated captures that should be split"
  - "The source is too incomplete to title or summarize safely"
  - "The next intended use cannot be inferred with confidence of at least 0.80"
  - "It is unclear whether the input is durable source material or a direct compiled-note update"
related_docs:
  - ".basb/prompts/11-ingest-source.md"
  - ".basb/prompts/20-organize-route.md"
  - "templates/source-note.md"
  - "templates/inbox-note.md"
  - "templates/project-note.md"
  - "templates/area-note.md"
  - "templates/resource-note.md"
  - "templates/archive-note.md"
tags:
  - "basb"
  - "prompt"
  - "capture"
---
# Goal

Act as a dispatcher. Decide whether the incoming material is transient, a direct compiled-note update, or durable source material, then hand off to the right flow. Not every durable prompt should become one standalone routed note. One piece of source material can legitimately drive many compiled-note updates.

# Capture Rules

1. Treat a new user prompt as source material when it introduces durable information, commitments, ideas, questions, or reference content that belongs in the second brain.
2. Only skip persistence when the prompt is clearly BASB-system maintenance, work on an existing note, or transient conversation.
3. Never rewrite or collapse the raw source into a single routed note by default. Prefer preserving the source under `vault/sources/` and then creating or updating one or more compiled notes in P.A.R.A.

# Branching Logic

Use the smallest flow that fits the input.

## Transient conversation

- The input is banter, clarification, or an ephemeral question with no durable value.
- Action: do not persist. Respond inline and stop.

## Direct compiled-note update

- The input is a direct instruction to update an existing compiled note (for example: "add this decision to the launch plan note").
- The input does not introduce a new external source that should be preserved verbatim.
- Action: update the relevant routed note in place. Preserve any existing `# Source Lineage` and provenance frontmatter. If the update depends on a new source, switch to the durable-source flow instead.

## Durable source material

- The input is an article, transcript, paste, file reference, or substantive paragraph of external content.
- The input is a user-authored prompt that introduces net-new durable claims, decisions, or research that should be traceable to a specific provenance record.
- Action: hand off to `.basb/prompts/11-ingest-source.md`. That prompt creates an immutable source note in `vault/sources/`, identifies affected compiled notes, updates or creates those compiled notes in P.A.R.A., and appends a `vault/log.md` entry. Do not route the source note itself into P.A.R.A.

## Routing a compiled note when the destination is unclear

- Use `.basb/prompts/20-organize-route.md` for compiled notes whose P.A.R.A. destination needs a decision.
- Use `vault/inbox/` only when the compiled note cannot be routed responsibly yet. Immutable source notes never go to inbox; they live in `vault/sources/` from creation.

# When to Write the Compiled Note Directly

If the input is clearly a compiled artifact (for example: a plan, a synthesized brief, or an explicit decision record) and does not come from a preserved external source, you may create the compiled note directly in the appropriate P.A.R.A. folder. Fill the provenance frontmatter with empty `source_ids` and note the authorship in `route_reason`.

# Required Frontmatter

When the dispatcher creates or updates a compiled note directly, fill at least:

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
- `artifact_kind`
- `derived_from`
- `source_ids`
- `source_count`
- `last_ingested_at`
- `summary_last_refreshed_at`

For the inbox fallback:

- use the inbox template
- set `type: inbox`
- set `status: review`
- fill `route_reason` with the missing evidence or ambiguity that blocked routing
- append a case to `state/review-queue.md`

# Output Rule

Produce any required routing JSON before moving notes across P.A.R.A. boundaries. When the input is durable source material, delegate to `.basb/prompts/11-ingest-source.md` and do not attempt to inline the source and its derived updates into one note. Make sure the durable content is persisted as a BASB artifact before the session ends.
