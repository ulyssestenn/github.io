import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './components/MainApp';
import PrivacyPolicy from './components/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/gutenprivacy.html" element={<PrivacyPolicy />} />
          <Route path="/keepclipprivacypolicy.html" element={<PrivacyPolicy />} />
          <Route path="/shelfscanprivacy.html" element={<PrivacyPolicy />} />
          <Route path="/trackanalysisprivacy.html" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
