const fs = require('node:fs');
const path = require('node:path');

const packageRoot = __dirname;

const namedAssetPaths = Object.freeze({
  agents: 'AGENTS.md',
  guide: 'BASBGuide.md',
  readme: 'README.md',
  promptsDir: path.join('.basb', 'prompts'),
  systemDir: path.join('.basb', 'system'),
  templatesDir: 'templates',
  stateDir: path.join('bootstrap', 'state'),
  vaultDir: 'vault',
  retrievalDir: path.join('vault', 'retrieval'),
  masterPrompt: path.join('.basb', 'prompts', '00-master-system.md'),
  capturePrompt: path.join('.basb', 'prompts', '10-capture.md'),
  retrievalRefreshPrompt: path.join('.basb', 'prompts', '62-retrieval-refresh.md'),
  systemSoul: path.join('.basb', 'system', 'SOUL.md'),
  systemMemory: path.join('.basb', 'system', 'MEMORY.md'),
});

function resolveAssetPath(...segments) {
  return path.join(packageRoot, ...segments);
}

function getAssetPath(nameOrPath) {
  const relativeAssetPath = namedAssetPaths[nameOrPath] || nameOrPath;

  return resolveAssetPath(relativeAssetPath);
}

function listPromptFiles() {
  return fs
    .readdirSync(getAssetPath('promptsDir'))
    .filter((entry) => entry.toLowerCase().endsWith('.md'))
    .sort((left, right) => left.localeCompare(right));
}

const assets = Object.freeze(
  Object.fromEntries(
    Object.entries(namedAssetPaths).map(([name, relativeAssetPath]) => [
      name,
      resolveAssetPath(relativeAssetPath),
    ]),
  ),
);

module.exports = {
  packageRoot,
  resolveAssetPath,
  getAssetPath,
  listPromptFiles,
  assets,
};
