const crypto = require("crypto");

const randomString = () => crypto.randomBytes(16).toString("hex");

const randomize = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}


module.exports = {
  randomString, randomize
}