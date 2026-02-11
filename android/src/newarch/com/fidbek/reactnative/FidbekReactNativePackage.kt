package com.fidbek.reactnative

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class FidbekReactNativePackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == FidbekReactNativeModule.NAME) {
            FidbekReactNativeModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos = HashMap<String, ReactModuleInfo>()
            moduleInfos[FidbekReactNativeModule.NAME] = createReactModuleInfo(
                name = FidbekReactNativeModule.NAME,
                className = FidbekReactNativeModule::class.java.name,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                hasConstants = false,
                isCxxModule = false,
                isTurboModule = true
            )
            moduleInfos
        }
    }

    private fun createReactModuleInfo(
        name: String,
        className: String,
        canOverrideExistingModule: Boolean,
        needsEagerInit: Boolean,
        hasConstants: Boolean,
        isCxxModule: Boolean,
        isTurboModule: Boolean
    ): ReactModuleInfo {
        return try {
            val constructor = ReactModuleInfo::class.java.getDeclaredConstructor(
                String::class.java,
                String::class.java,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType
            )
            constructor.newInstance(
                name,
                className,
                canOverrideExistingModule,
                needsEagerInit,
                hasConstants,
                isCxxModule,
                isTurboModule
            )
        } catch (_: NoSuchMethodException) {
            val constructor = ReactModuleInfo::class.java.getDeclaredConstructor(
                String::class.java,
                String::class.java,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType,
                Boolean::class.javaPrimitiveType
            )
            @Suppress("DEPRECATION")
            constructor.newInstance(
                name,
                className,
                canOverrideExistingModule,
                needsEagerInit,
                isCxxModule,
                isTurboModule
            )
        }
    }
}
