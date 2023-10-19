import { greenSMS, randomPhone, timeout } from '../utils';

describe('HLR', () => {
  let requestId: string;

  describe('Send HLR request', () => {
    it('should have a key request_id', async () => {
      const toNumber = randomPhone(79150000000, 79150999999);
      const data = await greenSMS.hlr.v1.send({
        to: toNumber.toString(),
      });

      expect(data).toHaveProperty('requestId');

      requestId = data.requestId;
    });

    it('should throw an Error if to is not specified', async () => {
      await expect(greenSMS.hlr.v1.send({} as any)).rejects.toThrow(Error);
    });
  });

  describe('Status check', () => {
    it('should have a key status', async () => {
      await timeout(2000);

      const data = await greenSMS.hlr.v1.status({
        id: requestId,
        to: randomPhone(79260000000, 79260999999),
      });

      expect(data).toHaveProperty('status');
    });
  });
});
