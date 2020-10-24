"use strict";

require('dotenv').config();
const { expect } = require('chai');

const GreenSMS = require("../dist/index.cjs.js");

// TODO: Considering that token expire, does it make sense to use Token Requests for Tests in Deployment Pipeline

// Will pick token from process.env.GREENSMS_TOKEN
const tokenInstance = new GreenSMS({}); //

describe('Token', function() {
  it('should have a key balance', async function() {
    const data = await tokenInstance.account.balance();
    expect(data).to.have.property('balance');
  });
});