const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('Pay', function() {

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.pay.send({
      to: '919987409698',
      amount: 10
    });
    expect(data).to.have.property('requestId');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.pay.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const paymentStatusParams = {
      id: '60f231d9-16ec-4313-842e-6e6853063482'
    };

    const data = await greenSmsInstance.pay.status(paymentStatusParams);
    expect(data).to.have.property('status');
  });

});

