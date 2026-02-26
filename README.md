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

await Fidbek.open();
```

## API

- `configure({ token: string, shakeToOpenEnabled?: boolean }): Promise<void>`
- `open(): Promise<void>`
- `shutdown(): Promise<void>`

## Troubleshooting

### `Unable to resolve "@saltware/fidbek-react-native"`

```bash
npm install
npx react-native start --reset-cache
```

### Android crash: `NoClassDefFoundError androidx.viewbinding.ViewBinding`

Use `@saltware/fidbek-react-native@0.2.1+` and clean build:

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Runtime: `Tried to show an alert while not attached to an Activity`

Call `open()` after app is foreground/resumed and after initial render cycle.

## Release Notes

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
