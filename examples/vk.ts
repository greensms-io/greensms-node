import GreenSMS from 'greensms';
import type { TGreenSMSOptions, Vk } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.vk.v1
  .send(<Vk.TSendParams>{
    cascade: 'viber, sms',
    from: 'ExampleTest',
    tag: 'ExampleTest',
    to: '919987409698',
    txt: 'Here is your message for delivery',
  })
  .then((data: Vk.TSendResponse) => {
    console.log('Send Social Data', data);
  })
  .catch(err => {
    console.error('Send Social Error', err);
  });

greenSMS.vk.v1
  .status(<Vk.TStatusParams>{
    extended: true,
    id: '0b18fab4-0c5d-4a8b-8ee4-057a59596c7d',
  })
  .then((data: Vk.TStatusResponse) => {
    console.log('Status Viber Data', data);
  })
  .catch(err => {
    console.error('Status Viber Error', err);
  });
