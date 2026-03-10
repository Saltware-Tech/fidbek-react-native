export interface FidbekConfigureOptions {
  token: string;
  shakeToOpenEnabled?: boolean;
}

export interface FidbekIdentifyOptions {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
}

export interface FidbekModule {
  configure(options: FidbekConfigureOptions): Promise<void>;
  open(): Promise<void>;
  identify(options: FidbekIdentifyOptions): Promise<void>;
  clearIdentity(): Promise<void>;
  shutdown(): Promise<void>;
}

export declare function configure(options: FidbekConfigureOptions): Promise<void>;
export declare function open(): Promise<void>;
export declare function identify(options: FidbekIdentifyOptions): Promise<void>;
export declare function clearIdentity(): Promise<void>;
export declare function shutdown(): Promise<void>;

declare const Fidbek: FidbekModule;
export default Fidbek;
