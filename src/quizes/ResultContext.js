import { createContext, useState } from "react";

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
    const [score, setScore] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState(null);

    return (
        <ResultContext.Provider value={{ score, setScore, selectedAnswers, setSelectedAnswers }}>
            {children}
        </ResultContext.Provider>
    );
};
