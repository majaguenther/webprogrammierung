import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';

function QuizPage({ quizIndex }) {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

//quiz aus dem backend laden
useEffect(() => {
    fetch(`http://localhost:3001/api/quizzes/${quizIndex}`) 
        .then(response => response.json())
        .then(data => {
            if (data) {
                setQuiz(data);
            } else {
                console.error("Quiz nicht gefunden:", data);
                setError("Quiz nicht gefunden.");
            }
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Quiz-Daten:", error);
            setError("Konnte die Daten nicht abrufen.");
            setIsLoading(false);
        });
}, []);

  //warten bis quiz geladen ist
  if (isLoading) return <div>Lädt...</div>;
  if (error) return <div>{error}</div>;

  //einzelne Komponenten des Quizes in Variablen setzen
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
    
    const selectedAnswers = questions.map((_, index) => answers[index] || 0); 
    console.log("Antworten first: ", selectedAnswers);
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