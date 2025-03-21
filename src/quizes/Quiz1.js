import { useState } from "react";
import './Quiz.css';
import { allQuestions } from './quizes/questions';

function QuizPage({ quizIndex }) {
  const questions = allQuestions[quizIndex];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <p><strong>{q.question}</strong></p>
            <div>
              {q.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  className={`answer-button ${answers[qIndex] === option ? 'selected' : ''}`}
                  onClick={() => handleSelect(qIndex, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Ergebnis anzeigen</button>
      {score !== null && <p className="result-text">Du hast {score} von 10 richtig!</p>}
    </div>
  );
}

export default QuizPage;
