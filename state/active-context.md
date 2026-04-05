---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-05T16:04:15.9555516+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - "state/MEMORY.md"
  - ".basb/prompts/00-master-system.md"
  - "package.json"
  - "bootstrap/README.md"
  - "scripts/lib/scaffold-workspace.cjs"
---
# Current Focus

The current BASB refinement focus is the hidden `.basb` workspace convention. Package-owned prompts and plan artifacts should live under `.basb/`, while installed BASB workspaces should scaffold only `.basb/prompts` and keep maintainer-only plans out of the consumer project root.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Strengthen behavior through prompt and state files before adding any code.
- Do not expand into application services, databases, or background jobs unless explicitly requested.

# Recommended Next Actions

1. Smoke-test `npm install prompt-driven-basb` in a fresh project outside this repository to confirm the postinstall scaffold materializes `.basb/prompts` correctly.
2. If any install-time polish is still needed, adjust `bootstrap/README.md` or scaffold selection logic without reintroducing a top-level `docs/` convention.
3. Keep tarball and scaffold regression tests in sync whenever new `.basb` assets are added to the package.

# Recently Touched

- `bootstrap/README.md`
- `.basb/prompts/00-master-system.md`
- `package.json`
- `scripts/lib/scaffold-workspace.cjs`
- `tests/package.test.js`
- `tests/scaffold-workspace.test.js`
- `state/decision-log.md`
