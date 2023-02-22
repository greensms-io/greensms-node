const { greenSmsInstance } = require('./greensms');

const whatsappParams = {
  to: '79150000000',
  from: '79150000000',
  txt: 'GreenSMS Node SDK',
  tag: 'test-sdk-node',
};
greenSmsInstance.whatsapp.send(whatsappParams).then((data) => console.log('Send Whatsapp Data', data)).catch(err => console.error('Send Whatsapp Error', err));

const whatsappStatusParams = {
  id: '79442f1f-17a8-42bb-9f6f-4affc8788e7e',
};
greenSmsInstance.whatsapp.status(whatsappStatusParams).then((data) => {
  console.error('Whatsapp Status Data', data);
}).catch(err => {
  console.error('Whatsapp Status Error', err);
});

const whatsappWebhookParams = {
  url: 'http://test.url',
};
greenSmsInstance.whatsapp.webhook(whatsappWebhookParams).then((data) => {
  console.error('Whatsapp Webhook Data', data);
}).catch(err => {
  console.error('Whatsapp Webhook Error', err);
});
