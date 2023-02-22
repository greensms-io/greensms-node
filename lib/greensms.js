'use strict';

import RestClient from './http/rest-client';
import { baseUrl } from './util/url';
import { getVersion } from './util/version';
import ModuleLoader from './api/module-loader';

class GreenSMS {
  /**
   * Initialize GreenSMS Client
   * @param {object} opts - Options
   * @param {string|null} opts.user - Username. Required when AuthToken is not passed
   * @param {string|null} opts.pass - Password. Request when AuthToken is not passed
   * @param {string|null} opts.token - AuthToken. Required when Username/Password not passed
   * @param {boolean} opts.useTokenForRequests - Create Auth Token after login and use for subsequent requests
   * @param {String} opts.version - API Version to be used
   * @param {boolean} opts.camelCaseResponse - Convert all response keys to camelCase
   */
  constructor(opts) {
    opts = opts || {};
    let {
      user,
      pass,
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
      this.token = process.env.GREENSMS_TOKEN;
    }

    if (!token && !user) {
      user = process.env.GREENSMS_USER;
    }
    if (!token && !pass) {
      pass = process.env.GREENSMS_PASS;
    }

    if (!this.token && (!user || !pass)) {
      throw new Error('Either User/Pass or Auth Token is required!');
    } else if (user) {
      this.user = user;
      this.pass = pass;
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
    const moduleLoader = new ModuleLoader();
    const modules = moduleLoader.registerModules(sharedOptions); ;
    for (let moduleKey in modules) {
      const currentModule = modules[moduleKey];
      this[moduleKey] = currentModule;
    }
  }

  _getHttpClient(httpParams) {
    httpParams = httpParams || {};
    const params = {};

    if (!this.token && this.user) {
      params.user = this.user;
      params.pass = this.pass;
    }

    const httpClientOptions = {
      ...httpParams,
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
