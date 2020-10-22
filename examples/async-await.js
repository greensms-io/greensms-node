const { GreenSMS } = require("./greensms");

async function getServerStatus() {
  const serverStatus = await GreenSMS.status();
  console.log('Server Status', serverStatus);
}

getServerStatus();