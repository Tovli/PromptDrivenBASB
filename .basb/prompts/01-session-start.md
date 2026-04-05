---
title: "BASB Session Start"
purpose: "Start any BASB session consistently, classify the incoming prompt, and gather only the minimum viable context."
stage: "maintain"
updated_at: "2026-04-05T16:04:15.9555516+03:00"
inputs:
  - "state/SOUL.md"
  - "state/MEMORY.md"
  - "state/active-context.md"
outputs:
  - "A short session plan and the minimal file set needed for the task"
requires_review_when:
  - "The task is ambiguous after reading the core state files"
related_docs:
  - ".basb/prompts/00-master-system.md"
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
6. Classify the incoming user prompt as one of: new capture, work on an existing note, BASB system maintenance, or transient conversation.

# Prompt Intake Default

- Unless the user clearly points to an existing note or requests BASB-system maintenance, treat the current prompt as potential second-brain material.
- If the prompt introduces net-new durable information, run `.basb/prompts/10-capture.md` first and route it in the same session when confidence permits.
- Do not leave durable prompt content only in conversation history when it should be persisted as a BASB note or review item.

# Before Editing

Produce a short pre-edit summary with:

- the task you think you are performing
- the files you expect to read
- the files you expect to modify
- whether the current prompt itself needs capture, routing, or review
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
