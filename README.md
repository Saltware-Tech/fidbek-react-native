# @saltware/fidbek-react-native

React Native TurboModule bridge for Fidbek mobile SDK.

## Architecture Policy

- Supported: React Native New Architecture (`newArchEnabled=true`)
- Supported bridge type: TurboModule / JSI
- Not supported: Old Architecture (legacy bridge)

## Install

```bash
npm install @saltware/fidbek-react-native
# or
yarn add @saltware/fidbek-react-native
```

## React Native CLI Setup

1. Ensure New Architecture is enabled.

In `android/gradle.properties`:

```properties
newArchEnabled=true
```

2. Install iOS pods:

```bash
cd ios
pod install
```

3. Run app:

```bash
npx react-native run-ios
npx react-native run-android
```

Notes:

- Android and iOS use autolinking
- No manual package registration needed
- No custom Metro config required

## Expo Setup (Development Build)

1. Install package:

```bash
npm install @saltware/fidbek-react-native
```

2. In `app.json`, enable New Architecture. Plugin is optional.

```json
{
  "expo": {
    "newArchEnabled": true,
    "plugins": ["@saltware/fidbek-react-native"]
  }
}
```

3. Build native projects:

```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

Notes:

- Expo Go is not supported (native binaries required)
- Plugin is currently a no-op; kept optional for forward compatibility

## Usage

```ts
import Fidbek from '@saltware/fidbek-react-native';

await Fidbek.configure({
  token: 'YOUR_PUBLIC_TOKEN',
  shakeToOpenEnabled: true,
});

await Fidbek.identify({
  email: 'talha@example.com',
});

await Fidbek.open();
```

## API

- `configure({ token: string, shakeToOpenEnabled?: boolean }): Promise<void>`
- `open(): Promise<void>`
- `identify({ userId?: string | null, name?: string | null, email?: string | null }): Promise<void>`
- `clearIdentity(): Promise<void>`
- `shutdown(): Promise<void>`

At least one of `userId`, `name`, or `email` is required for `identify`.

## Surface Policy

- Wrapper surface is intentionally limited to `configure`, `open`, `identify`, `clearIdentity`, and `shutdown`.
- Native attachment staging helpers are not exposed in React Native.

## Troubleshooting

### `Unable to resolve "@saltware/fidbek-react-native"`

```bash
npm install
npx react-native start --reset-cache
```

### Android crash: `NoClassDefFoundError androidx.viewbinding.ViewBinding`

Use `@saltware/fidbek-react-native@0.3.2+` and clean build:

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### iOS build: `Multiple commands produce ... FidbekSDK-Swift.h`

Use `@saltware/fidbek-react-native@0.3.3+` and reinstall pods:

```bash
npm install @saltware/fidbek-react-native@latest
cd ios
pod install
```

### Runtime: `Tried to show an alert while not attached to an Activity`

Call `open()` after app is foreground/resumed and after initial render cycle.

## Release Notes

### 0.3.3

- Fixed iOS podspec source glob so XCFramework headers are not compiled as wrapper sources.
- Resolves `Multiple commands produce .../fidbek_react_native.framework/Headers/FidbekSDK-Swift.h`.
- No native binary change in this patch.

### 0.3.2

- Rebuilt the bundled iOS XCFramework from native source `0.3.2`.
- Removes stale module metadata from the packaged binary to avoid `missing required module 'CoreMotion'` installs.
- Android bundled native artifact remains on `0.3.0`.

### 0.3.1

- Removed stale `CoreMotion` linkage from the iOS podspec.
- Fixes iOS installs that could fail with `missing required module 'CoreMotion'`.
- Bundled native SDK artifacts remain on `0.3.0`.

### 0.3.0

- Updated bundled native binaries to Fidbek SDK `0.3.0` (Android + iOS).
- Documented `identify` and `clearIdentity` as part of the supported wrapper surface.
- Wrapper API is now explicitly limited to the core 5 methods.

### 0.2.1

- Fixed iOS runtime crash caused by resource bundle name mismatch.
- iOS localization bundle is now packaged as `FidbekSDK_FidbekSDK.bundle`.

### 0.2.0

- Updated bundled native binaries to Fidbek SDK `0.2.0` (Android + iOS).
- Added native issue frequency selector.
- Added device heartbeat ping queue with improved upload resilience.
- Token validation now runs at report send time.
- Includes iOS localization resources for English and Turkish.

### 0.1.5

- Updated bundled native binaries to Fidbek SDK `0.1.5` (Android + iOS).
- Includes latest native feedback UI/media flow improvements.
