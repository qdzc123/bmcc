const express = require('express');
const app = express();
const path = require('path');
const dataRoutes = require('./routes/dataRoutes');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', dataRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Lab 13</h1><p>Try accessing <a href="/data">/data</a></p>');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
