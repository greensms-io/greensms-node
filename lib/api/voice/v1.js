import { MODULE_VOICE, METHOD_VOICE_SEND, METHOD_VOICE_STATUS, API_METHOD_GET, API_METHOD_POST } from './../../util/constants';
import { buildUrl } from '../../util/url';
import { validate } from '../../util/validator';
import Schema from './../schema';


class VoiceV1 {
  constructor(opts) {
    this.moduleName = MODULE_VOICE;
    this.options = opts || {};
  }

  send(params, callback) {
    const functionName = METHOD_VOICE_SEND;
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
    const functionName = METHOD_VOICE_STATUS;
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

export default VoiceV1;
