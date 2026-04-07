# Canonical System State Upgrade Path Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make canonical BASB state files update on package install and upgrade without overwriting user-local runtime state.

**Architecture:** Move package-owned canonical state into `.basb/system/` so it can be refreshed alongside prompts on every install. Keep user-owned runtime state in `state/`, seed only missing local files from `bootstrap/state/`, and update prompts/docs/tests to read canonical rules from `.basb/system/`.

**Tech Stack:** Node.js postinstall scaffold, CommonJS package exports, Node test runner, markdown prompt/state files

---

### Task 1: Lock the desired packaging behavior with tests

**Files:**
- Modify: `tests/package.test.js`
- Modify: `tests/scaffold-workspace.test.js`

**Step 1: Write the failing test**

Add assertions that:
- npm tarball includes `.basb/system/SOUL.md` and `.basb/system/MEMORY.md`
- scaffolded workspaces contain `.basb/system/SOUL.md` and `.basb/system/MEMORY.md`
- scaffolded workspaces no longer require `state/SOUL.md` or `state/MEMORY.md`
- upgrades overwrite package-owned `.basb/system/*` while preserving `state/*`

**Step 2: Run test to verify it fails**

Run: `node --test tests/package.test.js tests/scaffold-workspace.test.js`
Expected: FAIL because `.basb/system` is not packaged or scaffolded yet

### Task 2: Implement the ownership split

**Files:**
- Modify: `package.json`
- Modify: `scripts/lib/scaffold-workspace.cjs`
- Modify: `index.js`
- Create: `.basb/system/MEMORY.md`
- Create: `.basb/system/SOUL.md`
- Modify: `bootstrap/state/active-context.md`
- Modify: `bootstrap/state/decision-log.md` if wording needs ownership clarity

**Step 1: Write minimal implementation**

Update package-owned workspace entries so `.basb/system/` is refreshed on install and upgrade. Keep bootstrap seeding only for genuinely user-local files under `state/`.

**Step 2: Run targeted tests to verify they pass**

Run: `node --test tests/package.test.js tests/scaffold-workspace.test.js`
Expected: PASS

### Task 3: Repoint BASB startup/runtime docs to canonical system state

**Files:**
- Modify: `AGENTS.md`
- Modify: `.basb/prompts/00-master-system.md`
- Modify: `.basb/prompts/01-session-start.md`
- Modify: `README.md`
- Modify: `bootstrap/README.md`
- Modify: `state/SOUL.md`
- Modify: `state/MEMORY.md`

**Step 1: Update wording**

Make startup and maintenance bundles read `.basb/system/SOUL.md` and `.basb/system/MEMORY.md` as canonical package-owned rules, while `state/active-context.md` remains local runtime state.

**Step 2: Keep maintainer-local state explicit**

Clarify that repo `state/*` remains maintainer-local and is not the shipped canonical source.

### Task 4: Full verification

**Files:**
- Verify only

**Step 1: Run the package test suite**

Run: `npm test`
Expected: PASS

**Step 2: Run tarball verification**

Run: `npm run pack:check`
Expected: PASS and show `.basb/system/*` included while live `state/*` remains excluded
