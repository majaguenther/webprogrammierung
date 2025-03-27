import { useContext, useState, useEffect } from "react";
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';
import { useNavigate, useLocation } from 'react-router-dom';

function QuizPage() {
  // Laden der Quiz-Daten aus dem Backend
  const [quiz, setQuiz] = useState(null); // Hier speichern wir das Quiz
  const { state } = useLocation(); // Zugang zu den URL-Parametern (z.B. quizIndex)
  const { quizIndex } = state; // quizIndex von der vorherigen Seite (Home)

  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // useEffect, um die Quiz-Daten vom Backend zu holen
  useEffect(() => {
    // Hole die Quiz-Daten vom Backend
    fetch(`http://localhost:3001/api/questions`)
      .then((response) => response.json())
      .then((data) => {
        const quizData = data.quizzes[quizIndex]; // Holen des Quiz basierend auf quizIndex
        setQuiz(quizData); // Setzen des Quiz-Daten im State
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, [quizIndex]);

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    const selectedAnswers = quiz.slice(1).map((_, index) => answers[index] || 0); // Fragen beginnen ab Index 1
    navigate("/result", { state: { selectedAnswers: selectedAnswers, quizIndex: quizIndex } });
    window.scrollTo(0, 0);
  };

  // Warte, bis das Quiz geladen ist
  if (!quiz) return <div>Loading...</div>;

  const title = quiz[0].title;
  const generalNote = quiz[0].generalNote;
  const questions = quiz.slice(1); // Alle Fragen beginnen ab Index 1

  return (
    <div className="quiz-container">
      <h1>{title}</h1>
      <p>{generalNote}</p>
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
