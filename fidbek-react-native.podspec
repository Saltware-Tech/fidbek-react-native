require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "fidbek-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = "UNLICENSED"
  s.authors      = { "Fidbek" => "support@fidbek.com" }
  s.source       = { :git => package.dig("repository", "url"), :tag => s.version }

  s.platforms    = { :ios => "13.0" }
  s.swift_version = "5.9"
  s.static_framework = true

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.vendored_frameworks = "ios/FidbekSDK.xcframework"

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
  end

  s.pod_target_xcconfig = {
    "DEFINES_MODULE" => "YES"
  }
end
