---
title: "BASB Weekly Maintenance"
purpose: "Review the compiled wiki, refresh retrieval artifacts, run lint, surface favorite-problem matches, and propose cleanup actions."
stage: "maintain"
updated_at: "2026-04-21T14:27:23.7627221+03:00"
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
  - ".basb/prompts/62-retrieval-refresh.md"
  - ".basb/prompts/61-knowledge-lint.md"
  - ".basb/prompts/70-favorite-problems.md"
  - "vault/log.md"
  - "vault/index.md"
  - "vault/retrieval/catalog.md"
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
6. Run `.basb/prompts/62-retrieval-refresh.md` for the bounded set of high-value notes that changed this week or need retrieval cleanup. Refresh `vault/retrieval/catalog.md`, `question-map.md`, `pattern-index.md`, and `relationship-index.md`.
7. Run `.basb/prompts/61-knowledge-lint.md` across the vault after the retrieval refresh. Include its findings in the weekly review note, with concrete proposed repairs rather than vague flags.
8. Propose note merges, backlink repairs, summary refreshes, and retrieval-layer repairs based on the refreshed retrieval artifacts and lint findings.
9. Update `state/MEMORY.md` if workspace-local conventions changed.
10. Append a concise entry to `vault/log.md` for any meaningful structural change that lands this week.
11. Refresh `vault/index.md` if high-value notes were created, promoted, merged, or archived.
12. Queue uncertain archive moves and unresolved lint findings in `state/review-queue.md`.

# Output Location

Save the result to `vault/weekly/YYYY-MM-DD-weekly-review.md`.

# Tone

Decisive, concrete, and audit-friendly.
