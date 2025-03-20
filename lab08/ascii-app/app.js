import express from 'express';
import multer from 'multer';
import path from 'path';
import asciify from 'asciify-image';
import fs from 'fs';
import stripAnsi from 'strip-ansi';

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <h1>Upload an Image</h1>
    <form action="/ascii" method="POST" enctype="multipart/form-data">
      <input type="file" name="image" accept="image/*" required>
      <button type="submit">Convert to ASCII</button>
    </form>
  `);
});

app.post('/ascii', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const options = { fit: 'box', width: 50, height: 50 };

  try {
    const asciiArt = await asciify(filePath, options);
    const output = stripAnsi(asciiArt);
    await fs.promises.unlink(filePath); // 업로드 파일 삭제
    res.send(`<pre>${output}</pre><br><a href="/">Upload another</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing image.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});