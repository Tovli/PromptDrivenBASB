---
title: "BASB Memory"
type: "state"
status: "active"
updated_at: "__TIMESTAMP__"
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
- Use `AGENTS.md` plus `.basb/prompts/01-session-start.md` to decide the startup context bundle.
- Route by actionability and next use, not subject matter.
- Use `state/review-queue.md` for low-confidence routing or summarization decisions.
- Scan frontmatter and executive summaries before reading full source material.

# Current System Status

- The BASB workspace scaffold is installed locally.
- Prompts, templates, examples, and vault placeholders are available.
- Client-local state now lives under `state/` and should evolve inside this workspace.

# Open Loops

- Personalize `state/favorite-problems.md` with real enduring questions.
- Add the first real note to `vault/inbox/`.
- Refine prompts and templates as the local workflow becomes clearer.

# Useful Paths

- Master prompt: `.basb/prompts/00-master-system.md`
- Session start: `.basb/prompts/01-session-start.md`
- Capture: `.basb/prompts/10-capture.md`
- Routing: `.basb/prompts/20-organize-route.md`
- Review queue: `state/review-queue.md`

# Notes

Treat this file as persistent BASB memory. Update it when conventions, risks, or recurring patterns change.
