import { MODULE_WHOIS, METHOD_WHOIS_LOOKUP, MODULE_SERVER_STATUS, API_METHOD_GET } from './../../util/constants';
import { buildUrl } from '../../util/url';
import { validate } from '../../util/validator';
import Schema from './../schema';


class GeneralV1 {
  constructor(opts) {
    this.options = opts || {};
  }

  lookup(params, callback) {
    const functionName = METHOD_WHOIS_LOOKUP;
    params = params || {};
    const apiUrl = buildUrl(this.options.baseUrl, MODULE_WHOIS, functionName);
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

  status(callback) {
    const functionName = MODULE_SERVER_STATUS;
    const apiUrl = buildUrl(this.options.baseUrl, functionName);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_GET,
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

export default GeneralV1;
