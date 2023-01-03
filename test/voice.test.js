const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { randomPhone, timeout } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('Voice', function () {

  let requestId = null;

  it('should have a key request_id', async function () {
    const data = await greenSmsInstance.voice.send({
      to: randomPhone(),
      txt: '1001',
      language: 'en',
    });
    expect(data).to.have.property('requestId');
    requestId = data.requestId;

  });

  it('should throw an Error if to is not specified', async function () {
    await expect(greenSmsInstance.voice.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function () {

    await timeout(2000);

    const voiceStatusParams = {
      id: requestId,
      extended: true,
    };

    const data = await greenSmsInstance.voice.status(voiceStatusParams);
    expect(data).to.have.property('status');
  });

  it('should have a key status when extended is passed as a "true"', async function () {

    await timeout(2000);

    const voiceStatusParams = {
      id: requestId,
      extended: 'true',
    };

    const data = await greenSmsInstance.voice.status(voiceStatusParams);
    expect(data).to.have.property('status');
  });

});

