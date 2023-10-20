import { greenSMS, timeout } from '../utils';

describe('WhatsApp', () => {
  let requestId: string;

  describe('Send message', () => {
    it.skip('should have a key request_id', async function () {
      const data = await greenSMS.whatsapp.v1.send({
        from: '79150000000',
        to: '79150000000',
        txt: 'Here is your message for delivery',
      });

      expect(data).toHaveProperty('requestId');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async function () {
      await expect(greenSMS.whatsapp.v1.send({} as any)).rejects.toThrow(Error);
    });
  });

  describe('Set webhook', () => {
    it('should have a OK status', async function () {
      await timeout(2000);

      const data = await greenSMS.whatsapp.v1.webhook({
        url: 'http://test.url',
      });

      expect(data).toHaveProperty('status');
    });
  });

  describe('Status check', () => {
    it.skip('should have a key status', async function () {
      await timeout(2000);

      const data = await greenSMS.whatsapp.v1.status({
        extended: true,
        id: requestId,
      });

      expect(data).toHaveProperty('status');
    });
  });
});
