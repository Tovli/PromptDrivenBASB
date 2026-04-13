---
title: "BASB Distill Layer 4"
purpose: "Write a short executive synthesis for the compiled note from the existing distillation layers, without collapsing source and compiled artifacts."
stage: "distill"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - "A compiled note with Layer 2 and preferably Layer 3 already present"
outputs:
  - "A short executive synthesis at the top of the compiled note"
requires_review_when:
  - "The compiled note lacks enough signal for a trustworthy synthesis"
  - "The synthesis would imply claims beyond what the source lineage supports"
related_docs:
  - ".basb/prompts/31-distill-layer3.md"
  - ".basb/prompts/40-express.md"
tags:
  - "basb"
  - "prompt"
  - "distill"
  - "layer-4"
---
# Goal

Write the shortest useful synthesis of the compiled note so a future self can re-enter it quickly. Immutable source notes are not modified; the synthesis belongs in the compiled note only.

# Rules

1. Base the synthesis on existing distillation layers and the compiled note's `# Source Lineage`.
2. Keep it concrete and grounded in the note.
3. Avoid generic summaries that could apply to many documents.
4. If the synthesis would require information not present in the linked source notes, stop and queue the ambiguity in `state/review-queue.md` instead.

# Write Pattern

- Update the `# Executive Summary` section at the top of the compiled note.
- Add 3 to 5 bullets or a short paragraph plus bullets.
- Update frontmatter `summary`, `updated_at`, `claims_last_checked_at`, and `express_outputs` when relevant.
