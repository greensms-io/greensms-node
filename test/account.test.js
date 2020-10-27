const { GreenSMS, greenSmsInstance } = require('./greensms');
const { expect } = require('chai');

describe('Account', function() {

  it('should have a key balance', async function() {
    const data = await greenSmsInstance.account.balance();
    expect(data).to.have.property('balance');
  });

  it('should have a key token', async function() {
    const data = await greenSmsInstance.account.token();
    expect(data).to.have.property('accessToken');
  });

  it('should throw error without credentials', async function() {
    expect(function() {
      const instanceWithoutCredentials = GreenSMS({});
    }).to.throw(Error);
  });

  it('should fetch tariff details', async function() {
    const data = await greenSmsInstance.account.tariff();
    expect(data).to.have.property('tariff').not.to.be.undefined;
    expect(data.tariff.length).to.greaterThan(0);
  });
});

