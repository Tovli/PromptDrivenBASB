const test = require('node:test');
const assert = require('node:assert/strict');
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
  const masterPromptPath = resolveAssetPath('docs', 'prompts', '00-master-system.md');

  assert.equal(readmePath, path.join(packageRoot, 'README.md'));
  assert.equal(masterPromptPath, path.join(packageRoot, 'docs', 'prompts', '00-master-system.md'));
  assert.equal(fs.existsSync(readmePath), true);
  assert.equal(fs.existsSync(masterPromptPath), true);
});

test('exposes named asset shortcuts for common workspace files', () => {
  assert.equal(assets.readme, path.join(packageRoot, 'README.md'));
  assert.equal(assets.agents, path.join(packageRoot, 'AGENTS.md'));
  assert.equal(assets.masterPrompt, path.join(packageRoot, 'docs', 'prompts', '00-master-system.md'));
  assert.equal(fs.existsSync(assets.masterPrompt), true);
});

test('lists prompt markdown files from the packaged prompt directory', () => {
  const prompts = listPromptFiles();

  assert.equal(Array.isArray(prompts), true);
  assert.equal(prompts.includes('00-master-system.md'), true);
  assert.equal(prompts.includes('20-organize-route.md'), true);
});
