import * as Yup from 'yup';

import type { Client } from '../../../api/client';

export type TLookupParams = {
  /**
   * Phone number
   *
   * Size range: 11..14
   */
  to: string;
};

export type TLookupResponse = {
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

export class V1_0 {
  private readonly schema = {
    lookup: Yup.object().shape({
      to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    }),
  };

  constructor(private readonly client: Client) {}

  lookup(params: TLookupParams): Promise<TLookupResponse> {
    return this.client.request<TLookupResponse>('GET', ['whois', 'lookup'], this.schema.lookup, params);
  }
}
