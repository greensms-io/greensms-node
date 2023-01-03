declare enum APIVersion {
  V1 = "V1",
}

export interface GreenSMSOptions {
  user?: string;
  pass?: string;
  token?: string;
  useTokenForRequests?: boolean;
  version?: APIVersion;
  camelCaseResponse?: boolean;
}

export declare class GreenSMS {
  /**
   * Creates a GreenSMS Client Object
   * @constructor
   * @param GreenSMSOptions
   */
  constructor(options: GreenSMSOptions);
}
