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

export async function identify(options) {
  const userId =
    typeof options?.userId === 'string' && options.userId.trim().length > 0
      ? options.userId.trim()
      : null;
  const name =
    typeof options?.name === 'string' && options.name.trim().length > 0
      ? options.name.trim()
      : null;
  const email =
    typeof options?.email === 'string' && options.email.trim().length > 0
      ? options.email.trim()
      : null;
  if (!userId && !name && !email) {
    throw new Error('At least one of userId, name, or email is required');
  }

  return NativeFidbekReactNative.identify(userId, name, email);
}

export function clearIdentity() {
  return NativeFidbekReactNative.clearIdentity();
}

export function shutdown() {
  return NativeFidbekReactNative.shutdown();
}

const Fidbek = {
  configure,
  open,
  identify,
  clearIdentity,
  shutdown,
};

export default Fidbek;
