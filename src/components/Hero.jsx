import React from 'react';

const Hero = () => {
  const handleCTAClick = (e) => {
    e.preventDefault();
    document.querySelector('#apps')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero">
      <div className="logo-container">
        <img src="/ulixh.png" alt="Ulix: Precision Tools for Modern Odysseys" className="main-logo" />
      </div>
      <a href="#apps" className="cta-button" onClick={handleCTAClick}>
        Explore Our Apps
      </a>
    </section>
  );
};

export default Hero;