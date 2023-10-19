import GreenSMS from 'greensms';
import type { TGreenSMSOptions, WhoIs } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.whois.v1
  .lookup(<WhoIs.TLookupParams>{
    to: '792612345678',
  })
  .then((data: WhoIs.TLookupResponse) => console.log('Lookup Data', data))
  .catch(err => console.error('Lookup Error', err));
