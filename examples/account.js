"use strict";

const { greenSmsInstance } = require("./green-sms");


greenSmsInstance.account
  .fetchBalance()
  .then((data) => {
    console.log("Balance Data", data);
  })
  .catch((err) => {
    console.error("Balance Error", err);
  });


const tokenParams = {
  expire: 100, // Optional, time in seconds
};
greenSmsInstance.account.fetchToken(tokenParams).then((data) => {
  console.log("Token Data", data);
}).catch((err) => {
  console.error("Token Error", err);
});

greenSmsInstance.account.fetchTariff().then((data) => {
  console.error("Tariff Data", data);
}).catch((err) => {
  console.error("Tariff Error", err);
});

