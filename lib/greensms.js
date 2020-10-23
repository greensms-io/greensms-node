'use strict';

import RestClient from './http/rest-client';
import { baseUrl } from './util/url';
import { getVersion } from './util/version';
import ModuleLoader from './api/module-loader';

class GreenSMS {
  /**
   * Initialize GreenSMS Client
   * @param {object} opts - Options
   * @param {string|null} opts.username - Username. Required when AuthToken is not passed
   * @param {string|null} opts.password - Password. Request when AuthToken is not passed
   * @param {string|null} opts.token - AuthToken. Required when Username/Password not passed
   * @param {boolean} opts.useTokenForRequests - Create Auth Token after login and use for subsequent requests
   * @param {String} opts.version - API Version to be used
   * @param {boolean} opts.camelCaseResponse - Convert all response keys to camelCase
   */
  constructor(opts) {
    opts = opts || {};
    let {
      username,
      password,
      token,
      useTokenForRequests,
      camelCaseResponse,
      version,
    } = opts;
    this.token = null;

    if (token) {
      this.token = token;
    }

    if (!token) {
      this.token = process.env.GREENSMS_AUTH_TOKEN;
    }

    if (!token && !username) {
      username = process.env.GREENSMS_USERNAME;
    }
    if (!token && !password) {
      password = process.env.GREENSMS_PASSWORD;
    }

    if (!this.token && (!username || !password)) {
      throw new Error('Either User/Pass or Auth Token is required!');
    } else if (username) {
      this.username = username;
      this.password = password;
    }

    const sharedOptions = {
      useTokenForRequests: useTokenForRequests,
      version: getVersion(version),
      baseUrl: baseUrl(),
      restClient: this._getHttpClient({
        useCamelCase: camelCaseResponse,
      }),
    };

    this.addModules(sharedOptions);
  }

  addModules(sharedOptions) {
    const modules = ModuleLoader.registerModules(sharedOptions); ;
    for (let moduleKey in modules) {
      const currentModule = modules[moduleKey];
      this[moduleKey] = currentModule;
    }
  }

  _getHttpClient(httpParams) {
    httpParams = httpParams || {};
    const params = {};

    if (!this.token && this.username) {
      params.user = this.username;
      params.pass = this.password;
    }

    const httpClientOptions = { ...httpParams,
      ...{
        token: this.token,
        params,
      },
    };
    const restClient = new RestClient(httpClientOptions);
    return restClient;
  }
}

export default GreenSMS;
