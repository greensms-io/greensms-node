import GreenSMS from 'greensms';
import type { Call, TGreenSMSOptions } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.call.v1
  .send(<Call.TSendParams>{
    lang: 'en',
    tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea421c',
    to: '919987409698',
  })
  .then((data: Call.TSendResponse) => console.log('Send Call Data', data))
  .catch(err => console.error('Send Call Error', err));

greenSMS.call.v1
  .status(<Call.TStatusParams>{
    id: 'bc0f6a57-d761-45e5-b8ec-38913761e5cc',
  })
  .then((data: Call.TStatusResponse) => {
    console.error('Call Send Data', data);
  })
  .catch(err => {
    console.error('Call Status Error', err);
  });

greenSMS.call.v1
  .receive(<Call.TReceiveParams>{
    tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea4211',
    to: '919987409698',
    toll_free: 'true',
  })
  .then((data: Call.TReceiveResponse) => console.log('Receive Call Data', data))
  .catch(err => console.error('Receive Call Error', err));
