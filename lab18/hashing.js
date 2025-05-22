const crypto = require('crypto');

function hashData(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

const input = process.argv[2] || "Hello, World!";
console.log("SHA-256 Hash:", hashData(input));
