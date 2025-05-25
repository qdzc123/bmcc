const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const sequelize = require('./models/sequelize');
const User = require('./models/User');
const Task = require('./models/Task');
const Goal = require('./models/Goal');
const { authMiddleware } = require('./src/middleware/auth');

const app = express();
const PORT = 4000;
const SECRET = 'supersecretkey';

app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database error:', err);
});

// Auth routes
app.post('/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ where: { username } });
  if (exists) return res.status(400).json({ message: 'Username already exists' });
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.status(201).json({ message: 'User created' });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET);
  res.json({ token });
});

// React frontend deployment
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});