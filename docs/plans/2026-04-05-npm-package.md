# Prompt-Driven BASB NPM Package Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn this repository into a publishable npm package that ships the BASB workspace files and exposes a small Node API for locating packaged assets.

**Architecture:** Keep the repository file-first. Add a single CommonJS entrypoint that resolves packaged file paths and lists prompt files, then add `package.json` metadata with a strict `files` whitelist so the published tarball contains the BASB workspace contents without introducing a broader application stack.

**Tech Stack:** Node.js 22, CommonJS, `node:test`, npm package metadata, markdown assets.

---

### Task 1: Define the package API with TDD

**Files:**
- Create: `tests/package.test.js`
- Create: `index.js`

**Step 1: Write the failing test**

Create a Node test that imports the package entrypoint and asserts:

- the package root resolves to an existing directory
- exported asset paths exist for key files such as `README.md` and `docs/prompts/00-master-system.md`
- prompt listing includes `00-master-system.md`

**Step 2: Run test to verify it fails**

Run: `node --test tests/package.test.js`
Expected: FAIL because `index.js` does not exist yet.

**Step 3: Write minimal implementation**

Implement a CommonJS module that exports:

- `packageRoot`
- `resolveAssetPath(...segments)`
- `getAssetPath(name)`
- `listPromptFiles()`
- `assets`

**Step 4: Run test to verify it passes**

Run: `node --test tests/package.test.js`
Expected: PASS.

### Task 2: Add npm metadata

**Files:**
- Create: `package.json`
- Create: `index.d.ts`

**Step 1: Write metadata**

Add a manifest that:

- names the package `prompt-driven-basb`
- points `main` and `exports` to `index.js`
- exposes `index.d.ts`
- whitelists the BASB workspace files in `files`
- defines `test` and `pack:check` scripts

**Step 2: Keep the type surface minimal**

Define the TypeScript declarations for the exported API only.

**Step 3: Verify the manifest shape**

Use npm packaging as the verification layer instead of inventing more code.

### Task 3: Verify package behavior

**Files:**
- No new files expected

**Step 1: Run focused tests**

Run: `node --test tests/package.test.js`

**Step 2: Run package verification**

Run: `npm.cmd pack --dry-run`
Expected: the tarball preview includes the BASB docs, templates, state files, vault placeholders, and package entry files.

### Task 4: Update BASB state

**Files:**
- Modify: `state/active-context.md`
- Modify: `state/decision-log.md`

**Step 1: Update active focus**

Record that the workspace has moved from bootstrap-only BASB operation to packaging and publication readiness.

**Step 2: Append an audit entry**

Log the packaging decision and confidence in `state/decision-log.md`.
