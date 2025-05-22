const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

const users = [];
const SECRET_KEY = 'supersecretkey123';

function authMiddleware(req, res, next) {
  if (req.path.startsWith('/account')) return next();

  const token = req.cookies.token;
  if (!token) {
    const returnUrl = encodeURIComponent(req.originalUrl);
    return res.redirect(`/account/login-page?returnUrl=${returnUrl}`);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    const returnUrl = encodeURIComponent(req.originalUrl);
    return res.redirect(`/account/login-page?returnUrl=${returnUrl}`);
  }
}

app.use(authMiddleware);

app.get('/home', (req, res) => res.send('Welcome to Home Page!'));
app.get('/about', (req, res) => res.send('About Us'));
app.get('/contact', (req, res) => res.send('Contact Page'));

app.get('/account/login-page', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/account/sign-up-page', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.post('/account/sign-up', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).send('Username already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User created.');
});

app.post('/account/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: false });

  const redirectTo = req.query.returnUrl || '/home';
  res.redirect(redirectTo);
});

app.post('/account/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Logged out');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
