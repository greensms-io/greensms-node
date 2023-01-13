const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { randomPhone, timeout } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('Whatsapp', function () {

  let requestId = null;

  it('should have a key request_id', async function () {
    const toNumber = randomPhone(79150000000, 79150999999);
    const data = await greenSmsInstance.whatsapp.send({
      to: toNumber.toString(),
      txt: 'Order Delivery to Hampshire Received',
      from: 'Mocha',
      tag: 'MochaTest',
    });
    expect(data).to.have.property('requestId');
    requestId = data.requestId;
  });

  it('should throw an Error if to is not specified', async function () {
    await expect(greenSmsInstance.whatsapp.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function () {

    await timeout(2000);

    const whatsappStatusParams = {
      id: requestId,
    };
    const data = await greenSmsInstance.whatsapp.status(whatsappStatusParams);
    expect(data).to.have.property('status');
  });

});


