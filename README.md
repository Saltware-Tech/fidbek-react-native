# @fidbek/react-native

Fidbek SDK bridge for React Native with TurboModule (New Architecture / JSI).

## Features

- React Native CLI support
- Expo support (development builds via `expo prebuild` / `expo run`)
- New Architecture only (TurboModule/JSI)
- API parity with native and Flutter wrappers:
  - `configure({ token, shakeToOpenEnabled })`
  - `open()`
  - `shutdown()`

## Install

```bash
npm install @fidbek/react-native
# or
yarn add @fidbek/react-native
```

## Local Development (Package Path)

If your app uses a local package path (for example `file:../fidbek-react-native`), keep the import as:

```ts
import Fidbek from '@fidbek/react-native';
```

Do not import by file-system path in app code.

### React Native CLI local setup

1. Install from local path in your app `package.json`:

```json
{
  "dependencies": {
    "@fidbek/react-native": "file:../fidbek-react-native"
  }
}
```

2. Add Metro config (`metro.config.js`) so symlinked package resolution works:

```js
const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const projectRoot = __dirname;
const packageRoot = path.resolve(projectRoot, '../fidbek-react-native');

const config = {
  watchFolders: [packageRoot],
  resolver: {
    unstable_enableSymlinks: true,
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
    extraNodeModules: {
      '@fidbek/react-native': packageRoot,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
```

3. If iOS build fails on `[CP] Embed Pods Frameworks` with symlink/codesign errors, patch your `ios/Podfile` `post_install` to replace `--links` with `--copy-links` in `Pods-<App>-frameworks.sh`:

```rb
post_install do |installer|
  react_native_post_install(installer, config[:reactNativePath], :mac_catalyst_enabled => false)

  frameworks_script_path = File.join(
    installer.sandbox.root,
    'Target Support Files',
    'Pods-YourAppName',
    'Pods-YourAppName-frameworks.sh'
  )

  if File.exist?(frameworks_script_path)
    content = File.read(frameworks_script_path)
    patched = content.gsub('--links --filter "- CVS/"', '--copy-links --filter "- CVS/"')
    File.write(frameworks_script_path, patched) if patched != content
  end
end
```

### Expo local setup

1. Install from local path in your Expo app:

```json
{
  "dependencies": {
    "@fidbek/react-native": "file:../fidbek-react-native"
  }
}
```

2. Add Metro config (`metro.config.js`) for local package resolution:

```js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const packageRoot = path.resolve(projectRoot, '../fidbek-react-native');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [packageRoot];
config.resolver.unstable_enableSymlinks = true;
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  '@fidbek/react-native': packageRoot,
};

module.exports = config;
```

## Architecture Support

- Supported: React Native New Architecture (`newArchEnabled=true`)
- Not supported: Old Architecture (legacy bridge)

## React Native CLI

### iOS

```bash
cd ios && pod install
```

### Android

No manual step is required after autolinking.

## Expo

This package contains custom native code. Use an Expo development build:

```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

`Expo Go` is not supported because the module includes native binaries.

Optional `app.json` plugin entry:

```json
{
  "expo": {
    "plugins": ["@fidbek/react-native"]
  }
}
```

## Usage

```ts
import Fidbek from '@fidbek/react-native';

await Fidbek.configure({
  token: 'YOUR_PUBLIC_TOKEN',
  shakeToOpenEnabled: true,
});

await Fidbek.open();

await Fidbek.shutdown();
```

## Requirements

- iOS 13+
- Android minSdk 24+
- React Native 0.75+ with New Architecture enabled
