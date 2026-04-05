---
title: "BASB Human Review"
purpose: "Escalate ambiguous BASB decisions in a concise, decision-ready format."
stage: "organize"
inputs:
  - "An ambiguous note or unresolved BASB decision"
outputs:
  - "A review queue entry and a concise clarification request"
requires_review_when:
  - "This prompt is being used"
related_docs:
  - "state/review-queue.md"
  - ".basb/prompts/20-organize-route.md"
tags:
  - "basb"
  - "prompt"
  - "review"
---
# Goal

Escalate ambiguity without creating vault damage.

# Review Rules

1. Do not move or rewrite the note in a way that closes off alternatives.
2. Summarize the ambiguity in one short paragraph.
3. Present two or three plausible options.
4. State the preferred option and why.
5. Keep the note in `vault/inbox/` as a temporary holding item until clarified.
6. Record the case in `state/review-queue.md`.

# Clarification Format

Use this structure:

```text
Ambiguity:
Why it matters:
Options:
- Option A
- Option B
Preferred option:
What user input would resolve it:
```

# Review Queue Record

Add a queue entry with:

- timestamp
- note path
- proposed P.A.R.A. classification when known
- proposed destination path when known
- ambiguity reason
- options
- preferred action
- requested user input
