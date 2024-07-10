import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Operador from './pages/Operador';
import Telao from './pages/Telao';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/operador" element={<Operador />} />
        <Route path="/telao" element={<Telao />} />
        <Route path="/" element={<Operador />} />
      </Routes>
    </Router>
  );
};

export default App;