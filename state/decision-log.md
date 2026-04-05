---
title: "Decision Log"
type: "state"
status: "active"
updated_at: "2026-04-05T13:14:42.3977827+03:00"
tags:
  - "basb"
  - "decision-log"
related_docs:
  - "state/SOUL.md"
  - "state/MEMORY.md"
---
# Log

- `2026-04-05T09:37:10.4841057+03:00` | bootstrap | Created the vault, state files, prompt pack, templates, examples, and BASB operating docs. | confidence: `0.96` | review_required: `false`
- `2026-04-05T09:47:37.9783214+03:00` | verification | Verified required files, frontmatter coverage, and routing JSON validity. Fixed missing frontmatter in `docs/prompts/README.md`. | confidence: `0.99` | review_required: `false`
- `2026-04-05T11:55:51.0493719+03:00` | capture | Captured a new inbox note for the ShopLink admin idea to edit notification scheduling after RRULE DSL implementation. No routing performed. | confidence: `0.93` | review_required: `false`
- `2026-04-05T11:58:42.0722547+03:00` | agent-instructions | Added `AGENTS.md` as the root startup guide for new BASB sessions, including startup order, routing rules, frontmatter policy, and close-out requirements. | confidence: `0.98` | review_required: `false`
- `2026-04-05T12:52:21.1751743+03:00` | npm-package | Added a publishable npm package surface for the BASB workspace with `package.json`, a small asset-path API, Node tests, and npm tarball verification. | confidence: `0.97` | review_required: `false`
- `2026-04-05T13:03:51.6244643+03:00` | npm-publish-attempt | Verified npm auth, package tests, and publish tarball, then attempted `npm.cmd publish --access public`. npm rejected the publish with `E403` because 2FA or a granular access token with bypass is required. | confidence: `0.99` | review_required: `false`
- `2026-04-05T13:10:52.6376896+03:00` | npm-published | Verified from the npm registry that `prompt-driven-basb@0.1.0` exists and that `latest` points to `0.1.0` after the user completed the publish in a separate terminal command. | confidence: `0.99` | review_required: `false`
- `2026-04-05T13:14:42.3977827+03:00` | npm-license-patch | Updated the package to MIT licensing, added a `LICENSE` file, bumped the package to `0.1.1`, verified tests and tarball contents, and attempted publish. npm rejected the publish with `EOTP`, so a current one-time password is still required. | confidence: `0.99` | review_required: `false`
