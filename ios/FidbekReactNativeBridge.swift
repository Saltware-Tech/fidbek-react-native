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
  public static func stopWidget() {
    Fidbek.shared.stop()
  }
}
