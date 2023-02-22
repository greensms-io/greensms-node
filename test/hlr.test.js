const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { randomPhone, timeout } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('HLR', function () {

  let requestId = null;

  it('should have a key request_id', async function () {
    const toNumber = randomPhone(79150000000, 79150999999);
    const data = await greenSmsInstance.hlr.send({
      to: toNumber.toString(),
    });
    expect(data).to.have.property('requestId');
    requestId = data.requestId;
  });

  it('should throw an Error if to is not specified', async function () {
    await expect(greenSmsInstance.hlr.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function () {

    await timeout(2000);

    const toNumber = randomPhone(79260000000, 79260999999);
    const hlrStatusParams = {
      id: requestId,
      to: toNumber, // TODO: Remove this field when the API is updated
    };
    const data = await greenSmsInstance.hlr.status(hlrStatusParams);
    expect(data).to.have.property('status');
  });

});


