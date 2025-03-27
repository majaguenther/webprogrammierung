import React from 'react';
import { ScoreContext } from "./quizes/ScoreContext";
import { Link } from 'react-router-dom';
import './Home.css';
import { allQuizzes } from './quizes/questions';
import ImageComponent from "./components/ImageComponent";

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to the Homepage</h1>
            <div className="grid-container">
                {allQuizzes.map((quiz, index) => (
                    <Link key={index} to={quiz[0].path} className="grid-item">
                        <ImageComponent imagePath={quiz[0].titleImage} className="image-question-container" />
                        {quiz[0].title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;