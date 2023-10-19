declare namespace Account {
  type TTokenParams = {
    /**
     * Token expiration time in seconds. Unlimited if not set.
     */
    expire?: number;
  };

  type TBalanceResponse = {
    /**
     * Current account balance
     */
    balance: number;
  };

  type TTokenResponse = {
    /**
     * JWT API token
     */
    accessToken: string;
  };

  type TTariff = {
    /**
     * Country name
     */
    countryName: string;

    /**
     * Country ISO code
     *
     * Size range: 2
     */
    countryCode: string;

    /**
     * Operator name
     */
    operatorName: string;

    /**
     * Mobile Country Code
     *
     * Size range: 3
     */
    mcc: number;

    /**
     * Mobile Network Code
     *
     * Size range: 1..3
     */
    mnc: number;

    /**
     * SMS price
     */
    priceSms: number;

    /**
     * SMS template price
     */
    priceSmsTemplate: number;

    /**
     * CALL price
     */
    priceCall: number;

    /**
     * VOICE price
     */
    priceVoice: number;
  };

  type TTariffResponse = {
    /**
     * Service price list
     */
    tariff: TTariff[];
  };

  class V1_0 {
    balance(): Promise<TBalanceResponse>;

    token(params: TTokenParams): Promise<TTokenResponse>;

    tariff(): Promise<TTariffResponse>;
  }

  class Account {
    get v1(): V1_0;
  }
}

declare namespace Call {
  type TReceiveParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Use toll-free numbers with one of the following three-digit codes: 800, 888, 877, 866, 855, 844 or 833. Examples: 88001234567 or 18001234567
     *
     * Default value: true
     */
    tollFree?: boolean;

    /**
     * User's custom tag for aggregating messages
     *
     * Size range: ..36
     */
    tag?: string;
  };

  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * If call answered spell audio code
     *
     * Default value: true
     */
    voice?: boolean;

    /**
     * Voice message language
     *
     * Default value: ru
     *
     * Allowed values: "ru", "en"
     */
    lang?: string;

    /**
     * User's custom tag for aggregating messages
     *
     * Size range: ..36
     */
    tag?: string;
  };

  type TStatusParams = {
    /**
     * Request ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: MCC, MNC, region, tag, code
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TReceiveResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;

    /**
     * Phone number to call
     *
     * Size range: 11..14
     */
    number: string;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;

    /**
     * Last 4-digit of Caller-ID
     *
     * Size range: 4
     */
    code: string;
  };

  type TStatusResponse = {
    /**
     * Status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Call success", "Call failure", "Call buffered", "Accepted for delivery", "Call rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 4, 8, 16, 34
     */
    statusCode: number;
  };

  class V1_0 {
    receive(params: TReceiveParams): Promise<TReceiveResponse>;

    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Call {
    get v1(): V1_0;
  }
}

declare namespace Hrl {
  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;
  };

  type TStatusParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Request ID
     *
     * Size range: 36
     */
    id: string;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     */
    requestId: string;
  };

  type TStatusResponse = {
    /**
     * Status code
     *
     * Default value: 8
     *
     * Size range: ..2
     *
     * Allowed values: 1, 2, 4, 8, 16
     */
    status: number;

    /**
     * IMSI SIM-card code
     *
     * Size range: ..15
     */
    imsi: number;

    /**
     * MSC code
     *
     * Size range: 1..12
     */
    msc: number;

    /**
     * MCC code
     *
     * Size range: 1..3
     */
    mcc: number;

    /**
     * MNC code
     *
     * Size range: 1..3
     */
    mnc: number;

    /**
     * Country name
     */
    cn: string;

    /**
     * Network information
     */
    net: string;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Hrl {
    get v1(): V1_0;
  }
}

declare namespace Pay {
  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Amount to be sent
     */
    amount: number;

    /**
     * Card number may be used instead of Phone number
     *
     * Size range: 11..14
     */
    card?: string;

    /**
     * User's custom tag for messages aggregating
     *
     * Size range: ..36
     */
    tag?: string;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
  };

  type TStatusParams = {
    /**
     * Request ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: MCC, MNC, region, tag
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Transaction success", "Transaction failure", "Transaction buffered", "Transaction accepted for delivery", "Transaction rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 4, 8, 16, 34
     */
    statusCode: number;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Pay {
    get v1(): V1_0;
  }
}

declare namespace Sms {
  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Message text
     *
     * Size range: 1..918
     */
    txt: string;

    /**
     * Sender pre-approved shortname
     *
     * Default value: GREENSMS
     *
     * Size range: ..11
     */
    from?: string;

    /**
     * User's custom tag for aggregating messages
     *
     * Size range: ..36
     */
    tag?: string;

    /**
     * Message substring that shouldn't be shown in history
     *
     * Size range: ..918
     */
    hidden?: string;
  };

  type TStatusParams = {
    /**
     * Message ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: number of SMS parts, MCC, MNC, region, tag
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
  };

  type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Delivery success", "Delivery failure", "Message buffered", "Delivery accepted", "Delivery rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 4, 8, 16, 34
     */
    statusCode: number;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Sms {
    get v1(): V1_0;
  }
}

declare namespace Viber {
  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Message text
     */
    txt: string;

    /**
     * Sender pre-approved shortname
     *
     * Default value: GREENSMS
     *
     * Size range: 1..11
     */
    from?: string;

    /**
     * Comma-separated ordered list. If message delivery fails then resend via next route.
     *
     * Allowed values: "sms", "voice"
     */
    cascade?: string;
  };

  type TStatusParams = {
    /**
     * Message ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: MCC, MNC, region, tag
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
  };

  type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Delivery success", "Delivery failure", "Message read", "Message buffered", "Delivery accepted", "Delivery rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 3, 4, 8, 16, 34
     */
    statusCode: number;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Viber {
    get v1(): V1_0;
  }
}

declare namespace Vk {
  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Message text
     *
     * Size range: 1..2048
     */
    txt: string;

    /**
     * Sender pre-approved shortname
     *
     * Size range: 1..11
     */
    from: string;

    /**
     * User's custom tag for aggregating messages
     *
     * Size range: ..36
     */
    tag?: string;

    /**
     * Comma-separated ordered list. If message delivery fails then resend via next route.
     *
     * Allowed values: "viber", "sms", "voice"
     */
    cascade?: string;
  };

  type TStatusParams = {
    /**
     * Message ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: MCC, MNC, region, tag
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
  };

  type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Delivery success", "Delivery failure", "Message read", "Message buffered", "Delivery accepted", "Delivery rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 3, 4, 8, 16, 34
     */
    statusCode: number;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Vk {
    get v1(): V1_0;
  }
}

declare namespace Voice {
  type TSendParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Digits to be converted to Voice
     */
    txt: string;

    /**
     * Message language
     *
     * Default value: ru
     *
     * Allowed values: "ru", "en"
     */
    lang?: string;

    /**
     * User's custom tag for aggregating messages
     *
     * Size range: ..36
     */
    tag?: string;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
  };

  type TStatusParams = {
    /**
     * Message ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: lang
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Call success", "Call failure", "Call buffered", "Accepted for delivery", "Call rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 4, 8, 16, 34
     */
    statusCode: number;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class Voice {
    get v1(): V1_0;
  }
}

declare namespace WhatsApp {
  type TSendParams = {
    /**
     * WhatsApp account
     */
    from: string;

    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;

    /**
     * Message with verified template: @template: 2265f0d8-1481-4fb5-a236-55aa63cd4ac1 { [[variable1]]; [[variable2]] } where 2265f0d8-1481-4fb5-a236-55aa63cd4ac1 is template ID
     *
     * Size range: 1..10000
     */
    txt: string;

    /**
     * File URL link. Accepted filetypes: pdf, do*, xl, ppt, sx*, od*, jpeg, jpg, png, aac, mp4, amr, mpeg, ogg, mp4, 3gpp; 50MB size max (can't be used with 'txt')
     *
     * Size range: ..256
     */
    file?: string;

    /**
     * User's custom tag for messages aggregating
     *
     * Size range: ..36
     */
    tag?: string;
  };

  type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
  };

  type TStatusParams = {
    /**
     * Message ID
     *
     * Size range: 36
     */
    id: string;

    /**
     * Extended information: MCC, MNC, region, tag
     *
     * Default value: true
     */
    extended?: boolean;
  };

  type TStatusResponse = {
    /**
     * Request status time
     */
    time: string;

    /**
     * Status
     *
     * Default value: Status not ready
     *
     * Allowed values: "Status not ready", "Delivery success", "Delivery failure", "Message read", "Message buffered", "Delivery accepted", "Delivery rejected", "Status request expired"
     */
    status: string;

    /**
     * Status code
     *
     * Default value: 0
     *
     * Size range: 1..2
     *
     * Allowed values: 0, 1, 2, 3, 4, 8, 16, 34
     */
    statusCode: number;
  };

  type TWebhookParams = {
    /**
     * Webhook url all Whatsapp statuses and replies will be sent to
     *
     * Size range: 11..256
     */
    url: string;
  };

  type TWebhookResponse = {
    /**
     * OK
     */
    status: string;
  };

  class V1_0 {
    send(params: TSendParams): Promise<TSendResponse>;

    webhook(params: TWebhookParams): Promise<TWebhookResponse>;

    status(params: TStatusParams): Promise<TStatusResponse>;
  }

  class WhatsApp {
    get v1(): V1_0;
  }
}

declare namespace WhoIs {
  type TLookupParams = {
    /**
     * Phone number
     *
     * Size range: 11..14
     */
    to: string;
  };
  type TLookupResponse = {
    /**
     * DEF-code
     *
     * Size range: 3
     */
    def: number;

    /**
     * First number
     *
     * Size range: 1..9
     */
    begin: number;

    /**
     * Last number
     *
     * Size range: 1..9
     */
    end: number;

    /**
     * Number capacity
     *
     * Size range: 1..9
     */
    capacity: number;

    /**
     * Mobile operator
     *
     * Size range: 1..255
     */
    operator: string;

    /**
     * Operator region
     *
     * Size range: 1..255
     */
    region: string;

    /**
     * If number was transferred
     */
    isTransferred: boolean;
  };
  class V1_0 {
    lookup(params: TLookupParams): Promise<TLookupResponse>;
  }

  class WhoIs {
    get v1(): V1_0;
  }
}

export type { Account, Call, Hrl, Pay, Sms, Viber, Vk, Voice, WhatsApp, WhoIs };

export type TGreenSMSOptions = {
  user?: string | null;
  pass?: string | null;
  token?: string | null;
};

declare class GreenSMS {
  constructor({ user, pass, token }?: TGreenSMSOptions);
  get account(): Account.Account;
  get call(): Call.Call;
  get hlr(): Hrl.Hrl;
  get pay(): Pay.Pay;
  get sms(): Sms.Sms;
  get viber(): Viber.Viber;
  get vk(): Vk.Vk;
  get voice(): Voice.Voice;
  get whatsapp(): WhatsApp.WhatsApp;
  get whois(): WhoIs.WhoIs;
  status(): Promise<TStatusResponse>;
}

export type TStatusResponse = {
  /**
   * Server status
   */
  status: string;
};
export { GreenSMS as default };
