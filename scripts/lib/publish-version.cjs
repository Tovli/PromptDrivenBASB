function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

  if (!match) {
    throw new Error(`Unsupported version format: ${version}`);
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function compareVersions(left, right) {
  const a = parseVersion(left);
  const b = parseVersion(right);

  if (a.major !== b.major) {
    return a.major - b.major;
  }

  if (a.minor !== b.minor) {
    return a.minor - b.minor;
  }

  return a.patch - b.patch;
}

function bumpPatch(version) {
  const parsed = parseVersion(version);
  return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
}

function getLatestPublishedVersion(publishedVersions) {
  if (!Array.isArray(publishedVersions) || publishedVersions.length === 0) {
    return null;
  }

  return publishedVersions.reduce((latest, current) => {
    if (latest === null || compareVersions(current, latest) > 0) {
      return current;
    }

    return latest;
  }, null);
}

function choosePublishVersion({ manifestVersion, publishedVersions = [] }) {
  const latestPublishedVersion = getLatestPublishedVersion(publishedVersions);

  if (!latestPublishedVersion) {
    return manifestVersion;
  }

  if (compareVersions(manifestVersion, latestPublishedVersion) > 0) {
    return manifestVersion;
  }

  return bumpPatch(latestPublishedVersion);
}

function planPublish({
  manifestVersion,
  publishedVersions = [],
  latestPublishedVersion = null,
  latestPublishedGitHead = null,
  currentGitHead = null,
}) {
  if (
    latestPublishedVersion &&
    latestPublishedGitHead &&
    currentGitHead &&
    latestPublishedGitHead === currentGitHead
  ) {
    return {
      publishVersion: latestPublishedVersion,
      reason: 'gitHead already published',
      shouldPublish: false,
    };
  }

  return {
    publishVersion: choosePublishVersion({ manifestVersion, publishedVersions }),
    reason: 'new commit requires publish',
    shouldPublish: true,
  };
}

module.exports = {
  bumpPatch,
  choosePublishVersion,
  compareVersions,
  getLatestPublishedVersion,
  planPublish,
  parseVersion,
};
