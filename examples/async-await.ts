import GreenSMS from 'greensms';
import type { Account, TGreenSMSOptions } from 'greensms';

const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  pass: process.env.GREENSMS_PASS!,
  user: process.env.GREENSMS_USER!,
});

async function getAccountBalance() {
  const balanceResponse: Account.TBalanceResponse = await greenSMS.account.v1.balance();

  console.log('Account Balance', balanceResponse);
}

getAccountBalance();
