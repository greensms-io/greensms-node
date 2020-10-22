function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import URI from 'urijs';
import { object, number, string, boolean as _boolean } from 'yup';
import axios from 'axios';
import humps from 'humps';
import _ from 'lodash';
import qs from 'qs'; //#region  General

var API_METHOD_POST = 'POST';
var API_METHOD_GET = 'GET';
var URL_PROTOCOL = 'https';
var BASE_URL = 'api3.greensms.ru';
var VERSIONS = {
  v1: 'v1'
};
var RES_STATUS_ACCEPTED = 'Accepted';
var RES_STATUS_DELAYED = 'Delayed'; //#endregion
//#region SMS

var MODULE_SMS = 'sms';
var METHOD_SMS_SEND = 'send';
var METHOD_SMS_STATUS = 'status'; //#endregion
//#region viber

var MODULE_VIBER = 'viber';
var METHOD_VIBER_SEND = 'send';
var METHOD_VIBER_STATUS = 'status'; //#endregion
//#region Account

var MODULE_ACCOUNT = 'account';
var METHOD_ACCOUNT_BALANCE = 'balance';
var METHOD_ACCOUNT_TOKEN = 'token';
var METHOD_ACCOUNT_TARIFF = 'tariff'; //#endregion
//#region Voice

var MODULE_VOICE = 'voice';
var METHOD_VOICE_SEND = 'send';
var METHOD_VOICE_STATUS = 'status'; //#endregion
//#region Call

var MODULE_CALL = 'call';
var METHOD_CALL_SEND = 'send';
var METHOD_CALL_STATUS = 'status'; //#endregion
//#region Pay

var MODULE_PAY = 'pay';
var METHOD_PAY_SEND = 'send';
var METHOD_PAY_STATUS = 'status'; //#endregion
//#region WHOIS

var MODULE_WHOIS = 'whois';
var METHOD_WHOIS_LOOKUP = 'lookup'; //#endregion
//#region Server

var MODULE_SERVER_STATUS = 'status'; //#endregion

/**
 * Get base url of the API
 * @returns {string}
 */

var baseUrl = function baseUrl() {
  var uri = URI();
  uri.protocol(URL_PROTOCOL);
  uri.hostname(BASE_URL);
  uri = uri.toString();
  return uri;
};
/**
 * Join to create an absolute URL from Paths
 * @param {string} baseUrl - Base URL with protocol
 * @param  {string[]} args - Array of paths to join. Can also include query strings
 * @returns {string} - Joined URL String
 */


var buildUrl = function buildUrl(baseUrl) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!baseUrl) {
    throw new Error('Base URL cannot be empty!');
  }

  if (!args) {
    args = [];
  }

  var uri = URI.joinPaths.apply(URI, _toConsumableArray(args));
  uri = uri.absoluteTo(baseUrl).preventInvalidHostname(true);

  if (!uri.hostname() || !uri.protocol()) {
    throw new Error('Invalid URL');
  }

  uri = uri.toString();
  return uri;
};

function getError(err) {
  return Object.assign({}, err.params, {
    message: err.message
  });
}
/**
 * Returns an Error object validating data against a schema
 * @param {Yup} yupSchema - Yup schema with rules
 * @param {object} objData - Data object to validate
 */


var validate = function validate(yupSchema, objData) {
  try {
    yupSchema.validateSync(objData, {
      strict: false,
      stripUnknown: true,
      abortEarly: false
    });
    return null;
  } catch (err) {
    var errors = [];

    if (err.inner && err.inner.length > 0) {
      err.inner.forEach(function (error) {
        errors.push(error);
      });
    } else {
      errors.push(getError(err));
    }

    return {
      code: 1,
      error: 'Validation Error',
      params: errors
    };
  }
};

var AccountSchema = {
  token: object().shape({
    expire: number().positive().integer()
  })
};

var AccountV1 = /*#__PURE__*/function () {
  function AccountV1(opts) {
    _classCallCheck(this, AccountV1);

    this.moduleName = MODULE_ACCOUNT;
    this.options = opts || {};
  }

  _createClass(AccountV1, [{
    key: "fetchBalance",
    value: function fetchBalance(callback) {
      var _this = this;

      var functionName = METHOD_ACCOUNT_BALANCE;
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        _this.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET
        }).then(resolve)["catch"](reject);
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchToken",
    value: function fetchToken(params, callback) {
      var _this2 = this;

      var functionName = METHOD_ACCOUNT_TOKEN;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var error = validate(AccountSchema[functionName], params);

        if (error) {
          return reject(error);
        }

        _this2.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: _objectSpread({}, params)
        }).then(resolve)["catch"](reject);
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchTariff",
    value: function fetchTariff(callback) {
      var _this3 = this;

      var functionName = METHOD_ACCOUNT_TARIFF;
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        _this3.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET
        }).then(resolve)["catch"](reject);
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return AccountV1;
}();

var Account = /*#__PURE__*/function () {
  function Account(opts) {
    _classCallCheck(this, Account);

    this.options = opts;
    this._v1 = new AccountV1(opts);
  }

  _createClass(Account, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Account;
}();

var SmsSchema = {
  send: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    txt: string().required().min(1),
    from: string().min(1),
    tag: string().min(1),
    hidden: string().min(1)
  }),
  status: object().shape({
    id: string().required().length(36),
    extended: _boolean()
  })
};

var SmsV1 = /*#__PURE__*/function () {
  function SmsV1(opts) {
    _classCallCheck(this, SmsV1);

    this.moduleName = MODULE_SMS;
    this.options = opts || {};
  }

  _createClass(SmsV1, [{
    key: "sendMessage",
    value: function sendMessage(params, callback) {
      var _this4 = this;

      var functionName = METHOD_SMS_SEND;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(SmsSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this4.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(params, callback) {
      var _this5 = this;

      var functionName = METHOD_SMS_STATUS;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(SmsSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this5.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return SmsV1;
}();

var Sms = /*#__PURE__*/function () {
  function Sms(opts) {
    _classCallCheck(this, Sms);

    this.options = opts;
    this._v1 = new SmsV1(opts);
  }

  _createClass(Sms, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Sms;
}();

var ViberSchema = {
  send: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    txt: string().required().min(1),
    from: string().min(1),
    cascade: string().oneOf(['sms', 'voice'])
  }),
  status: object().shape({
    id: string().required().length(36),
    extended: _boolean()
  })
};

var ViberV1 = /*#__PURE__*/function () {
  function ViberV1(opts) {
    _classCallCheck(this, ViberV1);

    this.moduleName = MODULE_VIBER;
    this.options = opts || {};
  }

  _createClass(ViberV1, [{
    key: "sendMessage",
    value: function sendMessage(params, callback) {
      var _this6 = this;

      var functionName = METHOD_VIBER_SEND;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(ViberSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this6.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(params, callback) {
      var _this7 = this;

      var functionName = METHOD_VIBER_STATUS;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(ViberSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this7.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return ViberV1;
}();

var Viber = /*#__PURE__*/function () {
  function Viber(opts) {
    _classCallCheck(this, Viber);

    this.options = opts;
    this._v1 = new ViberV1(opts);
  }

  _createClass(Viber, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Viber;
}();

var CallSchema = {
  send: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number')
  }),
  status: object().shape({
    id: string().required().length(36),
    extended: _boolean()
  })
};

var CallV1 = /*#__PURE__*/function () {
  function CallV1(opts) {
    _classCallCheck(this, CallV1);

    this.moduleName = MODULE_CALL;
    this.options = opts || {};
  }

  _createClass(CallV1, [{
    key: "sendCallVerification",
    value: function sendCallVerification(params, callback) {
      var _this8 = this;

      var functionName = METHOD_CALL_SEND;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(CallSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this8.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(params, callback) {
      var _this9 = this;

      var functionName = METHOD_CALL_STATUS;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(CallSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this9.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return CallV1;
}();

var Call = /*#__PURE__*/function () {
  function Call(opts) {
    _classCallCheck(this, Call);

    this.options = opts;
    this._v1 = new CallV1(opts);
  }

  _createClass(Call, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Call;
}();

var VoiceSchema = {
  send: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    txt: string().required().min(1).max(5).matches(/^\d+$/, 'Invalid Code'),
    lang: string().oneOf(['ru', 'en'])
  }),
  status: object().shape({
    id: string().required().length(36),
    extended: _boolean()
  })
};

var VoiceV1 = /*#__PURE__*/function () {
  function VoiceV1(opts) {
    _classCallCheck(this, VoiceV1);

    this.moduleName = MODULE_VOICE;
    this.options = opts || {};
  }

  _createClass(VoiceV1, [{
    key: "sendMessage",
    value: function sendMessage(params, callback) {
      var _this10 = this;

      var functionName = METHOD_VOICE_SEND;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(VoiceSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this10.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(params, callback) {
      var _this11 = this;

      var functionName = METHOD_VOICE_STATUS;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(VoiceSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this11.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return VoiceV1;
}();

var Voice = /*#__PURE__*/function () {
  function Voice(opts) {
    _classCallCheck(this, Voice);

    this.options = opts;
    this._v1 = new VoiceV1(opts);
  }

  _createClass(Voice, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Voice;
}();

var HlrSchema = {
  send: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number')
  }),
  status: object().shape({
    id: string().required().length(36),
    extended: _boolean()
  })
};

var HlrV1 = /*#__PURE__*/function () {
  function HlrV1(opts) {
    _classCallCheck(this, HlrV1);

    this.moduleName = MODULE_VOICE;
    this.options = opts || {};
  }

  _createClass(HlrV1, [{
    key: "sendMessage",
    value: function sendMessage(params, callback) {
      var _this12 = this;

      var functionName = METHOD_VOICE_SEND;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(HlrSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this12.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(params, callback) {
      var _this13 = this;

      var functionName = METHOD_VOICE_STATUS;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(HlrSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this13.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return HlrV1;
}();

var Hlr = /*#__PURE__*/function () {
  function Hlr(opts) {
    _classCallCheck(this, Hlr);

    this.options = opts;
    this._v1 = new HlrV1(opts);
  }

  _createClass(Hlr, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Hlr;
}();

var PaySchema = {
  send: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
    amount: number().required().min(1).positive()
  }),
  status: object().shape({
    id: string().required().length(36),
    extended: _boolean()
  })
};

var PaymentV1 = /*#__PURE__*/function () {
  function PaymentV1(opts) {
    _classCallCheck(this, PaymentV1);

    this.moduleName = MODULE_PAY;
    this.options = opts || {};
  }

  _createClass(PaymentV1, [{
    key: "sendPayment",
    value: function sendPayment(params, callback) {
      var _this14 = this;

      var functionName = METHOD_PAY_SEND;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(PaySchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this14.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_POST,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(params, callback) {
      var _this15 = this;

      var functionName = METHOD_PAY_STATUS;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(PaySchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this15.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return PaymentV1;
}();

var Payment = /*#__PURE__*/function () {
  function Payment(opts) {
    _classCallCheck(this, Payment);

    this.options = opts;
    this._v1 = new PaymentV1(opts);
  }

  _createClass(Payment, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return Payment;
}();

var GeneralSchema = {
  lookup: object().shape({
    to: string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number')
  })
};

var GeneralV1 = /*#__PURE__*/function () {
  function GeneralV1(opts) {
    _classCallCheck(this, GeneralV1);

    this.options = opts || {};
  }

  _createClass(GeneralV1, [{
    key: "lookup",
    value: function lookup(params, callback) {
      var _this16 = this;

      var functionName = METHOD_WHOIS_LOOKUP;
      params = params || {};
      var apiUrl = buildUrl(this.options.baseUrl, MODULE_WHOIS, functionName);
      var promise = new Promise(function (resolve, reject) {
        var errors = validate(GeneralSchema[functionName], params);

        if (errors) {
          return reject(errors);
        }

        _this16.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET,
          params: params
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "serverStatus",
    value: function serverStatus(callback) {
      var _this17 = this;

      var functionName = MODULE_SERVER_STATUS;
      var apiUrl = buildUrl(this.options.baseUrl, functionName);
      var promise = new Promise(function (resolve, reject) {
        _this17.options.restClient.request({
          uri: apiUrl,
          method: API_METHOD_GET
        }).then(function (data) {
          return resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return GeneralV1;
}();

var General = /*#__PURE__*/function () {
  function General(opts) {
    _classCallCheck(this, General);

    this.options = opts;
    this._v1 = new GeneralV1(opts);
  }

  _createClass(General, [{
    key: "v1",
    value: function v1() {
      return this._v1;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (this.options.version && this.options.version === VERSIONS.v1) {
        return this._v1;
      }

      return this._v1;
    }
  }]);

  return General;
}();

var RestError = /*#__PURE__*/function (_Error) {
  _inherits(RestError, _Error);

  var _super = _createSuper(RestError);

  /**
   * Set default values of CustomError class
   * @param {object|Error} error - Either pass an built-un Error or Error Object from API
   */
  function RestError(error) {
    var _this18;

    _classCallCheck(this, RestError);

    var errorMessage = '';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error.error;
    }

    _this18 = _super.call(this, errorMessage);

    if (!(error instanceof Error)) {
      _this18.name = error.name || 'RestError';
      _this18.code = error.code;
    }

    _this18.error = errorMessage;
    _this18.message = errorMessage;

    var errorType = _this18.getErrorType(_this18.code);

    _this18.errorType = errorType;

    if (error.params) {
      _this18.params = error.params;
    }

    return _this18;
  }

  _createClass(RestError, [{
    key: "getErrorType",
    value: function getErrorType(code) {
      switch (code) {
        case 0:
          return 'AUTH_DECLINED';

        case 1:
          return 'MISSING_INPUT_PARAM';

        case 2:
          return 'INVALID_INPUT_PARAM';

        case 404:
          return 'NOT_FOUND';

        default:
          return 'INTERNAL_SERVER_ERROR';
      }
    }
  }]);

  return RestError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var RestClient = /*#__PURE__*/function () {
  /**
   * Create an instance of RestClient
   * @param {object} opts - Options
   * @param {string} opts.token - Default token for the request
   * @param {object} opts.params - Default params for the request
   * @param {object} opts.data - Default data for the request
   * @param {boolean} opts.useCamelCase - Convert all response keys to camelCase
   */
  function RestClient(opts) {
    _classCallCheck(this, RestClient);

    opts = opts || {};
    var service = axios.create({});
    service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    this.service = service;
    this.token = opts.token;
    this.defaultData = opts.data || {};
    this.defaultParams = opts.params || {};
    this.useCamelCase = typeof opts.useCamelCase === 'boolean' ? opts.useCamelCase : false;

    this._addInterceptors();
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


  _createClass(RestClient, [{
    key: "request",
    value: function request(opts, callback) {
      var _this19 = this;

      opts = opts || {};

      if (!opts.method) {
        throw new Error('Http method is required');
      }

      if (!opts.uri) {
        throw new Error('URI is required');
      }

      var headers = opts.headers || {};

      if (!headers.Connection && !headers.connection) {
        headers.Connection = 'close';
      }

      var options = {
        timeout: opts.timeout || 30000,
        maxRedirects: opts.allowRedirects ? 10 : 0,
        url: opts.uri,
        method: opts.method,
        validateStatus: function validateStatus(status) {
          return status >= 100 && status < 600;
        }
      };
      opts.headers = opts.headers || {};

      if (!_.isNull(opts.data)) {
        options.data = qs.stringify(opts.data, {
          arrayFormat: 'repeat'
        });
      }

      if (!_.isNull(opts.params)) {
        options.params = opts.params;

        options.paramsSerializer = function (params) {
          return qs.stringify(params, {
            arrayFormat: 'repeat'
          });
        };
      }

      var promise = new Promise(function (resolve, reject) {
        _this19.service(options).then(function (response) {
          var data = response.data;

          if (data.error) {
            return Promise.reject(data);
          }

          return resolve(data);
        })["catch"](function (err) {
          var result = new RestError(err);
          return reject(result);
        });
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "_addInterceptors",
    value: function _addInterceptors() {
      var _this20 = this;

      this.service.interceptors.request.use(function (config) {
        if (_this20.token) {
          config.headers.Authorization = "Bearer ".concat(_this20.token);
        }

        if (_this20.defaultParams) {
          config.params = _objectSpread(_objectSpread({}, config.params), _this20.defaultParams);
        }

        if (_this20.defaultData) {
          config.data = _objectSpread(_objectSpread({}, config.data), _this20.defaultData);
        }

        return config;
      });
      this.service.interceptors.response.use(function (response) {
        if (response.request.method === API_METHOD_POST) {
          if (response.status === 200) {
            response.data['request_status'] = RES_STATUS_ACCEPTED; // jshint ignore:line
          } else {
            response.data['request_status'] = RES_STATUS_DELAYED; // jshint ignore:line
          }
        }

        if (_this20.useCamelCase) {
          response.data = humps.camelizeKeys(response.data);
        }

        return response;
      }, function (err) {
        return Promise.reject(err);
      });
    }
  }]);

  return RestClient;
}();
/**
* Returns Version from VersionMap
* @param {string} version - Input Version as V1, V2, etc.
*/


var getVersion = function getVersion(version) {
  if (!version) {
    return VERSIONS.v1;
  }

  version = version.toLowerCase();

  if (!VERSIONS[version]) {
    throw new Error('Invalid Version');
  }

  return VERSIONS[version];
};

var GreenSMS = /*#__PURE__*/function () {
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
  function GreenSMS(opts) {
    _classCallCheck(this, GreenSMS);

    opts = opts || {};
    var _opts = opts,
        username = _opts.username,
        password = _opts.password,
        token = _opts.token,
        useTokenForRequests = _opts.useTokenForRequests,
        camelCaseResponse = _opts.camelCaseResponse,
        version = _opts.version;
    this.token = null;

    if (token) {
      this.token = token;
    }

    if (!this.token && (!username || !password)) {
      throw new Error('Either User/Pass or Auth Token is required!');
    } else if (username) {
      this.username = username;
      this.password = password;
    }

    var sharedOptions = {
      useTokenForRequests: useTokenForRequests,
      version: getVersion(version),
      baseUrl: baseUrl(),
      restClient: this._getHttpClient({
        useCamelCase: camelCaseResponse
      })
    };
    this.sms = new Sms(sharedOptions).getInstance();
    this.account = new Account(sharedOptions).getInstance();
    this.viber = new Viber(sharedOptions).getInstance();
    this.call = new Call(sharedOptions).getInstance();
    this.voice = new Voice(sharedOptions).getInstance();
    this.hlr = new Hlr(sharedOptions).getInstance();
    this.payment = new Payment(sharedOptions).getInstance();
    this.general = new General(sharedOptions).getInstance();
  }

  _createClass(GreenSMS, [{
    key: "_getHttpClient",
    value: function _getHttpClient(httpParams) {
      httpParams = httpParams || {};
      var params = {};

      if (!this.token && this.username) {
        params.user = this.username;
        params.pass = this.password;
      }

      var httpClientOptions = _objectSpread(_objectSpread({}, httpParams), {
        token: this.token,
        params: params
      });

      var restClient = new RestClient(httpClientOptions);
      return restClient;
    }
  }], [{
    key: "lookup",
    value: function lookup(opts, callback) {
      opts = opts || {};
      var sharedOptions = {
        version: getVersion(opts.version),
        baseUrl: baseUrl(),
        restClient: new RestClient({
          useCamelCase: typeof opts.camelCaseResponse === 'boolean' ? opts.camelCaseResponse : false
        })
      };
      var general = new General(sharedOptions).getInstance();
      var promise = new Promise(function (resolve, reject) {
        general.lookup(opts.params).then(resolve)["catch"](reject);
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }, {
    key: "serverStatus",
    value: function serverStatus(opts, callback) {
      opts = opts || {};
      var sharedOptions = {
        version: getVersion(opts.version),
        baseUrl: baseUrl(),
        restClient: new RestClient({
          useCamelCase: typeof opts.camelCaseResponse === 'boolean' ? opts.camelCaseResponse : false
        })
      };
      var general = new General(sharedOptions).getInstance();
      var promise = new Promise(function (resolve, reject) {
        general.serverStatus().then(resolve)["catch"](reject);
      });

      if (callback !== null && typeof callback === 'function') {
        promise.then(function (data) {
          return callback(null, data);
        })["catch"](function (err) {
          return callback(err);
        });
      } else {
        return promise;
      }
    }
  }]);

  return GreenSMS;
}();

export default GreenSMS;