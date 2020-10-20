import axios from 'axios';
import _ from 'lodash';
import qs from 'qs'; // TODO: Check with Alexandar if httpAgent is supposed to be added

import RestError from './rest-error';
import { API_METHOD_GET, API_METHOD_POST } from './../util/constants';

class RestClient {
  /**
   * Create an instance of RestClient
   * @param {object} opts - Options
   * @param {string} opts.token - Default token for the request
   * @param {object} opts.params - Default params for the request
   * @param {object} opts.data - Default data for the request
   * @param {boolean} opts.useCamelCase - Convert all response keys to camelCase
   */
  constructor(opts) {
    opts = opts || {};
    let service = axios.create({});
    service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    this.service = service;
    this.token = opts.token;
    this.defaultData = opts.data || {};
    this.defaultParams = opts.params || {};
    this.useCamelCase = typeof opts.useCamelCase === 'boolean' ? opts.useCamelCase : false;
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


  request(opts, callback) {
    opts = opts || {};

    if (!opts.method) {
      throw new Error('Http method is required');
    }

    if (!opts.uri) {
      throw new Error('URI is required');
    }

    const headers = opts.headers || {};

    if (!headers.Connection && !headers.connection) {
      headers.Connection = 'close';
    }

    const options = {
      timeout: opts.timeout || 30000,
      maxRedirects: opts.allowRedirects ? 10 : 0,
      url: opts.uri,
      method: opts.method,
      validateStatus: status => status >= 100 && status < 600,
    };
    opts.headers = opts.headers || {};

    if (!_.isNull(opts.data)) {
      options.data = qs.stringify(opts.data, {
        arrayFormat: 'repeat',
      });
    }

    if (!_.isNull(opts.params)) {
      options.params = opts.params;

      options.paramsSerializer = params => {
        return qs.stringify(params, {
          arrayFormat: 'repeat',
        });
      };
    }

    const promise = new Promise((resolve, reject) => {
      this.service(options).then(response => {
        const {
          data,
        } = response;

        if (data.error) {
          return Promise.reject(data);
        }

        return resolve(data);
      }).catch(err => {
        let result = new RestError(err);
        return reject(result);
      });
    });

    if (callback !== null && typeof callback === 'function') {
      promise.then(function (data) {
        return callback(null, data);
      }).catch(function (err) {
        return callback(err);
      });
    } else {
      return promise;
    }
  }

}

export default RestClient;
