"use strict";

require('dotenv').config();

const GreenSMS = require("../dist/index.cjs.js");

const username = process.env.GREEN_SMS_USERNAME;
const password = process.env.GREEN_SMS_PASSWORD;

const greenSms = new GreenSMS({ username, password, camelCaseResponse: true  });

// greenSms.account
//   .fetchBalance()
//   .then((data) => {
//     console.log("Balance Data", data);
//   })
//   .catch((err) => {
//     console.error("Balance Error", err);
//   });


// const tokenParams = {
//   expire: 100, // Optional, time in seconds
// };
// greenSms.account.fetchToken(tokenParams).then((data) => {
//   console.log("Token Data", data);
// }).catch((err) => {
//   console.error("Token Error", err);
// });

// greenSms.account.fetchTariff().then((data) => {
//   console.error("Tariff Data", data);
// }).catch((err) => {
//   console.error("Tariff Error", err);
// });

// greenSms.sms
//   .sendMessage({
//     to: '919987409698',
//     txt: 'Here is your message for delivery',
//   })
//   .then((data) => {
//     console.log("Send SMS Data", data);
//   })
//   .catch((err) => {
//     console.error("Send SMS Error", err);
//   });

// const smsStatusParams = {
//   id: 'dc2bac6d-f375-4e19-9a02-ef0148991635', // 'be43b1a3-c424-4c68-8ba9-cb09266a0b03', //
//   extended: true
// };
// greenSms.sms.fetchStatus(smsStatusParams)
// .then((data) => {
//   console.log("Send SMS Data", data);
// })
// .catch((err) => {
//   console.error("Send SMS Error", err);
// });



// greenSms.viber
//   .sendMessage({
//     to: '919987409698',
//     txt: 'Here is your message for delivery',
//   })
//   .then((data) => {
//     console.log("Send Viber Data", data);
//   })
//   .catch((err) => {
//     console.error("Send Viber Error", err);
//   });

// const viberStatusParams = {
//   id: '0b18fab4-0c5d-4a8b-8ee4-057a59596c7d',
//   extended: true
// };
// greenSms.viber.fetchStatus(viberStatusParams)
// .then((data) => {
//   console.log("Status Viber Data", data);
// })
// .catch((err) => {
//   console.error("Status Viber Error", err);
// });