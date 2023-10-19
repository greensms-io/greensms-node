import GreenSMS from 'greensms';
import type { TGreenSMSOptions, TStatusResponse } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS
  .status()
  .then((data: TStatusResponse) => console.log('Status Data', data))
  .catch(err => console.error('Status Error', err));
