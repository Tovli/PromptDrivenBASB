---
title: "BASB Agent Instructions"
type: "state"
status: "active"
updated_at: "2026-04-05T11:58:42.0722547+03:00"
tags:
  - "basb"
  - "agent"
  - "session-start"
related_docs:
  - "README.md"
  - "BASBGuide.md"
  - "state/SOUL.md"
  - "docs/prompts/00-master-system.md"
---
# Purpose

This repository is a prompt-driven BASB workspace. Codex is the BASB engine. Do not treat this as an application codebase unless the user explicitly changes the goal.

# Session Start

For any new session, read these files in order:

1. `AGENTS.md`
2. `BASBGuide.md`
3. `state/SOUL.md`
4. `state/MEMORY.md`
5. `state/active-context.md`
6. `docs/prompts/00-master-system.md`
7. The task-specific prompt in `docs/prompts/`

If the task is specific to an existing note, read that note after scanning its frontmatter.

# Core Rules

1. Use P.A.R.A. only: `projects`, `areas`, `resources`, `archives`.
2. Preserve source material. Distillation adds layers and summaries; it does not replace the original content.
3. Prefer frontmatter for metadata and the markdown body for substance.
4. Route by next intended use and actionability, not by topic alone.
5. If routing is involved, produce the JSON routing decision before moving the note.
6. If confidence is below `0.80`, prefer `state/review-queue.md` over guessing.
7. After any state-changing session, append a concise entry to `state/decision-log.md`.
8. Keep the system local-first and file-based. Do not introduce services, databases, schedulers, or hidden state unless the user explicitly asks for that change.

# Frontmatter Policy

Operational markdown files should use YAML frontmatter.

Use frontmatter for:

- `title`
- `type`
- `status`
- `created_at`
- `updated_at`
- `summary`
- `tags`
- `related_docs`
- `linked_projects`
- `route_reason`
- `confidence`

Use vault-relative paths in `related_docs`.

# Repository Layout

- `docs/prompts/`: BASB workflow prompts
- `state/`: persistent operating state
- `templates/`: note and brief templates
- `vault/`: BASB knowledge base
- `examples/`: sample captures and expected outputs

# Prompt Selection

Use the smallest prompt that fits the task:

- capture: `docs/prompts/10-capture.md`
- route: `docs/prompts/20-organize-route.md`
- ambiguous routing: `docs/prompts/21-human-review.md`
- distill: `docs/prompts/30-distill-layer2.md`, `31-distill-layer3.md`, `32-distill-layer4.md`
- express: `docs/prompts/40-express.md`
- daily maintenance: `docs/prompts/50-daily-brief.md`
- weekly maintenance: `docs/prompts/60-weekly-maintenance.md`
- favorite problems review: `docs/prompts/70-favorite-problems.md`

# Routing Contract

Before moving a note across P.A.R.A. boundaries, produce:

```json
{
  "classification": "projects|areas|resources|archives",
  "destination_path": "vault/resources/example-note.md",
  "semantic_tags": ["example"],
  "actionability_summary": "Why this belongs here based on next use.",
  "confidence_score": 0.0,
  "requires_human_review": false
}
```

# Operating Pattern

1. Read the minimum relevant context.
2. Scan frontmatter before full note bodies.
3. Make the smallest useful change.
4. Update frontmatter if the note materially changed.
5. Log the action in `state/decision-log.md`.
6. If ambiguity remains, queue it in `state/review-queue.md`.

# Session Close

Before finishing:

1. Summarize changed files.
2. Update `state/active-context.md` if the likely next task changed.
3. Append to `state/decision-log.md`.
4. Leave unresolved ambiguity in `state/review-queue.md`.

# Scope Boundary

The default job in this repository is to operate BASB through prompts and markdown files. Avoid drifting into generic software implementation unless the user explicitly asks for it.
