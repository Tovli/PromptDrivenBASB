---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-05T15:57:46.2377284+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - "state/MEMORY.md"
  - "package.json"
  - "bootstrap/README.md"
  - "scripts/lib/scaffold-workspace.cjs"
---
# Current Focus

The current BASB refinement focus is npm-install scaffold hygiene. Packaged installs should materialize a BASB-focused workspace README and prompt set without shipping maintainer-only plan docs or package-publishing details into the user's workspace.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Strengthen behavior through prompt and state files before adding any code.
- Do not expand into application services, databases, or background jobs unless explicitly requested.

# Recommended Next Actions

1. Smoke-test `npm install prompt-driven-basb` in a fresh project outside this repository to confirm the postinstall scaffold matches the package tarball contract.
2. If further install-time polish is needed, adjust `bootstrap/README.md` or scaffold selection logic before changing BASB prompt content.
3. Keep tarball and scaffold regression tests in sync whenever new docs or bootstrap assets are added to the package.

# Recently Touched

- `bootstrap/README.md`
- `package.json`
- `scripts/lib/scaffold-workspace.cjs`
- `tests/package.test.js`
- `tests/scaffold-workspace.test.js`
- `state/decision-log.md`
