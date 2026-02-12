package com.fidbek.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = FidbekReactNativeModule.NAME)
class FidbekReactNativeModule(
    private val reactContext: ReactApplicationContext
) : NativeFidbekReactNativeSpec(reactContext) {
    override fun getName(): String = NAME

    override fun configure(token: String, shakeToOpenEnabled: Boolean, promise: Promise) {
        FidbekBridge.configure(reactContext, token, shakeToOpenEnabled, promise)
    }

    override fun open(promise: Promise) {
        FidbekBridge.open(reactContext, promise)
    }

    override fun shutdown(promise: Promise) {
        FidbekBridge.shutdown(promise)
    }

    companion object {
        const val NAME = "FidbekReactNative"
    }
}
