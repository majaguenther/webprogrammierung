const express = require("express");
const cors = require("cors");
const questions = require('./questions.json');
const app = express();
app.use(cors());
app.use(express.json());

//alle quizze laden
app.get("/api/quizzes", (req, res) => {
  res.json(questions);
});

//einzelnes Quiz laden
app.get("/api/quizzes/:id", (req, res) => {
  const quizId = req.params.id;
  const quiz = questions.quizzes[quizId];
  console.log("Quiz Anfrgae fiür ID:", req.params.id, "; Quiz-Name: ", quiz.title);
  if (quiz) {
      res.json(quiz);
  } else {
      res.status(404).json({ error: "Quiz nicht gefunden" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});