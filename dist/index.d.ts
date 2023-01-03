declare enum APIVersion {
  V1 = "V1",
}

interface GreenSMSOptions {
  user?: string;
  pass?: string;
  token?: string;
  useTokenForRequests?: boolean;
  version?: APIVersion;
  camelCaseResponse?: boolean;
}

declare class GreenSMS {
  /**
   * Creates a GreenSMS Client Object
   * @constructor
   * @param GreenSMSOptions
   */
  constructor(options: GreenSMSOptions);
}

export { GreenSMS, GreenSMSOptions };
