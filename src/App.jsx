import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Analytics from './pages/Analytics/Analytics';
import Agents from './pages/Agents/Agents';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/agents" element={<Agents />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
