import GreenSMS from 'greensms';
import type { TGreenSMSOptions, Voice } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.voice.v1
  .send(<Voice.TSendParams>{
    lang: 'en',
    to: '919987409698',
    txt: '1234',
  })
  .then((data: Voice.TSendResponse) => {
    console.log('Send Voice Data', data);
  })
  .catch(err => {
    console.error('Send Voice Error', err);
  });

greenSMS.voice.v1
  .status(<Voice.TStatusParams>{
    id: '41f23094-deda-4cab-ac9c-3ab4f2fee9e6',
  })
  .then((data: Voice.TStatusResponse) => {
    console.error('Voice Status Data', data);
  })
  .catch(err => {
    console.error('Voice Status Error', err);
  });

greenSMS.voice.v1
  .status(<Voice.TStatusParams>{
    extended: true,
    id: '41f23094-deda-4cab-ac9c-3ab4f2fee9e6',
  })
  .then((data: Voice.TStatusResponse) => {
    console.error('Voice Status Data with extended true', data);
  })
  .catch(err => {
    console.error('Voice Status Error for extended true', err);
  });
