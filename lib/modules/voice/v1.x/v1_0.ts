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
   * Digits to be converted to Voice
   */
  txt: string;

  /**
   * Message language
   *
   * Default value: ru
   *
   * Allowed values: "ru", "en"
   */
  lang?: string;

  /**
   * User's custom tag for aggregating messages
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
   * Extended information: lang
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
   * Allowed values: "Status not ready", "Call success", "Call failure", "Call buffered", "Accepted for delivery", "Call rejected", "Status request expired"
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
      lang: Yup.string().oneOf(['ru', 'en']),
      tag: Yup.string().min(1).max(36),
      to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
      txt: Yup.string().required().min(1).max(5).matches(/^\d+$/, 'Invalid Code'),
    }),
    status: Yup.object().shape({
      extended: Yup.boolean(),
      id: Yup.string().required().length(36),
    }),
  };

  constructor(private readonly client: Client) {}

  send(params: TSendParams): Promise<TSendResponse> {
    return this.client.request<TSendResponse>('GET', ['voice', 'send'], this.schema.send, params);
  }

  status(params: TStatusParams): Promise<TStatusResponse> {
    return this.client.request<TStatusResponse>('GET', ['voice', 'status'], this.schema.status, params);
  }
}
