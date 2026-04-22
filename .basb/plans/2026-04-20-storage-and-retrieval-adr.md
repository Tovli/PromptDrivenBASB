---
title: "Storage and Retrieval Architecture ADR"
type: "plan"
status: "accepted"
created_at: "2026-04-20T11:37:52.5938077+03:00"
updated_at: "2026-04-21T14:27:23.7627221+03:00"
summary: "Proposes a local-first retrieval layer on top of immutable sources and compiled notes so the knowledge system can search faster, answer from stable syntheses, and surface cross-source patterns without moving to a service-heavy stack."
tags:
  - "adr"
  - "knowledge-system"
  - "storage"
  - "retrieval"
  - "search"
  - "patterns"
related_docs:
  - "BASBGuide.md"
  - "README.md"
  - ".basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md"
  - ".basb/prompts/11-ingest-source.md"
  - ".basb/prompts/40-express.md"
  - ".basb/prompts/61-knowledge-lint.md"
  - ".basb/prompts/62-retrieval-refresh.md"
confidence: 0.93
---
# ADR-2026-04-20-01: Add an Explicit Retrieval Layer for Stored Knowledge

## ADR Metadata

- **ADR ID**: `ADR-2026-04-20-01`
- **Agent ID**: `codex`
- **Task ID**: `2026-04-20-storage-retrieval-improvement`
- **Date**: `2026-04-20T11:37:52.5938077+03:00`
- **Status**: `Accepted`
- **AI Model/Version**: `GPT-5 family via Codex`
- **Confidence Level**: `High`

## Executive Summary

**One-sentence decision summary**: Keep the local-first compiled-wiki model, but add a machine-oriented retrieval layer so stored information is easier to fetch by question, entity, claim, and pattern without repeatedly rediscovering context from raw sources.

## Context & Problem Statement

### Problem Description

The current system already does the hard part of storage well:

- raw source material is preserved as immutable input
- synthesized knowledge is promoted into reusable markdown notes
- index and log files provide human-readable observability
- durable outputs can be persisted back into the knowledge base

That architecture is aligned with the central insight in Andrej Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): the system should compile knowledge once into an evolving wiki instead of rediscovering it at query time.

The gap is retrieval.

Today, the system is stronger at **storing** information than **fetching** it. Retrieval depends on some combination of:

- scanning human-readable index pages
- traversing related-note links
- manually choosing which notes to reopen
- re-reading note bodies to find claims or patterns
- relying on ad hoc search over markdown text

That works at small scale, but degrades as the corpus grows. The main pain points are:

1. **Question-oriented retrieval is weak**: the system stores notes, but not enough query-specific structure for "what do we know about X?" or "what keeps recurring across Y?".
2. **Pattern-finding is implicit**: contradictions, recurring motifs, timelines, and comparisons exist across notes, but are not first-class retrieval artifacts.
3. **The index is human-friendly, not machine-efficient**: it helps browsing, but it is too shallow to serve as a reliable search entry point at larger scale.
4. **Query answers are still partially rediscovered**: even with compiled notes, many answers require reopening several files because the retrieval surface is thin.
5. **Scale pressure pushes toward heavier infrastructure too early**: without a retrieval layer, the next temptation is full RAG or vector infrastructure, even when a local-first solution is still viable.

### Constraints & Requirements

- **Functional Requirements**:
  - Preserve immutable raw sources.
  - Preserve reusable compiled notes as the main knowledge surface.
  - Improve searchability by question, entity, alias, topic, and claim.
  - Make recurring patterns discoverable, not accidental.
  - Keep durable query outputs reusable.
- **Non-Functional Requirements**:
  - Stay local-first and auditable.
  - Keep the source of truth in plain files.
  - Avoid hidden state that cannot be inspected or diffed.
  - Allow incremental adoption without a full rebuild.
- **Technical Constraints**:
  - Prefer markdown and generated local artifacts over service-heavy infrastructure.
  - Do not require a database or hosted search service as the default path.
  - Keep retrieval artifacts derived from notes, not parallel hand-maintained truth.
- **Business Constraints**:
  - The system must remain easy to operate by one person.
  - Maintenance cost must stay lower than the value the system creates.

### Triggering Event

This ADR was triggered by comparing the repository's current compiled-wiki approach against Karpathy's LLM Wiki pattern and recognizing that the storage model is already mostly correct, while the next leverage point is retrieval and pattern discovery.

## Decision Drivers & Criteria

### Primary Decision Factors

1. Retrieval quality for real questions
2. Pattern and contradiction discovery
3. Local-first simplicity
4. Auditability and inspectability
5. Incremental implementation cost

### Evaluation Criteria & Weights

| Criteria | Weight (1-10) | Description |
|----------|---------------|-------------|
| Retrieval precision | 10 | How reliably the system narrows to the right notes fast |
| Pattern discovery | 9 | How well the system exposes recurring structures across notes |
| Local-first fit | 9 | How well the design preserves file-based, inspectable operation |
| Auditability | 8 | How easy it is to understand and verify what changed |
| Incremental adoption | 8 | How safely the design can be added without a rewrite |

## Options Considered

### Option 1: Keep the current compiled-wiki model with only index, log, and note links

- **Description**: Continue using immutable sources, compiled notes, `index.md`, `log.md`, backlinks, and manual search as the full retrieval strategy.
- **Pros**:
  - Minimal complexity
  - No new generated artifacts
  - Fully human-readable
- **Cons**:
  - Retrieval quality will degrade with scale
  - Pattern detection remains mostly manual
  - Query answers keep depending on re-reading many notes
- **Cost/Effort**: `Low`
- **Risk Level**: `Medium`

### Option 2: Move to a full RAG or vector-database retrieval stack

- **Description**: Treat embeddings, semantic chunk search, and re-ranking as the primary retrieval path over sources and notes.
- **Pros**:
  - Strong recall at larger scale
  - Useful for fuzzy semantic search
  - Can surface related material that exact text search misses
- **Cons**:
  - Adds hidden state and operational complexity
  - Encourages query-time rediscovery instead of persistent knowledge compilation
  - Harder to audit and reason about than plain files
- **Cost/Effort**: `High`
- **Risk Level**: `High`

### Option 3: Add a local-first retrieval layer on top of immutable sources and compiled notes

- **Description**: Keep the compiled-wiki model, but generate machine-oriented retrieval artifacts from it: richer catalog entries, question maps, pattern pages, and optional local search tooling.
- **Pros**:
  - Improves retrieval without abandoning local files
  - Makes patterns and contradictions first-class outputs
  - Preserves compiled notes as the main knowledge interface
  - Can later support a local search tool without changing the core model
- **Cons**:
  - Adds one more derived layer to maintain
  - Requires drift checks between note bodies and retrieval artifacts
  - Needs discipline to avoid metadata sprawl
- **Cost/Effort**: `Medium`
- **Risk Level**: `Medium`

## Decision

### Chosen Option

**Selected**: `Option 3 - Add a local-first retrieval layer on top of immutable sources and compiled notes`

### Rationale

This option best fits the system's actual maturity level.

The current design already matches Karpathy's core storage pattern:

- immutable raw sources
- an LLM-maintained compiled layer
- a schema that tells the agent how to maintain the system

What is missing is not "better storage" in the raw sense. It is a stronger **retrieval plane** between the compiled notes and the user's questions.

Option 1 leaves the system underpowered exactly where growth will hurt most: search, navigation, and pattern detection. Option 2 overcorrects too early by introducing infrastructure that is harder to inspect and pushes the system back toward query-time reconstruction. Option 3 preserves the compiled-wiki philosophy while making retrieval deliberate and scalable.

The key trade-off is accepting a new class of generated artifacts. That is worth it because those artifacts are derived, inspectable, and replace repeated cognitive work with stable retrieval structure.

### Decision Matrix

| Option | Retrieval precision | Pattern discovery | Local-first fit | Auditability | Incremental adoption | Weighted Total |
|--------|---------------------|-------------------|-----------------|--------------|----------------------|----------------|
| Option 1 | 2 | 2 | 5 | 5 | 5 | 120 |
| Option 2 | 5 | 4 | 2 | 2 | 2 | 111 |
| **Option 3** | **4** | **5** | **5** | **4** | **4** | **169** |

## Implementation Details

### Technical Approach

Adopt a three-layer knowledge architecture:

1. **Raw Sources**
   Immutable source material. This remains the source of truth.

2. **Compiled Knowledge**
   Reusable markdown notes that integrate multiple sources into stable summaries, entity pages, comparisons, timelines, and syntheses.

3. **Retrieval Artifacts**
   Generated, machine-friendly assets that make the compiled knowledge easy to search and traverse.

The retrieval layer should stay derived from the compiled notes and sources. It must never become an independent truth store.

### Retrieval Artifacts to Introduce

1. **Catalog manifest**
   One entry per compiled note with fields such as stable id, title, path, artifact kind, summary, main entities, main questions, source count, last updated, and related note ids.

2. **Question map**
   A generated map from durable questions to relevant notes, comparisons, and syntheses. This gives the system a direct way to answer "what do we know about this question?" without scanning the full corpus.

3. **Pattern index**
   Generated artifacts for recurring structures such as:
   - contradictions
   - repeated themes
   - timelines
   - comparisons
   - cause-and-effect patterns

4. **Relationship index**
   A compact representation of links between sources, compiled notes, entities, and questions so the system can navigate by edges instead of only by folders.

5. **Query log for durable findings**
   Durable question-driven outputs that reveal a new synthesis or recurring pattern should be saved back into the compiled layer and linked from the question map and pattern index.

### Minimal Note Metadata Additions

Do not overload frontmatter with every possible extraction. Add only the fields that materially improve retrieval:

- `canonical_id`

Everything else should stay in the note body or in generated retrieval artifacts. Aliases, entities, question mappings, and retrieval terms belong to the derived retrieval layer, not to compiled-note frontmatter.

### Query Flow

1. Search the catalog manifest by question, alias, entity, or retrieval term.
2. Narrow to a small set of candidate compiled notes.
3. Read only those notes first.
4. Open raw sources only when the compiled notes lack enough evidence.
5. If the answer creates durable value, persist it back as a compiled note and update the retrieval artifacts.

### Search Tooling

Start simple:

- generated markdown or JSONL manifests
- local grep or a small search script

If scale later demands better search, add an **optional** local tool such as the `qmd` pattern mentioned in the LLM Wiki gist: hybrid local search over markdown with no required hosted service. Search tooling should strengthen the retrieval layer, not replace the compiled knowledge model.

### Drift Control

Because the retrieval layer is derived data, it must be linted:

- catalog entry exists for every high-value compiled note
- canonical ids resolve consistently and point to real compiled notes
- question maps point to existing notes
- pattern pages cite real notes and sources
- durable answers are linked back to their inputs

## Architecture & Design Impact

### Current Architecture State

The current system effectively has:

- immutable sources
- compiled markdown notes
- a human-readable index and chronological log

This is a strong storage model, but retrieval is still mostly note-centric and manual.

### Proposed Architecture Changes

Conceptually, the architecture becomes:

```text
raw/                 immutable sources
wiki/                compiled notes
retrieval/
  catalog            note manifest
  questions          durable question-to-note map
  patterns           contradictions, comparisons, timelines, motifs
  relationships      compact edge index
```

The exact folder names can vary. The decision is architectural, not path-specific.

### Architecture Patterns Affected

- **Compiled wiki**: enhanced
- **Index-and-log navigation**: expanded into richer retrieval artifacts
- **Query-time synthesis**: narrowed to targeted note sets instead of broad rediscovery

## Consequences & Impact Analysis

### Positive Consequences

- Search becomes faster and more reliable because the system has a retrieval surface designed for questions, not only for browsing.
- Pattern discovery becomes explicit, allowing contradictions, comparisons, and recurring motifs to accumulate as reusable assets.
- The system stays local-first and inspectable while delaying or avoiding premature RAG infrastructure.

### Negative Consequences/Risks

- More generated artifacts means more opportunities for drift.
  - *Mitigation*: treat retrieval files as derived outputs and lint them regularly.
- Too much metadata can make notes worse instead of better.
  - *Mitigation*: keep frontmatter minimal and push richer structure into generated artifacts.
- Pattern pages can become low-signal noise if every weak connection is persisted.
  - *Mitigation*: persist only durable, decision-relevant, or repeatedly useful patterns.

### Impact Assessment

| Area | Impact Level | Description |
|------|-------------|-------------|
| Performance | Medium | Query-time work drops because candidate selection gets narrower |
| Security | None | No new external service is required by default |
| Maintainability | Medium | More generated artifacts exist, but they are structured and lintable |
| Scalability | High | The design scales beyond simple manual browsing |
| Cost | Low | The initial path stays file-based and local |
| Team Productivity | Medium | Retrieval becomes more repeatable and less dependent on memory |

## Validation & Monitoring

### Success Metrics

- **Metric 1**: Most common questions can be answered by opening a small, bounded set of compiled notes.
  - Measurement method: sample recurring questions and count how many files must be opened.
- **Metric 2**: High-value notes appear in the catalog and at least one question map or pattern index where relevant.
  - Measurement method: lint report over retrieval coverage.
- **Metric 3**: Durable answers increasingly originate from compiled notes first, not raw sources first.
  - Measurement method: audit a sample of recent query outputs.

### Monitoring Plan

- **Monitoring Tools**: knowledge lint plus lightweight retrieval-coverage checks
- **Review Schedule**: after the first prototype, then periodically as the corpus grows
- **Key Indicators**:
  - users still need to scan many notes for simple questions
  - pattern pages are not being reused
  - catalog entries drift from the notes they summarize

### Rollback Plan

If the retrieval layer proves too noisy, keep raw sources and compiled notes as-is, stop generating retrieval artifacts, and retain only the parts that directly improved question answering.

## Agent Reasoning Chain

### Decision-Making Process

1. **Analysis Phase**: reviewed the external LLM Wiki pattern and compared it to the repository's current compiled-wiki design.
2. **Option Generation**: identified the practical choices as status quo, full RAG, or a local retrieval layer.
3. **Evaluation Phase**: compared those options against retrieval quality, pattern discovery, local-first fit, auditability, and incremental cost.
4. **Selection Logic**: chose the smallest architectural change that materially improves retrieval without abandoning the current strengths of the system.

### Tools & Resources Used

- External reference: Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- External reference: Chris Royse's [ADR template](https://github.com/ChrisRoyse/UsefulPrompts/blob/main/ADR.md)
- Local references: `BASBGuide.md`, `README.md`, `.basb/prompts/11-ingest-source.md`, `.basb/prompts/40-express.md`, `.basb/prompts/61-knowledge-lint.md`

### Knowledge Sources Consulted

- **LLM Wiki gist**: reinforced the compiled-wiki pattern, the role of index/log, and the idea that search tooling should be optional and local-first.
- **ADR template**: provided the structure for documenting the decision.
- **Local repository docs and prompts**: showed that storage and provenance are already strong, while retrieval remains the missing layer.

## Follow-up Actions

### Immediate Next Steps

- [ ] Prototype a minimal catalog manifest and question map for a small set of notes.
- [ ] Decide the smallest stable metadata additions needed for retrieval.
- [ ] Add lint checks for retrieval drift before introducing any optional search tool.

### Future Considerations

- Evaluate whether a local markdown search tool is justified once the corpus is large enough.
- Consider generating canonical comparison or contradiction pages automatically when the same pattern recurs multiple times.

### Related ADRs

- `.basb/plans/2026-04-13-compiled-wiki-basb-upgrade.md`: established immutable sources plus compiled notes; this ADR proposes the next retrieval-focused layer on top.

## Approval & Review

### Stakeholders Consulted

- Repository architecture and prompt-pack conventions
- External architectural reference material

### Human Review Required

`Yes`

### Review Status

- **Technical Review**: `Pending`
- **Security Review**: `N/A`
- **Architecture Review**: `Pending`
