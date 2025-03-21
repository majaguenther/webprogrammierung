import { useContext, useState } from "react";
import { ScoreContext } from "./ScoreContext";
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import { allQuestions } from './questions';

function QuizPage({ quizIndex }) {
  const questions = allQuestions[quizIndex];
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
    const { setScore } = useContext(ScoreContext);



  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    setScore(correct); 
    navigate ("/result");
  };

  return (
      <div className="quiz-container">
        <h1>{ questions[0].title }</h1>
        <div>
          {questions.slice(1).map((q, qIndex) => (
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
      </div>
  );
}

export default QuizPage;
