# BASB Compiled Wiki Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Evolve BASB from a prompt-driven capture-and-route workspace into a local-first compiled knowledge system that preserves immutable sources, maintains reusable derived notes, and continuously checks structural health.

**Architecture:** Keep markdown, frontmatter, and P.A.R.A. as the user-facing organization model, but add an operational source layer, richer provenance metadata, and explicit ingest and maintenance prompts that update compiled notes, vault indexes, and audit logs. Implement the change only through prompt-pack files, templates, scaffolded vault assets, examples, and regression tests; do not add services, databases, schedulers, or hidden state.

**Tech Stack:** Markdown, YAML frontmatter, BASB prompt pack, Node.js package scaffold, Node test runner, npm tarball verification.

---

## SPARC S: Specification

### Problem Statement

The current BASB workspace is already disciplined about classify-first startup, capture, routing, progressive distillation, and audit logging, but it still treats most knowledge as isolated routed notes.

That creates the following gaps relative to the compiled-wiki model:

- raw source material and reusable synthesized knowledge are usually stored in the same note
- routed notes carry limited provenance, so later updates cannot reliably tell what a note was derived from
- ingest is mostly one-note-in, one-note-out, instead of one-source-in, many-derived-updates
- the vault has no package-owned content index or knowledge-evolution log
- maintenance prompts clean up P.A.R.A. structure, but do not lint contradictions, orphan notes, stale summaries, or missing backlinks
- favorite problems exist as a useful filter, but are not part of the default ingest and refresh loop
- `40-express.md` allows persistence, but does not yet push reusable answers back into the vault by default

### Scope

This plan covers only local-first BASB files that ship in the package or are scaffolded into new workspaces:

- root BASB operating docs
- prompt-pack files under `.basb/prompts/`
- note and review templates under `templates/`
- scaffolded vault support files under `vault/`
- examples under `examples/`
- package and scaffold regression tests
- package metadata if the test runner needs to include new test files

Out of scope:

- vector databases, MCP services, schedulers, cron jobs, webhooks, or background daemons
- changing the Node API surface unless packaging the new prompt or template assets proves difficult without it
- replacing P.A.R.A. as the user-facing organization method
- automatic semantic search infrastructure beyond file-based prompts and metadata

### Key Design Decisions

1. `vault/sources/` is an operational provenance layer, not a fifth BASB category.
   P.A.R.A. stays intact for user-facing routed notes in `projects`, `areas`, `resources`, and `archives`.

2. Compiled notes stay inside P.A.R.A., but gain a second classification axis through frontmatter.
   Use a new field such as `artifact_kind` so a note can still be a `resource` or `project` while also being a `concept`, `comparison`, `timeline`, `synthesis`, or `source-summary`.

3. Raw sources must be immutable by default.
   Distillation, synthesis, and expression should create or update derived notes rather than rewrite the captured source into a different artifact.

4. Maintenance remains prompt-driven and file-based.
   The system should behave like a continuously maintained wiki without introducing application infrastructure that violates the repository's local-first scope boundary.

### Acceptance Criteria

1. The package ships a scaffolded `vault/sources/` directory plus `vault/index.md` and `vault/log.md`.
2. BASB instructions explicitly define `vault/sources/` as an operational layer rather than a user-facing category.
3. Routed note templates support a second classification axis with provenance fields such as:
   - `artifact_kind`
   - `derived_from`
   - `source_ids`
   - `source_count`
   - `last_ingested_at`
   - `claims_last_checked_at`
   - `supersedes`
   - `contradicts`
4. A dedicated ingest prompt exists for immutable sources and is referenced from the main capture flow.
5. `10-capture.md`, `40-express.md`, `60-weekly-maintenance.md`, and `70-favorite-problems.md` all participate in a compiled-note maintenance loop instead of behaving like isolated actions.
6. A knowledge-lint prompt exists and is called from weekly maintenance.
7. Reusable expressed outputs are persisted back into the vault by default when they add durable value.
8. Package and scaffold tests fail before the change and pass after it.

## SPARC P: Pseudocode

```text
on_new_input(user_input):
  classify input

  if input is transient conversation:
    do not persist
    stop

  if input is durable source material:
    create immutable note in vault/sources/
    run favorite-problem matching
    identify affected compiled notes
    update or create routed notes in P.A.R.A.
    append concise entry to vault/log.md
    refresh vault/index.md
    stop

  if input is a direct BASB note or project update:
    update the relevant routed note
    preserve provenance links back to any source notes
    refresh vault/index.md if note role changed
    stop

on_express_request(goal, note_set):
  gather the smallest relevant set of distilled notes
  produce answer
  if answer has durable future value:
    persist it as a routed compiled note
    backlink the source notes
    append to vault/log.md
    refresh vault/index.md

on_weekly_maintenance():
  review projects, areas, resources, archives
  run favorite-problem matching on recent source and compiled notes
  run knowledge lint
  propose archive and cleanup changes
  update vault/log.md and weekly review note
```

## SPARC A: Architecture

### File Ownership

- `AGENTS.md`
  Root operating contract. Must explain that P.A.R.A. remains the note organization model while `vault/sources/`, `vault/index.md`, and `vault/log.md` are operational support artifacts.

- `.basb/prompts/10-capture.md`
  Intake dispatcher for durable material. Must decide whether a user prompt becomes a compiled note directly or an immutable source followed by derived updates.

- `.basb/prompts/11-ingest-source.md`
  New prompt. Creates immutable source notes, records source metadata, identifies affected compiled notes, and seeds follow-up updates.

- `.basb/prompts/20-organize-route.md`
  Still governs P.A.R.A. routing, but only for compiled notes. Must explicitly exclude `vault/sources/` from P.A.R.A. routing decisions.

- `.basb/prompts/30-distill-layer2.md`, `31-distill-layer3.md`, `32-distill-layer4.md`
  Must support distilling source-derived notes without collapsing source and compiled artifacts into one file.

- `.basb/prompts/40-express.md`
  Must persist durable syntheses back into the vault by default when they are likely to be reused.

- `.basb/prompts/50-daily-brief.md`, `60-weekly-maintenance.md`, `61-knowledge-lint.md`
  Daily and weekly maintenance surfaces for the compiled wiki.

- `.basb/prompts/70-favorite-problems.md`
  Must be usable during ingest and maintenance, not only as a standalone review.

- `templates/source-note.md`
  New immutable source template for `vault/sources/`.

- `templates/project-note.md`, `templates/area-note.md`, `templates/resource-note.md`, `templates/archive-note.md`, `templates/inbox-note.md`
  Need richer provenance fields and stronger sections for related notes, source lineage, and derived outputs.

- `vault/index.md`
  Human-readable catalog of important compiled notes, active topic hubs, and recently changed high-value pages.

- `vault/log.md`
  Human-readable changelog for meaningful ingest, synthesis, contradiction resolution, and major note refactors.

- `examples/expected-outputs/*`
  Need at least one source-ingest example and one compiled-note example that demonstrates the new frontmatter and sections.

- `tests/package.test.js`, `tests/scaffold-workspace.test.js`, `tests/prompt-pack.test.js`
  Must lock package contents, scaffold behavior, prompt inventory, and schema-critical prompt text.

### Data Model Proposal

Use these frontmatter additions on compiled P.A.R.A. notes:

```yaml
artifact_kind: "concept"
derived_from: []
source_ids: []
source_count: 0
last_ingested_at: null
claims_last_checked_at: null
supersedes: []
contradicts: []
```

Use this shape for immutable source notes:

```yaml
id: "20260413-115759-example-source"
title: "Example Source Title"
type: "source"
status: "captured"
artifact_kind: "source"
created_at: "2026-04-13T11:57:59.8014811+03:00"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
source: "url"
source_title: "Example Source Title"
summary: "One to three sentence summary of the source."
tags: []
related_docs: []
captured_from: []
content_hash: "<optional stable hash>"
confidence: 1.0
```

If strict adherence to the current `type` policy makes `type: "source"` undesirable, use:

```yaml
type: "resource"
artifact_kind: "source"
```

The implementation should make that choice explicitly and then keep it consistent across prompts, templates, examples, and tests.

## SPARC R: Refinement

### Task 1: Lock the compiled-wiki target behavior with tests

**Files:**
- Create: `tests/prompt-pack.test.js`
- Modify: `tests/package.test.js`
- Modify: `tests/scaffold-workspace.test.js`
- Modify: `package.json`

**Step 1: Write a new prompt-pack regression test**

Create `tests/prompt-pack.test.js` with assertions that:

- `.basb/prompts/11-ingest-source.md` exists
- `.basb/prompts/61-knowledge-lint.md` exists
- `templates/source-note.md` exists
- `vault/index.md` and `vault/log.md` exist
- the routed note templates contain the new provenance fields
- `10-capture.md`, `40-express.md`, `60-weekly-maintenance.md`, and `70-favorite-problems.md` contain wording that supports the compiled-wiki loop

**Step 2: Extend package tarball assertions**

Update `tests/package.test.js` to assert that the npm tarball includes:

- `.basb/prompts/11-ingest-source.md`
- `.basb/prompts/61-knowledge-lint.md`
- `templates/source-note.md`
- `vault/index.md`
- `vault/log.md`
- `vault/sources/.gitkeep`

**Step 3: Extend scaffold assertions**

Update `tests/scaffold-workspace.test.js` to assert that scaffolded workspaces contain:

- `vault/index.md`
- `vault/log.md`
- `vault/sources/.gitkeep`
- `templates/source-note.md`
- prompt-pack files for source ingest and lint

Also assert that scaffolded instructions describe `vault/sources/` as an operational provenance layer, not a fifth category.

**Step 4: Update the test script**

Add `tests/prompt-pack.test.js` to the `npm test` command in `package.json`.

**Step 5: Run the targeted test set and verify it fails**

Run:

```bash
node --test tests/prompt-pack.test.js tests/package.test.js tests/scaffold-workspace.test.js
```

Expected: FAIL because the new prompts, templates, and scaffolded vault support files do not exist yet.

**Step 6: Commit**

```bash
git add tests/prompt-pack.test.js tests/package.test.js tests/scaffold-workspace.test.js package.json
git commit -m "test: lock compiled-wiki BASB behavior"
```

### Task 2: Introduce the operational source layer and scaffolded wiki support files

**Files:**
- Modify: `AGENTS.md`
- Create: `templates/source-note.md`
- Create: `vault/index.md`
- Create: `vault/log.md`
- Create: `vault/sources/.gitkeep`

**Step 1: Update the root contract**

Revise `AGENTS.md` so it explicitly says:

- P.A.R.A. remains the user-facing note organization model
- `vault/sources/`, `vault/index.md`, and `vault/log.md` are operational support artifacts
- those support artifacts do not create a fifth P.A.R.A. category

Keep the local-first and file-based boundary intact.

**Step 2: Create `templates/source-note.md`**

The template should include:

- immutable source metadata
- a `# Source Material` section
- a `# Derived Notes` section
- a `# Favorite Problem Matches` section
- a `# Ingest Notes` section for the operator's normalized interpretation

**Step 3: Create scaffolded vault support files**

Add:

- `vault/index.md`
- `vault/log.md`
- `vault/sources/.gitkeep`

`vault/index.md` should list:

- key compiled notes
- active hubs
- newly updated high-value pages

`vault/log.md` should log:

- source ingest events
- major synthesis updates
- contradiction resolutions
- durable output promotions

**Step 4: Run the targeted tests**

Run:

```bash
node --test tests/prompt-pack.test.js tests/package.test.js tests/scaffold-workspace.test.js
```

Expected: Some assertions now pass, but template and prompt-schema assertions still fail until later tasks are complete.

**Step 5: Commit**

```bash
git add AGENTS.md templates/source-note.md vault/index.md vault/log.md vault/sources/.gitkeep tests/prompt-pack.test.js tests/package.test.js tests/scaffold-workspace.test.js
git commit -m "feat: add BASB source layer and wiki support files"
```

### Task 3: Extend routed-note templates with artifact-kind and provenance metadata

**Files:**
- Modify: `templates/project-note.md`
- Modify: `templates/area-note.md`
- Modify: `templates/resource-note.md`
- Modify: `templates/archive-note.md`
- Modify: `templates/inbox-note.md`
- Modify: `examples/expected-outputs/distillation-example.md`
- Create: `examples/expected-outputs/source-ingest-example.md`

**Step 1: Add the new frontmatter fields to routed-note templates**

Add the same provenance block to every routed note template:

```yaml
artifact_kind: "<concept|comparison|timeline|synthesis|source-summary>"
derived_from: []
source_ids: []
source_count: 0
last_ingested_at: null
claims_last_checked_at: null
supersedes: []
contradicts: []
```

Keep existing P.A.R.A. fields such as `type`, `status`, `route_reason`, `review_cadence`, and `favorite_problems`.

**Step 2: Strengthen the body sections**

Update the templates so compiled notes have clearly separated sections for:

- `# Executive Summary`
- `# Current Understanding`
- `# Distillation`
- `# Source Lineage`
- `# Related Notes`
- `# Next Actions`

Inbox notes should add a visible placeholder for unresolved provenance when the captured material cannot be confidently promoted yet.

**Step 3: Update the examples**

Revise `examples/expected-outputs/distillation-example.md` to show:

- a routed compiled note with provenance fields populated
- a `# Source Lineage` section
- at least one value in `source_ids`

Create `examples/expected-outputs/source-ingest-example.md` to demonstrate the immutable source template.

**Step 4: Run the prompt-pack test**

Run:

```bash
node --test tests/prompt-pack.test.js
```

Expected: Template-schema assertions pass; prompt-flow assertions still fail until the new ingest and lint prompts are written.

**Step 5: Commit**

```bash
git add templates/project-note.md templates/area-note.md templates/resource-note.md templates/archive-note.md templates/inbox-note.md examples/expected-outputs/distillation-example.md examples/expected-outputs/source-ingest-example.md
git commit -m "feat: add BASB compiled-note provenance schema"
```

### Task 4: Add an explicit source-ingest workflow and refine routing boundaries

**Files:**
- Create: `.basb/prompts/11-ingest-source.md`
- Modify: `.basb/prompts/10-capture.md`
- Modify: `.basb/prompts/20-organize-route.md`
- Modify: `.basb/prompts/21-human-review.md`
- Modify: `.basb/prompts/70-favorite-problems.md`
- Modify: `.basb/prompts/README.md`

**Step 1: Create `.basb/prompts/11-ingest-source.md`**

The prompt should do all of the following:

- normalize raw material into an immutable source note in `vault/sources/`
- preserve source material rather than routing it directly into P.A.R.A.
- extract broad tags and initial summary
- identify candidate compiled notes to update
- append a concise event to `vault/log.md`
- refresh `vault/index.md` if ingest created or significantly changed a high-value note

**Step 2: Rewrite the capture dispatcher**

Update `10-capture.md` so it can branch cleanly:

- transient conversation: do not persist
- direct compiled-note update: update the relevant P.A.R.A. note
- durable source material: call `11-ingest-source.md` first, then promote or refresh compiled notes

Explicitly say that not every durable prompt should become one standalone routed note.

**Step 3: Tighten routing boundaries**

Update `20-organize-route.md` so it states:

- P.A.R.A. routing applies only to compiled notes
- `vault/sources/` is not routed by this prompt
- inbox remains a temporary holding area for ambiguous compiled notes, not for immutable sources that were already captured responsibly

Update `21-human-review.md` to distinguish:

- uncertainty about final P.A.R.A. destination
- uncertainty about whether a source deserves a new compiled note or only an update to an existing one

**Step 4: Pull favorite problems into ingest**

Update `70-favorite-problems.md` so it can be called:

- during source ingest
- during weekly maintenance
- on demand for a single note or a bounded set of notes

The prompt should update note frontmatter only when the match is genuinely useful, not merely thematic.

**Step 5: Refresh the prompt catalog**

Update `.basb/prompts/README.md` so it documents:

- `11-ingest-source.md`
- the distinction between immutable sources and compiled notes
- the new role of weekly lint and persistent expression

**Step 6: Run the targeted tests**

Run:

```bash
node --test tests/prompt-pack.test.js tests/package.test.js tests/scaffold-workspace.test.js
```

Expected: Ingest and prompt inventory assertions pass; maintenance and expression assertions may still fail.

**Step 7: Commit**

```bash
git add .basb/prompts/11-ingest-source.md .basb/prompts/10-capture.md .basb/prompts/20-organize-route.md .basb/prompts/21-human-review.md .basb/prompts/70-favorite-problems.md .basb/prompts/README.md
git commit -m "feat: add BASB source ingest workflow"
```

### Task 5: Add compiled-note maintenance loops, durable expression, and knowledge lint

**Files:**
- Modify: `.basb/prompts/30-distill-layer2.md`
- Modify: `.basb/prompts/31-distill-layer3.md`
- Modify: `.basb/prompts/32-distill-layer4.md`
- Modify: `.basb/prompts/40-express.md`
- Modify: `.basb/prompts/50-daily-brief.md`
- Modify: `.basb/prompts/60-weekly-maintenance.md`
- Create: `.basb/prompts/61-knowledge-lint.md`
- Modify: `templates/daily-brief.md`
- Modify: `templates/weekly-review.md`

**Step 1: Teach distillation about provenance**

Update `30`, `31`, and `32` so they:

- can operate on compiled notes that cite one or more immutable source notes
- prefer updating distillation from `# Source Lineage` or linked source notes instead of overwriting raw source text
- preserve the separation between source notes and derived notes

**Step 2: Make expression persist valuable outputs by default**

Update `40-express.md` so that when an answer is likely to be reused, it must:

- save the output as a routed compiled note
- backlink the contributing notes and source notes
- update `express_outputs` on the inputs when appropriate
- append a durable event to `vault/log.md`
- refresh `vault/index.md` if the output becomes a new hub or canonical summary

**Step 3: Create a knowledge-lint prompt**

Add `.basb/prompts/61-knowledge-lint.md` with checks for:

- orphan compiled notes
- empty `related_docs` on notes that clearly reference other material
- stale summaries after ingest
- contradictions recorded in body text but not in frontmatter
- sources with no derived note links after meaningful ingest
- duplicated concept pages that should likely be merged or cross-linked

The output should be a concrete maintenance report, not vague commentary.

**Step 4: Integrate lint into weekly maintenance**

Update `60-weekly-maintenance.md` and `templates/weekly-review.md` so weekly review explicitly includes:

- archive candidates
- favorite-problem matches
- lint findings
- proposed note merges, backlink repairs, and summary refreshes

Update `50-daily-brief.md` and `templates/daily-brief.md` to surface:

- high-value sources ingested since the last brief
- compiled notes that need synthesis or backlink updates

**Step 5: Run the targeted tests**

Run:

```bash
node --test tests/prompt-pack.test.js tests/package.test.js tests/scaffold-workspace.test.js
```

Expected: PASS.

**Step 6: Commit**

```bash
git add .basb/prompts/30-distill-layer2.md .basb/prompts/31-distill-layer3.md .basb/prompts/32-distill-layer4.md .basb/prompts/40-express.md .basb/prompts/50-daily-brief.md .basb/prompts/60-weekly-maintenance.md .basb/prompts/61-knowledge-lint.md templates/daily-brief.md templates/weekly-review.md
git commit -m "feat: add BASB compiled-note maintenance loop"
```

### Task 6: Align the public docs and architectural guide with the compiled-wiki model

**Files:**
- Modify: `README.md`
- Modify: `bootstrap/README.md`
- Modify: `BASBGuide.md`

**Step 1: Update `README.md`**

Clarify that BASB now has:

- immutable source capture under `vault/sources/`
- compiled notes routed into P.A.R.A.
- package-owned `vault/index.md` and `vault/log.md`
- a weekly lint and maintenance loop

Keep the repository explicitly local-first and markdown-first.

**Step 2: Update `bootstrap/README.md`**

Teach new workspace users the same workflow in simpler operator language:

1. capture or ingest a source
2. promote or update compiled notes
3. distill compiled notes
4. express reusable outputs back into the vault
5. run weekly maintenance plus lint

**Step 3: Refactor `BASBGuide.md`**

Keep the guide as architecture background, but revise the relevant sections so they no longer imply that the next step is a service-heavy or vector-database implementation. The guide should describe the compiled-wiki approach in a way that still fits this package's local-first scope.

**Step 4: Run the full test suite**

Run:

```bash
npm test
```

Expected: PASS across package, scaffold, publish-version, and prompt-pack tests.

**Step 5: Commit**

```bash
git add README.md bootstrap/README.md BASBGuide.md
git commit -m "docs: align BASB docs with compiled-wiki model"
```

## SPARC C: Completion

### Final Verification

Run these commands in order:

1. `npm test`
   Expected: all tests pass

2. `npm pack --json --dry-run`
   Expected: the tarball includes the new prompts, templates, examples, and scaffolded vault support files while still excluding live `state/` and `.basb/plans/`

3. Manual scaffold smoke check

Run:

```bash
node -e "const fs=require('node:fs'); const os=require('node:os'); const path=require('node:path'); const { scaffoldWorkspace } = require('./scripts/lib/scaffold-workspace.cjs'); const target=fs.mkdtempSync(path.join(os.tmpdir(),'basb-compiled-wiki-')); scaffoldWorkspace({ packageRoot: process.cwd(), targetRoot: target, timestamp: '2026-04-13T11:57:59.8014811+03:00' }); console.log(target);"
```

Then inspect the generated workspace and confirm:

- `vault/sources/.gitkeep` exists
- `vault/index.md` exists
- `vault/log.md` exists
- `templates/source-note.md` exists
- `.basb/prompts/11-ingest-source.md` exists
- `.basb/prompts/61-knowledge-lint.md` exists
- scaffolded `README.md` explains the immutable-source plus compiled-note workflow

### Done Definition

- BASB preserves immutable sources separately from compiled notes
- compiled notes remain organized by P.A.R.A. and gain richer provenance
- ingest can update many notes from one source
- the vault has a package-owned index and knowledge log
- weekly maintenance includes structural lint
- reusable expressed outputs flow back into the vault by default
- all shipped docs, examples, prompts, templates, and tests tell the same story

### Risks to Watch

- accidentally turning `vault/sources/` into a user-facing fifth category instead of an operational support layer
- duplicating provenance logic across prompts and templates until the fields drift
- creating too many new prompt files when a focused update to an existing prompt would be clearer
- allowing expression persistence to create noisy low-value notes instead of only durable outputs
- letting `BASBGuide.md` drift back into architecture that assumes services or databases not justified by the package scope

### Session Close Requirements During Implementation

When the implementation session finishes:

- append a concise entry to `state/decision-log.md`
- update `state/active-context.md` if the likely next task changed
- leave unresolved design ambiguity in `state/review-queue.md`
- summarize changed files in the final handoff
