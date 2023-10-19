import { greenSMS, randomPhone, timeout } from '../utils';

describe('Pay', function () {
  let requestId: string;

  describe('Pay to mobile number', () => {
    it('should have a key request_id', async function () {
      const data = await greenSMS.pay.v1.send({
        amount: 10,
        tag: 'MochaTest',
        to: randomPhone().toString(),
      });

      expect(data).toHaveProperty('requestId');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async function () {
      await expect(greenSMS.pay.v1.send({} as any)).rejects.toThrow(Error);
    });
  });

  describe('Status check', () => {
    it('should have a key status', async function () {
      await timeout(2000);

      const data = await greenSMS.pay.v1.status({
        id: requestId,
      });

      expect(data).toHaveProperty('status');
    });
  });
});
