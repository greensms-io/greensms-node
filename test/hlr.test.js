const { greenSmsInstance } = require('./../examples/greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('HLR', function() {

  it('should have a key request_id', async function() {
    const data = await greenSmsInstance.hlr.send({
      to: '919987409698',
    });
    expect(data).to.have.property('requestId');
  });

  it('should throw an Error if to is not specified', async function() {
    await expect(greenSmsInstance.hlr.send()).to.be.rejectedWith(Error);
  });

  it('should have a key status', async function() {

    const hlrStatusParams = {
      id: '70d296f5-ac52-403d-a27b-24829c2faebc',
      to: '123' // TODO: Remove this field when the API is updated
    };
    const data = await greenSmsInstance.hlr.status(hlrStatusParams);
    expect(data).to.have.property('status');
  });

});

