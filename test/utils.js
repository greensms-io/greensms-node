function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomPhone(minRange, maxRange) {
  const min = minRange ? minRange : 70000000000;
  const max = maxRange? maxRange : 70009999999;
  return randomNumber(min, max);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
  randomNumber,
  randomPhone,
  timeout
};
