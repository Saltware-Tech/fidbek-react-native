package com.fidbek.reactnative

import android.app.Application
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.fidbek.sdk.Fidbek

internal object FidbekBridge {
    fun configure(
        reactContext: ReactApplicationContext,
        token: String,
        shakeToOpenEnabled: Boolean,
        promise: Promise
    ) {
        if (token.isBlank()) {
            promise.reject("ERR_INVALID_ARGUMENT", "token is required")
            return
        }

        val application = reactContext.applicationContext as? Application
        if (application == null) {
            promise.reject("ERR_NO_APPLICATION", "Application context is unavailable")
            return
        }

        Fidbek.initialize(application, token, shakeToOpenEnabled)
        promise.resolve(null)
    }

    fun open(promise: Promise) {
        Fidbek.open()
        promise.resolve(null)
    }

    fun shutdown(promise: Promise) {
        Fidbek.shutdown()
        promise.resolve(null)
    }
}
