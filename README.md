# BASB Prompt Workspace

This workspace implements BASB as a Codex-operated prompt system, not as an external application.

## What This Repository Contains

- `BASBGuide.md`: the architectural reference document for deeper BASB design work.
- `.basb/plans/`: the implementation plan for the prompt system.
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

## NPM Package

This repository can now be published as the `prompt-driven-basb` npm package.

Running `npm install prompt-driven-basb` scaffolds the BASB workspace into the current project root. On first install it creates the bundled prompts, templates, examples, vault directories, and a bootstrap `state/` folder. On later installs and upgrades it refreshes the package-owned workspace files from the current package version, while `state/` only fills in missing files and preserves the user's local BASB state.

The package also exposes a small Node API for resolving bundled paths:

```js
const { assets, getAssetPath, listPromptFiles } = require('prompt-driven-basb');

console.log(assets.masterPrompt);
console.log(getAssetPath('templates/project-note.md'));
console.log(listPromptFiles());
```

The published package intentionally does not bundle `state/`. Client-local BASB memory, review queues, and decision logs should remain outside package upgrades so they are not overwritten when the package updates.

The install-time `state/` folder is initialized from neutral bootstrap templates, not from this repository's live maintainer state.

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
