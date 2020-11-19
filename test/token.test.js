'use strict';

require('dotenv').config();
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromise);

const { timeout } = require('./utils');
const GreenSMS = require('../dist/index.cjs.js');
const { greenSmsInstance } = require('./greensms');

describe('Token', function() {

  it('should have a key balance', async function() {
    const tokenData = await greenSmsInstance.account.token({ expire: 5 });
    const tokenInstance = new GreenSMS({ token: tokenData.accessToken }); //
    const data = await tokenInstance.account.balance();
    expect(data).to.have.property('balance');

  });

  it('should throw error if token not available', async function() {
    let token = null;
    if (!token) {
      let user = process.env.GREENSMS_USER;
      let pass = process.env.GREENSMS_PASS;
      delete process.env.GREENSMS_TOKEN;
      delete process.env.GREENSMS_USER;
      delete process.env.GREENSMS_PASS;
      expect(function() { new GreenSMS(); }).to.throw(Error);
      process.env.GREENSMS_USER = user;
      process.env.GREENSMS_PASS = pass;
    }
  });

  it('should expire the token after 5 secs', async function() {

    const data = await greenSmsInstance.account.token({ expire: 5 });
    const invalidTokenInstance = new GreenSMS({ token: data.accessToken });
    await timeout(6000);
    await expect(invalidTokenInstance.account.balance()).to.eventually.be.rejectedWith('Authorization declined');

  });
});
