const CryptoJS = require('crypto-js');

const secretKey = 'mySecretKey123';

function encryptData(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const input = process.argv[2] || "Sensitive Data";
const encrypted = encryptData(input);
console.log("Encrypted:", encrypted);

const decrypted = decryptData(encrypted);
console.log("Decrypted:", decrypted);
