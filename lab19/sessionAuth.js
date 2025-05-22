const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const USERS = {
  user1: { password: "password123", role: "admin" },
  user2: { password: "password456", role: "user" }
};

app.post('/session-login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] && USERS[username].password === password) {
    req.session.user = { username, role: USERS[username].role };
    res.send(`Logged in as ${username}`);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/session-logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out');
});

function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Please login first');
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.status(403).send('Forbidden: insufficient role');
    }
  };
}

app.get('/session-protected', requireLogin, (req, res) => {
  res.send(`Hello, ${req.session.user.username}. You have accessed a protected route.`);
});

app.get('/session-admin', requireLogin, requireRole('admin'), (req, res) => {
  res.send('Welcome to the session admin area');
});

app.listen(3002, () => console.log('Session Auth server running on port 3002'));
