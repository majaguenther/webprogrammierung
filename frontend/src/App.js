import { ScoreProvider } from "./quizes/ScoreContext";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Quiz from './quizes/Quiz';
import Result from './quizes/Result';
import './App.css';

function App() {
    // State für das Speichern der Quizdaten vom Backend
    const [quizzes, setQuizzes] = useState([]);

    // useEffect, um die Quiz-Daten vom Backend zu laden
    useEffect(() => {
        // Backend-URL anpassen, falls nötig
        fetch('http://localhost:3001/api/questions')
            .then(response => response.json())
            .then(data => setQuizzes(data.quizzes))
            .catch(error => console.error('Error loading quizzes:', error));
    }, []); // Leeres Array bedeutet, dass der Effekt nur einmal beim Initialisieren ausgeführt wird

    return (
        <ScoreProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Dynamische Routen basierend auf den geladenen Quiz-Daten */}
                        {quizzes.map((quiz, index) => (
                            <Route key={index} path={quiz.path} element={<Quiz quizIndex={index} />} />
                        ))}
                        <Route path="/result" element={<Result />} />
                    </Routes>
                </div>
            </Router>
        </ScoreProvider>
    );
}

export default App;
