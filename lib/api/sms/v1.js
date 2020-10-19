import { MODULE_SMS, METHOD_SMS_SEND, API_METHOD_POST } from './../../util/constants';
import { buildUrl } from '../../util/url';

class SmsV1 {
  constructor(opts) {
    this.moduleName = MODULE_SMS;
    this.options = opts || {};
  }

  sendMessage(params, callback) {
    const functionName = METHOD_SMS_SEND;
    params = params || {};
    const {
      to,
      txt,
      options,
    } = params;
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_POST,
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

export default SmsV1;
