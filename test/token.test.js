"use strict";

require('dotenv').config();
const { expect } = require('chai');

const GreenSMS = require("../dist/index.cjs.js");
const { greenSmsInstance } = require("./greensms");

// TODO: Considering that token expire, does it make sense to use Token Requests for Tests in Deployment Pipeline

// Will pick token from process.env.GREENSMS_TOKEN


describe('Token', function() {

  it('should have a key balance', async function() {
    if(process.env.GREENSMS_TOKEN) {
      const tokenInstance = new GreenSMS({}); //
      const data = await tokenInstance.account.balance();
      expect(data).to.have.property('balance');
    }
  });

  it('should throw error if token not available', async function() {
    process.env.GREENSMS_TOKEN = undefined;
    if(!process.env.GREENSMS_TOKEN) {
      const tokenInstance = new GreenSMS({}); //
      await expect(tokenInstance.account.balance()).to.throw(Error);
    }
  });

  it('should expire the token after 5 secs', async function() {

    const data = await greenSmsInstance.account.token({ expire: 5 });
    const invalidTokenInstance = new GreenSMS({ token: data.accessToken });
    await timeout(6000);
    await expect(invalidTokenInstance.account.balance()).to.throw(Error);

  });
});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}