---
title: "Review Queue"
type: "state"
status: "active"
updated_at: "__TIMESTAMP__"
tags:
  - "basb"
  - "review-queue"
related_docs:
  - "state/SOUL.md"
  - ".basb/prompts/21-human-review.md"
---
# Pending Items

No queued items yet.

# Entry Template

```markdown
- timestamp: __TIMESTAMP__
  note: vault/inbox/example-note.md
  reason: The material appears split between an active project and a long-term resource.
  options:
    - Route to `vault/projects/...`
    - Route to `vault/resources/...`
  preferred_action: Route to `vault/projects/...` if the user plans to act on it this week.
  requested_user_input: Confirm the next intended use.
```
