import { greenSMS } from '../utils';

describe('Additional', () => {
  it('should have a key def', async () => {
    const data = await greenSMS.whois.v1.lookup({
      to: '79260000000',
    });
    expect(data).toHaveProperty('def');
    expect(data).toHaveProperty('region');

    // TODO: Add mandatory keys here
  });

  it('should have a key status', async () => {
    const data = await greenSMS.status();

    expect(data).toHaveProperty('status');
  });
});
