---
title: "BASB Weekly Maintenance"
purpose: "Review the compiled wiki, run lint, surface favorite-problem matches, and propose cleanup actions."
stage: "maintain"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - "Project notes"
  - "Area notes"
  - "Resource notes"
  - "Archive notes"
  - "Recent entries in vault/log.md"
  - ".basb/system/MEMORY.md"
  - "state/MEMORY.md"
outputs:
  - "A weekly maintenance note and any approved metadata updates"
  - "An updated vault/log.md entry if meaningful structural changes land"
requires_review_when:
  - "Archive candidates are uncertain"
  - "Multiple structural changes would be speculative"
  - "Lint surfaces contradictions that cannot be resolved without user input"
related_docs:
  - "templates/weekly-review.md"
  - "state/review-queue.md"
  - ".basb/prompts/61-knowledge-lint.md"
  - ".basb/prompts/70-favorite-problems.md"
  - "vault/log.md"
  - "vault/index.md"
tags:
  - "basb"
  - "prompt"
  - "weekly-maintenance"
---
# Goal

Keep the BASB compiled wiki structurally healthy and cognitively light.

# Maintenance Checklist

1. Review projects, areas, resources, and archives.
2. Identify completed or inactive projects and propose archive moves.
3. Flag areas that have not been reviewed recently.
4. Surface resource notes that should link to active work.
5. Run `.basb/prompts/70-favorite-problems.md` against the set of notes changed since the last weekly review.
6. Run `.basb/prompts/61-knowledge-lint.md` across the vault. Include its findings in the weekly review note, with concrete proposed repairs rather than vague flags.
7. Propose note merges, backlink repairs, and summary refreshes based on the lint findings.
8. Update `state/MEMORY.md` if workspace-local conventions changed.
9. Append a concise entry to `vault/log.md` for any meaningful structural change that lands this week.
10. Refresh `vault/index.md` if high-value notes were created, promoted, merged, or archived.
11. Queue uncertain archive moves and unresolved lint findings in `state/review-queue.md`.

# Output Location

Save the result to `vault/weekly/YYYY-MM-DD-weekly-review.md`.

# Tone

Decisive, concrete, and audit-friendly.
