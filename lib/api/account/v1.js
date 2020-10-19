import { MODULE_ACCOUNT, METHOD_ACCOUNT_BALANCE, API_METHOD_GET } from './../../util/constants';
import { buildUrl } from '../../util/url';

class AccountV1 {
  constructor(opts) {
    this.moduleName = MODULE_ACCOUNT;
    this.options = opts || {};
  }

  balance(params, callback) {
    const functionName = METHOD_ACCOUNT_BALANCE;
    params = params || {};
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    console.log('API URL', this.options.username, this.options.password);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_GET,
        params: {
          user: this.options.username,
          pass: this.options.password,
        },
      }).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
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

export default AccountV1;
