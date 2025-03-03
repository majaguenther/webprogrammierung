import { useState } from "react";
import './Quiz.css'

const questions = [
  { question: "Was ist die Hauptstadt von Deutschland?", options: ["Berlin", "München", "Hamburg", "Köln"], answer: "Berlin" },
  { question: "Welches Element hat das chemische Symbol O?", options: ["Gold", "Sauerstoff", "Silber", "Helium"], answer: "Sauerstoff" },
  { question: "Wie viele Kontinente gibt es?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Wer schrieb 'Faust'?", options: ["Goethe", "Schiller", "Lessing", "Kafka"], answer: "Goethe" },
  { question: "Was ist die Wurzel von 64?", options: ["6", "7", "8", "9"], answer: "8" },
  { question: "Welcher Planet ist der größte im Sonnensystem?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "Wie viele Beine hat eine Spinne?", options: ["6", "8", "10", "12"], answer: "8" },
  { question: "Was ist die kleinste Einheit eines Computerspeichers?", options: ["Bit", "Byte", "Kilobyte", "Megabyte"], answer: "Bit" },
  { question: "Welche Farbe hat Chlorophyll?", options: ["Rot", "Gelb", "Grün", "Blau"], answer: "Grün" },
  { question: "Wie viele Monate haben 28 Tage?", options: ["1", "6", "12", "9"], answer: "12" },
];

function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Quiz</h1>
      <div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>{q.question}</strong></p>
            <div >
              {q.options.map((option, oIndex) => (
                <div className="answer-button">
                  <button
                    key={oIndex}
                    
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      margin: "5px 0",
                      backgroundColor: answers[qIndex] === option ? "#007BFF" : "#f0f0f0",
                      color: answers[qIndex] === option ? "white" : "black",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSelect(qIndex, option)}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>Ergebnis anzeigen</button>
      {score !== null && <p style={{ textAlign: "center", marginTop: "10px" }}>Du hast {score} von 10 richtig!</p>}
    </div>
  );
}

export default QuizPage;