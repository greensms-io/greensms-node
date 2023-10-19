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
export class GreenSMS extends Client {
    _account;
    _call;
    _hlr;
    _pay;
    _sms;
    _viber;
    _vk;
    _voice;
    _whatsapp;
    _whois;
    get account() {
        return this._account ?? (this._account = new Account(this));
    }
    get call() {
        return this._call ?? (this._call = new Call(this));
    }
    get hlr() {
        return this._hlr ?? (this._hlr = new Hrl(this));
    }
    get pay() {
        return this._pay ?? (this._pay = new Pay(this));
    }
    get sms() {
        return this._sms ?? (this._sms = new Sms(this));
    }
    get viber() {
        return this._viber ?? (this._viber = new Viber(this));
    }
    get vk() {
        return this._vk ?? (this._vk = new Vk(this));
    }
    get voice() {
        return this._voice ?? (this._voice = new Voice(this));
    }
    get whatsapp() {
        return this._whatsapp ?? (this._whatsapp = new WhatsApp(this));
    }
    get whois() {
        return this._whois ?? (this._whois = new WhoIs(this));
    }
    status() {
        return this.request('GET', ['status']);
    }
}
//# sourceMappingURL=greensms.js.map