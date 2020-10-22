"use strict";

const { GreenSMS, greenSmsInstance } = require("./greensms");

const lookupParams = {
  to: '919987409698',
};

greenSmsInstance.general.lookup(lookupParams).then((data) => console.log("Lookup Data", data)).catch(err => console.error("Lookup Error", err));
greenSmsInstance.general.status().then(data => console.log("Status Data", data)).catch(err => console.error("Status Error", err));

GreenSMS.lookup(lookupParams).then((data) => console.log("Lookup Data", data)).catch(err => console.error("Lookup Error", err));
GreenSMS.status().then(data => console.log("Status Data", data)).catch(err => console.error("Status Error", err));