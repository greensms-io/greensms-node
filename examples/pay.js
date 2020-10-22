const { greenSmsInstance } = require("./greensms");

const payParams = {
  to: '919987409698',
  amount: 10
};
greenSmsInstance.payment.send(payParams).then((data) => console.log("Send Payment Data", data)).catch(err => console.error("Send Payment Error", err));

const paymentStatusParams = {
  id: '60f231d9-16ec-4313-842e-6e6853063482'
};

greenSmsInstance.payment.status(paymentStatusParams).then((data)=> {
  console.error("Payment Status Data", data);
}).catch(err => {
  console.error("Payment Status Error", err);
});
