---
title: "BASB Prompt Catalog"
purpose: "Describe the available BASB prompt files and how to use them."
stage: "maintain"
inputs:
  - "docs/prompts/"
outputs:
  - "A quick operator guide for the prompt pack"
requires_review_when:
  - "The prompt catalog is out of sync with the actual prompt files"
related_docs:
  - "docs/plans/2026-04-04-basb-codex-workflow.md"
  - "README.md"
tags:
  - "basb"
  - "prompt"
  - "catalog"
---
# BASB Prompt Catalog

Each prompt in this directory is meant to be combined with:

1. `BASBGuide.md`
2. `state/SOUL.md`
3. `state/MEMORY.md`
4. `state/active-context.md`
5. The task-specific prompt file

## Core Prompts

- `00-master-system.md`: global BASB operating rules
- `01-session-start.md`: consistent session startup
- `02-context-selection.md`: keep context bounded

## Workflow Prompts

- `10-capture.md`: normalize raw material into an inbox note
- `20-organize-route.md`: route notes into P.A.R.A.
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

1. Read the core state files.
2. Read `00-master-system.md`.
3. Read one workflow prompt.
4. Read the minimum relevant note set.
5. Apply the prompt and update logs.
