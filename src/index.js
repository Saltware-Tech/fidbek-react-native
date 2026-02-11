import NativeFidbekReactNative from './NativeFidbekReactNativeModule';

function assertToken(token) {
  if (typeof token !== 'string' || token.trim().length === 0) {
    throw new Error('token is required');
  }
}

export async function configure(options) {
  const token = options?.token;
  assertToken(token);

  const shakeToOpenEnabled =
    typeof options?.shakeToOpenEnabled === 'boolean'
      ? options.shakeToOpenEnabled
      : true;

  return NativeFidbekReactNative.configure(token, shakeToOpenEnabled);
}

export function open() {
  return NativeFidbekReactNative.open();
}

export function shutdown() {
  return NativeFidbekReactNative.shutdown();
}

const Fidbek = {
  configure,
  open,
  shutdown,
};

export default Fidbek;
