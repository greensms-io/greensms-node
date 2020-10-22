import { MODULE_SMS, METHOD_SMS_SEND, API_METHOD_POST, METHOD_SMS_STATUS, API_METHOD_GET } from './../../util/constants';
import { buildUrl } from '../../util/url';
import { validate } from '../../util/validator';
import Schema from './../schema';


class SmsV1 {
  constructor(opts) {
    this.moduleName = MODULE_SMS;
    this.options = opts || {};
  }

  send(params, callback) {
    const functionName = METHOD_SMS_SEND;
    params = params || {};
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {

      let errors = validate(Schema[functionName], params);
      if (errors) {
        return reject(errors);
      }


      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_POST,
        params,
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

  status(params, callback) {
    const functionName = METHOD_SMS_STATUS;
    params = params || {};
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {

      let errors = validate(Schema[functionName], params);
      if (errors) {
        return reject(errors);
      }


      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_GET,
        params,
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
