import GreenSMS from 'greensms';
import type { TGreenSMSOptions, WhatsApp } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.whatsapp.v1
  .send(<WhatsApp.TSendParams>{
    from: '79150000000',
    tag: 'test-sdk-node',
    to: '79150000000',
    txt: 'GreenSMS Node SDK',
  })
  .then((data: WhatsApp.TSendResponse) => console.log('Send Whatsapp Data', data))
  .catch(err => console.error('Send Whatsapp Error', err));

greenSMS.whatsapp.v1
  .status(<WhatsApp.TStatusParams>{
    id: '79442f1f-17a8-42bb-9f6f-4affc8788e7e',
  })
  .then((data: WhatsApp.TStatusResponse) => {
    console.error('Whatsapp Status Data', data);
  })
  .catch(err => {
    console.error('Whatsapp Status Error', err);
  });

greenSMS.whatsapp.v1
  .webhook(<WhatsApp.TWebhookParams>{
    url: 'http://test.url',
  })
  .then((data: WhatsApp.TWebhookResponse) => {
    console.error('Whatsapp Webhook Data', data);
  })
  .catch(err => {
    console.error('Whatsapp Webhook Error', err);
  });
