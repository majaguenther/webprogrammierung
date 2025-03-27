import express from 'express';
import cors from 'cors';
import { questions1, questions2, questions3, questions4, questions5, questions6, questions7, questions8, questions9, questions10, questions11 } from './questions.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API-Routen für die verschiedenen Quiz-Kategorien
app.get('/api/questions1', (req, res) => res.json(questions1));
app.get('/api/questions2', (req, res) => res.json(questions2));
app.get('/api/questions3', (req, res) => res.json(questions3));
app.get('/api/questions4', (req, res) => res.json(questions4));
app.get('/api/questions5', (req, res) => res.json(questions5));
app.get('/api/questions6', (req, res) => res.json(questions6));
app.get('/api/questions7', (req, res) => res.json(questions7));
app.get('/api/questions8', (req, res) => res.json(questions8));
app.get('/api/questions9', (req, res) => res.json(questions9));
app.get('/api/questions10', (req, res) => res.json(questions10));
app.get('/api/questions11', (req, res) => res.json(questions11));

// Standardroute
app.get('/', (req, res) => {
  res.send('Quiz API is running...');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:3001`);
});