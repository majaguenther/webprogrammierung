import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';
import { allQuizzes } from './questions';

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedAnswers, quizIndex = 0} = location.state || {};

    console.log("Antworten: ", selectedAnswers);

    const quiz = allQuizzes[quizIndex] || {};
    const questions = quiz.slice(3);

    let totalQuestions = questions.length;

    let correct = 0;
    questions.forEach((q, index) => {
      if (questions[index].answer === selectedAnswers[index]) correct++;
    });

    const handleHome = () => {
      navigate("/");
      window.scrollTo(0, 0);
    };

    return (
        <div className="quiz-container">
          <h1> Dein Ergebnis </h1>
          {correct !== null ? <p>Du hast {correct} von {totalQuestions} richtig!</p> : <p>Du hast bestimmt super gespielt, leider gab es ein Fehler bei der Auswertung!</p>}
          <button className="submit-button" onClick={handleHome}>Hauptmenü</button>
          <p></p>
          <div>
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="question-container">
                  <p><strong>{q.question}</strong></p>
                  <ImageComponent imagePath={q.imagePath} className="image-container" />
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
