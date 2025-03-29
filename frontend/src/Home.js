import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from "./components/ImageComponent";
import './Home.css';

function Home() {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //quiz aus dem backend laden
    useEffect(() => {
        fetch("http://localhost:3001/api/quizzes") 
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.quizzes)) {
                    setAllQuizzes(data.quizzes);
                } else {
                    console.error("Backend returned data in unexpected format:", data);
                    setError("Fehler beim Laden der Quiz-Daten.");
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
    if (isLoading) return <div>Die Quize werden geladen...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="home-container">
            <h1>Die beste Quizseite der Welt: Quizard</h1>
            <div className="grid-container">
                {allQuizzes.map((quiz, index) => (
                    <div key={index}>
                        <Link to={quiz.path} className="grid-item">
                            <ImageComponent imagePath={quiz.titleImage} className="image-question-container" />
                            {quiz.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

