const crypto = require("crypto");

const randomString = () => crypto.randomBytes(64).toString("hex");

module.exports = {
  randomString
}