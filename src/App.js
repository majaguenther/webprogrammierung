import { ScoreProvider } from "./quizes/ScoreContext";  // Use ScoreProvider, not ScoreContext
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Quiz from './quizes/Quiz';
import Result from './quizes/Result';
import { allQuizzes } from './quizes/questions';
import './App.css';

function App() {
    return (
        <ScoreProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {allQuizzes.map((quiz, index) => (
                            <Route path={quiz[0].path} element={<Quiz quizIndex={index} />} />
                        ))}
                        <Route path="/result" element={<Result />} />
                    </Routes>
                </div>
            </Router>
        </ScoreProvider>
    );
}

export default App;