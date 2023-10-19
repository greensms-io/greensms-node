import { greenSMS, randomPhone, timeout } from '../utils';

describe('VK', () => {
  let requestId: string;

  it('should have a key request_id', async () => {
    const data = await greenSMS.vk.v1.send({
      cascade: 'sms, voice',
      from: 'Mocha',
      tag: 'MochaTest',
      to: randomPhone(),
      txt: 'Order Delivery to Hampshire Received',
    });

    expect(data).toHaveProperty('requestId');

    requestId = data.requestId;
  });

  it('should throw an Error if to is not specified', async () => {
    await expect(greenSMS.vk.v1.send({} as any)).rejects.toThrow(Error);
  });

  it('should have a key status', async () => {
    await timeout(3000);

    const data = await greenSMS.vk.v1.status({
      extended: true,
      id: requestId,
    });

    expect(data).toHaveProperty('status');
  });
});
