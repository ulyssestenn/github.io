import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Apps from './components/Apps';
import IconShowcase from './components/IconShowcase';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Apps />
      <IconShowcase />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
