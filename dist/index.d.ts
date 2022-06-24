type SnakeToCamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeToCamelCase<P3>}`
    : Lowercase<S>

type ObjectSnakeToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<string &K>]: T[K] extends Record<string, any> ? ObjectSnakeToCamelCase<T[K]> : T[K]
}

declare enum APIVersion {
  V1 = "V1",
}

/**
 * @summary Initialize GreenSMS Client Options
 */
export interface GreenSMSOptions<CC extends boolean> {
  /**
   * @summary Username. Required when AuthToken is not passed
   */
  user?: string | null
  /**
   * @summary Password. Request when AuthToken is not passed
   */
  pass?: string | null
  /**
   * @summary AuthToken. Required when Username/Password not passed
   */
  token?: string | null
  /**
   * @summary Create Auth Token after login and use for subsequent requests
   */
  useTokenForRequests?: boolean
  /**
   * @summary API Version to be used
   */
  version?: APIVersion
  /**
   * @summary Lead the response properties to camel case
   */
  camelCaseResponse?: CC
}

export type StatusCode = 0 | 1 | 2 | 4 | 8 | 16 | 34

export type HlrStatus = 1 | 2 | 4 | 8 | 16

declare enum Status {
  "Status not ready" = "Status not ready",
  "Call success" = "Call success",
  "Call failure" = "Call failure",
  "Call buffered" = "Call buffered",
  "Call accepted" = "Call accepted",
  "Call rejected" = "Call rejected",
  "Status request expired" = "Status request expired"
}

export interface StatusResponse {
  time: string,
  status_code: StatusCode,
  status: Status
}

export interface RequestIdResponse {
  request_id: string
}

export interface ToParams {
  to: string
}

export interface StatusParams {
  id: string
  extended: boolean
}

export interface AccountTokenParams {
  expire?: number
}

export interface AccountTokenResponse {
  access_token: string
}

export interface CallSendResponse {
  request_id: string
  code: string
  request_status: string
}

export interface WhoisLookupResponse {
  def: number
  begin: number
  end: number
  capacity: number
  operator: string
  region: string
  is_transferred: boolean
}

export interface HlrStatusResponse {
  status: HlrStatus
  imsi: number
  msc: number
  mcc: number
  mnc: number
  cn: string
  net: string
}

export interface VoiceSendParams {
  to: string
  txt: string
  lang?: 'ru' | 'en'
}

export interface PaySendParams {
  to: string
  amount: number
  tag?: string
}

export interface SMSSendParams {
  to: string
  txt: string
  from?: string
  tag?: string
  hidden?: string
}

export interface ViberSendParams {
  to: string
  txt: string
  from?: string
  cascade?: 'sms' | 'voice'
}

declare class GreenSMS<CC extends boolean = false> {

  account: {
    token: (params?: AccountTokenParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<AccountTokenResponse> : AccountTokenResponse>
  }

  call: {
    send: (params: ToParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<CallSendResponse> : CallSendResponse>
    status: (params: StatusParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<StatusResponse> : StatusResponse>
  }

  whois: {
    lookup: (params: ToParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<WhoisLookupResponse> : WhoisLookupResponse>
  }

  hlr: {
    send: (params: ToParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<RequestIdResponse> : RequestIdResponse>
    status: (params: StatusParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<HlrStatusResponse> : HlrStatusResponse>
  }

  voice: {
    send: (params: VoiceSendParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<RequestIdResponse> : RequestIdResponse>
    status: (params: StatusParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<StatusResponse> : StatusResponse>
  }

  pay: {
    send: (params: PaySendParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<RequestIdResponse> : RequestIdResponse>
    status: (params: StatusParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<StatusResponse> : StatusResponse>
  }

  sms: {
    send: (params: SMSSendParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<RequestIdResponse> : RequestIdResponse>
    status: (params: StatusParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<StatusResponse> : StatusResponse>
  }

  viber: {
    send: (params: ViberSendParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<RequestIdResponse> : RequestIdResponse>
    status: (params: StatusParams) => Promise<CC extends true ? ObjectSnakeToCamelCase<StatusResponse> : StatusResponse>
  }

  constructor(options: GreenSMSOptions<CC>)
}

export default GreenSMS
