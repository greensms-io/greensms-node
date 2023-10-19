import GreenSMS from '../../lib';
import { greenSMS, randomPhone } from '../utils';

describe('Account', () => {
  it('should have a key balance', async () => {
    const data = await greenSMS.account.v1.balance();

    expect(data).toHaveProperty('balance');
  });

  it('should have a key token', async () => {
    const data = await greenSMS.account.v1.token({ expire: 100 });

    expect(data).toHaveProperty('accessToken');
  });

  it('should fetch tariff details', async () => {
    const data = await greenSMS.account.v1.tariff();

    expect(data).toHaveProperty('tariff');
    expect(data.tariff).not.toBeUndefined();
    expect(data.tariff.length).toBeGreaterThan(0);
  });

  it('should throw error for Unauthorized User', async () => {
    const client = new GreenSMS({
      // Should come from ENB of Pipeline
      pass: '18345612',
      user: 'test_block_user',
    });

    await expect(client.account.v1.balance()).rejects.toThrow('Authorization declined');
  });

  it('should throw an error for Insufficient Funds', async () => {
    const client = new GreenSMS({
      // Should come from ENB of Pipeline
      pass: '183456',
      user: 'test_block_user',
    });

    await expect(
      client.sms.v1.send({
        to: randomPhone(),
        txt: 'Test Message',
      })
    ).rejects.toThrow('Insufficient funds');
  });
});
