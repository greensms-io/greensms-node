'use strict';

require('dotenv').config();
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromise);

const GreenSMS = require('../dist/index.cjs.js');
const { greenSmsInstance } = require('./greensms');

// TODO: Considering that token expire, does it make sense to use Token Requests for Tests in Deployment Pipeline

// Will pick token from process.env.GREENSMS_TOKEN

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTYwNTc5NjEwOCwiaXNzIjoiYXBpLmdyZWVuc21zLnJ1In0.St8-5fJqQnHx1MFybJ5o4D5VZ-RK3HxcL0DScJsOYec';
describe('Token', function() {

  it('should have a key balance', async function() {
    if (token) {
      const tokenInstance = new GreenSMS({ token }); //
      const data = await tokenInstance.account.balance();
      expect(data).to.have.property('balance');
    }
  });

  it('should throw error if token not available', async function() {
    token = null;
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

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
