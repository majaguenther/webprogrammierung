import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';
import Confetti from '../components/Confetti';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAnswers, quizIndex = 0 } = location.state || {};

  const [quiz, setQuiz] = useState(null); // State zum Speichern des Quiz
  const [isLoading, setIsLoading] = useState(true); // Lade-Status

  // useEffect, um die Quiz-Daten vom Backend zu holen
  useEffect(() => {
    fetch(`http://localhost:3001/api/questions`)
      .then((response) => response.json())
      .then((data) => {
        const quizData = data.quizzes[quizIndex]; // Holen des Quiz basierend auf quizIndex
        setQuiz(quizData); // Setzen des Quiz-Daten im State
        setIsLoading(false); // Lade-Status auf false setzen
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setIsLoading(false); // Setze Lade-Status auf false im Fehlerfall
      });
  }, [quizIndex]);

  // Berechnung der korrekten Antworten
  if (isLoading) return <div>Loading...</div>;

  const questions = quiz.slice(1); // Alle Fragen beginnen ab Index 1
  const totalQuestions = questions.length;
  let correct = 0;

  questions.forEach((q, index) => {
    if (q.answer === selectedAnswers[index]) correct++;
  });

  // Lustiger Satz basierend auf der Anzahl der richtigen Antworten
  const answersOptions = {
    good: ["Oha voll gut!", "Das ist total toll!", "Weiter so!", "Wie schön!"],
    middle: ["Da geht noch was!", "Na beim nächsten Mal wird es vielleicht besser."],
    bad: ["Was war da los??", "Oh weh oh weh.", "Machste nix."]
  };
  let answer = "sdsf";
  let correctPercentage = correct / totalQuestions;
  
  if (correctPercentage > 0.75) {
    answer = answersOptions.good[Math.floor(Math.random() * answersOptions.good.length)];
  } else if (correctPercentage > 0.25) {
    answer = answersOptions.middle[Math.floor(Math.random() * answersOptions.middle.length)];
  } else {
    answer = answersOptions.bad[Math.floor(Math.random() * answersOptions.bad.length)];
  }

  // Zurück zum Home-Bildschirm
  const handleHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="quiz-container">
      <h1> Dein Ergebnis </h1>
      <Confetti />
      {correct !== null ? (
        <p>Du hast {correct} von {totalQuestions} richtig! {answer}</p>
      ) : (
        <p>Du hast bestimmt super gespielt, leider gab es einen Fehler bei der Auswertung!</p>
      )}
      <p></p>
      <button className="submit-button" onClick={handleHome}>Hauptmenü</button>
      <p></p>

      <div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <p><strong>{q.question}</strong></p>
            <ImageComponent imagePath={q.imagePath} className="image-question-container" />
            <div>
              {q.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  className={`answer-button ${option === selectedAnswers[qIndex] ? 'wrong' : ''} ${option === q.answer ? 'correct' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="submit-button" onClick={handleHome}>Hauptmenü</button>
    </div>
  );
}

export default Result;
