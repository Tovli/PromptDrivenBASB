---
title: "Active Context"
type: "state"
status: "active"
updated_at: "2026-04-05T15:00:57.0720244+03:00"
tags:
  - "basb"
  - "active-context"
related_docs:
  - "state/MEMORY.md"
  - "docs/prompts/01-session-start.md"
  - "docs/prompts/00-master-system.md"
  - "docs/prompts/10-capture.md"
---
# Current Focus

The current BASB refinement focus is prompt-intake behavior. New user prompts should be treated as additions to the user's second brain by default, routed through capture plus classification, and documented in the same session unless the request is clearly BASB-system maintenance or transient conversation.

# Current Boundaries

- Keep the BASB system file-first and markdown-first.
- Strengthen behavior through prompt and state files before adding any code.
- Do not expand into application services, databases, or background jobs unless explicitly requested.

# Recommended Next Actions

1. Dry-run the updated BASB prompts against a few representative cases: a raw idea prompt, a request to edit an existing note, and a BASB-system maintenance request.
2. If drift remains, tighten `docs/prompts/10-capture.md` or `docs/prompts/20-organize-route.md` rather than introducing new workflow layers.
3. Add an example capture showing how prompt-originated material should be titled, summarized, and routed.

# Recently Touched

- `AGENTS.md`
- `state/SOUL.md`
- `docs/prompts/00-master-system.md`
- `docs/prompts/01-session-start.md`
- `docs/prompts/10-capture.md`
- `state/decision-log.md`
