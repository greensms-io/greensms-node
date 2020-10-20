"use strict";

const { GreenSMS, greenSmsInstance } = require("./green-sms");

const lookupParams = {
  to: '919987409698',
};

greenSmsInstance.general.lookup(lookupParams).then((data) => console.log("Lookup Data", data)).catch(err => console.error("Lookup Error", err));
greenSmsInstance.general.serverStatus().then(data => console.log("Status Data", data)).catch(err => console.error("Status Error", err));

GreenSMS.lookup(lookupParams).then((data) => console.log("Lookup Data", data)).catch(err => console.error("Lookup Error", err));
GreenSMS.serverStatus().then(data => console.log("Status Data", data)).catch(err => console.error("Status Error", err));