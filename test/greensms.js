'use strict';

const GreenSMS = require('../dist/index.cjs.js');

const user = process.env.GREENSMS_USER;
const pass = process.env.GREENSMS_PASS;
const greenSmsInstance = new GreenSMS({ user, pass, camelCaseResponse: true  });

module.exports = {
  GreenSMS, greenSmsInstance,
};
