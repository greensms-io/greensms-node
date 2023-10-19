import type { Client } from '../../../api/client';
export type TReceiveParams = {
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
export type TReceiveResponse = {
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
export type TSendParams = {
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
export type TSendResponse = {
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
export type TStatusParams = {
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
export type TStatusResponse = {
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
export declare class V1_0 {
    private readonly client;
    private readonly schema;
    constructor(client: Client);
    receive(params: TReceiveParams): Promise<TReceiveResponse>;
    send(params: TSendParams): Promise<TSendResponse>;
    status(params: TStatusParams): Promise<TStatusResponse>;
}
