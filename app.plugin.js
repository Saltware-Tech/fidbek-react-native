 const path = require("path")
  const {
    createRunOncePlugin,
    withProjectBuildGradle,
  } = require("@expo/config-plugins")
  const pkg = require("./package.json")

  function withFidbek(config) {
    return withProjectBuildGradle(config, (config) => {
      if (config.modResults.language !== "groovy") {
        return config
      }

      const packageRoot = path.dirname(
        require.resolve("@saltware/fidbek-react-native/package.json", {
          paths: [config.modRequest.projectRoot],
        }),
      )

      const mavenRepoPath = path
        .relative(
          config.modRequest.platformProjectRoot,
          path.join(packageRoot, "android", "maven"),
        )
        .replace(/\\/g, "/")

      if (!config.modResults.contents.includes(mavenRepoPath)) {
        config.modResults.contents = config.modResults.contents.replace(
          /(allprojects\s*\{\s*repositories\s*\{)/m,
          `$1\n    maven { url = uri("${mavenRepoPath}") }`,
        )
      }

      return config
    })
  }

  module.exports = createRunOncePlugin(withFidbek, pkg.name, pkg.version)
