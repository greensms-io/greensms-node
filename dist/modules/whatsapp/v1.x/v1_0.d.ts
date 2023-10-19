import type { Client } from '../../../api/client';
export type TSendParams = {
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
export type TWebhookParams = {
    /**
     * Webhook url all Whatsapp statuses and replies will be sent to
     *
     * Size range: 11..256
     */
    url: string;
};
export type TWebhookResponse = {
    /**
     * OK
     */
    status: string;
};
export declare class V1_0 {
    private readonly client;
    private readonly schema;
    constructor(client: Client);
    send(params: TSendParams): Promise<TSendResponse>;
    webhook(params: TWebhookParams): Promise<TWebhookResponse>;
    status(params: TStatusParams): Promise<TStatusResponse>;
}
