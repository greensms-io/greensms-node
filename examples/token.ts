import GreenSMS from 'greensms';
import type { Account, TGreenSMSOptions } from 'greensms';

// Will pick token from process.env.GREENSMS_TOKEN
const greenSMS = new GreenSMS(<TGreenSMSOptions>{
  token: process.env.GREENSMS_TOKEN!,
});

async function getAccountBalance() {
  const balanceResponse: Account.TBalanceResponse = await greenSMS.account.v1.balance();
  console.log('Account Balance', balanceResponse);
}

getAccountBalance();
