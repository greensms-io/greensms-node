"use strict";

const GreenSMS = require("../dist/index.cjs.js");

const username = process.env.GREEN_SMS_USERNAME;
const password = process.env.GREEN_SMS_PASSWORD;

const greenSms = new GreenSMS({ username, password, camelCaseResponse: true  });

greenSms.account
  .fetchBalance()
  .then((data) => {
    console.log("Balance Data", data);
  })
  .catch((err) => {
    console.error("Balance Error", err);
  });

greenSms.account
  .fetchToken().then((data) => {
    console.log("Token Data", data);
  }).catch((err) => {
    console.error("Token Error", err);
  });


greenSms.sms
  .sendMessage()
  .then((data) => {
    console.log("Data", data);
  })
  .catch((err) => {
    console.error("Error", err);
  });



