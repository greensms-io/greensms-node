import type { Client } from '../../../api/client';
export type TBalanceResponse = {
    /**
     * Current account balance
     */
    balance: number;
};
export type TTariff = {
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
export type TTariffResponse = {
    /**
     * Service price list
     */
    tariff: TTariff[];
};
export type TTokenParams = {
    /**
     * Token expiration time in seconds. Unlimited if not set.
     */
    expire?: number;
};
export type TTokenResponse = {
    /**
     * JWT API token
     */
    accessToken: string;
};
export declare class V1_0 {
    private readonly client;
    private readonly schema;
    constructor(client: Client);
    balance(): Promise<TBalanceResponse>;
    token(params: TTokenParams): Promise<TTokenResponse>;
    tariff(): Promise<TTariffResponse>;
}
