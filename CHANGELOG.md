## 0.3.6

- Fixed Expo Android local Maven repository injection so development builds resolve bundled `com.fidbek:fidbek-android:0.3.0` correctly.
- Existing Expo projects should regenerate native folders after upgrading with `npx expo prebuild --clean`.
- No native binary change in this patch; bundled Android and iOS artifacts remain on `0.3.0` and `0.3.5`.

## 0.3.5

- Updated bundled iOS XCFramework and resources to native Fidbek SDK `0.3.5`.
- Includes the scripted native packaging pipeline and latest iOS binary rebuild.
- Keeps the React Native iOS podspec source glob fix from `0.3.3`.
- Android bundled native artifact remains on `0.3.0`.

## 0.3.3

- Fixed iOS podspec source glob to avoid pulling `FidbekSDK.xcframework` headers into wrapper sources.
- Resolves CocoaPods/Xcode `Multiple commands produce .../fidbek_react_native.framework/Headers/FidbekSDK-Swift.h`.
- Bundled native artifacts remain on `0.3.2` (iOS) and `0.3.0` (Android).

## 0.3.2

- Rebuilt the bundled iOS XCFramework from native source `0.3.2`.
- Removes stale module metadata from the packaged binary to avoid `missing required module 'CoreMotion'` installs.
- Android bundled native artifact remains on `0.3.0`.

## 0.3.1

- Removed stale `CoreMotion` linkage from the iOS podspec.
- Fixes iOS wrapper installations that could fail with `missing required module 'CoreMotion'`.
- No native binary change in this patch; bundled Fidbek SDK artifacts remain on native `0.3.0`.

## 0.3.0

- Updated bundled native binaries to Fidbek SDK `0.3.0` (Android AAR + iOS XCFramework).
- Added `identify` and `clearIdentity` to the documented wrapper surface.
- Wrapper API is now explicitly limited to the core 5 methods.

## 0.2.1

- Fixed iOS runtime crash caused by resource bundle name mismatch.
- iOS localization bundle is now packaged as `FidbekSDK_FidbekSDK.bundle`.

## 0.2.0

- Updated bundled native binaries to Fidbek SDK `0.2.0` (Android AAR + iOS XCFramework).
- Added native "How often does this happen?" frequency selector in the report flow.
- Improved reliability with device heartbeat ping queue and more resilient upload handling.
- Moved token validation to send/submit time for a smoother open flow.
- Bundled iOS localization resources (`en`, `tr`) via `FidbekSDKResources.bundle`.

## 0.1.5

- Updated bundled native binaries to Fidbek SDK `0.1.5` (Android AAR + iOS XCFramework).
- Keeps multi-media attachment and compact feedback UI improvements from latest native sources.

## 0.1.4

- Refreshed bundled native artifacts (Android AAR + iOS XCFramework).
- Added native support for multiple media attachments (gallery image/video pick + preview/edit flow).
- Kept automatic screenshot capture in feedback open flow.

## 0.1.3

- Refreshed bundled native artifacts (Android AAR + iOS XCFramework).
- Restored automatic screenshot capture in native feedback open flow.

## 0.1.2

- New Architecture-only enforcement at build level.
- TurboModule/JSI bridge only (no old bridge fallback).
- Expo development-build support with optional config plugin.
- Android startup/activity-tracker priming fixes for early open timing.
