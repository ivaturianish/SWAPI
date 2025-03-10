import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Characters from './components/characters.jsx'; // Import the Characters component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/characters">Characters</Link>
        </nav>
        <Routes>
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;