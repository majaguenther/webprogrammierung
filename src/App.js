import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import './App.css';

const Page = ({ title }) => <div style={{ padding: "20px", textAlign: "center" }}><h2>{title}</h2></div>;

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {[...Array(12)].map((_, i) => (
                <Route key={i} path={`/page${i + 1}`} element={<Page title={`Page ${i + 1}`} />} />
            ))}
          </Routes>
        </div>
      </Router>
  );
};

export default Quiz;