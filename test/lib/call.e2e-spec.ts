import { greenSMS, randomPhone, timeout } from '../utils';

describe('Call', () => {
  let requestId: string;

  describe('Send call verification', () => {
    it('should have a key request_id when send API is called', async () => {
      const data = await greenSMS.call.v1.send({
        lang: 'ru',
        tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea421c',
        to: randomPhone(),
      });

      expect(data).toHaveProperty('requestId');
      expect(data).toHaveProperty('code');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async () => {
      await expect(greenSMS.call.v1.send({} as any)).rejects.toThrow(Error);
    });

    it('should have a key status', async () => {
      await timeout(2000);

      const data = await greenSMS.call.v1.status({
        extended: true,
        id: requestId,
      });

      expect(data).toHaveProperty('statusCode');
    });
  });

  describe('Receive call verification', () => {
    it('should have a key request_id when receive API is called', async () => {
      const data = await greenSMS.call.v1.receive({
        tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea421c',
        to: randomPhone(),
      });

      expect(data).toHaveProperty('requestId');
      expect(data).toHaveProperty('number');

      requestId = data.requestId;
    });
  });
});
