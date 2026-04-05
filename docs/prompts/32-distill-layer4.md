---
title: "BASB Distill Layer 4"
purpose: "Write a short executive synthesis from the existing distillation layers."
stage: "distill"
inputs:
  - "A note with Layer 2 and preferably Layer 3 already present"
outputs:
  - "A short executive synthesis at the top of the note"
requires_review_when:
  - "The note lacks enough signal for a trustworthy synthesis"
related_docs:
  - "docs/prompts/31-distill-layer3.md"
  - "docs/prompts/40-express.md"
tags:
  - "basb"
  - "prompt"
  - "distill"
  - "layer-4"
---
# Goal

Write the shortest useful synthesis of the note so a future self can re-enter it quickly.

# Rules

1. Base the synthesis on existing distillation layers.
2. Keep it concrete and grounded in the note.
3. Avoid generic summaries that could apply to many documents.

# Write Pattern

- Update the `# Executive Summary` section at the top of the note.
- Add 3 to 5 bullets or a short paragraph plus bullets.
- Update frontmatter `summary`, `updated_at`, and `express_outputs` when relevant.
