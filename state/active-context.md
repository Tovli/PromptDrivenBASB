---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-07T10:35:00+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - ".basb/system/MEMORY.md"
  - "state/MEMORY.md"
  - ".basb/plans/2026-04-06-startup-context-happy-path-optimization.md"
  - ".basb/plans/2026-04-07-canonical-system-state-upgrade-path.md"
  - ".github/workflows/publish-npm.yml"
  - "tests/package.test.js"
  - "tests/scaffold-workspace.test.js"
  - "package.json"
---
# Current Focus

The package now splits BASB state ownership between package-owned canonical files under `.basb/system/` and workspace-local files under `state/`. The next likely task is to review and stage the canonical-state upgrade-path change, then validate that a real package upgrade refreshes `.basb/system/` while preserving existing `state/` content.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Keep package-maintainer changes limited to versioning, publish, and release automation unless a wider distribution change is explicitly requested.
- Do not expand into application services, databases, background jobs, or hidden state unless explicitly requested.

# Recommended Next Actions

1. Smoke-test `npm install prompt-driven-basb` into a fresh temp project and confirm `.basb/system/` is created alongside local `state/` overlay files.
2. Upgrade an existing scaffolded workspace and confirm `.basb/system/` refreshes while customized `state/` files are preserved.
3. Stage and publish the package-maintainer changes once the upgrade path is confirmed end-to-end.

# Recently Touched

- `.basb/system/SOUL.md`
- `.basb/system/MEMORY.md`
- `scripts/lib/scaffold-workspace.cjs`
- `tests/package.test.js`
- `tests/scaffold-workspace.test.js`
- `state/active-context.md`
- `state/decision-log.md`
