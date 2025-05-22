const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'yourSecretKey';

const USERS = {
  user1: { password: "password123", role: "admin" },
  user2: { password: "password456", role: "user" }
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] && USERS[username].password === password) {
    const token = jwt.sign({ username, role: USERS[username].role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

function verifyJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Token missing');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = decoded;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token missing');

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).send('Access forbidden: insufficient permissions');
      }

      next();
    });
  };
}

app.get('/jwt-protected', verifyJWT, (req, res) => {
  res.send(`Hello, ${req.user.username}. You have accessed a protected route.`);
});

app.get('/admin', authorizeRoles('admin'), (req, res) => {
  res.send('Welcome to the admin area');
});

app.listen(3001, () => console.log('JWT Auth server running on port 3001'));
