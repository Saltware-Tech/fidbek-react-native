import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  configure(token: string, shakeToOpenEnabled: boolean): Promise<void>;
  open(): Promise<void>;
  shutdown(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('FidbekReactNative');
