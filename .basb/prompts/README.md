---
title: "BASB Prompt Catalog"
purpose: "Describe the available BASB prompt files and how to use them."
stage: "maintain"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - ".basb/prompts/"
outputs:
  - "A quick operator guide for the prompt pack"
requires_review_when:
  - "The prompt catalog is out of sync with the actual prompt files"
related_docs:
  - ".basb/plans/2026-04-04-basb-codex-workflow.md"
  - ".basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md"
  - "README.md"
  - "vault/index.md"
  - "vault/log.md"
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

## How BASB Stores Knowledge

- **Immutable sources** live under `vault/sources/`. Each source is captured once, never rewritten. This is an operational provenance layer, not a fifth P.A.R.A. category.
- **Compiled notes** live in `vault/projects/`, `vault/areas/`, `vault/resources/`, and `vault/archives/`. They synthesize information from one or more immutable sources, carry `artifact_kind` and provenance frontmatter, and are the notes that get distilled, linked, and expressed.
- **Operational catalogs** are `vault/index.md` (what matters right now) and `vault/log.md` (how the vault has evolved). They are package-owned files and update continuously as the vault changes.

## Core Prompts

- `00-master-system.md`: deeper BASB operating rules for maintenance-heavy sessions
- `01-session-start.md`: classify-first startup dispatcher
- `02-context-selection.md`: keep context bounded once a task truly needs multiple notes

## Workflow Prompts

- `10-capture.md`: dispatcher that routes input to transient, direct compiled-note update, or durable source ingest
- `11-ingest-source.md`: create an immutable source note in `vault/sources/` and update or create derived compiled notes in P.A.R.A.
- `20-organize-route.md`: route compiled notes from temporary holding into final P.A.R.A. (never routes `vault/sources/`)
- `21-human-review.md`: escalate routing ambiguity or promotion ambiguity safely
- `30-distill-layer2.md`: bold key concepts in a compiled note, preserving source lineage
- `31-distill-layer3.md`: highlight the fastest reading path
- `32-distill-layer4.md`: write the executive synthesis
- `40-express.md`: produce grounded outputs from the vault and persist reusable ones back into the vault
- `50-daily-brief.md`: daily orientation brief that surfaces recent ingest and notes needing synthesis
- `60-weekly-maintenance.md`: weekly cleanup, review, favorite-problem pass, and lint
- `61-knowledge-lint.md`: structural checks on compiled notes and provenance
- `70-favorite-problems.md`: compare notes to enduring questions, callable during ingest, weekly maintenance, or on demand

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
4. Use `10-capture.md` to dispatch. For durable source material, hand off to `11-ingest-source.md`. For direct compiled-note updates, operate on the existing routed note. For transient conversation, do not persist.
5. Use `20-organize-route.md` only for compiled notes whose P.A.R.A. destination still needs to be decided.
6. Apply distill, express, or maintenance prompts as needed.
7. Update `vault/log.md`, `vault/index.md`, and `state/decision-log.md` when the vault materially changes.
