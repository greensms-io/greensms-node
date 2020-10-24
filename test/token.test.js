"use strict";

require('dotenv').config();
const { expect } = require('chai');

const GreenSMS = require("../dist/index.cjs.js");

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
      await expect(tokenInstance.account.balance()).to.throw(Error);
    }
  });
});