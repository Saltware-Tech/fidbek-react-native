package com.fidbek.reactnative

import android.app.Activity
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
        primeSdkActivityTracker(reactContext.currentActivity)
        promise.resolve(null)
    }

    fun open(reactContext: ReactApplicationContext, promise: Promise) {
        val currentActivity = reactContext.currentActivity
        if (currentActivity == null) {
            promise.reject("ERR_NO_CURRENT_ACTIVITY", "Current activity is unavailable")
            return
        }

        primeSdkActivityTracker(currentActivity)
        Fidbek.open()
        promise.resolve(null)
    }

    fun identify(userId: String?, name: String?, email: String?, promise: Promise) {
        if (userId.isNullOrBlank() && name.isNullOrBlank() && email.isNullOrBlank()) {
            promise.reject("ERR_INVALID_ARGUMENT", "At least one of userId, name, or email is required")
            return
        }

        Fidbek.identify(userId, name, email)
        promise.resolve(null)
    }

    fun clearIdentity(promise: Promise) {
        Fidbek.clearIdentity()
        promise.resolve(null)
    }

    fun shutdown(promise: Promise) {
        Fidbek.shutdown()
        promise.resolve(null)
    }

    private fun primeSdkActivityTracker(activity: Activity?) {
        if (activity == null) {
            return
        }

        try {
            val trackerField = Fidbek::class.java.getDeclaredField("activityTracker")
            trackerField.isAccessible = true
            val tracker = trackerField.get(null) ?: return

            val onResumed = tracker.javaClass.getMethod("onActivityResumed", Activity::class.java)
            onResumed.invoke(tracker, activity)
        } catch (_: Throwable) {
            // Best-effort priming only.
        }
    }
}
