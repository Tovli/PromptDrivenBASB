---
title: "BASB Organize and Route"
purpose: "Route a captured note into exactly one P.A.R.A. destination using a strict JSON decision."
stage: "organize"
inputs:
  - "A note from vault/inbox/ or another unfiled location"
  - "Relevant state files"
outputs:
  - "A routing JSON decision and an updated note location"
requires_review_when:
  - "Confidence is below 0.80"
  - "Two P.A.R.A. categories seem equally plausible"
  - "The user’s next intended use is unclear"
related_docs:
  - ".basb/system/SOUL.md"
  - "state/SOUL.md"
  - "state/review-queue.md"
tags:
  - "basb"
  - "prompt"
  - "routing"
---
# Goal

Decide where a compiled note belongs in P.A.R.A. based on the user's likely next use.

# Scope

- This prompt routes compiled notes only. `vault/sources/` holds immutable source material and is an operational provenance layer, not a P.A.R.A. category. Never move files into, out of, or between `vault/sources/` with this prompt.
- Inbox is a temporary holding area for ambiguous compiled notes. It is not for immutable sources that were already captured responsibly through `.basb/prompts/11-ingest-source.md`.
- `vault/index.md` and `vault/log.md` are operational artifacts; they are never routed.

# P.A.R.A. Decision Rules

- Project: active outcome with a concrete finish line.
- Area: ongoing responsibility without a natural finish line.
- Resource: useful reference not tied to active execution.
- Archive: inactive or completed material.
- Inbox is not a P.A.R.A. category. It is only a temporary holding area for compiled notes that cannot yet be routed safely.

Never create a fifth category.

# Required JSON Contract

Before moving a note, output this JSON:

```json
{
  "classification": "projects|areas|resources|archives",
  "destination_path": "vault/resources/example-note.md",
  "semantic_tags": ["example"],
  "actionability_summary": "Why this belongs here based on next use.",
  "confidence_score": 0.0,
  "requires_human_review": false
}
```

# Auto-Route Threshold

- If `confidence_score >= 0.80` and the justification is clear, move the note.
- Otherwise keep the note in `vault/inbox/`, append a case to `state/review-queue.md`, and do not move it into a final P.A.R.A. folder yet.

Even when review is required, keep the JSON classification limited to `projects`, `areas`, `resources`, or `archives`. The temporary inbox location does not change the proposed final category.

# After Routing

If the note is moved:

1. Update `type`.
2. Update `status`.
3. Update `updated_at`.
4. Fill `route_reason`.
5. Set `artifact_kind` to the best-fitting value (`concept`, `comparison`, `timeline`, `synthesis`, `source-summary`).
6. Preserve `derived_from`, `source_ids`, `source_count`, `last_ingested_at`, `claims_last_checked_at`, `supersedes`, and `contradicts` from any prior ingest. Never wipe provenance when only the routing changed.
7. Refresh `tags`, `related_docs`, and `linked_projects` if needed.

If the note is not moved:

1. Keep `type: inbox`.
2. Keep `status: review`.
3. Preserve the proposed P.A.R.A. classification in the review queue entry.
4. Record the missing evidence or ambiguity that blocked automatic routing.

# Naming Rule

Use a human-readable slug for the destination filename. Prefer stable names over clever abbreviations.
