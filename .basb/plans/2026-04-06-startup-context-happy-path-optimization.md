# Startup Context Happy Path Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce the default BASB startup context for the package happy path by switching from eager-load startup to classify-first, minimal-context startup without regressing scaffolded installs.

**Architecture:** Keep one slim startup dispatcher as the default entrypoint, load heavyweight reference docs only for BASB-system maintenance or architecture-review tasks, and keep scaffolded runtime state generic. Align packaged docs and scaffold tests so both the repository and installed workspaces teach the same startup flow.

**Tech Stack:** Markdown, YAML frontmatter, BASB prompt pack, bootstrap scaffold templates, Node.js test runner, npm pack dry runs.

---

## SPARC S: Specification

### Problem Statement

The current startup path front-loads `BASBGuide.md`, multiple state files, and `.basb/prompts/00-master-system.md` before the agent knows whether the user is capturing a note, working an existing note, doing BASB maintenance, or just having a transient conversation.

That creates three avoidable problems:

- normal capture and note-work sessions pay unnecessary context cost
- the heavy architectural guide is treated like an operational requirement instead of a reference document
- repository maintainer context leaks into sessions that should stay scoped to BASB runtime behavior

### Scope

This plan covers only the package happy path and its source-of-truth files:

- packaged startup docs
- scaffolded state templates
- prompt-pack startup rules
- onboarding docs that teach the startup order
- regression tests that lock the behavior

Out of scope:

- changing package exports or scaffold mechanics
- adding services, databases, or hidden state
- rewriting historical plan files under `.basb/plans/`

### Acceptance Criteria

1. A normal BASB session starts by reading `AGENTS.md`, then `.basb/prompts/01-session-start.md`, then only the minimum files needed for the classified task.
2. `BASBGuide.md` is explicitly reference-only for BASB-system maintenance, prompt design, package maintenance, or architecture review.
3. `.basb/prompts/00-master-system.md` is no longer required on every happy-path startup.
4. Scaffolded installs inherit the lighter startup rules through packaged files and `bootstrap/state/`.
5. `README.md`, `bootstrap/README.md`, and `.basb/prompts/README.md` all teach the same classify-first startup flow.
6. Regression tests fail before the changes and pass after them.

## SPARC P: Pseudocode

```text
on_session_start(user_prompt):
  read AGENTS.md
  read .basb/prompts/01-session-start.md

  task_class = classify(user_prompt)
  # task_class in {new_capture, existing_note_work, basb_system_maintenance, transient_conversation}

  if task_class == transient_conversation:
    respond with minimal BASB overhead
    stop

  if task_class == new_capture:
    read state/SOUL.md
    read .basb/prompts/10-capture.md
    if durable material needs routing:
      read .basb/prompts/20-organize-route.md
    if source set grows beyond 3-5 notes:
      read .basb/prompts/02-context-selection.md

  if task_class == existing_note_work:
    read state/SOUL.md
    scan note frontmatter
    if more than one note is relevant:
      read .basb/prompts/02-context-selection.md
    read only the task-specific prompt needed next

  if task_class == basb_system_maintenance:
    read state/SOUL.md
    read state/MEMORY.md
    read state/active-context.md
    read .basb/prompts/00-master-system.md
    if the task is architectural or package-maintainer work:
      read BASBGuide.md

before_session_close:
  if files_changed:
    append state/decision-log.md
    update state/active-context.md if the likely next task changed
```

## SPARC A: Architecture

### File Ownership

- `AGENTS.md`
  The root startup contract and first-pass classification rule.
- `.basb/prompts/01-session-start.md`
  The runtime dispatcher that chooses the minimum context bundle after classification.
- `.basb/prompts/02-context-selection.md`
  The bounded context filter used only when a task needs multiple notes.
- `.basb/prompts/00-master-system.md`
  Invariant BASB operating rules for maintenance and deeper multi-step sessions, not the default startup payload.
- `BASBGuide.md`
  Architectural background and reference material, not a default startup dependency.
- `bootstrap/state/SOUL.md`
  Scaffolded runtime charter for installed workspaces; must stay generic and lightweight.
- `bootstrap/state/MEMORY.md`
  Scaffolded stable conventions and useful paths; no eager startup list.
- `bootstrap/state/active-context.md`
  Scaffolded current-focus placeholder; loaded only when the dispatcher needs local focus.
- `README.md`
  Repository/package onboarding.
- `bootstrap/README.md`
  Installed-workspace onboarding.
- `.basb/prompts/README.md`
  Prompt-pack usage guide.
- `tests/scaffold-workspace.test.js`
  Locks the behavior of scaffolded startup docs.
- `tests/package.test.js`
  Locks package contents and prompt availability.

### Design Rules

- Keep one source of truth for startup order: `AGENTS.md` plus `.basb/prompts/01-session-start.md`.
- Keep BASB rules in `state/SOUL.md` and `bootstrap/state/SOUL.md`, but remove duplicated eager-load startup lists.
- Treat `state/active-context.md` as conditional context, not mandatory startup context.
- Preserve current package shape; this change should be content-level, not structural, unless the tests prove otherwise.

## SPARC R: Refinement

### Task 1: Lock the classify-first startup contract in scaffold tests

**Files:**
- Modify: `tests/scaffold-workspace.test.js`
- Modify: `tests/package.test.js`

**Step 1: Write the failing scaffold assertions**

Add assertions that the scaffolded `AGENTS.md`, `.basb/prompts/01-session-start.md`, and `README.md` do all of the following:

- direct startup through `AGENTS.md` then `.basb/prompts/01-session-start.md`
- classify the prompt before loading heavyweight context
- avoid requiring `BASBGuide.md` for a normal BASB session
- avoid requiring `.basb/prompts/00-master-system.md` for every normal BASB session

**Step 2: Run the targeted scaffold tests**

Run: `node --test tests/scaffold-workspace.test.js`

Expected: FAIL on the old eager-load wording in scaffolded startup docs.

**Step 3: Add package-level assertions for the lighter startup assets**

Extend `tests/package.test.js` to keep asserting that `AGENTS.md`, `BASBGuide.md`, `.basb/prompts/00-master-system.md`, and `.basb/prompts/01-session-start.md` are still shipped, while the package behavior no longer depends on loading all of them up front.

**Step 4: Run the package test file**

Run: `node --test tests/package.test.js`

Expected: FAIL only if the new assertions are correct and the old wording is still present.

**Step 5: Commit after implementation**

```bash
git add tests/scaffold-workspace.test.js tests/package.test.js
git commit -m "test: lock classify-first BASB startup"
```

### Task 2: Rewrite the packaged startup dispatcher and runtime rules

**Files:**
- Modify: `AGENTS.md`
- Modify: `.basb/prompts/01-session-start.md`
- Modify: `.basb/prompts/02-context-selection.md`
- Modify: `.basb/prompts/00-master-system.md`

**Step 1: Update `AGENTS.md`**

Replace the eager startup list with:

- `AGENTS.md` first
- `.basb/prompts/01-session-start.md` second
- conditional reads after prompt classification

Keep the existing P.A.R.A., routing, frontmatter, and close-out rules, but remove duplicated startup logic that belongs in the dispatcher prompt.

**Step 2: Rewrite `.basb/prompts/01-session-start.md` as the dispatcher**

Make it explicitly:

- classify the incoming prompt first
- choose the minimal file set for `new_capture`, `existing_note_work`, `basb_system_maintenance`, or `transient_conversation`
- load `BASBGuide.md` only for architecture or maintenance work
- load `.basb/prompts/02-context-selection.md` only when candidate notes exceed the initial bounded set

**Step 3: Tighten `.basb/prompts/02-context-selection.md`**

Keep the current 3-5 note cap, but add a short note that this prompt is entered only after startup classification and only when one task needs multiple notes.

**Step 4: Demote `.basb/prompts/00-master-system.md` from default startup**

Keep its invariant BASB rules, but remove or rewrite any section that says it must be read before every task. Make it the maintenance/deep-session operating contract instead.

**Step 5: Rerun the targeted tests**

Run: `node --test tests/scaffold-workspace.test.js`

Expected: PASS for the new startup wording and scaffolded inheritance.

**Step 6: Commit**

```bash
git add AGENTS.md .basb/prompts/01-session-start.md .basb/prompts/02-context-selection.md .basb/prompts/00-master-system.md tests/scaffold-workspace.test.js tests/package.test.js
git commit -m "refactor: switch BASB startup to classify-first loading"
```

### Task 3: Slim the scaffolded state files and reference docs

**Files:**
- Modify: `BASBGuide.md`
- Modify: `bootstrap/state/SOUL.md`
- Modify: `bootstrap/state/MEMORY.md`
- Modify: `bootstrap/state/active-context.md`
- Modify: `state/SOUL.md`
- Modify: `state/MEMORY.md`
- Modify: `state/active-context.md`

**Step 1: Mark `BASBGuide.md` as reference-only**

Add a short top-level note explaining when to read it:

- BASB-system maintenance
- prompt design
- package maintenance
- architecture review

Do not shorten the full guide in this task unless the startup contract still needs it.

**Step 2: Remove eager startup lists from the scaffolded state files**

In `bootstrap/state/SOUL.md`, keep mission, identity, routing heuristics, and confidence rules, but replace the current session-start list with a short pointer back to `AGENTS.md` and `.basb/prompts/01-session-start.md`.

In `bootstrap/state/MEMORY.md`, keep stable conventions, useful paths, and open loops only.

In `bootstrap/state/active-context.md`, keep the generic starter focus and make it clear the file is current-focus context, not required startup context.

**Step 3: Mirror the same rule in repository-maintainer state files**

Update `state/SOUL.md`, `state/MEMORY.md`, and `state/active-context.md` so local repository sessions obey the same classify-first startup contract without losing maintainer-specific context.

**Step 4: Rerun scaffold tests**

Run: `node --test tests/scaffold-workspace.test.js`

Expected: PASS.

**Step 5: Commit**

```bash
git add BASBGuide.md bootstrap/state/SOUL.md bootstrap/state/MEMORY.md bootstrap/state/active-context.md state/SOUL.md state/MEMORY.md state/active-context.md
git commit -m "docs: slim BASB startup state and reference loading"
```

### Task 4: Align onboarding docs with the new happy path

**Files:**
- Modify: `README.md`
- Modify: `bootstrap/README.md`
- Modify: `.basb/prompts/README.md`

**Step 1: Rewrite the startup sections**

Replace the old startup order with a concise classify-first flow:

1. Read `AGENTS.md`.
2. Read `.basb/prompts/01-session-start.md`.
3. Load only the task-specific prompt and state files selected by that dispatcher.

**Step 2: Clarify the role of `BASBGuide.md` and `.basb/prompts/00-master-system.md`**

Explain that:

- `BASBGuide.md` is architectural background
- `.basb/prompts/00-master-system.md` is a deeper BASB operating contract used on maintenance-heavy sessions

**Step 3: Run the full test suite**

Run: `npm test`

Expected: PASS across `tests/package.test.js`, `tests/scaffold-workspace.test.js`, and `tests/publish-version.test.js`.

**Step 4: Commit**

```bash
git add README.md bootstrap/README.md .basb/prompts/README.md
git commit -m "docs: align BASB onboarding with minimal startup context"
```

## SPARC C: Completion

### Final Verification

Run these commands in order:

1. `npm test`
   Expected: all tests pass
2. `npm pack --json --dry-run`
   Expected: package still includes `AGENTS.md`, `BASBGuide.md`, `.basb/prompts/00-master-system.md`, `.basb/prompts/01-session-start.md`, `bootstrap/README.md`, and `bootstrap/state/*`, while still excluding `state/` and `.basb/plans/`
3. Manual smoke check:
   - create a temp directory
   - install the local tarball or run the scaffold helper
   - inspect the generated `AGENTS.md`, `README.md`, `.basb/prompts/01-session-start.md`, and `state/SOUL.md`
   - confirm they teach classify-first startup and conditional heavy-doc loading

### Done Definition

- the default package happy path no longer loads the full guide and master prompt before task classification
- scaffolded installs and repository docs agree on the same startup story
- BASB rules remain intact
- no package shape regressions are introduced
- the decision log records the implementation session

### Risks to Watch

- duplicating the startup contract in too many files again
- accidentally removing `BASBGuide.md` from the package instead of simply demoting it
- overfitting tests to exact phrasing rather than observable startup behavior
- letting repository maintainer context overwrite scaffolded end-user context
