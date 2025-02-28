import React, { useState } from "react";

const questions = [
  {
    question: "Was ist die Hauptstadt von Deutschland?",
    options: ["Berlin", "München", "Hamburg", "Frankfurt", "Köln"],
    answer: "Berlin",
  },
  {
    question: "Welches Jahr markiert den Beginn des Zweiten Weltkriegs?",
    options: ["1914", "1939", "1945", "1923", "1950"],
    answer: "1939",
  },
  {
    question: "Wer hat die Relativitätstheorie entwickelt?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla", "Stephen Hawking"],
    answer: "Albert Einstein",
  },
  {
    question: "Welches Element hat das chemische Symbol 'O'?",
    options: ["Osmium", "Oganesson", "Oxygen", "Oro", "Ozon"],
    answer: "Oxygen",
  },
  {
    question: "Welcher Planet ist der größte im Sonnensystem?",
    options: ["Mars", "Venus", "Erde", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {showResult ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">Quiz beendet!</h2>
          <p className="text-lg">Dein Score: {score} von {questions.length}</p>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold">{questions[currentQuestion].question}</h2>
          <div className="mt-4 space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
