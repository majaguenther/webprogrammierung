import { useContext, useState } from "react";
import { ResultContext } from "./ResultContext";
import ImageComponent from "../Components/ImageComponent";
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import { allQuizzes } from './questions';

function QuizPage({ quizIndex }) {
  const quiz = allQuizzes[quizIndex];
  const title = quiz[0].title;
  const questions = quiz.slice(2);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    const selectedAnswers = questions.map((_, index) => answers[index] || 0); 
    navigate("/result", { state: { selectedAnswers: selectedAnswers, quizIndex: quizIndex }});
    window.scrollTo(0, 0);
  };

  let image = "./TestImages/Pubquiz.jpg"

  return (
      <div className="quiz-container">
        <h1>{ title }</h1>
        <div>
          {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <p><strong>{q.question}</strong></p>
                <ImageComponent imagePath={q.imagePath} className="image-container" />
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
