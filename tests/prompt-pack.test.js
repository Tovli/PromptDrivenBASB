const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.join(__dirname, '..');

function readPackageFile(...segments) {
  return fs.readFileSync(path.join(packageRoot, ...segments), 'utf8');
}

function assertCanonicalIdentityDocs(content, label) {
  assert.match(
    content,
    /stable `canonical_id`[^.\n]{0,120}(retrieval identity|stable identity)/i,
    `${label} should describe canonical_id as the compiled note's stable retrieval identity`,
  );
  assert.match(
    content,
    /(`derived_from`|`source_ids`)[^.\n]{0,120}(source lineage|source)/i,
    `${label} should route source lineage through provenance fields`,
  );
  assert.doesNotMatch(
    content,
    /stable `canonical_id`[^.\n]{0,120}(linking back to the source|links back to (its )?source lineage)/i,
    `${label} should not define canonical_id as the source-lineage pointer`,
  );
}

function assertRetrievalRefreshScopeDocs(content, label) {
  assert.match(content, /62-retrieval-refresh\.md/);
  assert.match(
    content,
    /(materially change|materially changes|materially changed)[\s\S]{0,120}(bounded|affected)[\s\S]{0,40}note set/i,
    `${label} should scope retrieval refresh to the materially changed bounded note set`,
  );
  assert.doesNotMatch(
    content,
    /62-retrieval-refresh\.md[\s\S]{0,120}high-value compiled note/i,
    `${label} should not limit retrieval refresh to high-value notes`,
  );
  assert.doesNotMatch(
    content,
    /62-retrieval-refresh\.md[\s\S]{0,120}high-value note/i,
    `${label} should not limit retrieval refresh to high-value notes`,
  );
}

test('compiled-wiki prompt files exist in the package', () => {
  assert.equal(
    fs.existsSync(path.join(packageRoot, '.basb', 'prompts', '11-ingest-source.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(packageRoot, '.basb', 'prompts', '61-knowledge-lint.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(packageRoot, '.basb', 'prompts', '62-retrieval-refresh.md')),
    true,
  );
});

test('compiled-wiki templates and vault support files exist', () => {
  assert.equal(fs.existsSync(path.join(packageRoot, 'templates', 'source-note.md')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'index.md')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'log.md')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'sources', '.gitkeep')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'retrieval', 'catalog.md')), true);
  assert.equal(
    fs.existsSync(path.join(packageRoot, 'vault', 'retrieval', 'question-map.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(packageRoot, 'vault', 'retrieval', 'pattern-index.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(packageRoot, 'vault', 'retrieval', 'relationship-index.md')),
    true,
  );
});

test('routed note templates contain compiled-wiki provenance schema', () => {
  const provenanceFields = [
    'artifact_kind',
    'derived_from',
    'source_ids',
    'source_count',
    'last_ingested_at',
    'summary_last_refreshed_at',
    'claims_last_checked_at',
    'supersedes',
    'contradicts',
  ];

  const templates = [
    'project-note.md',
    'area-note.md',
    'resource-note.md',
    'archive-note.md',
    'inbox-note.md',
  ];

  for (const templateFile of templates) {
    const content = readPackageFile('templates', templateFile);
    for (const field of provenanceFields) {
      assert.match(
        content,
        new RegExp(field),
        `${templateFile} must contain frontmatter field: ${field}`,
      );
    }
  }
});

test('compiled note templates keep retrieval metadata minimal', () => {
  const templates = [
    'project-note.md',
    'area-note.md',
    'resource-note.md',
    'archive-note.md',
  ];

  for (const templateFile of templates) {
    const content = readPackageFile('templates', templateFile);
    assert.match(content, /canonical_id/, `${templateFile} must contain canonical_id`);
    assert.doesNotMatch(content, /\baliases\b/, `${templateFile} should not persist aliases in frontmatter`);
    assert.doesNotMatch(content, /\bnote_kind\b/, `${templateFile} should not duplicate artifact_kind with note_kind`);
    assert.doesNotMatch(content, /\bentity_refs\b/, `${templateFile} should not persist entity_refs in frontmatter`);
    assert.doesNotMatch(content, /\bquestion_refs\b/, `${templateFile} should not persist question_refs in frontmatter`);
    assert.doesNotMatch(content, /\bretrieval_terms\b/, `${templateFile} should not persist retrieval_terms in frontmatter`);
  }
});

test('source-note template uses the immutable source frontmatter shape', () => {
  const content = readPackageFile('templates', 'source-note.md');
  assert.match(content, /artifact_kind/);
  assert.match(content, /content_hash/);
  assert.match(content, /# Source Material/);
  assert.match(content, /# Derived Notes/);
  assert.match(content, /# Favorite Problem Matches/);
  assert.match(content, /# Ingest Notes/);
});

test('capture prompt branches into durable-source ingest using 11-ingest-source', () => {
  const content = readPackageFile('.basb', 'prompts', '10-capture.md');
  assert.match(content, /11-ingest-source\.md/);
  assert.match(content, /durable source material/i);
});

test('express prompt persists durable synthesized outputs back into the vault', () => {
  const content = readPackageFile('.basb', 'prompts', '40-express.md');
  assert.match(content, /vault\/log\.md/);
  assert.match(content, /durable/i);
});

test('layer-4 distill prompt refreshes summaries and the retrieval layer together', () => {
  const content = readPackageFile('.basb', 'prompts', '32-distill-layer4.md');
  assert.match(content, /summary_last_refreshed_at/);
  assert.match(content, /62-retrieval-refresh\.md/);
  assert.match(
    content,
    /(summary|executive summary)[\s\S]{0,140}(materially change|materially changes|materially changed)[\s\S]{0,140}62-retrieval-refresh\.md/i,
  );
});

test('ingest and knowledge-lint prompts align summary freshness with synthesis changes', () => {
  const ingestContent = readPackageFile('.basb', 'prompts', '11-ingest-source.md');
  const lintContent = readPackageFile('.basb', 'prompts', '61-knowledge-lint.md');
  const lintUsesRawTimestampComparison = /summary_last_refreshed_at` is null or older than `last_ingested_at`/i.test(
    lintContent,
  );

  assert.match(ingestContent, /last_ingested_at/);
  assert.match(ingestContent, /summary_last_refreshed_at/);
  assert.match(
    ingestContent,
    /if the ingest materially changes the synthesis[\s\S]{0,120}summary_last_refreshed_at/i,
  );
  assert.match(lintContent, /summary_last_refreshed_at/);

  if (lintUsesRawTimestampComparison) {
    assert.match(
      ingestContent,
      /(in all cases set `summary_last_refreshed_at`|set `summary_last_refreshed_at` once the summary has been checked against the latest evidence)/i,
      'timestamp-based freshness lint requires ingest to refresh summary_last_refreshed_at after each evidence review',
    );
    assert.match(
      lintContent,
      /(review|checked)[\s\S]{0,120}summary[\s\S]{0,120}(evidence|ingest)/i,
      'timestamp-based freshness lint should explain that summary_last_refreshed_at tracks review against ingested evidence',
    );
  } else {
    assert.match(
      lintContent,
      /(material|meaningful|reflect)[\s\S]{0,120}(summary|synthesis)[\s\S]{0,120}(ingest|refresh)/i,
      'knowledge lint should define stale summaries in terms of synthesis drift when freshness is not keyed directly to ingest timestamps',
    );
  }
});

test('weekly maintenance prompt calls the knowledge-lint prompt', () => {
  const content = readPackageFile('.basb', 'prompts', '60-weekly-maintenance.md');
  assert.match(content, /61-knowledge-lint\.md/);
  assert.match(content, /62-retrieval-refresh\.md/);
  assert.equal(
    content.indexOf('62-retrieval-refresh.md') < content.indexOf('61-knowledge-lint.md'),
    true,
    'weekly maintenance should refresh retrieval before linting retrieval drift',
  );
});

test('favorite-problems prompt supports being called during source ingest', () => {
  const content = readPackageFile('.basb', 'prompts', '70-favorite-problems.md');
  assert.match(content, /ingest/i);
});

test('knowledge-lint prompt defines structural checks for orphan notes and contradictions', () => {
  const content = readPackageFile('.basb', 'prompts', '61-knowledge-lint.md');
  assert.match(content, /orphan/i);
  assert.match(content, /contradict/i);
  assert.match(content, /stale/i);
  assert.match(content, /vault\/log\.md/);
  assert.match(content, /retrieval/i);
  assert.match(content, /question map/i);
});

test('retrieval refresh prompt explicitly keeps search index fields in retrieval artifacts, not note frontmatter', () => {
  const content = readPackageFile('.basb', 'prompts', '62-retrieval-refresh.md');
  assert.match(content, /`canonical_id` is the only retrieval-specific field that belongs on compiled notes/);
  assert.match(
    content,
    /Store aliases, entities, question mappings, and retrieval terms inside `vault\/retrieval\/`, not in note frontmatter/,
  );
  assert.match(content, /confirm or repair `canonical_id` when the stable identity is obvious/);
  assert.doesNotMatch(content, /confirm or repair `aliases`/);
  assert.doesNotMatch(content, /confirm or repair `note_kind`/);
  assert.doesNotMatch(content, /confirm or repair `entity_refs`/);
  assert.doesNotMatch(content, /confirm or repair `question_refs`/);
  assert.doesNotMatch(content, /confirm or repair `retrieval_terms`/);
});

test('retrieval catalog scaffold matches the retrieval refresh contract', () => {
  const content = readPackageFile('vault', 'retrieval', 'catalog.md');
  assert.match(content, /canonical_id/);
  assert.match(content, /note_path/);
  assert.match(content, /title/);
  assert.match(content, /artifact_kind/);
  assert.match(content, /summary/);
  assert.match(content, /tags/);
  assert.match(content, /favorite_problems/);
  assert.match(content, /related_note_paths/);
  assert.match(content, /source_count/);
  assert.match(content, /updated_at/);
  assert.doesNotMatch(content, /\bnote_kind\b/);
  assert.doesNotMatch(content, /\bentity_refs\b/);
  assert.doesNotMatch(content, /\bquestion_refs\b/);
  assert.doesNotMatch(content, /\bretrieval_terms\b/);
});

test('prompt catalog documents retrieval-layer prompts and immutable-source workflow', () => {
  const content = readPackageFile('.basb', 'prompts', 'README.md');
  assert.match(content, /11-ingest-source\.md/);
  assert.match(content, /61-knowledge-lint\.md/);
  assert.match(content, /62-retrieval-refresh\.md/);
  assert.match(content, /immutable source/i);
  assert.match(content, /question map/i);
});

test('AGENTS.md describes vault support layers and current compiled-note frontmatter requirements', () => {
  const content = readPackageFile('AGENTS.md');
  assert.match(content, /vault\/sources\//);
  assert.match(content, /operational/i);
  assert.match(content, /vault\/retrieval\//);
  assert.match(content, /artifact_kind/);
  assert.match(content, /canonical_id/);
  assert.match(content, /derived_from/);
  assert.match(content, /summary_last_refreshed_at/);
});

test('README and bootstrap README document canonical_id as retrieval identity and retrieval refresh as bounded-set maintenance', () => {
  const packageReadme = readPackageFile('README.md');
  const bootstrapReadme = readPackageFile('bootstrap', 'README.md');

  assertCanonicalIdentityDocs(packageReadme, 'README.md');
  assertCanonicalIdentityDocs(bootstrapReadme, 'bootstrap/README.md');
  assertRetrievalRefreshScopeDocs(packageReadme, 'README.md');
  assertRetrievalRefreshScopeDocs(bootstrapReadme, 'bootstrap/README.md');
});
