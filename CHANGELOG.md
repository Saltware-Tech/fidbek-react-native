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
