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

# Ambiguity Types

Classify the ambiguity before writing the review entry, because the two classes have different failure modes:

- **Routing ambiguity** — a compiled note exists but its P.A.R.A. destination is unclear. The note should stay in `vault/inbox/` temporarily and surface two or three plausible destinations.
- **Promotion ambiguity** — an immutable source has been captured under `vault/sources/`, but it is unclear whether it warrants a new compiled note or only an update to one or more existing compiled notes. The source stays in `vault/sources/`; it does not move to `vault/inbox/`. The review entry should propose which existing notes to update and whether any new compiled note is actually necessary.

# Review Rules

1. Do not move or rewrite the note in a way that closes off alternatives.
2. Summarize the ambiguity in one short paragraph and label it as routing or promotion.
3. Present two or three plausible options.
4. State the preferred option and why.
5. For routing ambiguity, keep the compiled note in `vault/inbox/` until clarified. For promotion ambiguity, leave the source note in `vault/sources/` and do not create speculative compiled notes.
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
- ambiguity type (routing or promotion)
- note path (compiled note for routing ambiguity, source note for promotion ambiguity)
- proposed P.A.R.A. classification when known
- proposed destination path when known
- affected existing compiled notes when known (for promotion ambiguity)
- ambiguity reason
- options
- preferred action
- requested user input
