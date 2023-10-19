import { greenSMS, randomPhone, timeout } from '../utils';

describe('Voice', () => {
  let requestId: string;

  describe('Send voice message', () => {
    it('should have a key request_id', async () => {
      const data = await greenSMS.voice.v1.send({
        lang: 'en',
        to: randomPhone(),
        txt: '1001',
      });

      expect(data).toHaveProperty('requestId');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async () => {
      await expect(greenSMS.voice.v1.send({} as any)).rejects.toThrow(Error);
    });
  });

  describe('Status check', () => {
    it('should have a key status', async () => {
      await timeout(2000);

      const data = await greenSMS.voice.v1.status({
        extended: true,
        id: requestId,
      });

      expect(data).toHaveProperty('status');
    });

    it('should have a key status when extended is passed as a true', async function () {
      await timeout(2000);

      const data = await greenSMS.voice.v1.status({
        extended: true,
        id: requestId,
      });

      expect(data).toHaveProperty('status');
    });
  });
});
