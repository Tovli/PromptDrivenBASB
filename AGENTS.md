---
title: "BASB Agent Instructions"
type: "state"
status: "active"
updated_at: "2026-04-21T18:52:14.8991301+03:00"
tags:
  - "basb"
  - "agent"
  - "session-start"
related_docs:
  - "README.md"
  - ".basb/prompts/01-session-start.md"
  - ".basb/system/SOUL.md"
  - ".basb/prompts/00-master-system.md"
---
# Purpose

This repository is a prompt-driven BASB workspace. Codex is the BASB engine. Do not treat this as an application codebase unless the user explicitly changes the goal.

# Session Start

For any new session, start with these files in order:

1. `AGENTS.md`
2. `.basb/prompts/01-session-start.md`
3. Classify the current user prompt before loading more context.
4. Load only the minimum relevant BASB files for that classification.

Use these startup bundles:

- normal capture: `.basb/system/SOUL.md`, `state/SOUL.md`, `.basb/prompts/10-capture.md`, and `.basb/prompts/20-organize-route.md` only if routing is needed
- existing-note work: `.basb/system/SOUL.md`, `state/SOUL.md`, the note frontmatter, the note body only if needed, and the smallest task-specific prompt
- BASB-system maintenance: `.basb/system/SOUL.md`, `.basb/system/MEMORY.md`, `state/SOUL.md`, `state/MEMORY.md`, `state/active-context.md`, and `.basb/prompts/00-master-system.md`
- architecture, prompt-pack, or package-maintainer work: the BASB-system maintenance bundle plus `BASBGuide.md`
- transient conversation: keep BASB overhead minimal and do not create durable artifacts unless the user clearly wants that

If the task is specific to an existing note, scan its frontmatter before reading the full body.

# Core Rules

1. Use P.A.R.A. only for user-facing note organization: `projects`, `areas`, `resources`, `archives`. `vault/sources/`, `vault/index.md`, `vault/log.md`, and `vault/retrieval/` are operational support artifacts that hold immutable source material, human-readable catalogs and logs, and derived retrieval files. They do not create a fifth P.A.R.A. category.
2. Preserve source material. Raw sources captured under `vault/sources/` are immutable; distillation, synthesis, and expression create or update derived compiled notes rather than rewrite the source.
3. Prefer frontmatter for metadata and the markdown body for substance. Compiled notes in P.A.R.A. carry a second classification axis through `artifact_kind` and provenance fields that link back to source notes.
4. Route by next intended use and actionability, not by topic alone. Routing applies only to compiled notes; `vault/sources/` is never routed into P.A.R.A.
5. Treat each new user prompt as incoming second-brain material by default. If it introduces net-new durable information, capture, classify, and document it in the same session unless the user clearly asked for BASB system maintenance or transient conversation. Durable source material goes through `.basb/prompts/11-ingest-source.md` so one source can update many compiled notes.
6. If routing is involved, produce the JSON routing decision before moving the note.
7. If confidence is below `0.80`, prefer `state/review-queue.md` over guessing.
8. After any state-changing session, append a concise entry to `state/decision-log.md`. When ingest, synthesis, contradiction resolution, or durable expression meaningfully changes the vault, also append to `vault/log.md` and refresh `vault/index.md` if a high-value note is created or substantially altered.
9. Keep the system local-first and file-based. Do not introduce services, databases, schedulers, or hidden state unless the user explicitly asks for that change.

# Frontmatter Policy

Operational markdown files should use YAML frontmatter.

Use frontmatter for common operational fields:

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

Compiled notes in P.A.R.A. also use the routed-template fields that make lineage, distillation freshness, and retrieval anchors explicit:

- `artifact_kind`
- `canonical_id`
- `derived_from`
- `source_ids`
- `source_count`
- `last_ingested_at`
- `summary_last_refreshed_at`
- `claims_last_checked_at`
- `supersedes`
- `contradicts`

Source notes use the fields defined in `templates/source-note.md`.

Use vault-relative paths in `related_docs`.

# Repository Layout

- `.basb/prompts/`: BASB workflow prompts
- `.basb/system/`: package-owned canonical BASB state that refreshes on upgrade
- `state/`: workspace-local BASB state that must be preserved on upgrade
- `templates/`: note and brief templates
- `vault/`: BASB knowledge base. `vault/projects/`, `vault/areas/`, `vault/resources/`, `vault/archives/` hold compiled notes in P.A.R.A. `vault/sources/` holds immutable source notes as an operational provenance layer. `vault/index.md` is the package-owned catalog of high-value compiled notes. `vault/log.md` is the human-readable knowledge-evolution log. `vault/retrieval/` holds derived retrieval artifacts such as the catalog, question map, pattern index, and relationship index.
- `examples/`: sample captures and expected outputs

# Prompt Selection

Use the smallest prompt that fits the task:

- session startup and context selection: `.basb/prompts/01-session-start.md`, then `.basb/prompts/02-context-selection.md` only if the candidate note set is still broad
- BASB-system maintenance, architecture review, or prompt-pack changes: `.basb/prompts/00-master-system.md`
- new prompt intake or ad hoc idea capture: `.basb/prompts/10-capture.md` then `.basb/prompts/20-organize-route.md`
- capture: `.basb/prompts/10-capture.md`
- durable source ingest: `.basb/prompts/11-ingest-source.md`
- route: `.basb/prompts/20-organize-route.md`
- ambiguous routing: `.basb/prompts/21-human-review.md`
- distill: `.basb/prompts/30-distill-layer2.md`, `31-distill-layer3.md`, `32-distill-layer4.md`
- express: `.basb/prompts/40-express.md`
- daily maintenance: `.basb/prompts/50-daily-brief.md`
- weekly maintenance: `.basb/prompts/60-weekly-maintenance.md`
- knowledge lint: `.basb/prompts/61-knowledge-lint.md`
- retrieval refresh: `.basb/prompts/62-retrieval-refresh.md`
- favorite problems review: `.basb/prompts/70-favorite-problems.md`

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

1. Classify the current user prompt first: new capture, existing-note work, BASB system maintenance, or transient conversation.
2. Read the minimum relevant context bundle for that classification.
3. Scan frontmatter before full note bodies.
4. Make the smallest useful change.
5. Update frontmatter if the note materially changed.
6. Log the action in `state/decision-log.md`.
7. If ambiguity remains, queue it in `state/review-queue.md`.

# Session Close

Before finishing:

1. Summarize changed files.
2. Update `state/active-context.md` if the likely next task changed.
3. Append to `state/decision-log.md`.
4. Leave unresolved ambiguity in `state/review-queue.md`.

# Scope Boundary

The default job in this repository is to operate BASB through prompts and markdown files. Avoid drifting into generic software implementation unless the user explicitly asks for it.
