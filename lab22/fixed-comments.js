const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));

function sanitize(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/comment">
      <input name="comment" placeholder="Enter comment">
      <button type="submit">Post</button>
    </form>
  `);
});

app.post('/comment', (req, res) => {
  const comment = sanitize(req.body.comment);
  res.send(`<p>Your comment: ${comment}</p>`);
});

app.listen(PORT, () => {
  console.log('Fixed comment server running at http://localhost:3001');
});
