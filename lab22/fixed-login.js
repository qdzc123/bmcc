const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002;

const users = [
  { id: 1, username: 'admin', password: 'password123' }
];

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input name="username" placeholder="Username">
      <input name="password" type="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `);
});

// This simulates a safe parameterized login (not real DB, just logic)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send('<p>Login successful!</p>');
  } else {
    res.send('<p>Invalid credentials.</p>');
  }
});

app.listen(PORT, () => {
  console.log('Fixed login server running at http://localhost:3002');
});