const { greenSmsInstance } = require("./greensms");

async function getAccountBalance() {
  const balanceResponse = await greenSmsInstance.account.balance();
  console.log('Account Balance', balanceResponse);
}

getAccountBalance();