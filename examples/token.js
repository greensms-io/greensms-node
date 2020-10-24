"use strict";

require('dotenv').config();

const GreenSMS = require("../dist/index.cjs.js");

// Will pick token from process.env.GREENSMS_TOKEN
const tokenInstance = new GreenSMS({}); //

async function getAccountBalance() {
  const balanceResponse = await tokenInstance.account.balance();
  console.log('Account Balance', balanceResponse);
}

getAccountBalance();