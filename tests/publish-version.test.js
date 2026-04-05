const test = require('node:test');
const assert = require('node:assert/strict');

const {
  choosePublishVersion,
  planPublish,
} = require('../scripts/lib/publish-version.cjs');

test('keeps the manifest version when it has not been published yet', () => {
  const version = choosePublishVersion({
    manifestVersion: '0.1.1',
    publishedVersions: ['0.1.0'],
  });

  assert.equal(version, '0.1.1');
});

test('bumps the patch version when the manifest version already exists on npm', () => {
  const version = choosePublishVersion({
    manifestVersion: '0.1.1',
    publishedVersions: ['0.1.0', '0.1.1'],
  });

  assert.equal(version, '0.1.2');
});

test('bumps from the latest published version when the manifest version lags behind npm', () => {
  const version = choosePublishVersion({
    manifestVersion: '0.1.1',
    publishedVersions: ['0.1.0', '0.1.5'],
  });

  assert.equal(version, '0.1.6');
});

test('keeps a manually raised manifest version when it is ahead of npm and unpublished', () => {
  const version = choosePublishVersion({
    manifestVersion: '1.0.0',
    publishedVersions: ['0.1.9'],
  });

  assert.equal(version, '1.0.0');
});

test('skips publish when the latest published package was built from the same commit', () => {
  const plan = planPublish({
    manifestVersion: '0.1.1',
    publishedVersions: ['0.1.0', '0.1.1'],
    latestPublishedVersion: '0.1.1',
    latestPublishedGitHead: 'abc123',
    currentGitHead: 'abc123',
  });

  assert.deepEqual(plan, {
    publishVersion: '0.1.1',
    reason: 'gitHead already published',
    shouldPublish: false,
  });
});

test('publishes a bumped patch version when the commit changed and the manifest version already exists', () => {
  const plan = planPublish({
    manifestVersion: '0.1.1',
    publishedVersions: ['0.1.0', '0.1.1'],
    latestPublishedVersion: '0.1.1',
    latestPublishedGitHead: 'abc123',
    currentGitHead: 'def456',
  });

  assert.deepEqual(plan, {
    publishVersion: '0.1.2',
    reason: 'new commit requires publish',
    shouldPublish: true,
  });
});
