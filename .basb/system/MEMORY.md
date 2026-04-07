---
title: "BASB System Memory"
type: "state"
status: "active"
updated_at: "2026-04-07T10:20:00+03:00"
tags:
  - "basb"
  - "memory"
  - "system"
related_docs:
  - ".basb/system/SOUL.md"
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

- The prompt-driven BASB workspace is packaged for local-first use.
- Core prompts, templates, examples, and canonical BASB system files are package-owned.
- Workspace-local state lives under `state/` and should survive package reinstalls and upgrades.

# Open Loops

- Populate `state/favorite-problems.md` with the user's real long-running questions.
- Add real project, area, and resource notes to the vault.
- Refine prompts over time based on observed drift or review-queue patterns.

# Useful Paths

- System soul: `.basb/system/SOUL.md`
- Master prompt: `.basb/prompts/00-master-system.md`
- Session start: `.basb/prompts/01-session-start.md`
- Capture: `.basb/prompts/10-capture.md`
- Routing: `.basb/prompts/20-organize-route.md`
- Review queue: `state/review-queue.md`

# Notes

Treat this file as package-owned BASB memory. Update it when shared conventions, risks, or recurring package-level patterns change.
