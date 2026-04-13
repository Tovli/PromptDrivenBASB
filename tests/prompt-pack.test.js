const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.join(__dirname, '..');

test('compiled-wiki prompt files exist in the package', () => {
  assert.equal(
    fs.existsSync(path.join(packageRoot, '.basb', 'prompts', '11-ingest-source.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(packageRoot, '.basb', 'prompts', '61-knowledge-lint.md')),
    true,
  );
});

test('compiled-wiki templates and vault support files exist', () => {
  assert.equal(fs.existsSync(path.join(packageRoot, 'templates', 'source-note.md')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'index.md')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'log.md')), true);
  assert.equal(fs.existsSync(path.join(packageRoot, 'vault', 'sources', '.gitkeep')), true);
});

test('routed note templates contain compiled-wiki provenance schema', () => {
  const provenanceFields = [
    'artifact_kind',
    'derived_from',
    'source_ids',
    'source_count',
    'last_ingested_at',
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
    const content = fs.readFileSync(path.join(packageRoot, 'templates', templateFile), 'utf8');
    for (const field of provenanceFields) {
      assert.match(
        content,
        new RegExp(field),
        `${templateFile} must contain frontmatter field: ${field}`,
      );
    }
  }
});

test('source-note template uses the immutable source frontmatter shape', () => {
  const content = fs.readFileSync(path.join(packageRoot, 'templates', 'source-note.md'), 'utf8');
  assert.match(content, /artifact_kind/);
  assert.match(content, /content_hash/);
  assert.match(content, /# Source Material/);
  assert.match(content, /# Derived Notes/);
  assert.match(content, /# Favorite Problem Matches/);
  assert.match(content, /# Ingest Notes/);
});

test('capture prompt branches into durable-source ingest using 11-ingest-source', () => {
  const content = fs.readFileSync(
    path.join(packageRoot, '.basb', 'prompts', '10-capture.md'),
    'utf8',
  );
  assert.match(content, /11-ingest-source\.md/);
  assert.match(content, /durable source material/i);
});

test('express prompt persists durable synthesized outputs back into the vault', () => {
  const content = fs.readFileSync(
    path.join(packageRoot, '.basb', 'prompts', '40-express.md'),
    'utf8',
  );
  assert.match(content, /vault\/log\.md/);
  assert.match(content, /durable/i);
});

test('weekly maintenance prompt calls the knowledge-lint prompt', () => {
  const content = fs.readFileSync(
    path.join(packageRoot, '.basb', 'prompts', '60-weekly-maintenance.md'),
    'utf8',
  );
  assert.match(content, /61-knowledge-lint\.md/);
});

test('favorite-problems prompt supports being called during source ingest', () => {
  const content = fs.readFileSync(
    path.join(packageRoot, '.basb', 'prompts', '70-favorite-problems.md'),
    'utf8',
  );
  assert.match(content, /ingest/i);
});

test('knowledge-lint prompt defines structural checks for orphan notes and contradictions', () => {
  const content = fs.readFileSync(
    path.join(packageRoot, '.basb', 'prompts', '61-knowledge-lint.md'),
    'utf8',
  );
  assert.match(content, /orphan/i);
  assert.match(content, /contradict/i);
  assert.match(content, /stale/i);
  assert.match(content, /vault\/log\.md/);
});

test('prompt catalog documents 11-ingest-source and 61-knowledge-lint', () => {
  const content = fs.readFileSync(
    path.join(packageRoot, '.basb', 'prompts', 'README.md'),
    'utf8',
  );
  assert.match(content, /11-ingest-source\.md/);
  assert.match(content, /61-knowledge-lint\.md/);
  assert.match(content, /immutable source/i);
});

test('AGENTS.md describes vault/sources/ as an operational provenance layer', () => {
  const content = fs.readFileSync(path.join(packageRoot, 'AGENTS.md'), 'utf8');
  assert.match(content, /vault\/sources\//);
  assert.match(content, /operational/i);
});
