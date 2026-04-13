# BASB Prompt Workspace

This workspace implements BASB as a Codex-operated prompt system, not as an external application.

## What This Repository Contains

- `BASBGuide.md`: the architectural reference document for deeper BASB design work.
- `.basb/system/`: package-owned canonical BASB state that updates with the package.
- `.basb/plans/`: the implementation plan for the prompt system.
- `.basb/prompts/`: reusable prompts for BASB operations, including source ingest and knowledge lint.
- `state/`: workspace-local BASB state, review queues, and decision logs.
- `templates/`: note and brief templates with YAML frontmatter, including an immutable source-note template.
- `vault/`: the working knowledge base. `vault/projects/`, `vault/areas/`, `vault/resources/`, `vault/archives/` hold compiled notes in P.A.R.A. `vault/sources/` preserves immutable source material as an operational provenance layer. `vault/index.md` is a human-readable catalog of high-value compiled notes, and `vault/log.md` is the knowledge-evolution log.
- `examples/`: sample inputs and expected outputs, including a source-ingest example.

## Core Idea

Codex is the BASB engine.

- The filesystem is the vault.
- Prompt files define behavior.
- Markdown files hold both content and metadata.
- Frontmatter keeps the files readable while staying structured.

## NPM Package

This repository can now be published as the `prompt-driven-basb` npm package.

Running `npm install prompt-driven-basb` scaffolds the BASB workspace into the current project root. On first install it creates the bundled prompts, templates, examples, vault directories, package-owned `.basb/system/` state, and a bootstrap `state/` folder. On later installs and upgrades it refreshes the package-owned workspace files from the current package version, including `.basb/system/`, while `state/` only fills in missing files and preserves the user's local BASB state.

## Getting Started

If you already capture ideas, meeting notes, article excerpts, or rough thoughts in an LLM chat box, this package gives that habit a BASB-shaped home instead of leaving it as disposable chat.

1. Install the package in the folder you want to use as your second brain:

   ```bash
   npm install prompt-driven-basb
   ```

2. Open that workspace in Codex.
3. Paste any note you want to keep into the LLM text box.
4. Let the BASB prompts treat that input as second-brain material, classify it by the P.A.R.A. method, and file it into the workspace as markdown.

The intended loop is simple: capture first, organize by next use, and keep moving. You do not need to pre-sort your notes before you add them.

### Current Limits

The package does not currently support direct video or audio transcription. If there is enough demand, or a good PR, that is something I would be happy to examine. For now, the practical workaround is to transcribe the recording with any tool you prefer and then paste the transcription into the BASB system like any other note.

The package also exposes a small Node API for resolving bundled paths:

```js
const { assets, getAssetPath, listPromptFiles } = require('prompt-driven-basb');

console.log(assets.masterPrompt);
console.log(getAssetPath('templates/project-note.md'));
console.log(listPromptFiles());
```

The published package intentionally does not bundle the live repository `state/`. Client-local BASB memory, review queues, and decision logs should remain outside package upgrades so they are not overwritten when the package updates.

Canonical BASB rules now live in `.basb/system/` so package upgrades can refresh shared BASB behavior. The install-time `state/` folder is initialized from neutral bootstrap templates and remains user-owned local state.

Local verification commands:

- `npm test`
- `npm run pack:check`

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

1. Capture or ingest the input. Durable source material is preserved verbatim in `vault/sources/` via `.basb/prompts/11-ingest-source.md`. Direct compiled-note updates go straight to the relevant P.A.R.A. note.
2. Create or update compiled notes in `projects`, `areas`, `resources`, or `archives` with `artifact_kind` and provenance frontmatter linking back to the source.
3. Distill the compiled note in layers. Raw sources under `vault/sources/` stay untouched.
4. Use the compiled note set to express plans, briefs, or syntheses. Persist durable outputs back into the vault by default.
5. Run daily and weekly maintenance. Weekly maintenance includes `.basb/prompts/61-knowledge-lint.md` to flag orphan notes, stale summaries, contradictions, and broken source lineage.

Meaningful ingest, synthesis, and cleanup events are appended to `vault/log.md`, and high-value pages are cataloged in `vault/index.md`. Both files are package-owned and local-first — no services, databases, or schedulers are introduced.

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

1. Run `.basb/prompts/10-capture.md` on the input. The dispatcher decides whether the input is transient, a direct compiled-note update, or durable source material.
2. For durable source material, let `.basb/prompts/11-ingest-source.md` create the immutable source note in `vault/sources/` and update or create derived compiled notes in P.A.R.A.
3. For compiled notes whose destination is unclear, route with `.basb/prompts/20-organize-route.md`. If still ambiguous, escalate with `.basb/prompts/21-human-review.md`.
4. Distill the compiled note with the `30-32` prompt chain. Immutable sources stay immutable.
5. Run `.basb/prompts/60-weekly-maintenance.md` weekly; it calls `.basb/prompts/61-knowledge-lint.md` and `.basb/prompts/70-favorite-problems.md` automatically.

## Scope Boundary

Do not turn this workspace into an application stack. The goal is prompt-driven operation through Codex using local files only.
