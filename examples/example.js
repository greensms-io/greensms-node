"use strict";

const GreenSMS = require("../dist/index.cjs");

const username = process.env.GREEN_SMS_USERNAME;
const password = process.env.GREEN_SMS_PASSWORD;

const greenSms = new GreenSMS({ username, password });
