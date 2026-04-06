---
title: "BASB Session Start"
purpose: "Start any BASB session consistently, classify the incoming prompt, and gather only the minimum viable context."
stage: "maintain"
updated_at: "2026-04-06T18:03:44.8728655+03:00"
inputs:
  - "AGENTS.md"
  - "Current user prompt"
outputs:
  - "A short session plan and the minimal file set needed for the task"
requires_review_when:
  - "The task is still ambiguous after classification and the first relevant BASB files are loaded"
related_docs:
  - "AGENTS.md"
  - ".basb/prompts/02-context-selection.md"
tags:
  - "basb"
  - "prompt"
  - "session-start"
---
# Startup Checklist

1. Read `AGENTS.md`.
2. Read this prompt.
3. Classify the incoming user prompt as one of: new capture, work on an existing note, BASB system maintenance, or transient conversation.
4. Load only the smallest context bundle that matches the classification.

# Context Bundles

## New Capture

Read:

- `state/SOUL.md`
- `.basb/prompts/10-capture.md`
- `.basb/prompts/20-organize-route.md` only if the captured material is ready to route in the same session

If the task ends up depending on multiple notes, add `.basb/prompts/02-context-selection.md` before reading more.

## Existing-Note Work

Read:

- `state/SOUL.md`
- the note frontmatter first
- the note body only if the task cannot be completed from frontmatter, summary, or distillation layers
- the smallest task-specific BASB prompt needed next

Use `.basb/prompts/02-context-selection.md` only if more than 3 to 5 notes appear relevant.

## BASB-System Maintenance

Read:

- `state/SOUL.md`
- `state/MEMORY.md`
- `state/active-context.md`
- `.basb/prompts/00-master-system.md`

Read `BASBGuide.md` only if the task is architectural, prompt-design, or package-maintainer work.

## Transient Conversation

Keep BASB overhead minimal. Do not create or update durable BASB artifacts unless the user explicitly wants persistence.

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
- If more than 3 to 5 notes seem relevant, narrow the set with `.basb/prompts/02-context-selection.md` before continuing.

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
4. Queue unresolved ambiguity in `state/review-queue.md`.
