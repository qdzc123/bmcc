const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const options = {
  key: fs.readFileSync(path.join('/etc/letsencrypt/live', 'yourdomain.com', 'privkey.pem')),
  cert: fs.readFileSync(path.join('/etc/letsencrypt/live', 'yourdomain.com', 'cert.pem')),
  ca: fs.readFileSync(path.join('/etc/letsencrypt/live', 'yourdomain.com', 'chain.pem'))
};

app.get('/', (req, res) => {
  res.send('Hello, HTTPS world!');
});

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});
