const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const  { randomPhone } = require('./utils');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('Viber', function() {

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.viber.send({
      to: randomPhone(),
      txt: 'Here is your message for delivery',
      from: 'GreenSMS',
      cascade: 'sms',
    });
    expect(data).to.have.property('requestId');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.viber.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const viberStatusParams = {
      id: '0b18fab4-0c5d-4a8b-8ee4-057a59596c7d',
      extended: true
    };

    const data = await greenSmsInstance.viber.status(viberStatusParams);
    expect(data).to.have.property('status');
  });

});

