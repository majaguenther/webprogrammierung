import { useContext, useState } from "react";
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import { allQuizzes } from './questions';

function QuizPage({ quizIndex }) {
  const quiz = allQuizzes[quizIndex];
  const title = quiz[0].title;
  const generalNote = quiz[0].generalNote;
  const questions = quiz.slice(1);
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

  return (
      <div className="quiz-container">
        <h1>{ title }</h1>
        <p>{ generalNote }</p>
        <div>
          {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <p><strong>{q.question}</strong></p>
                <ImageComponent imagePath={q.imagePath} className="image-question-container" />
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
