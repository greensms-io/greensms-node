import GreenSMS from 'greensms';
import type { Hrl, TGreenSMSOptions } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.hlr.v1
  .send(<Hrl.TSendParams>{
    to: '79150000000',
    txt: 1234,
  })
  .then((data: Hrl.TSendResponse) => console.log('Send HLR Data', data))
  .catch(err => console.error('Send HLR Error', err));

greenSMS.hlr.v1
  .status(<Hrl.TStatusParams>{
    id: '70d296f5-ac52-403d-a27b-24829c2faebc',
  })
  .then((data: Hrl.TStatusResponse) => {
    console.error('HLR Status Data', data);
  })
  .catch(err => {
    console.error('HLR Status Error', err);
  });
