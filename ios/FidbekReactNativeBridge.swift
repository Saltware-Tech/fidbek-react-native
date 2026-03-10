import Foundation
import FidbekSDK

@objc(FidbekReactNativeBridge)
public final class FidbekReactNativeBridge: NSObject {
  @objc
  public static func configure(token: String, shakeToOpenEnabled: Bool) {
    Fidbek.shared.configure(token: token, shakeToOpenEnabled: shakeToOpenEnabled)
  }

  @objc
  public static func presentWidget() {
    Fidbek.shared.present()
  }

  @objc
  public static func identify(userId: String?, name: String?, email: String?) {
    Fidbek.shared.identify(userId: userId, name: name, email: email)
  }

  @objc
  public static func clearIdentity() {
    Fidbek.shared.clearIdentity()
  }

  @objc
  public static func stopWidget() {
    Fidbek.shared.stop()
  }
}
