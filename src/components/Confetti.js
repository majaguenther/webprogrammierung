import { useEffect } from 'react';
import './Confetti.css';

const Confetti = () => {

    useEffect(() => {

        const createConfetti = () => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const size = Math.random() * 20 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.setProperty('--hue', Math.random() * 360);

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        };

        for (let i = 0; i < 100; i++) {
            createConfetti();
        }


    }, []);

    return null;
};

export default Confetti;
