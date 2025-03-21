import React from 'react';
import { ScoreContext } from "./quizes/ScoreContext";
import { Link } from 'react-router-dom';
import './Home.css';

const tiles = [
    { title: "quiz", path: "/quiz1" },
    { title: "Quiz 2", path: "/quiz2" },
    { title: "Page 3", path: "/page3" },
    { title: "Page 4", path: "/page4" },
    { title: "Page 5", path: "/page5" },
    { title: "Page 6", path: "/page6" },
    { title: "Page 7", path: "/page7" },
    { title: "Page 8", path: "/page8" },
    { title: "Page 9", path: "/page9" },
    { title: "Majas Quiz", path: "/page10" },
    { title: "Joshs Quiz", path: "/page11" },
    { title: "Chrissis Quiz", path: "/page12" },
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
