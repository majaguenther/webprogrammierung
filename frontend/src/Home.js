import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from "./components/ImageComponent";
import './Home.css';

function Home() {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/questions") 
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.quizzes)) {
                    setAllQuizzes(data.quizzes); // ← Zugriff auf das quizzes-Array
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

    if (isLoading) return <div>Lädt...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="home-container">
            <h1>Welcome to the Homepage</h1>
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

