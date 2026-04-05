---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-05T14:02:03.6040204+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - "state/MEMORY.md"
  - "docs/prompts/01-session-start.md"
---
# Current Focus

`prompt-driven-basb` now derives its npm publish version automatically on each push to `main`, but only when the current commit has not already been published. The workflow compares the latest npm package `gitHead` to the current commit SHA, skips duplicate reruns for the same code, and only bumps the patch version when a new commit needs a fresh publish.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Limit code to npm packaging metadata, lightweight asset-path helpers, and release automation for the published package.
- Do not expand into application services, databases, or background jobs unless explicitly requested.

# Recommended Next Actions

1. Create an npm automation token and save it as the GitHub repository secret `NPM_TOKEN` for `Tovli/PromptDrivenBASB`.
2. Push or merge the workflow and version-prep helper changes to `main` so the next `main` push can publish `prompt-driven-basb@0.1.1`.
3. After the workflow runs, verify `npm.cmd view prompt-driven-basb version gitHead dist-tags --json` shows `latest: 0.1.1`, then rerun the workflow for the same commit to confirm it skips publishing instead of bumping a duplicate version.

# Recently Touched

- `docs/plans/2026-04-05-auto-versioning.md`
- `.github/workflows/publish-npm.yml`
- `package.json`
- `scripts/lib/publish-version.cjs`
- `scripts/prepare-publish-version.cjs`
- `state/decision-log.md`
