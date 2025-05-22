const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(\`
    <form method="POST" action="/comment">
      <input name="comment" placeholder="Enter comment">
      <button type="submit">Post</button>
    </form>
  \`);
});

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  res.send(\`<p>Your comment: \${comment}</p>\`);
});

app.listen(PORT, () => {
  console.log('Vulnerable comment server running at http://localhost:3000');
});
