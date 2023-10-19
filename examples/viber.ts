import GreenSMS from 'greensms';
import type { TGreenSMSOptions, Viber } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.viber.v1
  .send(<Viber.TSendParams>{
    to: '919987409698',
    txt: 'Here is your message for delivery',
  })
  .then((data: Viber.TSendResponse) => {
    console.log('Send Viber Data', data);
  })
  .catch(err => {
    console.error('Send Viber Error', err);
  });

greenSMS.viber.v1
  .status(<Viber.TStatusParams>{
    extended: true,
    id: '0b18fab4-0c5d-4a8b-8ee4-057a59596c7d',
  })
  .then((data: Viber.TStatusResponse) => {
    console.log('Status Viber Data', data);
  })
  .catch(err => {
    console.error('Status Viber Error', err);
  });
