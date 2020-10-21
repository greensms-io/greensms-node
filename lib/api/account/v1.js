import { MODULE_ACCOUNT, METHOD_ACCOUNT_BALANCE, METHOD_ACCOUNT_TARIFF, METHOD_ACCOUNT_TOKEN, API_METHOD_GET, API_METHOD_POST } from './../../util/constants';
import { buildUrl } from '../../util/url';
import { validate } from '../../util/validator';
import AccountSchema from './schema';

class AccountV1 {
  constructor(opts) {
    this.moduleName = MODULE_ACCOUNT;
    this.options = opts || {};
  }

  fetchBalance(callback) {
    const functionName = METHOD_ACCOUNT_BALANCE;
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_GET,
      }).then(resolve).catch(reject);
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

  fetchToken(params, callback) {
    const functionName = METHOD_ACCOUNT_TOKEN;
    params = params || {};

    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {

      let error = validate(AccountSchema[functionName], params);
      if (error) {
        return reject(error);
      }
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_POST,
        params: { ...params,
        },
      }).then(resolve).catch(reject);
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

  fetchTariff(callback) {
    const functionName = METHOD_ACCOUNT_TARIFF;
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_GET,
      }).then(resolve).catch(reject);
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

export default AccountV1;
