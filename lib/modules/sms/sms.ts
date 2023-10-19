import type { Client } from 'api/client';

import { V1_0 } from './v1.x';

export class Sms {
  private _v1!: V1_0;

  constructor(private readonly client: Client) {}

  get v1() {
    return this._v1 ?? (this._v1 = new V1_0(this.client));
  }
}
