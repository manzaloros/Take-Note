const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { getHighScores, postHighScore } = require('./database');

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());

app.get('/', (req, res) => {
  getHighScores()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

app.post('/', (req, res) => {
  const { name, highscore } = req.body;
  postHighScore(name, highscore)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
