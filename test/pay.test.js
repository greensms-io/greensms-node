const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { randomPhone } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('Pay', function() {

  let requestId = null;

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.pay.send({
      to: randomPhone(),
      amount: 10,
      tag: 'MochaTest',
    });
    expect(data).to.have.property('requestId');
    requestId = data.requestId;

  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.pay.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    await timeout(2000);

    const paymentStatusParams = {
      id: requestId,
    };

    const data = await greenSmsInstance.pay.status(paymentStatusParams);
    expect(data).to.have.property('status');
  });

});

