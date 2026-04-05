---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-05T14:37:22.8947414+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - "state/MEMORY.md"
  - "docs/prompts/01-session-start.md"
---
# Current Focus

`prompt-driven-basb` now scaffolds the BASB workspace into the consumer project root during `npm install` via a `postinstall` hook. Package-owned files such as `AGENTS.md`, `BASBGuide.md`, `README.md`, `docs/`, `examples/`, `templates/`, and packaged vault placeholders refresh from the installed package version on upgrade, while `state/` still initializes from neutral bootstrap templates only when those files are missing.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Limit code to npm packaging metadata, lightweight asset-path helpers, and release automation for the published package.
- Do not expand into application services, databases, or background jobs unless explicitly requested.

# Recommended Next Actions

1. Push or merge the install-scaffold, bootstrap-state, and package whitelist changes to `main`.
2. Publish the next package version, then verify a clean consumer project gets `docs/`, `examples/`, `templates/`, `vault/`, and `state/` at its root immediately after `npm install prompt-driven-basb`.
3. Re-run the install into a workspace that already has customized package-owned markdown and `state/` files to confirm package content refreshes while `state/` remains untouched.

# Recently Touched

- `bootstrap/state/SOUL.md`
- `docs/plans/2026-04-05-auto-versioning.md`
- `.github/workflows/publish-npm.yml`
- `index.js`
- `package.json`
- `README.md`
- `scripts/lib/scaffold-workspace.cjs`
- `scripts/postinstall.cjs`
- `scripts/lib/publish-version.cjs`
- `scripts/prepare-publish-version.cjs`
- `tests/package.test.js`
- `tests/scaffold-workspace.test.js`
- `state/decision-log.md`
