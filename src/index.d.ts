export interface FidbekConfigureOptions {
  token: string;
  shakeToOpenEnabled?: boolean;
}

export interface FidbekModule {
  configure(options: FidbekConfigureOptions): Promise<void>;
  open(): Promise<void>;
  shutdown(): Promise<void>;
}

export declare function configure(options: FidbekConfigureOptions): Promise<void>;
export declare function open(): Promise<void>;
export declare function shutdown(): Promise<void>;

declare const Fidbek: FidbekModule;
export default Fidbek;
