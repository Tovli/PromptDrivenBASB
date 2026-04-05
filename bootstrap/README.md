# BASB Prompt Workspace

This workspace implements BASB as a Codex-operated prompt system, not as an external application.

## What This Workspace Contains

- `BASBGuide.md`: the architectural source document.
- `.basb/prompts/`: reusable prompts for BASB operations.
- `state/`: durable operating memory, review queues, and decision logs.
- `templates/`: note and brief templates with YAML frontmatter.
- `vault/`: the working knowledge base.
- `examples/`: sample inputs and expected outputs.

## Core Idea

Codex is the BASB engine.

- The filesystem is the vault.
- Prompt files define behavior.
- Markdown files hold both content and metadata.
- Frontmatter keeps the files readable while staying structured.

## License

MIT

## Session Start

For a normal BASB session, read these in order:

1. `BASBGuide.md`
2. `state/SOUL.md`
3. `state/MEMORY.md`
4. `state/active-context.md`
5. `.basb/prompts/00-master-system.md`
6. The task-specific prompt in `.basb/prompts/`

## Typical Workflow

1. Capture raw material into `vault/inbox/`.
2. Route it into `projects`, `areas`, `resources`, or `archives`.
3. Distill the note in layers.
4. Use the note set to produce plans, briefs, or syntheses.
5. Run daily and weekly maintenance prompts.

## Frontmatter Policy

Use YAML frontmatter on operational markdown files for:

- tags
- summary
- related docs
- source metadata
- routing rationale
- status

Keep the note body for actual content, extracted insight, and next actions.

## First Real Use

1. Put a real capture in `vault/inbox/` using `.basb/prompts/10-capture.md`.
2. Route it with `.basb/prompts/20-organize-route.md`.
3. If ambiguous, queue it with `.basb/prompts/21-human-review.md`.
4. Distill it with the `30-32` prompt chain.

## Scope Boundary

Do not turn this workspace into an application stack. The goal is prompt-driven operation through Codex using local files only.
