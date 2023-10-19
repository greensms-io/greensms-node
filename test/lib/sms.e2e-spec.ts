import { greenSMS, randomPhone, timeout } from '../utils';

describe('SMS', function () {
  let requestId: string;

  describe('Send message', () => {
    it('should have a key request_id', async () => {
      const data = await greenSMS.sms.v1.send({
        from: 'Mocha',
        hidden: 'Hampshire',
        tag: 'MochaTest',
        to: randomPhone(),
        txt: 'Order Delivery to Hampshire Received',
      });

      expect(data).toHaveProperty('requestId');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async () => {
      await expect(greenSMS.sms.v1.send({} as any)).rejects.toThrow(Error);
    });
  });

  describe('Status check', () => {
    it('should have a key status', async () => {
      await timeout(2000);

      const data = await greenSMS.sms.v1.status({
        extended: true,
        id: requestId,
      });

      expect(data).toHaveProperty('status');
    });
  });
});
