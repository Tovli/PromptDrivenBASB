---
title: "BASB Prompt Catalog"
purpose: "Describe the available BASB prompt files and how to use them."
stage: "maintain"
inputs:
  - ".basb/prompts/"
outputs:
  - "A quick operator guide for the prompt pack"
requires_review_when:
  - "The prompt catalog is out of sync with the actual prompt files"
related_docs:
  - ".basb/plans/2026-04-04-basb-codex-workflow.md"
  - "README.md"
tags:
  - "basb"
  - "prompt"
  - "catalog"
---
# BASB Prompt Catalog

Start BASB sessions with:

1. `AGENTS.md`
2. `01-session-start.md`

Then load only the task-specific prompt and the files selected by that startup dispatcher.

## Core Prompts

- `00-master-system.md`: deeper BASB operating rules for maintenance-heavy sessions
- `01-session-start.md`: classify-first startup dispatcher
- `02-context-selection.md`: keep context bounded once a task truly needs multiple notes

## Workflow Prompts

- `10-capture.md`: normalize raw material and route it immediately when possible
- `20-organize-route.md`: route notes from temporary holding into final P.A.R.A.
- `21-human-review.md`: escalate ambiguity safely
- `30-distill-layer2.md`: bold key concepts
- `31-distill-layer3.md`: highlight the fastest reading path
- `32-distill-layer4.md`: write the executive synthesis
- `40-express.md`: produce grounded outputs from the vault
- `50-daily-brief.md`: daily orientation brief
- `60-weekly-maintenance.md`: weekly cleanup and review
- `70-favorite-problems.md`: compare notes to enduring questions

## Validation Checklist

Before trusting a prompt, check that it:

- names the required inputs
- defines the expected output
- sets review conditions
- specifies where the result should be written
- avoids vague language that invites generic prose

## Typical Session

1. Read `AGENTS.md`.
2. Read `01-session-start.md`.
3. Classify the task and load only the selected BASB files.
4. Use `10-capture.md` to normalize and immediately route new material when confidence allows.
5. Use `20-organize-route.md` only for temporary inbox items or other unfiled notes.
6. Read the minimum relevant note set.
7. Apply the prompt and update logs.
