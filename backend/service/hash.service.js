const bcrypt = require("bcrypt");


 function createPasswordHash(password) {
  return bcrypt.hash(password, 10);
}

function validatePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { createPasswordHash,validatePassword};