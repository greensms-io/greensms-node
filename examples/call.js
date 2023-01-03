const { greenSmsInstance } = require('./greensms');

const callVerificationParams = {
  to: '919987409698',
  language: 'en',
  tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea421c',
};

greenSmsInstance.call.send(callVerificationParams).then((data) => console.log('Send Call Data', data)).catch(err => console.error('Send Call Error', err));

const callStatusParams = {
  id: 'bc0f6a57-d761-45e5-b8ec-38913761e5cc',
};
greenSmsInstance.call.status(callStatusParams).then((data) => {
  console.error('Call Send Data', data);
}).catch(err => {
  console.error('Call Status Error', err);
});
