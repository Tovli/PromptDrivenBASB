---
title: "Local BASB Soul"
type: "state"
status: "active"
updated_at: "__TIMESTAMP__"
tags:
  - "basb"
  - "soul"
  - "local"
related_docs:
  - ".basb/system/SOUL.md"
  - "state/MEMORY.md"
---
# Purpose

Store workspace-specific BASB behavior additions, preferences, and exceptions that should survive package upgrades.

# Local Preferences

No local soul overrides yet.

# Usage Notes

- Read `.basb/system/SOUL.md` first. This file only carries local additions, not the canonical package rules.
- Keep local entries short and specific to this workspace.
- Prefer adding exceptions or preferences here instead of copying the full system soul.
