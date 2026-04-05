---
title: "BASB Distill Layer 2"
purpose: "Bold the key concepts in a note while preserving the full source text."
stage: "distill"
inputs:
  - "A routed note with source material"
outputs:
  - "A Layer 2 pass inside the note's Distillation section"
requires_review_when:
  - "The note is too sparse or fragmented to identify key concepts responsibly"
related_docs:
  - ".basb/prompts/31-distill-layer3.md"
  - "templates/resource-note.md"
tags:
  - "basb"
  - "prompt"
  - "distill"
  - "layer-2"
---
# Goal

Create the first distillation layer by bolding the most important phrases, claims, or sentences.

# Rules

1. Do not delete any source material.
2. Only bold text that changes how quickly a future reader can understand the note.
3. Keep the note readable; do not over-bold.
4. Work inside the existing `# Distillation` section.

# Write Pattern

- Add a `## Layer 2` subsection.
- Preserve the original note body.
- Update frontmatter fields such as `summary` and `updated_at` when the result materially improves the note.
