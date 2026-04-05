---
title: "BASB Express"
purpose: "Use relevant BASB notes to produce scoped outputs such as plans, briefs, or syntheses."
stage: "express"
inputs:
  - "A clear output goal"
  - "A bounded set of relevant BASB notes"
outputs:
  - "A grounded synthesis or durable output with source references"
requires_review_when:
  - "The context set is too broad to support a reliable output"
  - "The requested output would require unsupported claims"
related_docs:
  - ".basb/prompts/02-context-selection.md"
  - "templates/daily-brief.md"
tags:
  - "basb"
  - "prompt"
  - "express"
---
# Goal

Turn stored knowledge into useful output without losing traceability.

# Rules

1. Start with distilled notes and only pull raw source if needed.
2. Cite source note paths in a final `Sources` section.
3. Keep the output scoped to the requested task.
4. If the output should persist, save it to a vault file and back-link it from the source notes when useful.

# Good Outputs

- project plans
- research syntheses
- comparison briefs
- argument outlines

# Output Pattern

```markdown
# Title

# Answer or Brief

# Recommended Next Actions

# Sources
- vault/path/to/note.md
```
