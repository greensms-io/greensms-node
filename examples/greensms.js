"use strict";

require('dotenv').config();

const GreenSMS = require("../dist/index.cjs.js");

const username = process.env.GREENSMS_USERNAME;
const password = process.env.GREENSMS_PASSWORD;
const greenSmsInstance = new GreenSMS({ username, password, camelCaseResponse: true  });

module.exports = {
  GreenSMS, greenSmsInstance
};