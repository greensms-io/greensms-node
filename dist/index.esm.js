import axios from'axios';import humps from'humps';import qs from'qs';import*as Yup from'yup';import {ValidationError}from'yup';var __defProp$n = Object.defineProperty;
var __defNormalProp$n = (obj, key, value) => key in obj ? __defProp$n(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$n = (obj, key, value) => {
  __defNormalProp$n(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RestError extends Error {
  /**
   * Set default values of CustomError class
   * @param {object|Error} error - Either pass an built-un Error or Error Object from API
   */
  constructor(error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error.error;
    }
    super(errorMessage);
    __publicField$n(this, "code");
    __publicField$n(this, "error");
    __publicField$n(this, "errorType");
    __publicField$n(this, "params");
    if (!(error instanceof Error)) {
      this.name = error.name || "RestError";
      this.code = error.code;
    }
    this.error = errorMessage;
    this.message = errorMessage;
    const errorType = this.getErrorType(this.code);
    this.errorType = errorType;
    if (error.params) {
      this.params = error.params;
    }
  }
  getErrorType(code) {
    switch (code) {
      case 0:
        return "AUTH_DECLINED";
      case 1:
        return "MISSING_INPUT_PARAM";
      case 2:
        return "INVALID_INPUT_PARAM";
      case 404:
        return "NOT_FOUND";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  }
}const BASE_URL = "api3.greensms.ru";
const RES_STATUS_ACCEPTED = "Accepted";
const RES_STATUS_DELAYED = "Delayed";
const SDK_NAME = "greensms-node";
const SDK_VERSION = "2.0.0";
const URL_PROTOCOL = "https";var __defProp$m = Object.defineProperty;
var __defNormalProp$m = (obj, key, value) => key in obj ? __defProp$m(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$m = (obj, key, value) => {
  __defNormalProp$m(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const HEADER_USER_AGENT = "User-Agent";
class RestClient {
  /**
   * Create an instance of RestClient
   * @param {object} opts - Options
   * @param {string} opts.token - Default token for the request
   * @param {object} opts.params - Default params for the request
   * @param {object} opts.data - Default data for the request
   */
  constructor(opts = {}) {
    __publicField$m(this, "service");
    __publicField$m(this, "token");
    __publicField$m(this, "defaultData");
    __publicField$m(this, "defaultParams");
    __publicField$m(this, "sdkVersionHeader");
    const service = axios.create({});
    service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    this.service = service;
    this.token = opts.token;
    this.defaultData = opts.data || {};
    this.defaultParams = opts.params || {};
    this.sdkVersionHeader = `${SDK_NAME} ${SDK_VERSION}`;
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
  request(opts = {}) {
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
      maxRedirects: opts.allowRedirects ? 10 : 0,
      method: opts.method,
      timeout: opts.timeout || 3e4,
      url: opts.uri,
      validateStatus: (status) => status >= 100 && status < 600
    };
    opts.headers = opts.headers || {};
    if (opts.data !== null && opts.data !== void 0) {
      options.data = qs.stringify(opts.data, {
        arrayFormat: "repeat"
      });
    }
    if (opts.params !== null && opts.params !== void 0) {
      options.params = opts.params;
    }
    const promise = new Promise((resolve, reject) => {
      this.service(options).then((response) => {
        const { data } = response;
        if (data.error) {
          return Promise.reject(data);
        }
        return resolve(data);
      }).catch((err) => {
        const result = new RestError(err);
        return reject(result);
      });
    });
    return promise;
  }
  addInterceptors() {
    this.service.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      if (this.defaultParams) {
        config.params = {
          ...config.params,
          ...this.defaultParams
        };
        config.params = humps.decamelizeKeys(config.params);
      }
      if (this.defaultData) {
        config.data = {
          ...config.data,
          ...this.defaultData
        };
        config.data = humps.decamelizeKeys(config.data);
      }
      config.headers[HEADER_USER_AGENT] = this.sdkVersionHeader;
      return config;
    });
    this.service.interceptors.response.use(
      (response) => {
        if (response.request.method === "POST") {
          if (response.status === 200) {
            response.data["request_status"] = RES_STATUS_ACCEPTED;
          } else {
            response.data["request_status"] = RES_STATUS_DELAYED;
          }
        }
        response.data = humps.camelizeKeys(response.data);
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }
}function getError(err) {
  return {
    message: err.message,
    params: err.params
  };
}
const validate = (yupSchema, objData) => {
  let errorResult = null;
  try {
    yupSchema.validateSync(objData, { abortEarly: false, strict: false, stripUnknown: true });
  } catch (err) {
    const errors = [];
    if (err instanceof ValidationError) {
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((error) => {
          errors.push(error);
        });
      } else {
        errors.push(getError(err));
      }
      errorResult = new RestError({
        code: 1,
        error: "Validation Error",
        params: errors
      });
    }
  }
  return errorResult;
};const baseUrl = () => {
  const url = new URL("http://127.0.0.1");
  url.protocol = URL_PROTOCOL;
  url.hostname = BASE_URL;
  return url.toString();
};
const buildUrl = (baseUrl2, ...args) => {
  if (!baseUrl2) {
    throw new Error("Base URL cannot be empty!");
  }
  if (!args) {
    args = [];
  }
  const url = new URL(args.join("/"), baseUrl2);
  return url.toString();
};var __defProp$l = Object.defineProperty;
var __defNormalProp$l = (obj, key, value) => key in obj ? __defProp$l(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$l = (obj, key, value) => {
  __defNormalProp$l(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Client {
  /**
   * Initialize GreenSMS Client
   * @param {object} opts - Options
   * @param {string|null} opts.user - Username. Required when AuthToken is not passed
   * @param {string|null} opts.pass - Password. Request when AuthToken is not passed
   * @param {string|null} opts.token - AuthToken. Required when Username/Password not passed
   */
  constructor({ user, pass, token } = {}) {
    __publicField$l(this, "token");
    __publicField$l(this, "user");
    __publicField$l(this, "pass");
    __publicField$l(this, "restClient");
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
      throw new Error("Either User/Pass or Auth Token is required!");
    } else if (user) {
      this.user = user;
      this.pass = pass;
    }
    this.restClient = this.getHttpClient();
  }
  getHttpClient() {
    const params = {};
    if (!this.token && this.user) {
      params.user = this.user;
      params.pass = this.pass;
    }
    const httpClientOptions = {
      params,
      token: this.token
    };
    return new RestClient(httpClientOptions);
  }
  request(method, urlArgs, schema, params) {
    const apiUrl = buildUrl(baseUrl(), ...urlArgs);
    const requestObj = {
      method,
      params,
      uri: apiUrl
    };
    if (params && schema) {
      const errors = validate(schema, params);
      if (errors) {
        return Promise.reject(errors);
      }
    }
    return this.restClient.request(requestObj);
  }
}var __defProp$k = Object.defineProperty;
var __defNormalProp$k = (obj, key, value) => key in obj ? __defProp$k(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$k = (obj, key, value) => {
  __defNormalProp$k(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$9=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$k(this, "schema", {
      token: Yup.object().shape({
        expire: Yup.number().positive().integer()
      })
    });
  }
  balance() {
    return this.client.request("GET", ["account", "balance"]);
  }
  token(params) {
    return this.client.request("POST", ["account", "token"], this.schema.token, params);
  }
  tariff() {
    return this.client.request("GET", ["account", "tariff"]);
  }
};var __defProp$j = Object.defineProperty;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$j = (obj, key, value) => {
  __defNormalProp$j(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Account {
  constructor(client) {
    this.client = client;
    __publicField$j(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$9(this.client));
  }
}var __defProp$i = Object.defineProperty;
var __defNormalProp$i = (obj, key, value) => key in obj ? __defProp$i(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$i = (obj, key, value) => {
  __defNormalProp$i(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$8=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$i(this, "schema", {
      receive: Yup.object().shape({
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        tollFree: Yup.boolean()
      }),
      send: Yup.object().shape({
        language: Yup.string().oneOf(["ru", "en"]),
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        voice: Yup.boolean()
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().length(36)
      })
    });
  }
  receive(params) {
    return this.client.request("POST", ["call", "receive"], this.schema.receive, params);
  }
  send(params) {
    return this.client.request("POST", ["call", "send"], this.schema.send, params);
  }
  status(params) {
    return this.client.request("GET", ["call", "status"], this.schema.status, params);
  }
};var __defProp$h = Object.defineProperty;
var __defNormalProp$h = (obj, key, value) => key in obj ? __defProp$h(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$h = (obj, key, value) => {
  __defNormalProp$h(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Call {
  constructor(client) {
    this.client = client;
    __publicField$h(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$8(this.client));
  }
}var __defProp$g = Object.defineProperty;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$g = (obj, key, value) => {
  __defNormalProp$g(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$7=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$g(this, "schema", {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number")
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number")
      })
    });
  }
  send(params) {
    return this.client.request("POST", ["hlr", "send"], this.schema.send, params);
  }
  status(params) {
    return this.client.request("GET", ["hlr", "status"], this.schema.status, params);
  }
};var __defProp$f = Object.defineProperty;
var __defNormalProp$f = (obj, key, value) => key in obj ? __defProp$f(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$f = (obj, key, value) => {
  __defNormalProp$f(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Hrl {
  constructor(client) {
    this.client = client;
    __publicField$f(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$7(this.client));
  }
}var __defProp$e = Object.defineProperty;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$e = (obj, key, value) => {
  __defNormalProp$e(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const NUMBER_OR_UUID_REGEXP = /^(\d+)|([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/gi;
let V1_0$6=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$e(this, "schema", {
      send: Yup.object().shape({
        amount: Yup.number().required().min(1).positive(),
        card: Yup.string().min(11).max(14),
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number")
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().min(1).max(36).matches(NUMBER_OR_UUID_REGEXP, "Invalid Status")
      })
    });
  }
  send(params) {
    return this.client.request("POST", ["pay", "send"], this.schema.send, params);
  }
  status(params) {
    return this.client.request("GET", ["pay", "status"], this.schema.status, params);
  }
};var __defProp$d = Object.defineProperty;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$d = (obj, key, value) => {
  __defNormalProp$d(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Pay {
  constructor(client) {
    this.client = client;
    __publicField$d(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$6(this.client));
  }
}var __defProp$c = Object.defineProperty;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$c = (obj, key, value) => {
  __defNormalProp$c(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$5=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$c(this, "schema", {
      send: Yup.object().shape({
        from: Yup.string().min(1).max(11),
        hidden: Yup.string().min(1).max(918),
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        txt: Yup.string().required().min(1)
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().length(36)
      })
    });
  }
  send(params) {
    return this.client.request("GET", ["sms", "send"], this.schema.send, params);
  }
  status(params) {
    return this.client.request("GET", ["sms", "status"], this.schema.status, params);
  }
};var __defProp$b = Object.defineProperty;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$b = (obj, key, value) => {
  __defNormalProp$b(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Sms {
  constructor(client) {
    this.client = client;
    __publicField$b(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$5(this.client));
  }
}var __defProp$a = Object.defineProperty;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$a = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$4=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$a(this, "schema", {
      send: Yup.object().shape({
        cascade: Yup.string().oneOf(["sms", "voice"]),
        from: Yup.string().min(1),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        txt: Yup.string().required().min(1)
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().length(36)
      })
    });
  }
  async send(params) {
    return this.client.request("GET", ["viber", "send"], this.schema.send, params);
  }
  async status(params) {
    return this.client.request("GET", ["viber", "status"], this.schema.status, params);
  }
};var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$9 = (obj, key, value) => {
  __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Viber {
  constructor(client) {
    this.client = client;
    __publicField$9(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$4(this.client));
  }
}var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$3=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$8(this, "schema", {
      send: Yup.object().shape({
        cascade: Yup.array().transform(function(value, originalValue) {
          if (this.isType(value) && value !== null) {
            return value;
          }
          return originalValue ? originalValue.split(/[\s,]+/) : [];
        }).of(Yup.string().oneOf(["sms", "voice", "viber"])),
        from: Yup.string().min(1).max(11),
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        txt: Yup.string().required().min(1).max(2048)
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().length(36)
      })
    });
  }
  send(params) {
    return this.client.request("GET", ["vk", "send"], this.schema.send, params);
  }
  status(params) {
    return this.client.request("GET", ["vk", "status"], this.schema.status, params);
  }
};var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Vk {
  constructor(client) {
    this.client = client;
    __publicField$7(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$3(this.client));
  }
}var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let V1_0$2=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$6(this, "schema", {
      send: Yup.object().shape({
        lang: Yup.string().oneOf(["ru", "en"]),
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        txt: Yup.string().required().min(1).max(5).matches(/^\d+$/, "Invalid Code")
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().length(36)
      })
    });
  }
  send(params) {
    return this.client.request("GET", ["voice", "send"], this.schema.send, params);
  }
  status(params) {
    return this.client.request("GET", ["voice", "status"], this.schema.status, params);
  }
};var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Voice {
  constructor(client) {
    this.client = client;
    __publicField$5(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$2(this.client));
  }
}var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const URL_REGEXP = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
let V1_0$1=class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$4(this, "schema", {
      send: Yup.object().shape({
        file: Yup.string().min(1).max(256),
        from: Yup.string().min(1),
        tag: Yup.string().min(1).max(36),
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number"),
        txt: Yup.string().required().min(1).max(1e4)
      }),
      status: Yup.object().shape({
        extended: Yup.boolean(),
        id: Yup.string().required().length(36)
      }),
      webhook: Yup.object().shape({
        url: Yup.string().required().min(1).matches(URL_REGEXP, "Invalid URL")
      })
    });
  }
  send(params) {
    return this.client.request("POST", ["whatsapp", "send"], this.schema.send, params);
  }
  webhook(params) {
    return this.client.request("POST", ["whatsapp", "webhook"], this.schema.webhook, params);
  }
  status(params) {
    return this.client.request("GET", ["whatsapp", "status"], this.schema.status, params);
  }
};var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WhatsApp {
  constructor(client) {
    this.client = client;
    __publicField$3(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0$1(this.client));
  }
}var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class V1_0 {
  constructor(client) {
    this.client = client;
    __publicField$2(this, "schema", {
      lookup: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, "Invalid Phone Number")
      })
    });
  }
  lookup(params) {
    return this.client.request("GET", ["whois", "lookup"], this.schema.lookup, params);
  }
}var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WhoIs {
  constructor(client) {
    this.client = client;
    __publicField$1(this, "_v1");
  }
  get v1() {
    return this._v1 ?? (this._v1 = new V1_0(this.client));
  }
}var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GreenSMS extends Client {
  constructor() {
    super(...arguments);
    __publicField(this, "_account");
    __publicField(this, "_call");
    __publicField(this, "_hlr");
    __publicField(this, "_pay");
    __publicField(this, "_sms");
    __publicField(this, "_viber");
    __publicField(this, "_vk");
    __publicField(this, "_voice");
    __publicField(this, "_whatsapp");
    __publicField(this, "_whois");
  }
  get account() {
    return this._account ?? (this._account = new Account(this));
  }
  get call() {
    return this._call ?? (this._call = new Call(this));
  }
  get hlr() {
    return this._hlr ?? (this._hlr = new Hrl(this));
  }
  get pay() {
    return this._pay ?? (this._pay = new Pay(this));
  }
  get sms() {
    return this._sms ?? (this._sms = new Sms(this));
  }
  get viber() {
    return this._viber ?? (this._viber = new Viber(this));
  }
  get vk() {
    return this._vk ?? (this._vk = new Vk(this));
  }
  get voice() {
    return this._voice ?? (this._voice = new Voice(this));
  }
  get whatsapp() {
    return this._whatsapp ?? (this._whatsapp = new WhatsApp(this));
  }
  get whois() {
    return this._whois ?? (this._whois = new WhoIs(this));
  }
  status() {
    return this.request("GET", ["status"]);
  }
}export{GreenSMS as default};