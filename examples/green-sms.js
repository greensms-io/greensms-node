"use strict";

require('dotenv').config();

const GreenSMS = require("../dist/index.cjs.js");

const username = process.env.GREEN_SMS_USERNAME;
const password = process.env.GREEN_SMS_PASSWORD;
const greenSmsInstance = new GreenSMS({ username, password, camelCaseResponse: true  });

module.exports = {
  GreenSMS, greenSmsInstance
};

// const hlrParams = {
//   to: '919987409698',
//   txt: 1234
// };
// greenSms.hlr.sendMessage(hlrParams).then((data) => console.log("Send HLR Data", data)).catch(err => console.error("Send HLR Error", err));

// const hlrStatusParams = {
//   id: '70d296f5-ac52-403d-a27b-24829c2faebc'
// };
// greenSms.hlr.fetchStatus(hlrStatusParams).then((data)=> {
//   console.error("HLR Status Data", data);
// }).catch(err => {
//   console.error("HLR Status Error", err);
// });

// const payParams = {
//   to: '919987409698',
//   amount: 10
// };
// greenSms.payment.sendPayment(payParams).then((data) => console.log("Send Payment Data", data)).catch(err => console.error("Send Payment Error", err));

// const paymentStatusParams = {
//   id: '60f231d9-16ec-4313-842e-6e6853063482'
// };

// greenSms.payment.fetchStatus(paymentStatusParams).then((data)=> {
//   console.error("Payment Status Data", data);
// }).catch(err => {
//   console.error("Payment Status Error", err);
// });
