const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const packageRoot = path.resolve(projectRoot, '../..');

const config = {
  watchFolders: [packageRoot],
  resolver: {
    unstable_enableSymlinks: true,
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
    extraNodeModules: {
      '@saltware/fidbek-react-native': packageRoot,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
