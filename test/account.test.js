const { GreenSMS, greenSmsInstance } = require('./greensms');

const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromise);



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

  it('should throw error for Unauthorized User', async function() {

    const client = new GreenSMS({
      user: 'test_block_user', // Should come from ENB of Pipeline
      pass: '1834561'
    });

    await expect(client.account.balance()).to.eventually.be.rejectedWith("Authorization declined");

  });

  it('should throw an error for Insufficient Funds', async function() {

    const client = new GreenSMS({
      user: 'test_block_user', // Should come from ENB of Pipeline
      pass: '183456'
    });

    await expect(client.sms.send({
      to: '919987409698',
      txt: 'Test Message'
    })).to.eventually.be.rejectedWith("Insufficient funds");

  });
});

