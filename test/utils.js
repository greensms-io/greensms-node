function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomPhone () {
  const min = 70000000000;
  const max = 70009999999;
  return randomNumber(min, max);
}

module.exports = {
  randomNumber,
  randomPhone
};