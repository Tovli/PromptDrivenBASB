const fs = require('node:fs');
const path = require('node:path');

const workspaceEntries = Object.freeze([
  'AGENTS.md',
  'BASBGuide.md',
  'LICENSE',
  'README.md',
  'docs',
  'examples',
  'templates',
  'vault',
]);

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function syncPath(sourcePath, targetPath, { overwriteExisting }) {
  const sourceStats = fs.statSync(sourcePath);

  if (sourceStats.isDirectory()) {
    ensureDirectory(targetPath);

    for (const entry of fs.readdirSync(sourcePath)) {
      syncPath(
        path.join(sourcePath, entry),
        path.join(targetPath, entry),
        { overwriteExisting },
      );
    }

    return;
  }

  if (fs.existsSync(targetPath) && !overwriteExisting) {
    return;
  }

  ensureDirectory(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function walkFiles(rootPath) {
  const filePaths = [];

  for (const entry of fs.readdirSync(rootPath, { withFileTypes: true })) {
    const entryPath = path.join(rootPath, entry.name);

    if (entry.isDirectory()) {
      filePaths.push(...walkFiles(entryPath));
      continue;
    }

    filePaths.push(entryPath);
  }

  return filePaths;
}

function renderTemplate(templateContent, timestamp) {
  return templateContent.replaceAll('__TIMESTAMP__', timestamp);
}

function scaffoldBootstrapState(packageRoot, targetRoot, timestamp) {
  const bootstrapStateRoot = path.join(packageRoot, 'bootstrap', 'state');
  const targetStateRoot = path.join(targetRoot, 'state');

  ensureDirectory(targetStateRoot);

  for (const templatePath of walkFiles(bootstrapStateRoot)) {
    const relativePath = path.relative(bootstrapStateRoot, templatePath);
    const targetPath = path.join(targetStateRoot, relativePath);

    if (fs.existsSync(targetPath)) {
      continue;
    }

    const renderedTemplate = renderTemplate(
      fs.readFileSync(templatePath, 'utf8'),
      timestamp,
    );

    ensureDirectory(path.dirname(targetPath));
    fs.writeFileSync(targetPath, renderedTemplate, 'utf8');
  }
}

function scaffoldWorkspace({
  packageRoot,
  targetRoot,
  timestamp = new Date().toISOString(),
}) {
  const resolvedPackageRoot = path.resolve(packageRoot);
  const resolvedTargetRoot = path.resolve(targetRoot);

  ensureDirectory(resolvedTargetRoot);

  for (const entry of workspaceEntries) {
    syncPath(
      path.join(resolvedPackageRoot, entry),
      path.join(resolvedTargetRoot, entry),
      { overwriteExisting: true },
    );
  }

  scaffoldBootstrapState(resolvedPackageRoot, resolvedTargetRoot, timestamp);

  return {
    packageRoot: resolvedPackageRoot,
    targetRoot: resolvedTargetRoot,
  };
}

module.exports = {
  scaffoldWorkspace,
};
