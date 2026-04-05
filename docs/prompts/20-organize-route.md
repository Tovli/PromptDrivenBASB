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
  - "state/SOUL.md"
  - "state/review-queue.md"
tags:
  - "basb"
  - "prompt"
  - "routing"
---
# Goal

Decide where a note belongs in P.A.R.A. based on the user's likely next use.

# P.A.R.A. Decision Rules

- Project: active outcome with a concrete finish line.
- Area: ongoing responsibility without a natural finish line.
- Resource: useful reference not tied to active execution.
- Archive: inactive or completed material.

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
- Otherwise append a case to `state/review-queue.md` and do not move it.

# After Routing

If the note is moved:

1. Update `type`.
2. Update `status`.
3. Update `updated_at`.
4. Fill `route_reason`.
5. Refresh `tags`, `related_docs`, and `linked_projects` if needed.

# Naming Rule

Use a human-readable slug for the destination filename. Prefer stable names over clever abbreviations.
