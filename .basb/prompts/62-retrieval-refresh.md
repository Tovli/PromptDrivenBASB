---
title: "BASB Retrieval Refresh"
purpose: "Refresh the derived retrieval layer for a bounded set of compiled notes so search and pattern-finding stay aligned with the vault."
stage: "maintain"
updated_at: "2026-04-21T18:52:14.8991301+03:00"
inputs:
  - "A bounded set of high-value or recently changed compiled notes"
  - "vault/retrieval/catalog.md"
  - "vault/retrieval/question-map.md"
  - "vault/retrieval/pattern-index.md"
  - "vault/retrieval/relationship-index.md"
  - "vault/index.md"
outputs:
  - "Updated retrieval artifacts under vault/retrieval/"
  - "Optional frontmatter repair on compiled notes when a missing canonical_id is obvious"
requires_review_when:
  - "A note needs a canonical_id but the intended stable identity is ambiguous"
  - "A question map entry would rely on weak thematic overlap instead of a real supporting note"
  - "A pattern page would collapse distinct ideas into one noisy summary"
related_docs:
  - ".basb/prompts/11-ingest-source.md"
  - ".basb/prompts/40-express.md"
  - ".basb/prompts/60-weekly-maintenance.md"
  - ".basb/prompts/61-knowledge-lint.md"
  - "vault/retrieval/catalog.md"
  - "vault/retrieval/question-map.md"
  - "vault/retrieval/pattern-index.md"
  - "vault/retrieval/relationship-index.md"
tags:
  - "basb"
  - "prompt"
  - "retrieval"
---
# Goal

Treat retrieval as a derived layer, not as a second knowledge base. Refresh `vault/retrieval/` from the compiled notes that actually changed so the system can find answers by note, question, entity, and pattern without re-reading the whole vault.

# Retrieval Artifacts

- `vault/retrieval/catalog.md` - one compact entry per high-value compiled note
- `vault/retrieval/question-map.md` - durable questions mapped to the notes that answer them
- `vault/retrieval/pattern-index.md` - recurring contradictions, comparisons, timelines, motifs, and cause-and-effect patterns
- `vault/retrieval/relationship-index.md` - compact edges between notes, sources, entities, and questions

# Rules

1. Read the bounded set of compiled notes first. Pull raw sources only if the compiled notes are too thin to support a retrieval entry safely.
2. Do not invent new knowledge in `vault/retrieval/`. Every entry must point back to an existing compiled note or source note.
3. Keep note frontmatter minimal. `canonical_id` is the only retrieval-specific field that belongs on compiled notes. Store aliases, entities, question mappings, and retrieval terms inside `vault/retrieval/`, not in note frontmatter.
4. Prefer a small stable retrieval surface over exhaustive extraction. Skip weak aliases, weak entity groupings, and weak question matches in the derived retrieval files.
5. If a note change is local and low-value, do not refresh the whole retrieval layer. Update only the affected entries.
6. If the refresh exposes structural ambiguity, queue it for `.basb/prompts/61-knowledge-lint.md` or `state/review-queue.md` instead of guessing.

# Refresh Steps

1. For each affected compiled note, confirm or repair `canonical_id` when the stable identity is obvious.
2. Update or insert the note's entry in `vault/retrieval/catalog.md` with the stable id, path, title, aliases, `artifact_kind`, summary, tags, favorite problems, source count, and related note paths needed for search.
3. Update `vault/retrieval/question-map.md` using `favorite_problems`, note titles, summaries, headings, and explicit note content.
4. Update `vault/retrieval/pattern-index.md` for durable comparisons, contradictions, timelines, repeated themes, and causal patterns already supported by the notes.
5. Update `vault/retrieval/relationship-index.md` with compact edges derived from the notes and retrieval artifacts:
   - note -> source
   - note -> note
   - note -> entity
   - note -> question
6. Keep all entries vault-relative and grep-friendly.

# Output Rule

Write directly into `vault/retrieval/`. If nothing in the bounded note set materially changes retrieval, leave the retrieval files untouched and note that no refresh was needed in the calling workflow rather than creating low-value churn.
