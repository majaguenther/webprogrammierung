import { useContext } from "react";
import { ScoreContext } from "./ScoreContext";
import './Quiz.css';

function Result() {
    const { score } = useContext(ScoreContext);

    return (
        <div>
            <h2>Dein Ergebnis</h2>
            {score !== null ? <p>Du hast {score} von 10 richtig!</p> : <p>Noch kein Ergebnis.</p>}
        </div>
    );
}

export default Result;
