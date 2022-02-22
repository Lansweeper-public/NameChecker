const { createReleaseConfig } = require("@lansweeper/semantic-release-config");
const { version: previousVersion } = require("./package.json");

module.exports = createReleaseConfig({
  commitAssets: ["sonar-project.properties"],
  execOptions: {
    prepareCmd: `sed -i "s|${previousVersion}|\${nextRelease.version}|g" sonar-project.properties`,
    publishCmd: "touch .released",
  },
});
