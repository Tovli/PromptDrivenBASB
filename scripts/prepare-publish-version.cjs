const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const { planPublish } = require('./lib/publish-version.cjs');

function getNpmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function runNpmCommand(args) {
  if (process.env.npm_execpath && fs.existsSync(process.env.npm_execpath)) {
    return execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
      encoding: 'utf8',
    });
  }

  if (process.platform === 'win32') {
    const command = ['npm', ...args.map((arg) => `"${arg}"`)].join(' ');
    return execFileSync('cmd.exe', ['/d', '/s', '/c', command], {
      encoding: 'utf8',
    });
  }

  return execFileSync(getNpmCommand(), args, { encoding: 'utf8' });
}

function getCurrentGitHead() {
  if (process.env.GITHUB_SHA) {
    return process.env.GITHUB_SHA.trim();
  }

  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function getPublishedPackageInfo(packageName) {
  try {
    const stdout = runNpmCommand(['view', packageName, 'versions', 'version', 'gitHead', '--json']).trim();

    if (!stdout) {
      return {
        latestPublishedGitHead: null,
        latestPublishedVersion: null,
        publishedVersions: [],
      };
    }

    const parsed = JSON.parse(stdout);
    const publishedVersions = Array.isArray(parsed.versions)
      ? parsed.versions
      : typeof parsed.version === 'string'
        ? [parsed.version]
        : [];

    return {
      latestPublishedGitHead: typeof parsed.gitHead === 'string' ? parsed.gitHead : null,
      latestPublishedVersion: typeof parsed.version === 'string' ? parsed.version : null,
      publishedVersions,
    };
  } catch (error) {
    const stderr = `${error.stderr || ''}`;

    if (stderr.includes('E404') || stderr.includes('404')) {
      return {
        latestPublishedGitHead: null,
        latestPublishedVersion: null,
        publishedVersions: [],
      };
    }

    throw error;
  }
}

function setGithubOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) {
    return;
  }

  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, 'utf8');
}

function main() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const manifest = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const originalVersion = manifest.version;
  const currentGitHead = getCurrentGitHead();
  const packageInfo = getPublishedPackageInfo(manifest.name);
  const publishPlan = planPublish({
    currentGitHead,
    manifestVersion: originalVersion,
    latestPublishedGitHead: packageInfo.latestPublishedGitHead,
    latestPublishedVersion: packageInfo.latestPublishedVersion,
    publishedVersions: packageInfo.publishedVersions,
  });
  const { publishVersion, reason, shouldPublish } = publishPlan;

  if (shouldPublish && publishVersion !== originalVersion) {
    manifest.version = publishVersion;
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    console.log(`Updated package.json version from ${originalVersion} to ${publishVersion}`);
  } else if (!shouldPublish) {
    console.log(`Skipping publish because ${reason}`);
  } else {
    console.log(`Keeping package.json version at ${publishVersion}`);
  }

  setGithubOutput('publish_version', publishVersion);
  setGithubOutput('publish_reason', reason);
  setGithubOutput('should_publish', shouldPublish ? 'true' : 'false');
}

if (require.main === module) {
  main();
}

module.exports = {
  getCurrentGitHead,
  getNpmCommand,
  getPublishedPackageInfo,
  main,
};
