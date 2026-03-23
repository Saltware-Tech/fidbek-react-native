 const path = require("path")
  const {
    createRunOncePlugin,
    withProjectBuildGradle,
  } = require("@expo/config-plugins")
  const pkg = require("./package.json")

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

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
      const injectedRepo = `maven { url = uri(rootProject.file("${mavenRepoPath}")) }`
      const legacyRepoPattern = new RegExp(
        `maven\\s*\\{\\s*url\\s*=\\s*uri\\("${escapeRegExp(mavenRepoPath)}"\\)\\s*\\}`,
      )

      if (!config.modResults.contents.includes(injectedRepo)) {
        config.modResults.contents = config.modResults.contents.replace(
          legacyRepoPattern,
          injectedRepo,
        )
      }

      if (!config.modResults.contents.includes(injectedRepo)) {
        config.modResults.contents = config.modResults.contents.replace(
          /(allprojects\s*\{\s*repositories\s*\{)/m,
          `$1\n    ${injectedRepo}`,
        )
      }

      return config
    })
  }

  module.exports = createRunOncePlugin(withFidbek, pkg.name, pkg.version)
