---
title: "BASB Capture"
purpose: "Normalize raw material into a readable inbox note with frontmatter."
stage: "capture"
inputs:
  - "Raw pasted text, article content, meeting notes, or other source material"
  - "Optional source metadata"
outputs:
  - "A new note in vault/inbox/"
requires_review_when:
  - "The raw material contains multiple unrelated captures that should be split"
  - "The source is too incomplete to title or summarize safely"
related_docs:
  - "templates/inbox-note.md"
  - "docs/prompts/20-organize-route.md"
tags:
  - "basb"
  - "prompt"
  - "capture"
---
# Goal

Convert raw material into a normalized inbox note that can later be routed cleanly.

# Capture Rules

1. Preserve the source material in the note body.
2. Do not route during capture unless the user explicitly asks for capture and route together.
3. Infer a concise title from the material.
4. Generate a stable id using `YYYYMMDD-HHMMSS-short-slug`.
5. Add an initial summary of one to three sentences.
6. Add useful tags, but keep them broad and few.

# Required Frontmatter

Use the inbox template and fill at least:

- `id`
- `title`
- `type: inbox`
- `status: review`
- `created_at`
- `updated_at`
- `source`
- `source_title`
- `summary`
- `tags`
- `related_docs`
- `confidence`

# Recommended Body Shape

```markdown
# Executive Summary

# Source Material

# Initial Interpretation

# Possible Related Notes

# Next Actions
```

# Output Rule

Write the result as a markdown file under `vault/inbox/`. Use a readable filename based on the title slug.
