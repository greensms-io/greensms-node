const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const { randomPhone } = require('./utils');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('Social', function() {

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.social.send({
      to: randomPhone(),
      txt: 'Order Delivery to Hampshire Received',
      from: 'Mocha',
      tag: 'MochaTest',
      hidden: 'Hampshire',

    });
    expect(data).to.have.property('requestId');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.social.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const socialStatusParams = {
      id: 'dc2bac6d-f375-4e19-9a02-ef0148991635',
      extended: true,
    };

    const data = await greenSmsInstance.social.status(socialStatusParams);
    expect(data).to.have.property('status');
  });

});

