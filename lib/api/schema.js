import * as Yup from 'yup';


const NUMBER_OR_UUID_REGEXP = /^(\d+)|([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/gi;
const URL_REGEXP = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;


const ValidationSchema = {
  account: {
    v1: {
      token: Yup.object().shape({
        expire: Yup.number().positive().integer(),
      }),
    },
  },
  call: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        voice: Yup.boolean(),
        language: Yup.string().oneOf(['ru', 'en']),
        tag: Yup.string().min(1).max(36),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
      receive: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        toll_free: Yup.boolean(),
        tag: Yup.string().min(1).max(36),
      }),
    },
  },
  whois: {
    v1: {
      lookup: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
      }),
    },
  },
  hlr: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
    },
  },
  voice: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        txt: Yup.string().required().min(1).max(5).matches(/^\d+$/, 'Invalid Code'),
        lang: Yup.string().oneOf(['ru', 'en']),
        tag: Yup.string().min(1).max(36),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),

    },
  },
  pay: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        amount: Yup.number().required().min(1).positive(),
        tag: Yup.string(),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().min(1).max(36).matches(NUMBER_OR_UUID_REGEXP, 'Invalid Status'),
        extended: Yup.boolean(),
      }),
    },
  },
  sms: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        txt: Yup.string().required().min(1),
        from: Yup.string().min(1),
        tag: Yup.string().min(1),
        hidden: Yup.string().min(1),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
    },
  },
  viber: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        txt: Yup.string().required().min(1),
        from: Yup.string().min(1),
        cascade: Yup.string().oneOf(['sms', 'voice']),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
    },
  },
  social: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        txt: Yup.string().required().min(1),
        from: Yup.string().min(1),
        tag: Yup.string().min(1),
        hidden: Yup.string().min(1),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
    },
  },
  vk: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        txt: Yup.string().required().min(1).max(2048),
        from: Yup.string().min(1).max(11),
        tag: Yup.string().min(1).max(36),
        cascade: Yup.array()
          .transform(function (value, originalValue) {
            if (this.isType(value) && value !== null) {
              return value;
            }
            return originalValue ? originalValue.split(/[\s,]+/) : [];
          })
          .of(Yup.string().oneOf(['sms', 'voice', 'viber'])),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
    },
  },
  whatsapp: {
    v1: {
      send: Yup.object().shape({
        to: Yup.string().required().min(11).max(14).matches(/^\d+$/, 'Invalid Phone Number'),
        txt: Yup.string().required().min(1).max(10000),
        from: Yup.string().min(1),
        file: Yup.string().min(1).max(256),
        tag: Yup.string().min(1).max(36),
      }),
      webhook: Yup.object().shape({
        url: Yup.string().required().min(1).matches(URL_REGEXP, 'Invalid URL'),
      }),
      status: Yup.object().shape({
        id: Yup.string().required().length(36),
        extended: Yup.boolean(),
      }),
    },
  },
};

export default ValidationSchema;
