'use strict';

const { greenSmsInstance } = require('./greensms');

greenSmsInstance.viber.send({
  to: '919987409698',
  txt: 'Here is your message for delivery',
}).then((data) => {
  console.log('Send Viber Data', data);
}).catch((err) => {
  console.error('Send Viber Error', err);
});

const viberStatusParams = {
  id: '0b18fab4-0c5d-4a8b-8ee4-057a59596c7d',
  extended: true,
};

greenSmsInstance.viber.status(viberStatusParams).then((data) => {
  console.log('Status Viber Data', data);
}).catch((err) => {
  console.error('Status Viber Error', err);
});
