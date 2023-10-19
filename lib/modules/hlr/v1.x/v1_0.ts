import * as Yup from 'yup';

import type { Client } from '../../../api/client';

export type TSendParams = {
  /**
   * Phone number
   *
   * Size range: 11..14
   */
  to: string;
};

export type TSendResponse = {
  /**
   * Request ID may be used for status check
   */
  requestId: string;
};

export type TStatusParams = {
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

export type TStatusResponse = {
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

export class V1_0 {
  private readonly schema = {
    send: Yup.object().shape({
      to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    }),
    status: Yup.object().shape({
      id: Yup.string().required().length(36),
      to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    }),
  };

  constructor(private readonly client: Client) {}

  send(params: TSendParams): Promise<TSendResponse> {
    return this.client.request<TSendResponse>('POST', ['hlr', 'send'], this.schema.send, params);
  }

  status(params: TStatusParams): Promise<TStatusResponse> {
    return this.client.request<TStatusResponse>('GET', ['hlr', 'status'], this.schema.status, params);
  }
}
