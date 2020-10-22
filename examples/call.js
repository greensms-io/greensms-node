const { greenSmsInstance } = require("./greensms");

const callVerificationParams = {
  to: '919987409698',
};

greenSmsInstance.call.send(callVerificationParams).then((data) => console.log("Send Call Data", data)).catch(err => console.error("Send Call Error", err));

const callStatusParams = {
  id: '1fd4ac4d-6e4f-4e32-b6e4-8087d3466f55'
};
greenSmsInstance.call.status(callStatusParams).then((data)=> {
  console.error("Call Send Data", data);
}).catch(err => {
  console.error("Call Status Error", err);
});
