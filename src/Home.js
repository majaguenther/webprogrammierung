import React from 'react';
import { ScoreContext } from "./quizes/ScoreContext";
import { Link } from 'react-router-dom';
import './Home.css';

const tiles = [
    { title: "quiz", path: "/quiz1" },
    { title: "Quiz 2", path: "/quiz2" },
    { title: "Page 3", path: "/quiz3" },
    { title: "Page 4", path: "/quiz4" },
    { title: "Page 5", path: "/quiz5" },
    { title: "Page 6", path: "/quiz6" },
    { title: "Page 7", path: "/quiz7" },
    { title: "Page 8", path: "/quiz8" },
    { title: "Page 9", path: "/quiz9" },
    { title: "Majas Quiz", path: "/quiz10" },
    { title: "Joshs Quiz", path: "/quiz11" },
    { title: "Chrissis Quiz", path: "/quiz12" },
];

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to the Homepage</h1>
            <div className="grid-container">
                {tiles.map((tile, index) => (
                    <Link key={index} to={tile.path} className="grid-item">
                        {tile.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
