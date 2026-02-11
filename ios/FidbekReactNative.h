#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNFidbekReactNativeSpec.h"
@interface FidbekReactNative : NSObject <NativeFidbekReactNativeSpec>
#else
@interface FidbekReactNative : NSObject <RCTBridgeModule>
#endif

@end
