const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { randomPhone, timeout } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('Call', function () {

  let requestId = null;

  it('should have a key request_id', async function () {
    const data = await greenSmsInstance.call.send({
      to: randomPhone(),
      language: 'ru',
      tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea421c',
    });
    expect(data).to.have.property('requestId');
    expect(data).to.have.property('code');

    requestId = data.requestId;

  });

  it('should throw an Error if to is not specified', async function () {
    await expect(greenSmsInstance.call.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function () {

    await timeout(2000);

    const callStatusParams = {
      id: requestId,
      extended: true,
    };

    const data = await greenSmsInstance.call.status(callStatusParams);
    expect(data).to.have.property('statusCode');
  });

});

