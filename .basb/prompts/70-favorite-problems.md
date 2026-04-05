---
title: "BASB Favorite Problems"
purpose: "Compare recent notes against the user's enduring questions to surface useful matches."
stage: "maintain"
inputs:
  - "state/favorite-problems.md"
  - "Recent or relevant BASB notes"
outputs:
  - "A short match report and optional note metadata updates"
requires_review_when:
  - "The match is weak or mostly thematic rather than useful"
related_docs:
  - "state/favorite-problems.md"
  - "state/MEMORY.md"
tags:
  - "basb"
  - "prompt"
  - "favorite-problems"
---
# Goal

Use the user's recurring questions as a filter for spotting non-obvious relevance.

# Rules

1. Compare notes to questions, not just keywords.
2. Prefer useful relevance over thematic overlap.
3. If a note genuinely fits a favorite problem, update the note frontmatter.
4. If the match is weak, leave the note unchanged.

# Output Pattern

```markdown
# Favorite Problem Matches

- note: vault/resources/example.md
  matched_problem: "<question>"
  why_it_matters: "<short explanation>"
  confidence: 0.0
```
