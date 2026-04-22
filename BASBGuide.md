# **System Architecture and Implementation Guide for an Agentic Second Brain**

> Reference use only: treat this guide as architectural background, not default runtime context.
> Read it when the task is BASB-system maintenance, prompt design, package-maintainer work, or architecture review.

## **Package Implementation Note**

This guide is architectural background. It surveys how an agentic second brain *could* be built, including service-heavy, database-backed, and vector-search-heavy approaches. **This package does not implement those.** `prompt-driven-basb` is deliberately local-first and file-based: prompts, templates, and markdown files only. Do not read this guide as a roadmap toward services, MCP integration, vector databases, schedulers, or background daemons.

Concretely, the package implements the compiled-wiki slice of the architecture:

- **Immutable sources** are preserved verbatim in `vault/sources/` (an operational provenance layer, not a fifth P.A.R.A. category).
- **Compiled notes** live in `vault/projects/`, `vault/areas/`, `vault/resources/`, `vault/archives/` with `artifact_kind` and provenance frontmatter that link back to source notes.
- **Retrieval artifacts** live under `vault/retrieval/` as file-based support assets: catalog, question map, pattern index, and relationship index.
- **Ingest, distill, express, and maintenance** are prompt-driven (`.basb/prompts/10-capture.md`, `11-ingest-source.md`, `30-32` distill chain, `40-express.md`, `60-weekly-maintenance.md`, `61-knowledge-lint.md`).
- **System observability** is the package-owned catalog `vault/index.md` and the append-only `vault/log.md`.

Where the guide below mentions embedding similarity, protocol servers, relational backends, background scans, or autonomous daemons, read those as descriptions of alternative architectures that deliberately fall outside this package's scope. See the "Compiled-Wiki Implementation in This Package" section at the end of this document for the mapping that *is* shipped.

## **The Paradigm Shift in Personal Knowledge Management**

The modern digital ecosystem is characterized by an overwhelming, relentless influx of information, a phenomenon that routinely leads to cognitive fatigue, decision paralysis, and systemic information overload. Traditional personal knowledge management practices have historically exacerbated this problem by relying on rigid, highly nested, academic-style categorization structures. These legacy systems demand significant manual maintenance and cognitive overhead, effectively forcing the user to act as a full-time librarian rather than a strategic thinker. The "Building a Second Brain" methodology, originally pioneered by Tiago Forte, offers a structural counter-approach: a system designed entirely around immediate actionability rather than topical taxonomy, allowing the biological brain to focus exclusively on high-level cognitive tasks such as complex decision-making and creative synthesis while offloading memory storage to a trusted technological counterpart.

With the rapid maturation of autonomous Large Language Model agents, this methodology can now be elevated from a passive digital repository to an active, autonomous cognitive assistant. The year 2025 marked a definitive turning point, proclaimed by industry analysts as the year of the AI agent, wherein models transitioned from simple text-based conversational interfaces to systems capable of autonomously executing complex, open-ended tasks across multiple applications. By mathematically encoding the methodology into an artificial intelligence agent's system prompt and architectural design, the system transforms from a static filing cabinet into a dynamic, autonomous research partner.

This comprehensive research report delineates the technical, architectural, and prompt-engineering requirements necessary to construct an AI agent capable of autonomously executing this methodology. It is specifically designed to serve as the foundational architectural blueprint and logic framework for programming an agent that organizes data according to the Capture, Organize, Distill, and Express workflow and the Projects, Areas, Resources, and Archives categorization model. The implementation of such a system requires moving beyond rudimentary prompt engineering into the realms of rigorous context engineering, stateless agent architecture, deterministic structured outputs, and semantic vector routing.

## **Transposing Methodological Frameworks to Machine Logic**

To engineer an artificial intelligence agent that accurately and autonomously manages a personal knowledge base, the agent must fundamentally comprehend the heuristic models that govern information value within this specific methodology. The system operates on two primary intersecting axes: the workflow axis, which dictates the temporal movement of information, and the structural axis, which dictates the spatial categorization of information.

### **The Workflow Axis: Algorithmic Implementation of C.O.D.E.**

The operational method for moving information through the digital knowledge base is defined by a four-step framework: Capture, Organize, Distill, and Express. For an autonomous agent to execute this framework, it must possess specific tools, integration hooks, and system instructions mapped directly to these stages.

The initial phase, Capture, requires the agent to monitor a designated digital inbox or webhook where unstructured data is deposited from diverse external sources. This data may include web clippings extracted via browser extensions, automated voice transcripts, forwarded emails, or raw PDF documents. The agent's primary function in this phase is to normalize the incoming data stream, stripping away extraneous formatting artifacts, extracting raw text, and appending preliminary ingestion metadata such as timestamps and source URLs before depositing the clean data into a staging environment.

Following ingestion, the agent initiates the Organize phase. Here, the agent evaluates the normalized data and routes it to the appropriate semantic location within the personal knowledge base. This routing is not based on the subject matter of the text, but rather on its strict structural actionability, requiring the agent to utilize complex decision trees and classification algorithms to determine the item's operational utility.

The Distill phase is perhaps the most computationally intensive aspect of the workflow, involving the systematic condensation of long-form notes into progressive summaries. The agent is instructed to algorithmically highlight key concepts and generate concise executive overviews, utilizing natural language processing to extract the core thesis of a document. This continuous background processing ensures that when the user eventually accesses the information, they can comprehend the material at maximum velocity without needing to reread the source text.

Finally, the Express phase represents the generative output capability of the agent. The system synthesizes the stored, distilled insights to actively assist the user in producing meaningful creative output. By utilizing retrieval-augmented generation techniques, the agent can pull disparate concepts from the knowledge base to draft reports, structure arguments, or formulate strategic plans, thereby completing the lifecycle from raw data to applied knowledge.

### **The Structural Axis: Enforcing P.A.R.A. Categorization**

The categorization methodology asserts that all digital information can and must be classified into four mutually exclusive categories based entirely on its actionability and temporal relevance. The historical failure of legacy organizational systems is their reliance on incredibly broad, academic subjects like psychology, business, or marketing. These semantic groupings make zero sense in a post-academic, outcome-oriented workflow. The artificial intelligence agent must be programmed to ruthlessly enforce action-based categorization, utilizing the core diagnostic question: "How and when will the user use this information next?".

| Categorization Tier | Algorithmic Definition | Temporal Horizon | Agent Routing and Maintenance Logic |
| :---- | :---- | :---- | :---- |
| **Projects** | Active work streams defined by a specific, measurable goal and a strict temporal deadline. | Short-term (Days to Months) | Triggered by tasks requiring immediate execution. The agent tracks deadlines and automatically alerts the user if project activity stagnates. Upon deadline passage or completion confirmation, the agent autonomously migrates the folder to the archive. |
| **Areas** | Ongoing spheres of professional or personal responsibility that require continuous maintenance over time but inherently lack a definitive end date. | Long-term (Continuous) | Each area is assigned a specific review cadence (e.g., weekly, quarterly). The agent tracks these temporal cadences via metadata and flags lapsed areas on a centralized dashboard, demanding a user review to maintain system integrity. |
| **Resources** | Reference materials, topics of interest, or research data that possess potential utility for future endeavors but are not currently tied to an active project or area. | Indefinite (Future Utility) | Cataloged using broad and specific semantic tags, extracted metadata, and continuous embedding vectors for future semantic search. The agent cross-references these against the user's defined favorite problems. |
| **Archives** | Inactive items, including successfully completed projects, discontinued areas of responsibility, or outdated resources that no longer serve immediate utility. | Inactive (Historical Record) | Moved automatically to reduce active system clutter. While structurally segregated to prevent cognitive overload, the agent maintains active vector indexes of archived material, allowing it to surface historical insights if they become relevant to current queries. |

If the organizational system becomes as complex as the user's life, the cognitive demands of maintaining it will ultimately rob the user of the time and energy the system was designed to save. Therefore, the agent acts as the ruthless gatekeeper of this structural simplicity, preventing the proliferation of unstructured data by utilizing strict decision trees and classification routers.

## **Architectural Principles of the Knowledge Agent**

Constructing an artificial intelligence agent that operates autonomously over a deeply personal knowledge base requires moving far beyond simple conversational prompt interfaces. Modern, production-grade artificial intelligence applications demand adherence to sophisticated software engineering paradigms, most notably the principles outlined in the twelve-factor agent framework. Relying on a monolithic agent that loops endlessly with a massive bag of tools is an anti-pattern that leads to hallucination, task confusion, and systemic failure.

### **Modularity and Stateless Execution**

A robust personal knowledge management agent must be designed as a stateless reducer, executing highly modular operations. Rather than deploying a single, mega-agent that attempts to simultaneously capture, route, summarize, and retrieve information, the architecture must consist of small, highly focused sub-agents. One specifically fine-tuned agent is responsible solely for determining user intent from the raw input. A secondary agent performs vector-based semantic search over the document repository. A third agent is responsible exclusively for executing progressive summarization algorithms on the retrieved results. This modularity isolates complexity and allows developers to utilize cost-effective, smaller models for routine categorization tasks while reserving expensive, high-parameter models for complex reasoning and synthesis.

Furthermore, every action the agent takes—whether updating metadata, moving a file from an active project to the archive, or appending a newly generated summary to a note—must be recorded in a unified execution log. This unification of execution state and business state guarantees that the agent's actions are entirely transparent and reproducible. The user must be able to audit the system's decisions retroactively to understand why a specific categorization choice was made.

Because the ingestion of knowledge is a continuous, asynchronous process, the agentic workflow must support robust launch, pause, and resume capabilities via simple application programming interfaces. If the agent is processing a large batch of newly captured academic papers, it must possess the capability to pause its execution queue, request human clarification for ambiguous, edge-case items through explicit tool calls, and seamlessly resume operations once the user has provided the necessary direction. This human-in-the-loop fallback mechanism is critical for maintaining high data integrity and preventing cascading categorization errors.

### **The Context Engineering Imperative**

A critical and frequently misunderstood failure point in agent design is the mismanagement of the language model's context window. As the agent continuously interacts with thousands of files, external databases, and growing conversational histories, the context window rapidly approaches maximum capacity. The model does not inherently lose its underlying intelligence, but poor context management drastically degrades its precision for information retrieval, forces it to ignore explicit system instructions, and impairs its long-range reasoning capabilities. The practice of context engineering—the rigorous curation of exactly what information is passed to the model during inference—is therefore essential to ensure the highest possible signal-to-noise ratio within the strict token limits.

The implementation of a programmatic context budget calculator is a mandatory architectural requirement. Utilizing tokenization libraries, the system backend must dynamically calculate the token weight of the master system prompt, the injected tool definitions, the retrieved documents, and the active conversational history before any application programming interface request is dispatched. Industry benchmarks suggest a strict operational threshold: if the context window exceeds a sixty percent saturation level prior to the injection of the user's current message, the system is at severe risk of context degradation and hallucination.

To optimize utility and adhere to this budget, the architecture must deploy a sliding window with automated summarization. Instead of feeding the entire verbatim conversational history or the full text of previous agent actions into the current prompt, the system retains only the last sequence of turns (for example, the last six interactions) in their raw state to maintain immediate coherence. All prior interactions are systematically compressed via a secondary, highly efficient model into a dense, ongoing summary. This summary actively preserves critical decisions, user preferences, retrieved data points, and unresolved tasks, effectively reducing massive historical token consumption from tens of thousands of tokens to a manageable fraction, saving both computational cost and valuable window space.

### **Relevance Scoring and Dynamic Tool Injection**

When the agent attempts to retrieve knowledge to assist the user, dumping all retrieved document chunks indiscriminately into the context window is highly inefficient. Instead, documents must be algorithmically filtered by rigorous relevance scoring. This involves calculating embedding similarity using cosine distance, applying recency weighting to prioritize fresh data, and assigning source priority metrics (for instance, weighting a primary research document higher than a clipped blog post). The system applies a strict relevance threshold, dropping any data chunks that fall below the cutoff, and extracts only the specific relevant paragraphs rather than the full-text documents.

Furthermore, the definitions of the tools themselves consume significant token budgets. Defining a dozen different capabilities—such as creating projects, archiving resources, updating temporal metadata, or executing web searches—can easily consume thousands of tokens and dilute the model's attention. The architecture must utilize dynamic tool injection, wherein a lightweight router or classifier model predicts which specific functional tools are required for the immediate task based on the intent of the prompt. Only that targeted subset of tools is injected into the primary agent's context window, preserving cognitive space for reasoning and synthesis.

## **The Routing Engine and Categorization Logic**

The foundational, high-frequency task of the agent is the intake, evaluation, and classification of unstructured information into the strict four-part categorization structure. This represents a highly complex classification problem that demands highly constrained language model outputs. Relying on standard prompting techniques for file routing invariably results in schema drift, a phenomenon where the model generates beautifully formatted, human-readable prose that completely fails to be parsed by the downstream programmatic logic governing the file system.

### **Enforcing Strict Structured Outputs**

To guarantee absolute operational stability, the routing agent must be mathematically constrained to produce outputs that adhere strictly to predefined JSON schemas. When evaluating a newly captured note, the LLM router determines the destination based on the actionability parameters defined by the methodology. By utilizing an API-level contract for structured outputs—which is distinctly different and more rigid than standard "JSON mode"—the model is forced at generation time to produce valid, type-consistent structures. This protocol effectively eliminates regular expression parsing failures, unexpected type inconsistencies, and misrouted data.

The routing schema for the categorization agent acts as a constrained probability distribution over the allowed classification keys and their enumerated values. The implementation of this schema requires explicit definitions of properties, types, and descriptions to guide the model's generation.

| Schema Property | Data Type | Algorithmic Function and Constraint |
| :---- | :---- | :---- |
| classification | String (Enum) | Strictly limited to the values: \`\`. This enforces the core methodology and prevents the model from inventing new, unsanctioned categories. |
| destination\_path | String | The explicit file path or database relation identifying the exact subfolder or table where the data should reside based on the classification. |
| semantic\_tags | Array of Strings | An array of extracted topics, keywords, and broad categories to facilitate future retrieval and clustering. |
| actionability\_summary | String | A concise justification explaining exactly why the item was placed in its respective category based on its intended future use. |
| confidence\_score | Number | A self-evaluated probability score ranging from 0 to 1 indicating the model's certainty regarding its categorization choice. |
| requires\_human\_review | Boolean | A logical flag triggered if the confidence\_score falls below a predefined threshold, automatically pausing execution and prompting the user for intervention. |

By strictly enforcing this schema, the output is guaranteed to be entirely machine-readable. The backend workflow logic can then intercept this JSON object and execute the appropriate file movement or database update seamlessly. If the model encounters an edge case—such as a piece of information that seems to bridge an active project and a long-term area of responsibility—and outputs a low confidence score, the system gracefully degrading to human-in-the-loop verification prevents the corruption of the knowledge base's organizational integrity.

### **The Twelve Favorite Problems as a Routing Heuristic**

Beyond standard categorization, the methodology strongly advocates for the cultivation and maintenance of the "Twelve Favorite Problems." Inspired by the theoretical physicist Richard Feynman, these are open-ended, continuous inquiries that serve as intellectual filters for capturing information. Examples might include complex questions such as "How can biological computing models improve artificial neural networks?" or "What are the emerging trends in automated macroeconomic forecasting?".

In an autonomous agentic system, these twelve questions act as persistent semantic vectors for advanced information routing and discovery. Instead of relying solely on keyword matching, the agent utilizes vector embeddings to continuously compute the mathematical similarity between newly captured documents and the matrix of the twelve favorite problems. When a document is ingested, it is passed through an embedding model to generate a high-dimensional vector representation. The agent then calculates the cosine similarity between this document vector and the embedding vectors representing each of the user's favorite problems.

If the similarity score for a specific problem exceeds a highly tuned threshold, the agent autonomously tags the document with the corresponding problem ID and updates the metadata record. This automated cross-referencing enables the system to uncover hidden relationships and surface highly relevant information across completely disparate semantic domains. This function realizes the ultimate promise of an artificial second brain: synthesizing novel insights, generating interdisciplinary connections, and identifying patterns that the biological human brain, constrained by limited working memory, would inevitably overlook.

## **Information Distillation and Progressive Summarization**

The Distillation component of the workflow dictates that stored information must be systematically condensed to increase its future utility and decrease the friction of retrieval. The methodology employs a technique known as "Progressive Summarization," a highly specific, layered approach to analyzing, highlighting, and summarizing text. An artificial intelligence agent is uniquely equipped to automate the transition between these intricate layers, drastically accelerating the speed at which a user can process complex research materials.

The goal of progressive summarization is not to rewrite the text, but to create an ultra-condensed path through the document, allowing the future self to grasp the core arguments in seconds rather than minutes. The agent must be programmed to execute this distillation across four distinct layers of increasing compression.

| Summarization Tier | Technical Description | Agent Execution Protocol |
| :---- | :---- | :---- |
| **Layer 1: Source Material** | The raw, captured text of the note, article, or document in its entirety. | The agent ingests the raw data stream, strips non-essential formatting artifacts (e.g., HTML tags, advertisements), standardizes the text encoding, and saves it to the designated capture inbox. |
| **Layer 2: Key Concept Bolding** | Critical points, phrases, and sentences are bolded to visually isolate the most important concepts from the surrounding context. | The agent executes a targeted prompt instructing it to identify and bold the core arguments, empirical data points, and thesis statements without altering or removing any of the original surrounding text structure. |
| **Layer 3: Highlighting the Core** | The best of the previously bolded points are highlighted, creating the most condensed navigational path through the material. | The agent evaluates exclusively the text that was bolded in Layer 2, selecting only the most paradigm-shifting or highly relevant sentences, and wraps them in semantic highlighting syntax (e.g., \==highlight== or \<mark\>). |
| **Layer 4: Executive Synthesis** | A brief, original synthesis written autonomously at the top of the note, summarizing the entire document into actionable bullet points. | The agent analyzes the Layer 3 highlights to generate a highly structured summary (typically 3-4 bullet points, key takeaways, and potential action items) and prepends it to the document's metadata block. |

To achieve this nuanced distillation reliably, the agent architecture must employ a technique known as instruction layering within its prompt designs. A robust, three-tier prompt system guarantees consistent results by explicitly forcing clarity where generative models typically become fuzzy. The prompt template must explicitly define the Context (establishing the agent's persona as an academic researcher and defining the exact input data), the Task (execute Layer 4 progressive summarization), and the Constraints (the output format must be strict markdown, must adhere to a specific word count limit, must avoid certain anti-goals, and must explicitly formulate catalyzing questions based on the content).

Furthermore, to maintain the highest quality control, the system employs prompt chaining. Instead of asking a single agent to perform all four layers simultaneously—which frequently leads to omitted details and hallucination—the output of the Layer 2 summarization agent becomes the direct, isolated input for the Layer 3 summarization agent. This creates a logical chain of dependencies, mimicking the meticulous, step-by-step analytical process of a human researcher and significantly enhancing the quality and reliability of the final executive synthesis.

## **Infrastructure Integration: Markdown versus Relational Databases**

The operational effectiveness of an autonomous artificial intelligence agent is inextricably linked to the quality, accessibility, and structure of the underlying data repository. Personal knowledge management systems generally fall into two dominant architectural paradigms: local, graph-based, plain-text markdown models (such as Obsidian) and cloud-based, relational database-centric models (such as Notion). The integration strategies for deploying an agent differ significantly depending on the chosen infrastructure.

### **The Plain-Text Markdown Paradigm**

Local-first, plain-text markdown systems have emerged as highly optimal environments for agentic integration. Because the entire knowledge base exists as a collection of raw text files on a local file system, they are natively readable and writable by artificial intelligence coding agents and language models without requiring complex application programming interface conversion layers or battling proprietary vendor lock-in.

In a markdown-centric architecture, memory and state management are handled directly within the file system itself. Developers instantiate specific, structured files to govern the agent's behavior. A centralized MEMORY.md file grants the agent read and write access to maintain its ongoing operational state and record task progression. Daily log files, formatted temporally (e.g., YYYY-MM-DD.md), establish a chronological context matrix. Most importantly, a SOUL.md file is established to explicitly encode the agent's core values, operational constraints, methodology rules, and personality parameters.

This plain-text approach ensures that the agent's entire context is easily auditable via basic command-line search utilities, providing maximum transparency and control over the knowledge network. Tool vendors are actively embracing this ecosystem, creating dedicated skill packages that allow agents to seamlessly integrate with local plugins, manipulate canvas visualizations, and interact natively with the vault's graph structure.

### **Relational Database Paradigms and the Model Context Protocol**

Conversely, cloud-based tools offer highly structured, relational database capabilities that excel in team environments, complex metadata management, and synchronized collaboration. To integrate an autonomous agent with this architecture, a standardized communication layer is required to bridge the gap between the model's reasoning capabilities and the platform's proprietary infrastructure.

This integration is typically achieved utilizing a Model Context Protocol server. The protocol server acts as a high-performance backend logic layer, enabling the agent to interact seamlessly with external databases through a standardized, secure methodology. Through this protocol, the agent is granted the capability to execute complex queries, list active directories, dynamically read page contents, and autonomously create or update pages with rich text formatting across the entire workspace.

Regardless of whether the underlying infrastructure is local markdown or cloud relational, the agent requires a rigorous, standardized metadata layer to function autonomously. Metadata schemas—such as those implemented in modern governance frameworks—track ingestion events, trace operational statuses, and link execution parameters to their data origins. By injecting consistent, structured metadata into every document (for example, programmatically defining fields such as status: active, review\_cadence: weekly, and linked\_projects:), the agent can effortlessly perform complex grouping, filtering, and cross-referencing operations without needing to scan the full text of the documents.

## **The Master System Prompt Architecture**

The system prompt serves as the foundational operating system of the artificial intelligence agent. It must be engineered with absolute clarity, leveraging explicit tagging mechanisms such as XML blocks or markdown headers to rigidly delineate sections and eliminate semantic ambiguity. A production-grade system prompt for a methodology-aligned knowledge management agent cannot rely on a single, monolithic paragraph of instructions. It must be a highly structured hierarchy that establishes identity, mathematically outlines the workflow frameworks, dictates strict output schemas, and provides granular tool guidance.

The following establishes the requisite architectural structure for constructing the master system prompt:

### **Section 1: Persona Definition and Objective Alignment**

The prompt must immediately and unequivocally establish the agent's persona. It must define the agent as a master specialist in personal knowledge management, expert in efficiently synthesizing and processing high volumes of complex information. The primary objective must be explicitly stated: to maximize the retention, actionability, and application of the user's digital information ecosystem while minimizing the user's cognitive load.

### **Section 2: Methodological Constraints and Logic Trees**

The agent must be explicitly taught the rigorous definitions and boundary conditions of the categorization methodology. The prompt must encode the decision-making heuristics for routing:

* Projects must definitively contain an actionable goal and a hard temporal deadline.  
* Areas must definitively contain a continuous standard to be maintained and an associated review cadence.  
* Resources must be strictly categorized by ongoing interest or topical relevance.  
* Archives must be reserved exclusively for inactive, deprecated, or completed items. The prompt must detail the agent's responsibilities across the workflow lifecycle, specifically detailing the automated parsing, structuring, distilling, and expressing functions permitted at each temporal stage.

### **Section 3: Operational Tool Guidance and State Management**

Artificial intelligence agents operate efficiently only when they perfectly understand the boundaries, expected inputs, and expected outputs of their available toolset. The prompt must provide exhaustive, explicit instructions on how to properly invoke filesystem operations, interact with the protocol servers, or execute database application programming interface calls. It must mandate that all actions, without exception, must be logged in the unified execution state tracker to maintain total systemic transparency and auditability.

### **Section 4: Formatting Directives and Output Specifications**

To prevent the catastrophic failure of schema drift, the prompt must explicitly demand that all routing, categorization, and metadata extraction tasks be returned exclusively as structured JSON matching the predefined schema. It must explicitly prohibit the inclusion of conversational filler, markdown code blocks, or explanatory text before or after the JSON object. For textual output, it must dictate the precise markdown conventions required for progressive summarization, ensuring consistency across the entire database.

### **Section 5: The Human-in-the-Loop Fallback Protocol**

To maintain absolute trust in the automated system and prevent the irreversible corruption of the knowledge base, the prompt must define strict confidence thresholds that mandate human intervention. If the agent encounters data that it cannot definitively categorize within the parameters of the methodology, or if an automated summarization attempt lacks sufficient contextual data to meet the quality threshold, the agent must be instructed to halt execution. It must then format a highly specific clarification request, presenting the proposed action and the ambiguity to the user for final approval before committing any changes to the database.

## **Operational Workflows and Maintenance Cadences**

Once the system prompt, metadata schema, and underlying architecture are firmly established, the autonomous agent fundamentally alters the daily operational reality of personal knowledge management. The human user is entirely relieved of the low-level cognitive burden of sorting, tagging, and organizing information, transitioning from the role of a manual librarian to that of a strategic executive director.

The daily operational cadence of the augmented knowledge system involves a seamless interplay between human intuition and machine automation.

Every morning, the agent initiates an automated briefing protocol. Operating in the background, the system scans the relational database or local directory structures, identifying any impending project deadlines, lapsed area review cadences, or unresolved tasks. It synthesizes this metadata alongside recent notes, calendar events, and relevant captured articles to generate a personalized, highly condensed daily brief, instantly orienting the user to their most critical immediate priorities.

Throughout the day, the continuous capture and triage process occurs frictionlessly. As the user encounters interesting research, code snippets, strategic insights, or theoretical articles, they deposit them indiscriminately into the designated capture inbox. The user makes no decisions regarding organization at this stage. The agent operates asynchronously, executing its semantic tagging routines, generating the progressive summarization layers, and routing the distilled data to the correct subfolder based entirely on the JSON schema constraints without any further user intervention.

When the user engages in active, focused work on a specific project, they interact with the agent within the strictly bounded context of that project's specific directory. The agent leverages retrieval-augmented generation techniques to pull all relevant files, historical notes, semantic highlights, and web clippings exclusively associated with that project. This highly bounded context window allows the user to brainstorm, analyze variables, and solve complex problems collaboratively with the agent without the need to manually gather context or copy-paste reference materials into a chat interface.

Finally, the agent autonomously executes a rigorous weekly maintenance protocol to ensure the long-term health of the ecosystem. It systematically queries the entire database against the established matrix of the twelve favorite problems, utilizing high-dimensional embedding similarity algorithms to uncover novel, non-obvious connections between disparate pieces of information gathered over the preceding weeks. It surfaces these serendipitous connections to the user for review. Simultaneously, it executes structural housekeeping: refining semantic tags, automatically migrating completed project folders to the archive, updating state trackers, and ensuring the entire system remains pristine, deeply interconnected, and highly actionable for the week ahead.

Through this meticulously engineered architecture, the burden of remembering and organizing is permanently outsourced to the machine, leaving the biological brain happily unoptimized, free to wander, and fully capable of focusing its finite energy on the synthesis of new ideas and the execution of high-leverage creative work.

## **Compiled-Wiki Implementation in This Package**

This package implements the architecture above as a local-first, file-based compiled wiki. No services, no databases, no schedulers, no background daemons, no vector stores. The behaviors described in the preceding sections are realized through prompt files and markdown artifacts that a human or an agent can operate deterministically.

### **Sources and compiled notes are separated by design**

- `vault/sources/` holds immutable source notes. Each source is captured once through `.basb/prompts/11-ingest-source.md`, preserved verbatim, and never rewritten. Re-ingesting an updated upstream source creates a new source id rather than editing the existing one.
- `vault/projects/`, `vault/areas/`, `vault/resources/`, and `vault/archives/` hold compiled notes organized by P.A.R.A. Compiled notes carry a second classification axis through the `artifact_kind` frontmatter field (`concept`, `comparison`, `timeline`, `synthesis`, `source-summary`).
- Provenance is tracked in frontmatter: `derived_from`, `source_ids`, `source_count`, `last_ingested_at`, `claims_last_checked_at`, `supersedes`, and `contradicts`. Every compiled note also includes a `# Source Lineage` body section that mirrors `source_ids` in human-readable form.

### **Ingest updates many compiled notes from one source**

The ingest prompt is deliberately one-source-in, many-derived-updates. A single article can create one new compiled note, update three existing ones, and record a contradiction against a fourth. Source material is never collapsed into one routed note by default.

### **Maintenance is prompt-driven, not scheduled**

- `.basb/prompts/50-daily-brief.md` surfaces recent ingest and notes flagged by the last lint, but it runs only when the user asks for a brief.
- `.basb/prompts/60-weekly-maintenance.md` runs favorite-problem matching and knowledge lint as part of the same session.
- `.basb/prompts/61-knowledge-lint.md` performs structural checks (orphans, stale summaries, contradictions, broken source lineage, index drift) and returns a concrete maintenance report with vault paths and proposed repairs.
- `.basb/prompts/70-favorite-problems.md` is callable during ingest, during weekly maintenance, or on demand — all without any scheduler.

### **Expression persists durable outputs back into the vault**

`.basb/prompts/40-express.md` treats a durable synthesized answer as a vault-writing act. When an expressed output will be reused, merges claims across multiple compiled notes, answers a favorite problem, or resolves a contradiction, it is saved as a routed compiled note, back-linked from the contributing notes, logged in `vault/log.md`, and indexed in `vault/index.md` when it becomes a hub or canonical page.

### **Operational visibility is two plain-text files**

- `vault/index.md` is the human-readable catalog of high-value compiled notes, active hubs, and recently updated pages.
- `vault/log.md` is the append-only knowledge-evolution log. Source ingest, synthesis, contradiction resolutions, and durable output promotions are recorded here with one entry per event.

Both files are package-owned and refreshed on upgrade; neither is a P.A.R.A. category. Together they give the user the system observability that heavier architectures try to reach with dashboards and databases, while keeping the entire stack grep-able and diff-able.

### **Retrieval stays file-based**

- `vault/retrieval/catalog.md` is the machine-friendly manifest of high-value compiled notes.
- `vault/retrieval/question-map.md` maps durable questions to the notes that answer them.
- `vault/retrieval/pattern-index.md` captures recurring contradictions, comparisons, timelines, themes, and causal patterns.
- `vault/retrieval/relationship-index.md` keeps a compact edge list between notes, sources, entities, and questions.
- `.basb/prompts/62-retrieval-refresh.md` refreshes that layer after ingest, durable expression, or weekly maintenance without introducing a database or a background service.

### **Out of scope for this package**

The following are described above as alternatives, not as targets for this package:

- vector databases, embedding stores, semantic-search infrastructure
- MCP servers or any protocol-based integrations with external tools
- cron jobs, webhooks, background daemons, or automated async triage
- cloud relational backends and multi-user synchronization

If a future contribution genuinely needs one of those, it belongs in a separate package. This package's scope is the compiled-wiki behavior implemented through prompts, templates, and local markdown files.
