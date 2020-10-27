const { greenSmsInstance } = require('./greensms');

const hlrParams = {
  to: '919987409698',
  txt: 1234,
};
greenSmsInstance.hlr.send(hlrParams).then((data) => console.log('Send HLR Data', data)).catch(err => console.error('Send HLR Error', err));

const hlrStatusParams = {
  id: '70d296f5-ac52-403d-a27b-24829c2faebc',
};
greenSmsInstance.hlr.status(hlrStatusParams).then((data)=> {
  console.error('HLR Status Data', data);
}).catch(err => {
  console.error('HLR Status Error', err);
});
