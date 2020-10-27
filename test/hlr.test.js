const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');
const  { randomPhone } = require('./utils');
const { expect } = chai;

chai.use(chaiAsPromise);

describe('HLR', function() {

  it('should have a key request_id', async function() {
    const toNumber = randomPhone(79260000111, 79260999999);
    console.log('To Number', toNumber);

    const data = await greenSmsInstance.hlr.send({
      to: toNumber,
    });
    expect(data).to.have.property('requestId');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.hlr.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {
    const toNumber = randomPhone(79260000000, 79260999999);
    const hlrStatusParams = {
      id: '70d296f5-ac52-403d-a27b-24829c2faebc',
      to: toNumber, // TODO: Remove this field when the API is updated
    };
    const data = await greenSmsInstance.hlr.status(hlrStatusParams);
    expect(data).to.have.property('status');
  });

});


