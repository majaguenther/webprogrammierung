const express = require("express");
const cors = require("cors");
const questions = require('./questions.json');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});