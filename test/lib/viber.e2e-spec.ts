import { greenSMS, randomPhone, timeout } from '../utils';

describe('Viber', function () {
  let requestId: string;

  describe('Send message', () => {
    it('should have a key request_id', async function () {
      const data = await greenSMS.viber.v1.send({
        cascade: 'sms',
        from: 'GreenSMS',
        to: randomPhone(),
        txt: 'Here is your message for delivery',
      });

      expect(data).toHaveProperty('requestId');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async function () {
      await expect(greenSMS.viber.v1.send({} as any)).rejects.toThrow(Error);
    });
  });

  describe('Status check', () => {
    it('should have a key status', async function () {
      await timeout(2000);

      const data = await greenSMS.viber.v1.status({
        extended: true,
        id: requestId,
      });
      expect(data).toHaveProperty('status');
    });
  });
});
