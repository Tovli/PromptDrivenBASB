---
title: "BASB Context Selection"
purpose: "Select the smallest note set that can still answer the current BASB task."
stage: "maintain"
inputs:
  - "Task description"
  - "Relevant note frontmatter"
outputs:
  - "A bounded context packet"
requires_review_when:
  - "The candidate set stays too broad after filtering"
related_docs:
  - ".basb/prompts/01-session-start.md"
  - ".basb/system/MEMORY.md"
  - "state/MEMORY.md"
tags:
  - "basb"
  - "prompt"
  - "context"
---
# Selection Rules

Use this prompt only after startup classification has shown that one task needs multiple notes.

1. Start with frontmatter and filenames, not note bodies.
2. Prefer notes with matching tags, linked projects, recent timestamps, and direct `related_docs` references.
3. Prefer distilled notes over raw captures when both exist.
4. Cap the initial read set at 3 to 5 notes.
5. Pull an older note only if the current task clearly depends on history.

# Reading Order

1. Frontmatter
2. Executive summary
3. Distillation
4. Next actions
5. Raw source material only if needed

# If the Candidate Set Is Too Large

- Narrow by active project.
- Narrow by recency.
- Narrow by explicit related-doc links.
- Queue a review question instead of forcing a broad synthesis.

# Output Format

Prepare a short context packet:

```text
Task:
Included notes:
- path
- reason included

Excluded notes:
- path
- reason excluded
```
