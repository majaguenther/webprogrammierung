import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';

function QuizPage({ quizIndex }) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://localhost:3001/api/questions") 
          .then(response => response.json())
          .then(data => {
              if (data && Array.isArray(data.quizzes)) {
                  setAllQuizzes(data.quizzes); // ← Zugriff auf das quizzes-Array
              } else {
                  console.error("Backend returned data in unexpected format:", data);
                  setError("Fehler beim Laden der Quiz-Daten.");
              }
              setIsLoading(false);
          })
          .catch(error => {
              console.error("Fehler beim Abrufen der Quiz-Daten:", error);
              setError("Konnte die Daten nicht abrufen.");
              setIsLoading(false);
          });
  }, []);

  if (isLoading) return <div>Lädt...</div>;
  if (error) return <div>{error}</div>;

  const quiz = allQuizzes[quizIndex];
  const title = quiz.title;
  const generalNote = quiz.generalNote;
  const questions = quiz.questions;

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [qIndex]: option,
    }));
    
  };

  const handleSubmit = () => {
    
    const selectedAnswers = questions.map((_, index) => quiz.questions[index].answers || 0); 
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