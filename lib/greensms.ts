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

export class GreenSMS extends Client {
  private _account!: Account;

  private _call!: Call;

  private _hlr!: Hrl;

  private _pay!: Pay;

  private _sms!: Sms;

  private _viber!: Viber;

  private _vk!: Vk;

  private _voice!: Voice;

  private _whatsapp!: WhatsApp;

  private _whois!: WhoIs;

  get account(): Account {
    return this._account ?? (this._account = new Account(this));
  }

  get call(): Call {
    return this._call ?? (this._call = new Call(this));
  }

  get hlr(): Hrl {
    return this._hlr ?? (this._hlr = new Hrl(this));
  }

  get pay(): Pay {
    return this._pay ?? (this._pay = new Pay(this));
  }

  get sms(): Sms {
    return this._sms ?? (this._sms = new Sms(this));
  }

  get viber(): Viber {
    return this._viber ?? (this._viber = new Viber(this));
  }

  get vk(): Vk {
    return this._vk ?? (this._vk = new Vk(this));
  }

  get voice(): Voice {
    return this._voice ?? (this._voice = new Voice(this));
  }

  get whatsapp(): WhatsApp {
    return this._whatsapp ?? (this._whatsapp = new WhatsApp(this));
  }

  get whois(): WhoIs {
    return this._whois ?? (this._whois = new WhoIs(this));
  }

  status(): Promise<TStatusResponse> {
    return this.request<TStatusResponse>('GET', ['status']);
  }
}
