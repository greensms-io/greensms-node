const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const  { randomPhone } = require('./utils');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('Viber', function() {

  let requestId = null;

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.viber.send({
      to: randomPhone(),
      txt: 'Here is your message for delivery',
      from: 'GreenSMS',
      cascade: 'sms',
    });
    expect(data).to.have.property('requestId');
    requestId = data.requestId;

  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.viber.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const viberStatusParams = {
      id: requestId,
      extended: true,
    };

    const data = await greenSmsInstance.viber.status(viberStatusParams);
    expect(data).to.have.property('status');
  });

});

