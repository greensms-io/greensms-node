import axios from "axios";
import HttpModule from "http";
import HttpsModule from "https";
import qs from "qs";

class RestClient {
  constructor() {
    let service = axios.create({});

    service.interceptors.response.use(this.handleSuccess, this.handleError);
    service.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";

    this.service = service;
  }

  /**
   * Generic function to send requests to Axios
   *
   * @param {object} opts - Options argument
   * @param {string} opts.method - HTTP method
   * @param {string} opts.uri - Request URI
   * @param {string} [opts.username] - Username for Auth
   * @param {string} [opts.password] - Password for Auth
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
      throw new Error("Http method is required");
    }

    if (!opts.uri) {
      throw new Error("URI is required");
    }

    const headers = opts.headers || {};

    if (!headers.Connection && !headers.connection) {
      headers.Connection = "close";
    }

    const options = {
      timeout: opts.timeout || 30000,
      maxRedirects: opts.allowRedirects ? 10 : 0,
      url: opts.uri,
      method: opts.method,
      headers: opts.headers,
      httpAgent: opts.forever
        ? new HttpModule.Agent({ keepAlive: true })
        : undefined,
      httpsAgent: opts.forever
        ? new HttpsModule.Agent({ keepAlive: true })
        : undefined,
      validateStatus: (status) => status >= 100 && status < 600,
    };

    if (!_.isNull(opts.data)) {
      options.data = qs.stringify(opts.data, { arrayFormat: "repeat" });
    }

    if (!_.isNull(opts.params)) {
      options.params = opts.params;
      options.paramsSerializer = (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }

    const promise = new Promise((resolve, reject) => {
      this.service(options).then(resolve).catch(reject);
    });

    if (callback !== null && typeof callback === "function") {
      promise
        .then(function (data) {
          return callback(null, data);
        })
        .catch(function (err) {
          return callback(err);
        });
    } else {
      return promise;
    }
  }

  /**
   * Interceptor for API Success
   * @param {object} response
   */

  handleSuccess(response) {
    return response;
  }

  /**
   * Interceptor for API Error
   * @param {object} error
   */
  handleError(error) {
    return error;
  }
}

export default new RestClient();
