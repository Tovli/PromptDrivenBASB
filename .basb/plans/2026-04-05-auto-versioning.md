# Auto Versioning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish a new npm version automatically on each push to `main` without requiring manual version edits or OTP entry.

**Architecture:** Add a small Node helper that decides which version to publish based on the checked-in manifest version and the latest version already published to npm. The GitHub Actions workflow will run that helper before tests and publishing so the tarball always carries a unique semver while keeping the repository file-first and avoiding self-generated version bump commits.

**Tech Stack:** Node.js 22, GitHub Actions, npm registry metadata, `node:test`, CommonJS.

---

### Task 1: Add failing tests for version selection

**Files:**
- Create: `tests/publish-version.test.js`
- Create: `scripts/lib/publish-version.cjs`

**Step 1: Write the failing test**

Add tests that define the expected publish version rules:

- keep the manifest version if it has not been published yet
- bump the patch version when the manifest version already exists on npm
- bump from the latest published version if the checked-in manifest lags behind npm
- keep a manually raised manifest version if it is ahead of npm and unpublished

**Step 2: Run test to verify it fails**

Run: `node --test tests/publish-version.test.js`
Expected: FAIL because `scripts/lib/publish-version.cjs` does not exist yet.

**Step 3: Write minimal implementation**

Implement a helper module with pure functions for semver comparison and next-version selection.

**Step 4: Run test to verify it passes**

Run: `node --test tests/publish-version.test.js`
Expected: PASS.

### Task 2: Wire the helper into the publish workflow

**Files:**
- Create: `scripts/prepare-publish-version.cjs`
- Modify: `.github/workflows/publish-npm.yml`

**Step 1: Add a CLI wrapper**

Create a script that:

- reads `package.json`
- queries npm for published versions of the package
- selects the correct publish version
- updates `package.json` in the workflow workspace when a bump is needed
- prints the chosen version for workflow logs

**Step 2: Update the workflow**

Run the version-preparation script before tests and packaging, and remove the old “skip publish if already exists” branch logic because the workflow should always derive a fresh publishable version.

**Step 3: Verify workflow syntax**

Validate the YAML and make sure the workflow still targets pushes to `main` and uses `NPM_TOKEN`.

### Task 3: Verify end-to-end repo behavior

**Files:**
- Modify: `package.json` if scripts need to be exposed for local verification

**Step 1: Run focused tests**

Run: `node --test tests/publish-version.test.js`

**Step 2: Run the existing package test suite**

Run: `npm test`

**Step 3: Run tarball verification**

Run: `npm run pack:check`

**Step 4: Validate workflow YAML**

Run a real parser against `.github/workflows/publish-npm.yml`.

### Task 4: Update BASB state

**Files:**
- Modify: `state/active-context.md`
- Modify: `state/decision-log.md`

**Step 1: Update active focus**

Record that the package now auto-versions on pushes to `main` and that the remaining operational dependency is the `NPM_TOKEN` secret and a live workflow run.

**Step 2: Append audit entry**

Log the auto-versioning decision and confidence in `state/decision-log.md`.
