'use strict';

const { greenSmsInstance } = require('./greensms');

greenSmsInstance.social.send({
  to: '919987409698',
  txt: 'Here is your message for delivery',
  from: 'ExampleTest',
  tag: 'ExampleTest'
}).then((data) => {
  console.log('Send Social Data', data);
}).catch((err) => {
  console.error('Send Social Error', err);
});

const socialStatusParams = {
  id: 'caf3efb1-8aca-4387-9ed0-e667d315c5c9',
  extended: true,
};

greenSmsInstance.social.status(socialStatusParams).then((data) => {
  console.log('Send Social Data', data);
}).catch((err) => {
  console.error('Send Social Error', err);
});
