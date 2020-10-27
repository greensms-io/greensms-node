const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('Call', function() {

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.call.send({
      to: '919987409698',
    });
    expect(data).to.have.property('requestId');
    expect(data).to.have.property('code');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.call.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const callStatusParams = {
      id: '1fd4ac4d-6e4f-4e32-b6e4-8087d3466f55'
    };

    const data = await greenSmsInstance.call.status(callStatusParams);
    expect(data).to.have.property('status');
  });

});

