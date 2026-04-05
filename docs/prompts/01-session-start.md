---
title: "BASB Session Start"
purpose: "Start any BASB session consistently and with the minimum viable context."
stage: "maintain"
inputs:
  - "state/SOUL.md"
  - "state/MEMORY.md"
  - "state/active-context.md"
outputs:
  - "A short session plan and the minimal file set needed for the task"
requires_review_when:
  - "The task is ambiguous after reading the core state files"
related_docs:
  - "docs/prompts/00-master-system.md"
  - "state/active-context.md"
tags:
  - "basb"
  - "prompt"
  - "session-start"
---
# Startup Checklist

1. Read `BASBGuide.md`.
2. Read `state/SOUL.md`.
3. Read `state/MEMORY.md`.
4. Read `state/active-context.md`.
5. Read the task-specific prompt.

# Before Editing

Produce a short pre-edit summary with:

- the task you think you are performing
- the files you expect to read
- the files you expect to modify
- any ambiguity that could force review

# Context Hygiene

- Read frontmatter before full note bodies.
- Prefer local project context over scanning the whole vault.
- If more than 5 notes seem relevant, narrow the set before continuing.

# When to Stop and Ask

Stop and ask for clarification if:

- the task mixes routing and expression in a way that changes the active scope
- two different P.A.R.A. destinations look equally valid
- the note does not contain enough information to preserve fidelity

# Session Close

When finished:

1. Summarize the file changes.
2. Append to `state/decision-log.md`.
3. Update `state/active-context.md` if the next likely task changed.
