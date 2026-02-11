# @saltware/fidbek-react-native

Fidbek SDK bridge for React Native with TurboModule (New Architecture / JSI).

## Architecture Support

- Supported: React Native New Architecture (`newArchEnabled=true`)
- Not supported: Old Architecture (legacy bridge)

## React Native CLI Setup

1. Install package:

```bash
npm install @saltware/fidbek-react-native
# or
yarn add @saltware/fidbek-react-native
```

2. Install iOS pods:

```bash
cd ios && pod install
```

3. Android has no extra manual step after autolinking.

## Expo Setup

1. Install package:

```bash
npm install @saltware/fidbek-react-native
# or
yarn add @saltware/fidbek-react-native
```

2. (Optional) Add plugin in `app.json`:

```json
{
  "expo": {
    "plugins": ["@saltware/fidbek-react-native"]
  }
}
```

3. Create a development build:


```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

`Expo Go` is not supported because the module includes native binaries.
