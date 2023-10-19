import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import humps from 'humps';
import qs from 'qs'; // TODO: Check with Alexandar if httpAgent is supposed to be added

import RestError from './rest-error';
import { RES_STATUS_ACCEPTED, RES_STATUS_DELAYED, SDK_NAME, SDK_VERSION } from './../constants';

type TRestClientRequestOptions = {
  method?: 'GET' | 'POST';
  uri?: string;
  headers?: Record<string, unknown>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  timeout?: number;
  allowRedirects?: boolean;
  forever?: boolean;
  logLevel?: boolean;
};

const HEADER_USER_AGENT = 'User-Agent';

type TRestClientOptions = {
  token?: string | null;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
};

class RestClient {
  private readonly service: AxiosInstance;
  private readonly token?: string | null;
  private readonly defaultData?: Record<string, unknown>;
  private readonly defaultParams?: Record<string, unknown>;
  private readonly sdkVersionHeader: string;

  /**
   * Create an instance of RestClient
   * @param {object} opts - Options
   * @param {string} opts.token - Default token for the request
   * @param {object} opts.params - Default params for the request
   * @param {object} opts.data - Default data for the request
   */
  constructor(opts: TRestClientOptions = {}) {
    const service = axios.create({});
    service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.service = service;
    this.token = opts.token;
    this.defaultData = opts.data || {};
    this.defaultParams = opts.params || {};

    this.sdkVersionHeader = `${SDK_NAME} ${SDK_VERSION}`;
    this.addInterceptors();
  }

  /**
   * Generic function to send requests to Axios
   *
   * @param {object} opts - Options argument
   * @param {string} opts.method - HTTP method
   * @param {string} opts.uri - Request URI
   * @param {object} [opts.headers] - The request headers
   * @param {object} [opts.params] - Request Params
   * @param {object} [opts.data] - Request Data
   * @param {int} [opts.timeout=30000] - Request timeout in milliseconds
   * @param {boolean} [opts.allowRedirects] - Should the client follow redirects
   * @param {boolean} [opts.forever] - Set to true to use the forever-agent
   * @param {string} [opts.logLevel] - Show debug logs
   */
  request<T>(opts: TRestClientRequestOptions = {}): Promise<T> {
    if (!opts.method) {
      throw new Error('Http method is required');
    }

    if (!opts.uri) {
      throw new Error('URI is required');
    }

    const headers: Record<string, unknown> = opts.headers || {};

    if (!headers.Connection && !headers.connection) {
      headers.Connection = 'close';
    }

    const options: AxiosRequestConfig = {
      maxRedirects: opts.allowRedirects ? 10 : 0,
      method: opts.method,
      timeout: opts.timeout || 30000,
      url: opts.uri,
      validateStatus: status => status >= 100 && status < 600,
    };
    opts.headers = opts.headers || {};

    if (opts.data !== null && opts.data !== undefined) {
      options.data = qs.stringify(opts.data, {
        arrayFormat: 'repeat',
      });
    }

    if (opts.params !== null && opts.params !== undefined) {
      options.params = opts.params;
    }

    const promise = new Promise<T>((resolve, reject) => {
      this.service(options)
        .then(response => {
          const { data } = response;

          if (data.error) {
            return Promise.reject(data);
          }

          return resolve(data);
        })
        .catch(err => {
          const result = new RestError(err);

          return reject(result);
        });
    });

    return promise;
  }

  private addInterceptors() {
    this.service.interceptors.request.use(config => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      if (this.defaultParams) {
        config.params = {
          ...config.params,
          ...this.defaultParams,
        };

        config.params = humps.decamelizeKeys(config.params);
      }

      if (this.defaultData) {
        config.data = {
          ...config.data,
          ...this.defaultData,
        };

        config.data = humps.decamelizeKeys(config.data);
      }

      config.headers[HEADER_USER_AGENT] = this.sdkVersionHeader;
      return config;
    });

    this.service.interceptors.response.use(
      response => {
        if (response.request.method === 'POST') {
          if (response.status === 200) {
            response.data['request_status'] = RES_STATUS_ACCEPTED; // jshint ignore:line
          } else {
            response.data['request_status'] = RES_STATUS_DELAYED; // jshint ignore:line
          }
        }

        response.data = humps.camelizeKeys(response.data);

        return response;
      },
      err => {
        return Promise.reject(err);
      }
    );
  }
}

export default RestClient;
