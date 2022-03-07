const major = [":tada:", ":boom:"];
const minor = [":sparkles:"];
const patch = [
  ":bug:",
  ":ambulance:",
  ":art:",
  ":recycle:",
  ":fire:",
  ":construction_worker:",
  ":rocket:",
  ":arrow_up:",
  ":wheel_of_dharma:",
  ":zap:",
  ":arrow_up:",
];

module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "atom",
        releaseRules: [
          ...major.map((emoji) => ({ type: emoji, release: "major" })),
          ...minor.map((emoji) => ({ type: emoji, release: "minor" })),
          ...patch.map((emoji) => ({ type: emoji, release: "patch" })),
        ],
      },
    ],
    "@semantic-release/github",
    "@semantic-release/npm",
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "atom",
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          ":bookmark: Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
