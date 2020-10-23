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
};

export default Modules;
