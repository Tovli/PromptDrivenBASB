---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-05T13:14:42.3977827+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - "state/MEMORY.md"
  - "docs/prompts/01-session-start.md"
---
# Current Focus

`prompt-driven-basb@0.1.1` is prepared with MIT licensing, fresh tests, and a verified tarball. The only remaining step is publishing it with a current npm one-time password so `latest` can move from `0.1.0` to `0.1.1`.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Limit code to npm packaging metadata and lightweight asset-path helpers.
- Do not expand into application services, databases, or background jobs unless explicitly requested.

# Recommended Next Actions

1. Provide the current npm OTP and rerun `npm.cmd publish --access public --otp=<code>` for `0.1.1`.
2. After publish, verify `npm.cmd view prompt-driven-basb version dist-tags --json` shows `latest: 0.1.1`.
3. Verify install and runtime usage from a clean consumer project with `npm install prompt-driven-basb`.

# Recently Touched

- `LICENSE`
- `README.md`
- `package.json`
