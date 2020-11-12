'use strict';

const { greenSmsInstance } = require('./greensms');


greenSmsInstance.account.balance().then((data) => {
  console.log('Balance Data', data);
}).catch((err) => {
  console.error('Balance Error', err);
});


const tokenParams = {
  expire: 100, // Optional, time in seconds
};
greenSmsInstance.account.token(tokenParams).then((data) => {
  console.log('Token Data', data);
}).catch((err) => {
  console.error('Token Error', err);
});

greenSmsInstance.account.tariff().then((data) => {
  console.error('Tariff Data', data);
}).catch((err) => {
  console.error('Tariff Error', err);
});

