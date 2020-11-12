const { greenSmsInstance } = require('./greensms');

function cb(err, response) {
  console.error('Error ', err);
  console.log('Response', response);
}

greenSmsInstance.account.balance(cb);
