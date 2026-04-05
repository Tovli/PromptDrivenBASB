const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { scaffoldWorkspace } = require('../scripts/lib/scaffold-workspace.cjs');

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'basb-scaffold-test-'));
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
  assert.equal(fs.existsSync(path.join(targetRoot, 'docs', 'prompts', '00-master-system.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'templates', 'project-note.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'vault', 'inbox', '.gitkeep')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'SOUL.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'decision-log.md')), true);

  const decisionLog = fs.readFileSync(
    path.join(targetRoot, 'state', 'decision-log.md'),
    'utf8',
  );

  assert.match(decisionLog, /Initialized the BASB workspace scaffold/);
  assert.doesNotMatch(decisionLog, /github-actions-auto-versioning/);
});

test('overwrites packaged workspace files but preserves existing local state on install or upgrade', () => {
  const targetRoot = createTempDir();
  const existingStatePath = path.join(targetRoot, 'state', 'MEMORY.md');
  const existingReadmePath = path.join(targetRoot, 'README.md');
  const existingPromptPath = path.join(
    targetRoot,
    'docs',
    'prompts',
    '00-master-system.md',
  );

  fs.mkdirSync(path.dirname(existingStatePath), { recursive: true });
  fs.mkdirSync(path.dirname(existingPromptPath), { recursive: true });
  fs.writeFileSync(existingStatePath, 'custom-memory', 'utf8');
  fs.writeFileSync(existingReadmePath, 'custom-readme', 'utf8');
  fs.writeFileSync(existingPromptPath, 'custom-prompt', 'utf8');

  scaffoldWorkspace({
    packageRoot: path.join(__dirname, '..'),
    targetRoot,
    timestamp: '2026-04-05T15:00:00.000Z',
  });

  assert.equal(fs.readFileSync(existingStatePath, 'utf8'), 'custom-memory');
  assert.equal(fs.readFileSync(existingReadmePath, 'utf8'), fs.readFileSync(
    path.join(__dirname, '..', 'README.md'),
    'utf8',
  ));
  assert.equal(fs.readFileSync(existingPromptPath, 'utf8'), fs.readFileSync(
    path.join(__dirname, '..', 'docs', 'prompts', '00-master-system.md'),
    'utf8',
  ));
  assert.equal(fs.existsSync(path.join(targetRoot, 'state', 'SOUL.md')), true);
  assert.equal(fs.existsSync(path.join(targetRoot, 'docs', 'prompts', '10-capture.md')), true);
});
