import type { Client } from '../../../api/client';
export type TSendParams = {
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
export type TSendResponse = {
    /**
     * Request ID may be used for status check
     *
     * Size range: 36
     */
    requestId: string;
};
export type TStatusParams = {
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
export type TStatusResponse = {
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
export declare class V1_0 {
    private readonly client;
    private readonly schema;
    constructor(client: Client);
    send(params: TSendParams): Promise<TSendResponse>;
    status(params: TStatusParams): Promise<TStatusResponse>;
}
