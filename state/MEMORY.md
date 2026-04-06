---
title: "BASB Memory"
type: "state"
status: "active"
updated_at: "2026-04-06T17:55:28.7716136+03:00"
tags:
  - "basb"
  - "memory"
related_docs:
  - "state/SOUL.md"
  - ".basb/prompts/01-session-start.md"
---
# Stable Conventions

- Use YAML frontmatter on operational markdown files.
- Use vault-relative paths in `related_docs`.
- Keep BASB prompt and plan assets under `.basb/`, not `docs/`.
- Use `AGENTS.md` plus `.basb/prompts/01-session-start.md` to decide the startup context bundle.
- Route by actionability and next use, not subject matter.
- Use `state/review-queue.md` for low-confidence routing or summarization decisions.
- Scan frontmatter and executive summaries before reading full source material.

# Current System Status

- The prompt-driven BASB workspace has been bootstrapped.
- Core state files, prompt files, templates, and examples exist.
- The system is ready for real capture, routing, distillation, expression, and maintenance sessions.

# Open Loops

- Populate `state/favorite-problems.md` with the user's real long-running questions.
- Add real project, area, and resource notes to the vault.
- Refine prompts over time based on observed drift or review-queue patterns.

# Useful Paths

- Master prompt: `.basb/prompts/00-master-system.md`
- Session start: `.basb/prompts/01-session-start.md`
- Capture: `.basb/prompts/10-capture.md`
- Routing: `.basb/prompts/20-organize-route.md`
- Review queue: `state/review-queue.md`

# Notes

Treat this file as persistent BASB memory. Update it when conventions, risks, or recurring patterns change.
