---
title: "Contributing to Prompt-Driven BASB"
type: "guide"
status: "active"
created_at: "2026-04-07T09:06:25.7917960+03:00"
updated_at: "2026-04-07T09:51:30.7943841+03:00"
summary: "Contributor guidance for maintaining the BASB prompt workspace and npm package without drifting outside the repository's local-first scope."
tags:
  - "basb"
  - "contributing"
  - "documentation"
  - "npm-package"
related_docs:
  - "AGENTS.md"
  - "README.md"
  - ".basb/prompts/01-session-start.md"
  - ".basb/prompts/00-master-system.md"
  - "state/SOUL.md"
  - "package.json"
---
# Contributing

This repository is a prompt-driven BASB workspace packaged for npm. Treat it as BASB infrastructure, prompts, templates, and packaging logic, not as a generic application codebase.

## First Principles

- Keep the system local-first, file-based, and markdown-first.
- Use P.A.R.A. only: `projects`, `areas`, `resources`, and `archives`.
- Preserve source material. Distillation should add layers around notes, not replace them.
- Prefer YAML frontmatter for operational metadata and markdown bodies for substance.
- Route by next intended use and actionability, not by topic alone.
- Do not introduce services, databases, schedulers, or hidden state unless that change is explicitly requested.

## Before You Start

1. Identify the layer you are changing.
   Package and distribution work usually touches `package.json`, `scripts/`, `index.js`, `bootstrap/`, and `tests/`.
   BASB behavior and workspace-content changes usually touch `.basb/prompts/`, `templates/`, `AGENTS.md`, `README.md`, or the `state/` templates under `bootstrap/`.
2. Install Node.js `>=22`, then run `npm install`.
3. Run `npm test` before and after behavior changes. Run `npm run pack:check` whenever your change could affect published package contents or scaffolded workspace files.
4. Keep repository docs, bootstrap copies, and tests aligned when a change affects what a fresh installed workspace does.
5. Treat the normal BASB session-start flow as contributor reference material, not as the default entrypoint for package work.

If your change affects BASB prompt semantics, startup rules, routing behavior, scaffolded instructions, or other workspace-operating behavior, then read:

1. `AGENTS.md`
2. `.basb/prompts/01-session-start.md`
3. `state/SOUL.md` and `.basb/prompts/00-master-system.md` for deeper BASB-system maintenance

If your change is only about packaging, tests, distribution, or CI, you usually do not need the full BASB runtime bundle.

## What Usually Belongs in a Contribution

- Prompt-pack updates under `.basb/prompts/`
- State-template or workflow changes under `bootstrap/`
- Documentation updates such as `README.md`, `AGENTS.md`, and this file
- Packaging or scaffold logic under `scripts/`, `index.js`, and `package.json`
- Regression tests under `tests/`

Changes that affect how a fresh workspace behaves should keep repository docs, bootstrap assets, and tests aligned.

## Change Discipline

1. Make the smallest useful change.
2. Scan frontmatter before reading full note bodies.
3. Update `updated_at` when you materially change an operational markdown file.
4. Keep `related_docs` paths repo-relative and auditable.
5. If a session changes BASB state, append a concise entry to `state/decision-log.md`.
6. Update `state/active-context.md` only when the likely next task changed.
7. Use `state/review-queue.md` instead of guessing when routing confidence is below `0.80`.

## Development Setup

- Use Node.js `>=22` as declared in `package.json`.
- Install dependencies with `npm install`.
- Run the full regression suite with `npm test`.
- Check the publishable package contents with `npm run pack:check`.

Useful focused commands:

```bash
node --test tests/package.test.js
node --test tests/scaffold-workspace.test.js
node --test tests/publish-version.test.js
```

## Verification Expectations

- Documentation-only changes should still be checked for consistency against BASB instructions and related docs.
- Behavioral changes should include or update regression tests.
- Packaging changes should be validated with both `npm test` and `npm run pack:check`.
- If install-time behavior changes, verify the scaffold logic rather than assuming package files and bootstrap files stayed in sync.

## Pull Request Notes

Include:

- the BASB behavior or contributor workflow you changed
- the files or prompts that define that behavior
- the verification commands you ran
- any bootstrap or package-install impact

If the change is intentionally narrow, say so. This repo favors tightly scoped maintenance over broad refactors.

## What To Avoid

- Treating the repository like an app stack with runtime services
- Adding a fifth organizational category beyond P.A.R.A.
- Replacing source notes with summaries
- Updating prompts without checking whether bootstrap copies and tests need the same change
- Leaving BASB state changes undocumented in `state/decision-log.md`
