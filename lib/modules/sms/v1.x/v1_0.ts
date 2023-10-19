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
   * Message text
   *
   * Size range: 1..918
   */
  txt: string;

  /**
   * Sender pre-approved shortname
   *
   * Default value: GREENSMS
   *
   * Size range: ..11
   */
  from?: string;

  /**
   * User's custom tag for aggregating messages
   *
   * Size range: ..36
   */
  tag?: string;

  /**
   * Message substring that shouldn't be shown in history
   *
   * Size range: ..918
   */
  hidden?: string;
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
   * Extended information: number of SMS parts, MCC, MNC, region, tag
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
   * Allowed values: "Status not ready", "Delivery success", "Delivery failure", "Message buffered", "Delivery accepted", "Delivery rejected", "Status request expired"
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

export class V1_0 {
  private readonly schema = {
    send: Yup.object().shape({
      from: Yup.string().min(1).max(11),
      hidden: Yup.string().min(1).max(918),
      tag: Yup.string().min(1).max(36),
      to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
      txt: Yup.string().required().min(1),
    }),
    status: Yup.object().shape({
      extended: Yup.boolean(),
      id: Yup.string().required().length(36),
    }),
  };

  constructor(private readonly client: Client) {}

  send(params: TSendParams): Promise<TSendResponse> {
    return this.client.request<TSendResponse>('GET', ['sms', 'send'], this.schema.send, params);
  }

  status(params: TStatusParams): Promise<TStatusResponse> {
    return this.client.request<TStatusResponse>('GET', ['sms', 'status'], this.schema.status, params);
  }
}
