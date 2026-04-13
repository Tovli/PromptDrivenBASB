---
title: "BASB Distill Layer 2"
purpose: "Bold the key concepts in a compiled note while preserving its source lineage and leaving immutable source material untouched."
stage: "distill"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - "A routed compiled note in P.A.R.A. that cites one or more immutable source notes under vault/sources/"
outputs:
  - "A Layer 2 pass inside the compiled note's Distillation section"
requires_review_when:
  - "The compiled note is too sparse or fragmented to identify key concepts responsibly"
  - "The compiled note disagrees with its source lineage and the disagreement has not been resolved"
related_docs:
  - ".basb/prompts/31-distill-layer3.md"
  - ".basb/prompts/11-ingest-source.md"
  - "templates/resource-note.md"
tags:
  - "basb"
  - "prompt"
  - "distill"
  - "layer-2"
---
# Goal

Create the first distillation layer by bolding the most important phrases, claims, or sentences inside the compiled note. Work from the compiled note's synthesis and its `# Source Lineage`, not by rewriting immutable source notes under `vault/sources/`.

# Rules

1. Do not modify any file under `vault/sources/`. Immutable sources stay immutable.
2. Work only inside the compiled note's `# Distillation` section.
3. Only bold text that changes how quickly a future reader can understand the compiled synthesis.
4. Keep the note readable; do not over-bold.
5. If the compiled note's claims no longer match the linked source notes, stop and queue a case in `state/review-queue.md` rather than papering over the drift by rewriting.

# Write Pattern

- Add a `## Layer 2` subsection.
- Preserve the compiled note body.
- Update frontmatter fields such as `summary`, `claims_last_checked_at`, and `updated_at` when the result materially improves the note.
