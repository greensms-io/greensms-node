import GreenSMS from '../../lib';
import { greenSMS, timeout } from '../utils';

describe('Token', () => {
  it('should have a key balance', async () => {
    const tokenData = await greenSMS.account.v1.token({ expire: 5 });
    const tokenInstance = new GreenSMS({ token: tokenData.accessToken }); //
    const data = await tokenInstance.account.v1.balance();

    expect(data).toHaveProperty('balance');
  });

  it('should throw error if token not available', async () => {
    const user = process.env.GREENSMS_USER;
    const pass = process.env.GREENSMS_PASS;
    const token = process.env.GREENSMS_TOKEN;

    delete process.env.GREENSMS_TOKEN;
    delete process.env.GREENSMS_USER;
    delete process.env.GREENSMS_PASS;

    expect(() => {
      new GreenSMS();
    }).toThrow(Error);

    process.env.GREENSMS_USER = user;
    process.env.GREENSMS_PASS = pass;
    process.env.GREENSMS_TOKEN = token;
  });

  it('should expire the token after 5 secs', async () => {
    const data = await greenSMS.account.v1.token({ expire: 5 });
    const invalidTokenInstance = new GreenSMS({ token: data.accessToken });

    await timeout(6000);
    await expect(invalidTokenInstance.account.v1.balance()).rejects.toThrow('Authorization declined');
  });
});
