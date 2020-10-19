"use strict";

const GreenSMS = require("../dist/index.cjs.js");

const username = "test"; // process.env.GREEN_SMS_USERNAME;
const password = "pass"; // process.env.GREEN_SMS_PASSWORD;

const greenSms = new GreenSMS({ username, password });
greenSms.sms
  .sendMessage()
  .then((data) => {
    console.log("Data", data);
  })
  .catch((err) => {
    console.error("Error", err);
  });
