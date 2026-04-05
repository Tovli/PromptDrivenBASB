# BASB Codex Prompt Workflow Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn this workspace into a prompt-driven BASB system where Codex itself performs capture, organization, distillation, expression, and maintenance without building an external app or service.

**Architecture:** Codex is the BASB engine. The workspace stores only durable artifacts: markdown notes, frontmatter, prompt files, templates, and lightweight state documents such as memory, review queues, and decision logs. Every BASB action is executed by giving Codex a master operating prompt plus one task-specific prompt and the relevant file paths.

**Tech Stack:** Codex, markdown, YAML frontmatter, JSON output contracts inside prompts, reusable prompt files, vault folders, templates, and manual verification checklists.

---

## Core Reframe

This plan is not for building BASB as software.

This plan is for building BASB as an operating system for Codex:

- The file system is the vault.
- Prompt files are the workflow engine.
- Markdown files are the database.
- Codex sessions are the runtime.
- Human approval handles ambiguity instead of backend automation.

If a step starts drifting toward APIs, servers, schedulers, databases, or background workers, cut it. The goal is a disciplined prompt-and-files workflow that Codex can run directly.

## Assumptions

- The user will run BASB through Codex sessions, not through a deployed application.
- The workspace will persist BASB state in markdown files that Codex can read and update.
- P.A.R.A. remains the structural model and C.O.D.E. remains the workflow model.
- Human review is acceptable for ambiguous routing, summarization, and archival decisions.
- Reusability comes from prompt packs and templates, not from code services.

## Non-Negotiable Rules

- P.A.R.A. is fixed to `projects`, `areas`, `resources`, and `archives`.
- Source material is preserved. Distillation adds layers; it does not replace the raw note.
- Operational markdown files should use YAML frontmatter so metadata stays readable and machine-usable.
- Every routing decision must include a structured justification and confidence score.
- Low-confidence or ambiguous decisions must go to a review queue.
- Every Codex session that changes the vault must append a short entry to a decision log.
- Prompt files must define exact output formats so Codex does not drift into vague prose.
- Keep the system local-first, auditable, and simple enough to operate by reading the files.

## Frontmatter-First Markdown Convention

Use YAML frontmatter at the top of BASB markdown files to keep metadata visible, compact, and easy for Codex to update.

- Prefer frontmatter for metadata, not inline prose.
- Keep the note body for actual content, synthesis, and decisions.
- Use arrays for `tags`, `related_docs`, `linked_projects`, and `favorite_problems`.
- Use vault-relative paths in `related_docs` so links survive across sessions.
- Keep timestamps in ISO-8601 format.
- Do not hide critical metadata in arbitrary body text if it can live cleanly in frontmatter.

Recommended pattern:

```yaml
---
title: "<title>"
type: "<note-type>"
status: "<status>"
tags:
  - "<tag>"
related_docs:
  - "vault/resources/example.md"
created_at: "2026-04-05T10:00:00+03:00"
updated_at: "2026-04-05T10:00:00+03:00"
---
```

Then keep the body simple, for example:

```markdown
# Summary

# Details

# Related Notes

# Next Actions
```

## Recommended Repository Layout

```text
BASBGuide.md
.basb/
  plans/
  prompts/
    00-master-system.md
    01-session-start.md
    02-context-selection.md
    10-capture.md
    20-organize-route.md
    21-human-review.md
    30-distill-layer2.md
    31-distill-layer3.md
    32-distill-layer4.md
    40-express.md
    50-daily-brief.md
    60-weekly-maintenance.md
    70-favorite-problems.md
templates/
  inbox-note.md
  project-note.md
  area-note.md
  resource-note.md
  archive-note.md
  daily-brief.md
  weekly-review.md
state/
  SOUL.md
  MEMORY.md
  active-context.md
  decision-log.md
  review-queue.md
  favorite-problems.md
vault/
  inbox/
  projects/
  areas/
  resources/
  archives/
  briefs/
  daily/
  weekly/
examples/
  raw-captures/
  expected-outputs/
```

## Required File Contracts

### Note Frontmatter Contract

Every routed note should eventually conform to this structure:

```yaml
---
id: "<stable-id>"
title: "<human-readable title>"
type: "project|area|resource|archive|inbox"
status: "active|review|archived|reference"
created_at: "ISO-8601 timestamp"
updated_at: "ISO-8601 timestamp"
source: "<url|manual|email|meeting|other>"
source_title: "<optional source title>"
summary: "<1-3 sentence summary>"
tags: []
related_docs: []
linked_projects: []
review_cadence: "weekly|monthly|quarterly|none"
favorite_problems: []
route_reason: "<why this belongs in this PARA location>"
confidence: 0.0
---
```

Preferred optional fields when useful:

- `aliases`
- `authors`
- `source_url`
- `source_type`
- `project_deadline`
- `area_owner`
- `next_action`
- `last_reviewed_at`
- `express_outputs`

Recommended body shape for notes:

```markdown
# Executive Summary

# Source Material

# Distillation

# Related Notes

# Next Actions
```

### Prompt File Frontmatter Contract

Prompt files in `.basb/prompts/` should also use frontmatter so Codex can quickly understand when each prompt applies.

```yaml
---
title: "<prompt title>"
purpose: "<what this prompt is for>"
stage: "capture|organize|distill|express|maintain"
inputs:
  - "<required input file>"
outputs:
  - "<expected output>"
requires_review_when:
  - "<condition>"
related_docs:
  - ".basb/plans/2026-04-04-basb-codex-workflow.md"
tags:
  - "basb"
  - "prompt"
---
```

### State File Frontmatter Contract

State files in `state/` should use lightweight frontmatter so they remain self-describing.

```yaml
---
title: "<state file title>"
type: "state"
status: "active"
updated_at: "ISO-8601 timestamp"
tags:
  - "basb"
related_docs: []
---
```

### Routing Decision Contract

Every routing prompt should force Codex to produce this JSON before changing files:

```json
{
  "classification": "projects|areas|resources|archives",
  "destination_path": "vault/resources/example-note.md",
  "semantic_tags": ["example"],
  "actionability_summary": "Why this belongs here based on next use.",
  "confidence_score": 0.0,
  "requires_human_review": false
}
```

### Decision Log Contract

Each state-changing session should append a markdown bullet with:

- timestamp
- prompt used
- files touched
- action taken
- confidence
- whether review was required

## Delivery Strategy

Implement BASB in this order:

1. Vault and state foundations
2. Master prompt system
3. Capture and routing prompt pack
4. Progressive summarization prompt chain
5. Expression prompt pack
6. Daily and weekly maintenance prompt pack
7. Validation examples and operating guidance

Do not start by asking Codex to "be my second brain" in one giant prompt. Build reusable prompt surfaces and state files first.

## Phase 1: Vault and State Foundations

**Outcome:** Create the filesystem structure and durable state files Codex will use as BASB memory.

**Files:**
- Create: `vault/inbox/.gitkeep`
- Create: `vault/projects/.gitkeep`
- Create: `vault/areas/.gitkeep`
- Create: `vault/resources/.gitkeep`
- Create: `vault/archives/.gitkeep`
- Create: `vault/briefs/.gitkeep`
- Create: `vault/daily/.gitkeep`
- Create: `vault/weekly/.gitkeep`
- Create: `state/SOUL.md`
- Create: `state/MEMORY.md`
- Create: `state/active-context.md`
- Create: `state/decision-log.md`
- Create: `state/review-queue.md`
- Create: `state/favorite-problems.md`
- Create: `README.md`

**Instructions for Codex:**

1. Create the vault folders and state folder.
2. Write `state/SOUL.md` as the permanent BASB operating charter for Codex, using the state frontmatter contract.
3. Write `state/MEMORY.md` as rolling persistent memory for decisions, conventions, and open loops, using the state frontmatter contract.
4. Write `state/review-queue.md` as a simple place for ambiguous notes and pending decisions, using the state frontmatter contract.
5. Write `state/decision-log.md` as an append-only audit trail, using the state frontmatter contract.
6. Add a short `README.md` explaining that BASB is operated through Codex prompts, not through code execution.
7. Add examples in the state files so the frontmatter conventions are obvious from the first read.

**Definition of done:**

- The workspace has a stable vault structure.
- Codex has a durable operating charter and memory file.
- The user can inspect all BASB state without hidden systems.

## Phase 2: Master Prompt System

**Outcome:** Create the reusable prompt files that define how Codex behaves as BASB across sessions.

**Files:**
- Create: `.basb/prompts/00-master-system.md`
- Create: `.basb/prompts/01-session-start.md`
- Create: `.basb/prompts/02-context-selection.md`

**Instructions for Codex:**

1. Write a master system prompt that encodes the BASB identity, P.A.R.A. rules, C.O.D.E. stages, confidence rules, and audit requirements.
2. Write a session-start prompt that tells Codex which files to read first at the beginning of any BASB session.
3. Write a context-selection prompt that limits how many notes Codex should pull into a session and how to prefer summaries over raw text when possible.
4. Use prompt frontmatter so each prompt file declares its purpose, inputs, outputs, and review conditions.
5. Make the prompt language explicit and operational. Avoid philosophy unless it changes behavior.

**Definition of done:**

- A new Codex session can be started consistently by reading the same prompt files.
- The prompts tell Codex what it may do, what it must log, and when it must stop for review.

## Phase 3: Capture and Routing Prompt Pack

**Outcome:** Allow Codex to normalize raw inputs and route them into P.A.R.A. using prompts only.

**Files:**
- Create: `.basb/prompts/10-capture.md`
- Create: `.basb/prompts/20-organize-route.md`
- Create: `.basb/prompts/21-human-review.md`
- Create: `templates/inbox-note.md`
- Create: `templates/project-note.md`
- Create: `templates/area-note.md`
- Create: `templates/resource-note.md`
- Create: `templates/archive-note.md`

**Instructions for Codex:**

1. Write a capture prompt that converts raw text, links, meeting notes, or pasted content into a normalized inbox note.
2. Write a routing prompt that forces the JSON routing contract before any file move.
3. Write a human-review prompt for ambiguous cases, with a short question format and explicit tradeoff summary.
4. Write note templates that include required frontmatter, readable section headings, and placeholders for related docs and next actions.
5. Make routing depend on actionability and next use, not topical similarity alone.

**Definition of done:**

- A raw capture can become an inbox note through a single prompt.
- Codex can route a note into exactly one P.A.R.A. category.
- Ambiguous notes can be parked in review without corrupting the vault.
- The frontmatter is sufficient for scanning tags, relationships, status, and provenance without reading the whole note.

## Phase 4: Progressive Summarization Prompt Chain

**Outcome:** Distill notes through reusable layered prompts without losing source material.

**Files:**
- Create: `.basb/prompts/30-distill-layer2.md`
- Create: `.basb/prompts/31-distill-layer3.md`
- Create: `.basb/prompts/32-distill-layer4.md`

**Instructions for Codex:**

1. Write a Layer 2 prompt that identifies and bolds key concepts while preserving the original note body.
2. Write a Layer 3 prompt that selects only the strongest Layer 2 material for highlighting.
3. Write a Layer 4 prompt that generates a compact executive synthesis at the top of the note.
4. Force each prompt to operate only on the output of the previous layer, not the whole note again.
5. Update note frontmatter fields such as `summary`, `updated_at`, `related_docs`, and `express_outputs` when the distillation makes that useful.
6. Require Codex to stop and ask for review if the note is too sparse or ambiguous to summarize responsibly.

**Definition of done:**

- Notes can be progressively distilled in separate passes.
- The source note remains intact.
- Later sessions can benefit from condensed layers instead of rereading everything.

## Phase 5: Expression Prompt Pack

**Outcome:** Use the vault to produce useful outputs such as plans, syntheses, and project briefs.

**Files:**
- Create: `.basb/prompts/40-express.md`
- Create: `templates/daily-brief.md`
- Create: `templates/weekly-review.md`

**Instructions for Codex:**

1. Write an expression prompt that tells Codex how to gather relevant files, cite source note paths, and produce a scoped output.
2. Make the prompt prefer distilled notes first, then pull raw source only when needed.
3. Require a short source list at the end of every major synthesis.
4. Include patterns for project planning, research synthesis, and argument drafting.
5. When expression creates a durable output, add that path to the source note frontmatter under `express_outputs` or `related_docs` where appropriate.

**Definition of done:**

- Codex can answer from the BASB vault without pretending unsupported facts exist.
- Outputs reference the notes they came from.
- Expression stays grounded in the stored material.

## Phase 6: Daily and Weekly Maintenance Prompt Pack

**Outcome:** Give Codex repeatable prompts for system upkeep without background automation.

**Files:**
- Create: `.basb/prompts/50-daily-brief.md`
- Create: `.basb/prompts/60-weekly-maintenance.md`
- Create: `.basb/prompts/70-favorite-problems.md`

**Instructions for Codex:**

1. Write a daily brief prompt that scans active projects, recent inbox captures, and areas due for review.
2. Write a weekly maintenance prompt that proposes archive moves, flags stale areas, updates `state/MEMORY.md`, and surfaces useful cross-note links.
3. Write a favorite-problems prompt that compares recent notes to the questions stored in `state/favorite-problems.md`.
4. Use frontmatter in generated brief files so date, scope, source set, and follow-ups are easy to scan.
5. Keep outputs concise and operational, not reflective essays.

**Definition of done:**

- The user can run BASB maintenance by invoking Codex with one prompt file and a small set of state files.
- Reviews, archive suggestions, and cross-note insights happen through files and prompts only.

## Phase 7: Validation Examples and Operating Guidance

**Outcome:** Make the prompt system reliable enough to run repeatedly.

**Files:**
- Create: `examples/raw-captures/example-article.md`
- Create: `examples/raw-captures/example-meeting.md`
- Create: `examples/expected-outputs/routing-example.json`
- Create: `examples/expected-outputs/distillation-example.md`
- Create: `.basb/prompts/README.md`

**Instructions for Codex:**

1. Add at least two realistic example inputs and expected outputs.
2. Document how to start a BASB session, how to run capture, how to run routing, and how to run maintenance.
3. Add a short checklist for validating that a prompt file is specific enough to avoid drift.
4. Add at least one example note showing complete frontmatter plus a readable body.
5. Prefer concrete examples over abstract prompt-writing advice.

**Definition of done:**

- A new session can be run from the docs alone.
- Prompt behavior is demonstrated on examples, not just described.
- The system is usable without remembering hidden conventions.

## Codex Operating Loop

Use this loop whenever you operate BASB:

1. Read `BASBGuide.md`.
2. Read `state/SOUL.md`, `state/MEMORY.md`, and `state/active-context.md`.
3. Read the relevant prompt file for the task.
4. Read only the minimum note set needed for the task.
5. Produce any required JSON routing decision before moving files.
6. Apply the file changes.
7. Append to `state/decision-log.md`.
8. If confidence is low, add the note to `state/review-queue.md` instead of guessing.

## Prompt Assembly Rules

When running BASB through Codex, compose prompts in this order:

1. Master system prompt
2. Session-start prompt
3. Task-specific prompt
4. Relevant state files
5. Relevant vault files

Do not dump the entire vault into context. Prefer:

- note summaries over full notes
- project-local files over global search
- recent files over old files unless history matters
- review queue escalation over forced categorization
- frontmatter scanning before full-body reads

## Copy/Paste Prompt Template for Codex

```text
Read BASBGuide.md.
Read state/SOUL.md, state/MEMORY.md, and state/active-context.md.
Read .basb/prompts/00-master-system.md and [TASK_PROMPT].

Operate as the BASB system for this workspace.

Task:
[DESCRIBE TASK]

Constraints:
- Use P.A.R.A. only: projects, areas, resources, archives.
- Preserve source material.
- If routing is involved, output the routing JSON contract before making changes.
- If confidence is low, write to state/review-queue.md instead of guessing.
- After making changes, append a short entry to state/decision-log.md.

Before editing, summarize the files you will change.
After editing, summarize what changed and any pending review items.
```

## Recommended First Prompt

```text
Read BASBGuide.md and .basb/plans/2026-04-04-basb-codex-workflow.md.
Implement Phase 1 only: Vault and State Foundations.
Create the vault folders, state files, and README so this workspace can operate as a prompt-driven BASB system.
Do not add Python, APIs, databases, or schedulers.
Before editing, summarize the files you will create.
After editing, summarize the final structure.
```

## Out of Scope for v1

- FastAPI or any other web service
- SQLite or any other database
- Background jobs or schedulers
- External vector stores
- Notion or MCP integrations
- Full autonomous operation without human review
- Heavy UI work

## Acceptance Criteria for the Overall System

- A user can paste raw material into the workspace and use Codex prompts to turn it into a normalized note.
- Codex can route that note into one P.A.R.A. destination with a logged justification.
- Codex can progressively distill the note without deleting the source text.
- Codex can produce useful outputs grounded in vault notes.
- The user can run daily and weekly BASB workflows through prompt files alone.
- All important changes are visible in markdown files, not hidden in an external system.
