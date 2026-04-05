const test = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const {
  packageRoot,
  resolveAssetPath,
  getAssetPath,
  listPromptFiles,
  assets,
} = require('../index.js');

test('exports a package root that exists on disk', () => {
  assert.equal(typeof packageRoot, 'string');
  assert.equal(fs.existsSync(packageRoot), true);
  assert.equal(fs.statSync(packageRoot).isDirectory(), true);
});

test('resolves key BASB assets from the package root', () => {
  const readmePath = getAssetPath('README.md');
  const masterPromptPath = resolveAssetPath('.basb', 'prompts', '00-master-system.md');

  assert.equal(readmePath, path.join(packageRoot, 'README.md'));
  assert.equal(masterPromptPath, path.join(packageRoot, '.basb', 'prompts', '00-master-system.md'));
  assert.equal(fs.existsSync(readmePath), true);
  assert.equal(fs.existsSync(masterPromptPath), true);
});

test('exposes named asset shortcuts for common workspace files', () => {
  assert.equal(assets.readme, path.join(packageRoot, 'README.md'));
  assert.equal(assets.agents, path.join(packageRoot, 'AGENTS.md'));
  assert.equal(assets.masterPrompt, path.join(packageRoot, '.basb', 'prompts', '00-master-system.md'));
  assert.equal(fs.existsSync(assets.stateDir), true);
  assert.equal(fs.existsSync(assets.masterPrompt), true);
});

test('lists prompt markdown files from the packaged prompt directory', () => {
  const prompts = listPromptFiles();

  assert.equal(Array.isArray(prompts), true);
  assert.equal(prompts.includes('00-master-system.md'), true);
  assert.equal(prompts.includes('20-organize-route.md'), true);
});

test('npm tarball excludes client-local state files', () => {
  const packedFilesOutput = execSync('npm pack --json --dry-run', {
    cwd: packageRoot,
    encoding: 'utf8',
  });
  const [{ files: packedFiles }] = JSON.parse(packedFilesOutput);
  const packedFilePaths = packedFiles.map((file) => file.path);

  assert.equal(
    packedFilePaths.some((filePath) => filePath === 'state' || filePath.startsWith('state/')),
    false,
  );
  assert.equal(
    packedFilePaths.some((filePath) => filePath === '.basb/plans' || filePath.startsWith('.basb/plans/')),
    false,
  );
  assert.equal(packedFilePaths.includes('bootstrap/state/SOUL.md'), true);
  assert.equal(packedFilePaths.includes('.basb/prompts/00-master-system.md'), true);
  assert.equal(packedFilePaths.includes('scripts/postinstall.cjs'), true);
});

test('package manifest scaffolds the BASB workspace on install', () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'),
  );

  assert.equal(manifest.scripts.postinstall, 'node scripts/postinstall.cjs');
});
