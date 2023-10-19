import { Client } from './api/client';
import { Account } from './modules/account';
import { Call } from './modules/call';
import { Hrl } from './modules/hlr';
import { Pay } from './modules/pay';
import { Sms } from './modules/sms';
import { Viber } from './modules/viber';
import { Vk } from './modules/vk';
import { Voice } from './modules/voice';
import { WhatsApp } from './modules/whatsapp';
import { WhoIs } from './modules/whois';
type TStatusResponse = {
    /**
     * Server status
     */
    status: string;
};
export declare class GreenSMS extends Client {
    private _account;
    private _call;
    private _hlr;
    private _pay;
    private _sms;
    private _viber;
    private _vk;
    private _voice;
    private _whatsapp;
    private _whois;
    get account(): Account;
    get call(): Call;
    get hlr(): Hrl;
    get pay(): Pay;
    get sms(): Sms;
    get viber(): Viber;
    get vk(): Vk;
    get voice(): Voice;
    get whatsapp(): WhatsApp;
    get whois(): WhoIs;
    status(): Promise<TStatusResponse>;
}
export {};
