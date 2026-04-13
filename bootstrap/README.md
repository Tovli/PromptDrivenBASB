# BASB Prompt Workspace

This workspace implements BASB as a Codex-operated prompt system, not as an external application.

## What This Workspace Contains

- `BASBGuide.md`: the architectural reference document for deeper BASB design work.
- `.basb/system/`: package-owned canonical BASB state that refreshes on upgrade.
- `.basb/prompts/`: reusable prompts for BASB operations, including source ingest and knowledge lint.
- `state/`: workspace-local BASB state, review queues, and decision logs.
- `templates/`: note and brief templates with YAML frontmatter, including an immutable source-note template.
- `vault/`: the working knowledge base. `vault/projects/`, `vault/areas/`, `vault/resources/`, `vault/archives/` hold compiled notes in P.A.R.A. `vault/sources/` preserves immutable source material as an operational provenance layer. `vault/index.md` catalogs high-value compiled notes, and `vault/log.md` logs meaningful knowledge events.
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

For a normal BASB session:

1. Read `AGENTS.md`.
2. Read `.basb/prompts/01-session-start.md`.
3. Let that dispatcher classify the task and load only the minimum relevant BASB files.

Read `BASBGuide.md` only for BASB-system maintenance, prompt design, package-maintainer work, or architecture review.

Read `.basb/prompts/00-master-system.md` when the session is BASB-system maintenance or another deeper multi-file BASB change.

Use `.basb/system/` for canonical package rules and `state/` for workspace-local BASB memory.

## Typical Workflow

1. Capture or ingest. Durable source material goes through `.basb/prompts/11-ingest-source.md`, which writes an immutable source note in `vault/sources/` and updates derived compiled notes in P.A.R.A.
2. Create or update compiled notes in `projects`, `areas`, `resources`, or `archives`. Each compiled note carries `artifact_kind` and provenance fields that link back to its source lineage.
3. Distill the compiled note in layers. Immutable source notes are never rewritten.
4. Express reusable outputs back into the vault by default so a one-off answer does not stay trapped in a chat.
5. Run daily and weekly maintenance. Weekly maintenance runs `.basb/prompts/61-knowledge-lint.md` to surface orphans, stale summaries, contradictions, and broken source lineage.

Meaningful changes are recorded in `vault/log.md`, and high-value pages are cataloged in `vault/index.md`. Everything stays local-first and file-based.

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

1. Run `.basb/prompts/10-capture.md` on the input. The dispatcher decides transient vs. direct compiled-note update vs. durable source ingest.
2. For durable source material, hand off to `.basb/prompts/11-ingest-source.md`. The source is preserved verbatim in `vault/sources/` and the compiled notes it affects are updated in P.A.R.A.
3. If a compiled note's P.A.R.A. destination is still unclear, route with `.basb/prompts/20-organize-route.md`, and escalate with `.basb/prompts/21-human-review.md` only when truly ambiguous.
4. Distill the compiled note with the `30-32` prompt chain.
5. Run weekly maintenance via `.basb/prompts/60-weekly-maintenance.md`; it invokes knowledge lint and favorite-problem matching for you.

## Scope Boundary

Do not turn this workspace into an application stack. The goal is prompt-driven operation through Codex using local files only.
