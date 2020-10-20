const { greenSmsInstance } = require("./green-sms");

const voiceParams = {
  to: '919987409698',
  txt: 1234
};
greenSmsInstance.voice.sendMessage(voiceParams).then((data) => console.log("Send Voice Data", data)).catch(err => console.error("Send Voice Error", err));

const callStatusParams = {
  id: '41f23094-deda-4cab-ac9c-3ab4f2fee9e6'
};
greenSmsInstance.voice.fetchStatus(callStatusParams).then((data)=> {
  console.error("Voice Status Data", data);
}).catch(err => {
  console.error("Voice Status Error", err);
});
