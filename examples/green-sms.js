"use strict";

require('dotenv').config();

const GreenSMS = require("../dist/index.cjs.js");

const username = process.env.GREEN_SMS_USERNAME;
const password = process.env.GREEN_SMS_PASSWORD;
const greenSmsInstance = new GreenSMS({ username, password, camelCaseResponse: true  });

module.exports = {
  GreenSMS, greenSmsInstance
};