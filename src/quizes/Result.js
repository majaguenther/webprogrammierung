import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";
import './Quiz.css';
import { allQuizzes } from './questions';
import Confetti from '../components/Confetti';

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

    //lustiger Satz nach der Auswertung
    const answersOptions = {
      good: ["Oha voll gut!", "Das ist total toll!", "Weiter so!", "Wie schön!"],
      middle: ["Da geht noch was!", "Na beim nächsten mal wird es vielleicht besser."],
      bad: ["Was war da los??", "Oh weh oh weh.", "Machste nix."]
    };
    let answer = "sdsf";
    let correctPercantage = correct / totalQuestions;
    if (correctPercantage > 0.75)
    {
      answer = answersOptions.good[Math.floor(Math.random() * answersOptions.good.length)];
    }
    else if (correctPercantage > 0.25)
    {
      answer = answersOptions.middle[Math.floor(Math.random() * answersOptions.middle.length)];
    }
    else
    {
      answer = answersOptions.bad[Math.floor(Math.random() * answersOptions.bad.length)];
    }

    return (
        <div className="quiz-container">

          <h1> Dein Ergebnis </h1>
          {correct !== null ? <p>Du hast {correct} von {totalQuestions} richtig! {answer}</p> : <p>Du hast bestimmt super gespielt, leider gab es ein Fehler bei der Auswertung!</p>}
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
