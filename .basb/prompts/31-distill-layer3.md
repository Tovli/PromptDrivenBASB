---
title: "BASB Distill Layer 3"
purpose: "Select the strongest Layer 2 material and highlight it as the fastest reading path."
stage: "distill"
inputs:
  - "A note that already contains Layer 2 distillation"
outputs:
  - "A Layer 3 highlight pass inside the note's Distillation section"
requires_review_when:
  - "Layer 2 does not provide a coherent enough base to compress further"
related_docs:
  - ".basb/prompts/30-distill-layer2.md"
  - ".basb/prompts/32-distill-layer4.md"
tags:
  - "basb"
  - "prompt"
  - "distill"
  - "layer-3"
---
# Goal

Create a sharper navigational path by selecting only the best of Layer 2.

# Rules

1. Use Layer 2 as the input, not the full note from scratch.
2. Highlight only the material a future self would most want to see first.
3. Keep Layer 3 short.

# Write Pattern

- Add a `## Layer 3` subsection.
- Use `==highlight==` markup or a clearly labeled highlight list.
- Update `updated_at` and `related_docs` only if there is a meaningful change.
