import GreenSMS from 'greensms';
import type { Sms, TGreenSMSOptions } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.sms.v1
  .send(<Sms.TSendParams>{
    to: '919987409698',
    txt: 'Here is your message for delivery',
  })
  .then((data: Sms.TSendResponse) => {
    console.log('Send SMS Data', data);
  })
  .catch(err => {
    console.error('Send SMS Error', err);
  });

greenSMS.sms.v1
  .status(<Sms.TStatusParams>{
    extended: true,
    id: 'dc2bac6d-f375-4e19-9a02-ef0148991635',
  })
  .then((data: Sms.TStatusResponse) => {
    console.log('Send SMS Data', data);
  })
  .catch(err => {
    console.error('Send SMS Error', err);
  });
