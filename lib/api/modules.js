import Schema from './schema';

const Modules = {
  account: {
    schema: Schema.account,
    versions: {
      v1: {
        balance: {
          args: null,
          method: 'GET',
        },
        token: {
          args: ['params'],
          method: 'POST',
        },
        tariff: {
          args: null,
          method: 'GET',
        },
      },
    },
  },
  call: {
    schema: Schema.call,
    versions: {
      v1: {
        send: {
          args: ['params'],
          method: 'POST',
        },
        status: {
          args: ['params'],
          method: 'GET',
        },
      },
    },
  },
  hlr: {
    schema: Schema.hlr,
    versions: {
      v1: {
        send: {
          args: ['params'],
          method: 'POST',
        },
        status: {
          args: ['params'],
          method: 'GET',
        },
      },
    },
  },
  pay: {
    schema: Schema.pay,
    versions: {
      v1: {
        send: {
          args: ['params'],
          method: 'POST',
        },
        status: {
          args: ['params'],
          method: 'GET',
        },
      },
    },
  },
  sms: {
    schema: Schema.sms,
    versions: {
      v1: {
        send: {
          args: ['params'],
          method: 'POST',
        },
        status: {
          args: ['params'],
          method: 'GET',
        },
      },
    },
  },
  viber: {
    schema: Schema.viber,
    versions: {
      v1: {
        send: {
          args: ['params'],
          method: 'POST',
        },
        status: {
          args: ['params'],
          method: 'GET',
        },
      },
    },
  },
  voice: {
    schema: Schema.voice,
    versions: {
      v1: {
        send: {
          args: ['params'],
          method: 'POST',
        },
        status: {
          args: ['params'],
          method: 'GET',
        },
      },
    },
  },
  general: {
    schema: Schema.general,
    static: true,
    versions: {
      v1: {
        lookup: {
          args: ['params'],
          method: 'GET',
        },
        status: {
          args: null,
          method: 'GET',
        },
      },
    },
  },
};

export default Modules;
