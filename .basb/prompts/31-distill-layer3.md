---
title: "BASB Distill Layer 3"
purpose: "Select the strongest Layer 2 material and highlight it as the fastest reading path for the compiled note."
stage: "distill"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - "A compiled note that already contains Layer 2 distillation and cites its source lineage"
outputs:
  - "A Layer 3 highlight pass inside the compiled note's Distillation section"
requires_review_when:
  - "Layer 2 does not provide a coherent enough base to compress further"
  - "Highlighting would require claims that are not supported by the linked source notes"
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

Create a sharper navigational path by selecting only the best of Layer 2. Operate on the compiled note; never edit immutable source notes under `vault/sources/`.

# Rules

1. Use Layer 2 as the input, not the full note from scratch.
2. Highlight only the material a future self would most want to see first.
3. Keep Layer 3 short.
4. Do not introduce claims that are not supported by the compiled note's `# Source Lineage`.

# Write Pattern

- Add a `## Layer 3` subsection.
- Use `==highlight==` markup or a clearly labeled highlight list.
- Update `updated_at` and `related_docs` only if there is a meaningful change.
