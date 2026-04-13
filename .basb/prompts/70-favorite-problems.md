---
title: "BASB Favorite Problems"
purpose: "Compare notes against the user's enduring questions during ingest, weekly maintenance, or on demand, and surface useful matches."
stage: "maintain"
updated_at: "2026-04-13T11:57:59.8014811+03:00"
inputs:
  - "state/favorite-problems.md"
  - "A bounded set of BASB notes: a newly ingested source, a specific compiled note, or the set touched during weekly maintenance"
outputs:
  - "A short match report and optional note frontmatter updates"
requires_review_when:
  - "The match is weak or mostly thematic rather than useful"
  - "A match would require changing more than one compiled note's framing and the user has not confirmed the direction"
related_docs:
  - "state/favorite-problems.md"
  - ".basb/system/MEMORY.md"
  - "state/MEMORY.md"
  - ".basb/prompts/11-ingest-source.md"
  - ".basb/prompts/60-weekly-maintenance.md"
tags:
  - "basb"
  - "prompt"
  - "favorite-problems"
---
# Goal

Use the user's recurring questions as a filter for spotting non-obvious relevance. This prompt is intentionally small and is designed to be called from multiple entry points.

# Invocation Modes

1. **During source ingest** — called from `.basb/prompts/11-ingest-source.md`. Inputs are the newly created source note and any compiled notes it touches. Output is recorded inside the source note's `# Favorite Problem Matches` section and, when a match is genuinely useful, mirrored into the matched compiled note's `favorite_problems` frontmatter.
2. **During weekly maintenance** — called from `.basb/prompts/60-weekly-maintenance.md`. Inputs are the set of notes changed since the last weekly review. Output is part of the weekly review note.
3. **On demand** — called directly by the user against a single note or a small bounded set. Output is returned inline; frontmatter updates only happen on confirmed matches.

# Rules

1. Compare notes to questions, not just keywords.
2. Prefer useful relevance over thematic overlap. If a match only restates the topic, skip it.
3. If a note genuinely fits a favorite problem, update the compiled note's `favorite_problems` frontmatter. For source notes, update the source's `favorite_problems` as well so the provenance is preserved.
4. If the match is weak, leave the note unchanged and do not record a match entry.
5. Never invent favorite problems that are not in `state/favorite-problems.md`.

# Output Pattern

```markdown
# Favorite Problem Matches

- note: vault/resources/example.md
  matched_problem: "<question>"
  why_it_matters: "<short explanation>"
  confidence: 0.0
```

When called during ingest, write the block into the source note. When called during weekly maintenance, write the block into the weekly review. When called on demand, return the block inline.
