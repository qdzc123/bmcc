// app.js
const express = require('express');
const app = express();

app.use(express.json());

const fortunes = [
  "You will have a great day!",
  "A surprise is waiting for you around the corner.",
  "Good fortune is coming your way.",
  "Your hard work will soon pay off.",
  "You can have anything you want, but not everything you want."
];

// GET: /fortunes?count=3
app.get('/fortunes', (req, res) => {
  const index = parseInt(req.query.count);
  const selected = isNaN(index) ? 
    fortunes[Math.floor(Math.random() * fortunes.length)] :
    fortunes[index % fortunes.length]; // 안전하게 인덱스 제한
  res.json(selected);
});

// POST: /submit
app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  res.json({ success: true, response: `Thanks, ${name}! Your message was: "${message}"` });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
