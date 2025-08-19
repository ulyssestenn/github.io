import React, { useState } from 'react';

const AppCard = ({ app }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="app-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
      }}
    >
      <img src={app.icon} alt={app.name} className="app-icon" />
      <div className={`status-badge ${app.status === 'Live on Google Play' ? 'status-live' : 'status-development'}`}>
        {app.status}
      </div>
      <h3>{app.name}</h3>
      <p className="app-description">{app.description}</p>
      {app.link && (
        <p className="no-margin">
          <a href={app.link} target="_blank" rel="noopener noreferrer" className="gold-link">
            See it on Google Play.
          </a>
        </p>
      )}
    </div>
  );
};

export default AppCard;