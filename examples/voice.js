const { greenSmsInstance } = require('./greensms');

const voiceParams = {
  to: '919987409698',
  txt: 1234,
};
greenSmsInstance.voice.send(voiceParams).then((data) => {
  console.log('Send Voice Data', data);
}).catch(err => {
  console.error('Send Voice Error', err);
});

const voiceStatusParams = {
  id: '41f23094-deda-4cab-ac9c-3ab4f2fee9e6',
};
greenSmsInstance.voice.status(voiceStatusParams).then((data)=> {
  console.error('Voice Status Data', data);
}).catch(err => {
  console.error('Voice Status Error', err);
});
