const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lab_16',
  password: 'yourpassword',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('PostgreSQL CRUD API');
});

// READ
app.get('/patients', async (req, res) => {
  const result = await pool.query('SELECT * FROM patients');
  res.json(result.rows);
});

// CREATE
app.post('/patients', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO patients (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]);
});

// UPDATE
app.put('/patients/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await pool.query('UPDATE patients SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
  res.json(result.rows[0]);
});

// DELETE
app.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM patients WHERE id = $1', [id]);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
