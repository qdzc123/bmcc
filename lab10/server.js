const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Load candidates data
let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

// 2. Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Fictitious Political Candidates Server');
});

// 3. GET /search - filter by query string
app.get('/search', (req, res) => {
  const { party, platform } = req.query;
  let filtered = candidates;

  if (party) {
    filtered = filtered.filter(c => c.party === party);
  }
  if (platform) {
    filtered = filtered.filter(c => c.platform.includes(platform));
  }

  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

// 4. POST /filter - filter by JSON body
app.post('/filter', (req, res) => {
  const { platform, slogan } = req.body;
  let filtered = candidates;

  if (platform) {
    filtered = filtered.filter(c => c.platform.includes(platform));
  }
  if (slogan) {
    filtered = filtered.filter(c => c.slogan.includes(slogan));
  }

  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ message: 'No candidates found' });
  }
});

// 5. Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
