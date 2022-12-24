declare enum APIVersion {
  V1 = "V1",
}

export interface GreenSMSRequestConfig {
  username?: string;
  password?: string;
  token?: string;
  useTokenForRequests?: boolean;
  version?: APIVersion;
}

export declare class GreenSMS {
  /**
   * Creates a GreenSMS Client Object
   * @constructor
   * @param GreenSMSOptions
   */
  constructor(GreenSMSOptions);
}
