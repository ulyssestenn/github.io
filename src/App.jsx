import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Apps from './components/Apps';
import IconShowcase from './components/IconShowcase';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import KeepClipPrivacyPolicy from './components/KeepClipPrivacyPolicy';
import GutenPrivacyPolicy from './components/GutenPrivacyPolicy';
import ShelfScanPrivacyPolicy from './components/ShelfScanPrivacyPolicy';
import TrackAnalysisPrivacyPolicy from './components/TrackAnalysisPrivacyPolicy';
import './App.css';

function App() {
  const HomePage = () => (
    <div className="App">
      <Header />
      <Hero />
      <Apps />
      <IconShowcase />
      <Newsletter />
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/keepclipprivacypolicy.html" element={<KeepClipPrivacyPolicy />} />
        <Route path="/gutenprivacy.html" element={<GutenPrivacyPolicy />} />
        <Route path="/shelfscanprivacy.html" element={<ShelfScanPrivacyPolicy />} />
        <Route path="/trackanalysisprivacy.html" element={<TrackAnalysisPrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
