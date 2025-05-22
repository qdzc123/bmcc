const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, this is a self-signed HTTPS server!');
}).listen(3000, () => {
  console.log('HTTPS server running at https://localhost:3000');
});
