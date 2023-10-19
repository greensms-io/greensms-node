import GreenSMS from 'greensms';
import type { Pay, TGreenSMSOptions } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.pay.v1
  .send(<Pay.TSendParams>{
    amount: 10,
    to: '919987409698',
  })
  .then((data: Pay.TSendResponse) => console.log('Send Payment Data', data))
  .catch(err => console.error('Send Payment Error', err));

greenSMS.pay.v1
  .status(<Pay.TStatusParams>{
    id: '60f231d9-16ec-4313-842e-6e6853063482',
  })
  .then((data: Pay.TStatusResponse) => {
    console.error('Payment Status Data', data);
  })
  .catch(err => {
    console.error('Payment Status Error', err);
  });
