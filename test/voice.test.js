const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const  { randomPhone } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('Voice', function() {

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.voice.send({
      to: randomPhone(),
      txt: '1001',
      lang: 'en',
    });
    expect(data).to.have.property('requestId');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.voice.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const voiceStatusParams = {
      id: '41f23094-deda-4cab-ac9c-3ab4f2fee9e6',
      extended: true,
    };

    const data = await greenSmsInstance.voice.status(voiceStatusParams);
    expect(data).to.have.property('status');
  });

});

