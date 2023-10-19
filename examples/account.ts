import GreenSMS from 'greensms';
import type { Account, TGreenSMSOptions } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

greenSMS.account.v1
  .balance()
  .then((data: Account.TBalanceResponse) => {
    console.log('Balance Data', data);
  })
  .catch(err => {
    console.error('Balance Error', err);
  });

greenSMS.account.v1
  .token(<Account.TTokenParams>{
    expire: 100, // Optional, time in seconds
  })
  .then((data: Account.TTokenResponse) => {
    console.log('Token Data', data);
  })
  .catch(err => {
    console.error('Token Error', err);
  });

greenSMS.account.v1
  .tariff()
  .then((data: Account.TTariffResponse) => {
    console.error('Tariff Data', data);
  })
  .catch(err => {
    console.error('Tariff Error', err);
  });
