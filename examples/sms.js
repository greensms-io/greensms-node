"use strict";

const { greenSmsInstance } = require("./green-sms");

greenSmsInstance.sms
  .sendMessage({
    to: '919987409698',
    txt: 'Here is your message for delivery',
  })
  .then((data) => {
    console.log("Send SMS Data", data);
  })
  .catch((err) => {
    console.error("Send SMS Error", err);
  });

const smsStatusParams = {
  id: 'dc2bac6d-f375-4e19-9a02-ef0148991635',
  extended: true
};
greenSmsInstance.sms.fetchStatus(smsStatusParams)
.then((data) => {
  console.log("Send SMS Data", data);
})
.catch((err) => {
  console.error("Send SMS Error", err);
});
