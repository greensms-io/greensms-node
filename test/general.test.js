const { greenSmsInstance } = require('./greensms');
const chai = require('chai');
const chaiAsPromise = require('chai-as-promised');

const { expect } = chai;

chai.use(chaiAsPromise);

describe('Additional', function() {

  it('should have a key def', async function() {
    const data = await greenSmsInstance.whois.lookup({
      to: '79260000000',

    });
    expect(data).to.have.property('def');
    expect(data).to.have.property('region');

    // TODO: Add mandatory keys here
  });

  it('should have a key status', async function() {

    const data = await greenSmsInstance.status();
    expect(data).to.have.property('status');
  });

});

