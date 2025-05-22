const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf8'));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Candidate App</h1><a href="/add-candidate">Add Candidate</a>');
});

app.get('/add-candidate', (req, res) => {
  res.send(`
    <html>
    <head><title>Add Candidate</title></head>
    <body>
      <h1>Add Candidate</h1>
      <form method="POST" action="/add-candidate">
        <label>Name:</label><br><input name="name" required><br>
        <label>Party:</label><br><input name="party" required><br>
        <label>Platform:</label><br><input name="platform" required><br>
        <label>Slogan:</label><br><input name="slogan" required><br><br>
        <input type="submit" value="Submit">
      </form>
    </body>
    </html>
  `);
});

app.post('/add-candidate', (req, res) => {
  const { name, party, platform, slogan } = req.body;

  if (!name || !party || !platform || !slogan) {
    return res.status(400).send(`
      <html><body>
      <h1>400 Bad Request</h1>
      <p>All fields (name, party, platform, slogan) are required.</p>
      <a href="/add-candidate">Go back</a>
      </body></html>
    `);
  }

  const newCandidate = {
    id: candidates.length + 1,
    name,
    party,
    platform,
    slogan
  };

  candidates.push(newCandidate);
  fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
  res.redirect('/candidates');
});

app.get('/candidates', (req, res) => {
  const html = candidates.map(c => `
    <li>
      <a href="/candidate/${c.id}">${c.name}</a> – ${c.party}
    </li>`).join('');
  res.send(`<ul>${html}</ul><a href="/add-candidate">Add Another</a>`);
});

app.get('/candidate/:id', (req, res) => {
  const candidateId = parseInt(req.params.id);

  if (isNaN(candidateId)) {
    return res.status(400).send(`
      <html><body>
      <h1>400 Bad Request</h1>
      <p>Invalid candidate ID. Please use a number.</p>
      <a href="/candidates">Back</a>
      </body></html>
    `);
  }

  const candidate = candidates.find(c => c.id === candidateId);
  if (!candidate) {
    return res.status(404).send(`
      <html><body>
      <h1>404 Not Found</h1>
      <p>No candidate with ID ${candidateId} found.</p>
      <a href="/candidates">Back</a>
      </body></html>
    `);
  }

  res.send(`
    <html><body>
    <h1>${candidate.name}</h1>
    <p><strong>Party:</strong> ${candidate.party}</p>
    <p><strong>Platform:</strong> ${candidate.platform}</p>
    <p><strong>Slogan:</strong> ${candidate.slogan}</p>
    <a href="/candidates">Back to List</a>
    </body></html>
  `);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`
    <html><body>
    <h1>500 Internal Server Error</h1>
    <p>Something went wrong.</p>
    <a href="/candidates">Back</a>
    </body></html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
