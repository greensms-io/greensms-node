import * as Yup from 'yup';

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

const NUMBER_OR_UUID_REGEXP =
  /^(\d+)|([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/gi;

export class V1_0 {
  private readonly schema = {
    send: Yup.object().shape({
      amount: Yup.number().required().min(1).positive(),
      card: Yup.string().min(11).max(14),
      tag: Yup.string().min(1).max(36),
      to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    }),
    status: Yup.object().shape({
      extended: Yup.boolean(),
      id: Yup.string().required().min(1).max(36).matches(NUMBER_OR_UUID_REGEXP, 'Invalid Status'),
    }),
  };

  constructor(private readonly client: Client) {}

  send(params: TSendParams): Promise<TSendResponse> {
    return this.client.request<TSendResponse>('POST', ['pay', 'send'], this.schema.send, params);
  }

  status(params: TStatusParams): Promise<TStatusResponse> {
    return this.client.request<TStatusResponse>('GET', ['pay', 'status'], this.schema.status, params);
  }
}
