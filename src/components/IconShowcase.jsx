import React from 'react';

const IconShowcase = () => {
  const iconsFromFolder = [
    { name: 'Ulix Logomark', src: '/ulixlogomark.png', alt: 'Ulix Logomark' },
    { name: 'Ulix Wordmark', src: '/ulixwordmark.png', alt: 'Ulix Wordmark' },
    { name: 'Ulix Wordmark Vertical', src: '/ulixwordmarkvert.png', alt: 'Ulix Wordmark Vertical' },
    { name: 'Shelf Scan (from icons)', src: '/shelfscan.png', alt: 'Shelf Scan Icon' },
  ];

  return (
    <section className="icon-showcase">
      <div className="container">
        <h2>Newly Integrated Icons from Icons Folder</h2>
        <p>These icons were in the icons folder but not previously integrated into the React site:</p>
        <div className="icons-grid">
          {iconsFromFolder.map((icon, index) => (
            <div key={index} className="icon-card">
              <img src={icon.src} alt={icon.alt} className="showcase-icon" />
              <h4>{icon.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconShowcase;