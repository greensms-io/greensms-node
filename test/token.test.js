"use strict";

require('dotenv').config();
const { expect } = require('chai');

const GreenSMS = require("../dist/index.cjs.js");
const { greenSmsInstance } = require("./greensms");

// TODO: Considering that token expire, does it make sense to use Token Requests for Tests in Deployment Pipeline

// Will pick token from process.env.GREENSMS_TOKEN

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFuYW4yNCIsImlhdCI6MTYwMzU2OTgzMCwiaXNzIjoiYXBpLmdyZWVuc21zLnJ1In0.OKiv5itdirS_PuPJj5kgGcR2_9DsC9ALW9c8FvvHSF4";
describe('Token', function() {

  it('should have a key balance', async function() {
    if(token) {
      const tokenInstance = new GreenSMS({ token }); //
      const data = await tokenInstance.account.balance();
      expect(data).to.have.property('balance');
    }
  });

  it('should throw error if token not available', async function() {
    token = undefined;
    if(!token) {
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