const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('./src/middleware/auth');

const app = express();
const PORT = 4000;
const SECRET = 'supersecretkey';

app.use(cors());
app.use(express.json());

let users = [];
let tasks = [];
let goals = [];

let nextUserId = 1;
let nextTaskId = 1;
let nextGoalId = 1;

// Auth Routes
app.post('/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: nextUserId++, username, password: hashed };
  users.push(user);
  res.status(201).json({ message: 'User created' });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Auth middleware protected routes
app.get('/tasks', authMiddleware, (req, res) => {
  res.json(tasks.filter(t => t.userId === req.user.id));
});

app.post('/tasks', authMiddleware, (req, res) => {
  const { title } = req.body;
  const task = { id: nextTaskId++, title, completed: false, userId: req.user.id };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', authMiddleware, (req, res) => {
  const task = tasks.find(t => t.id === +req.params.id && t.userId === req.user.id);
  if (!task) return res.status(404).send();
  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;
  res.json(task);
});

app.delete('/tasks/:id', authMiddleware, (req, res) => {
  tasks = tasks.filter(t => !(t.id === +req.params.id && t.userId === req.user.id));
  res.status(204).send();
});

// Same for goals
app.get('/goals', authMiddleware, (req, res) => {
  res.json(goals.filter(g => g.userId === req.user.id));
});

app.post('/goals', authMiddleware, (req, res) => {
  const { text } = req.body;
  const goal = { id: nextGoalId++, text, userId: req.user.id };
  goals.push(goal);
  res.status(201).json(goal);
});

app.put('/goals/:id', authMiddleware, (req, res) => {
  const goal = goals.find(g => g.id === +req.params.id && g.userId === req.user.id);
  if (!goal) return res.status(404).send();
  goal.text = req.body.text ?? goal.text;
  res.json(goal);
});

app.delete('/goals/:id', authMiddleware, (req, res) => {
  goals = goals.filter(g => !(g.id === +req.params.id && g.userId === req.user.id));
  res.status(204).send();
});

app.get('/', (req, res) => {
  res.send(`<h2>Final Project API (Authenticated)</h2><p>Use /auth/signup → /auth/login to get token</p>`);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
