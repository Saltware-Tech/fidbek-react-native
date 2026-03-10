#import "FidbekReactNative.h"
#import <memory>

#if __has_include(<fidbek_react_native/fidbek_react_native-Swift.h>)
#import <fidbek_react_native/fidbek_react_native-Swift.h>
#else
#import "fidbek_react_native-Swift.h"
#endif

#ifndef RCT_NEW_ARCH_ENABLED
#error "@saltware/fidbek-react-native requires React Native New Architecture (TurboModules)."
#endif

@implementation FidbekReactNative

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_METHOD(configure:(NSString *)token
                  shakeToOpenEnabled:(BOOL)shakeToOpenEnabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  if (token == nil || token.length == 0) {
    reject(@"ERR_INVALID_ARGUMENT", @"token is required", nil);
    return;
  }

  [FidbekReactNativeBridge configureWithToken:token shakeToOpenEnabled:shakeToOpenEnabled];
  resolve(nil);
}

RCT_EXPORT_METHOD(open:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [FidbekReactNativeBridge presentWidget];
  resolve(nil);
}

RCT_EXPORT_METHOD(identify:(NSString * _Nullable)userId
                  name:(NSString * _Nullable)name
                  email:(NSString * _Nullable)email
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  BOOL hasUserId = userId != nil && userId.length > 0;
  BOOL hasName = name != nil && name.length > 0;
  BOOL hasEmail = email != nil && email.length > 0;
  if (!hasUserId && !hasName && !hasEmail) {
    reject(@"ERR_INVALID_ARGUMENT", @"At least one of userId, name, or email is required", nil);
    return;
  }

  [FidbekReactNativeBridge identifyWithUserId:userId name:name email:email];
  resolve(nil);
}

RCT_EXPORT_METHOD(clearIdentity:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [FidbekReactNativeBridge clearIdentity];
  resolve(nil);
}

RCT_EXPORT_METHOD(shutdown:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [FidbekReactNativeBridge stopWidget];
  resolve(nil);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeFidbekReactNativeSpecJSI>(params);
}

@end
