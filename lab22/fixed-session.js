const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3003;

app.use(session({
  secret: 'verysecure',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // set to true if running under HTTPS
  }
}));

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
    res.send('Welcome to the profile page (new session)');
  } else {
    req.session.views++;
    res.send(\`You visited this page \${req.session.views} times.\`);
  }
});

app.listen(PORT, () => {
  console.log('Fixed session server running at http://localhost:3003');
});
