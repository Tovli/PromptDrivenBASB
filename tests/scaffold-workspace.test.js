const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { scaffoldWorkspace } = require('../scripts/lib/scaffold-workspace.cjs');

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'basb-scaffold-test-'));
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
    /62-retrieval-refresh\.md[\s\S]{0,120}high-value note/i,
    `${label} should not limit retrieval refresh to high-value notes`,
  );
  assert.doesNotMatch(
    content,
    /62-retrieval-refresh\.md[\s\S]{0,120}high-value compiled note/i,
    `${label} should not limit retrieval refresh to high-value notes`,
  );
}

test('scaffolds BASB workspace files into the target root and initializes bootstrap state', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  assert.equal(fs.existsSync(path.join(targetRoot, 'AGENTS.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'BASBGuide.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, '.basb', 'prompts', '00-master-system.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, '.basb', 'system', 'SOUL.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, '.basb', 'system', 'MEMORY.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'templates', 'project-note.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'vault', 'inbox', '.gitkeep')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'decision-log.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'SOUL.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'MEMORY.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, '.basb', 'plans')), false);

  const decisionLog = fs.readFileSync(
    path.join(targetRoot, 'state', 'decision-log.md'),
    'utf8',
  );

  assert.match(decisionLog, /Initialized the BASB workspace scaffold/);
  assert.doesNotMatch(decisionLog, /github-actions-auto-versioning/);
});

test('scaffolded workspace instructions treat new prompts as second-brain intake', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  const agents = fs.readFileSync(path.join(targetRoot, 'AGENTS.md'), 'utf8');
  const soul = fs.readFileSync(path.join(targetRoot, '.basb', 'system', 'SOUL.md'), 'utf8');
  const masterPrompt = fs.readFileSync(
    path.join(targetRoot, '.basb', 'prompts', '00-master-system.md'),
    'utf8',
  );
  const capturePrompt = fs.readFileSync(
    path.join(targetRoot, '.basb', 'prompts', '10-capture.md'),
    'utf8',
  );

  assert.match(agents, /new user prompt as incoming second-brain material/i);
  assert.match(soul, /new user prompt as potential second-brain material/i);
  assert.match(masterPrompt, /new user prompt as a candidate addition to the user's second brain/i);
  assert.match(capturePrompt, /new user prompt as source material/i);
});

test('scaffolded local state files stay lightweight and point to canonical system state', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  const localSoul = fs.readFileSync(path.join(targetRoot, 'state', 'SOUL.md'), 'utf8');
  const localMemory = fs.readFileSync(path.join(targetRoot, 'state', 'MEMORY.md'), 'utf8');

  assert.match(localSoul, /\.basb\/system\/SOUL\.md/);
  assert.match(localMemory, /\.basb\/system\/MEMORY\.md/);
});

test('scaffolded startup instructions use classify-first loading for normal BASB sessions', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  const agents = fs.readFileSync(path.join(targetRoot, 'AGENTS.md'), 'utf8');
  const readme = fs.readFileSync(path.join(targetRoot, 'README.md'), 'utf8');
  const sessionStart = fs.readFileSync(
    path.join(targetRoot, '.basb', 'prompts', '01-session-start.md'),
    'utf8',
  );
  const soul = fs.readFileSync(path.join(targetRoot, '.basb', 'system', 'SOUL.md'), 'utf8');

  assert.match(agents, /`AGENTS\.md`/);
  assert.match(agents, /`\.basb\/prompts\/01-session-start\.md`/);
  assert.equal(
    agents.indexOf('`AGENTS.md`') < agents.indexOf('`.basb/prompts/01-session-start.md`'),
    true,
  );
  assert.match(sessionStart, /classify the incoming user prompt/i);
  assert.doesNotMatch(sessionStart, /after reading the core state files/i);
  assert.doesNotMatch(sessionStart, /1\.\s+Read `BASBGuide\.md`\./);
  assert.doesNotMatch(readme, /For a normal BASB session, read these in order:\s+1\.\s+`BASBGuide\.md`/is);
  assert.doesNotMatch(soul, /At the beginning of any BASB session, read:\s+1\.\s+`BASBGuide\.md`/is);
});

test('scaffolded README stays BASB-focused and omits package-publishing details', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  const readme = fs.readFileSync(path.join(targetRoot, 'README.md'), 'utf8');

  assert.doesNotMatch(readme, /^## NPM Package$/m);
  assert.doesNotMatch(readme, /prompt-driven-basb/);
  assert.doesNotMatch(readme, /\.basb\/plans\//);
});

test('scaffolded README preserves canonical_id and retrieval-refresh maintenance contracts', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-22T10:00:00.000Z',
  });

  const readme = fs.readFileSync(path.join(targetRoot, 'README.md'), 'utf8');

  assertCanonicalIdentityDocs(readme, 'scaffolded README.md');
  assertRetrievalRefreshScopeDocs(readme, 'scaffolded README.md');
});

test('scaffolds compiled-wiki vault support files and source ingest prompts', () => {
  const targetRoot = createTempDir();

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-13T11:57:59.000Z',
  });

  assert.equal(fs.existsSync(path.join(targetRoot, 'vault', 'index.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'vault', 'log.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'vault', 'sources', '.gitkeep')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'templates', 'source-note.md')), true);
  assert.equal(
    fs.existsSync(path.join(targetRoot, '.basb', 'prompts', '11-ingest-source.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(targetRoot, '.basb', 'prompts', '61-knowledge-lint.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(targetRoot, '.basb', 'prompts', '62-retrieval-refresh.md')),
    true,
  );
  assert.equal(fs.existsSync(path.join(targetRoot, 'vault', 'retrieval', 'catalog.md')), true);
  assert.equal(
    fs.existsSync(path.join(targetRoot, 'vault', 'retrieval', 'question-map.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(targetRoot, 'vault', 'retrieval', 'pattern-index.md')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(targetRoot, 'vault', 'retrieval', 'relationship-index.md')),
    true,
  );

  const agents = fs.readFileSync(path.join(targetRoot, 'AGENTS.md'), 'utf8');
  assert.match(agents, /vault\/sources\//);
  assert.match(agents, /operational/i);
  // scaffolded AGENTS.md must explicitly deny that vault/sources/ is a fifth P.A.R.A. category
  assert.match(agents, /do not create a fifth.*category/i);
  assert.match(agents, /vault\/retrieval\//);

  const readme = fs.readFileSync(path.join(targetRoot, 'README.md'), 'utf8');
  assert.match(readme, /vault\/retrieval\//);
  assert.match(readme, /question map/i);
});

test('overwrites packaged workspace files but preserves existing local state on install or upgrade', () => {
  const targetRoot = createTempDir();
  const existingStatePath = path.join(targetRoot, 'state', 'review-queue.md');
  const existingReadmePath = path.join(targetRoot, 'README.md');
  const existingPromptPath = path.join(
    targetRoot,
    '.basb',
    'prompts',
    '00-master-system.md',
  );
  const existingSystemPath = path.join(
    targetRoot,
    '.basb',
    'system',
    'MEMORY.md',
  );

  fs.mkdirSync(path.dirname(existingStatePath), { recursive: true });
  fs.mkdirSync(path.dirname(existingPromptPath), { recursive: true });
  fs.mkdirSync(path.dirname(existingSystemPath), { recursive: true });
  fs.writeFileSync(existingStatePath, 'custom-memory', 'utf8');
  fs.writeFileSync(existingReadmePath, 'custom-readme', 'utf8');
  fs.writeFileSync(existingPromptPath, 'custom-prompt', 'utf8');
  fs.writeFileSync(existingSystemPath, 'custom-system-memory', 'utf8');

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  assert.equal(fs.readFileSync(existingStatePath, 'utf8'), 'custom-memory');
  assert.equal(fs.readFileSync(existingReadmePath, 'utf8'), fs.readFileSync(
    path.join(__dirname, '..', 'bootstrap', 'README.md'),
    'utf8',
  ));
  assert.equal(fs.readFileSync(existingPromptPath, 'utf8'), fs.readFileSync(
    path.join(__dirname, '..', '.basb', 'prompts', '00-master-system.md'),
    'utf8',
  ));
  assert.equal(fs.readFileSync(existingSystemPath, 'utf8'), fs.readFileSync(
    path.join(__dirname, '..', '.basb', 'system', 'MEMORY.md'),
    'utf8',
  ));
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'SOUL.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, '.basb', 'prompts', '10-capture.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, '.basb', 'system', 'SOUL.md')), true);
});
