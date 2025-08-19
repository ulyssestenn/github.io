import React from 'react';
import AppCard from './AppCard';

const Apps = () => {
  const apps = [
    {
      icon: '/shelfscanweb.png',
      name: 'Shelf Scan',
      status: 'Live on Google Play',
      description: 'Find books, games, and discs fast. Shelf Scan is Ctrl-F for the physical world.',
      link: 'https://play.google.com/store/apps/details?id=com.ulix.shelfscan'
    },
    {
      icon: '/loanit.png',
      name: 'Loan It',
      status: 'In Closed Testing on Google Play',
      description: 'Beautifully simple loan tracking. Effortlessly organize what you lend.',
      link: 'https://play.google.com/store/apps/details?id=com.bhunt.loanit'
    },
    {
      icon: '/trackanalysis.png',
      name: 'Track Analysis',
      status: 'Live on Google Play',
      description: 'Track food, sleep, symptoms, and more. Easily export data for analysis.',
      link: 'https://play.google.com/store/apps/details?id=com.ulix.trackanalysis'
    },
    {
      icon: '/guten.png',
      name: 'Guten',
      status: 'In Development',
      description: 'A beautiful way to read the classics. Rediscover great books with smart features and timeless style.'
    },
    {
      icon: '/keepclip.png',
      name: 'Keep Clip',
      status: 'In Closed Testing on Google Play',
      description: 'Capture, collect, and export text from almost any app on your phone. A modern commonplace book on your device.'
    },
    {
      icon: '/shelfsleuth.png',
      name: 'Shelf Sleuth',
      status: 'In Development',
      description: 'Made for library heroes. Find misshelved books with ease using your device camera.'
    },
    {
      icon: '/curiousair.png',
      name: 'Curious Air',
      status: 'In Development',
      description: 'Explore Bluetooth, Wi-Fi, and other ambient signals. Export logs. Find out what\'s out there.'
    },
    {
      icon: '/breakerofhorses.png',
      name: 'Breaker of Horses',
      status: 'In Development',
      description: 'A dedicated Iliad reader for immersive exploration.'
    }
  ];

  return (
    <section id="apps" className="apps-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Applications</h2>
          <p>Tools, not traps. Ulix builds digital tools for physical lives. No ads. No logins. No data-harvesting.</p>
          <p className="app-note">
            Currently created for Android. iOS versions coming soon.
          </p>
        </div>

        <div className="apps-grid">
          {apps.map((app, index) => (
            <AppCard key={index} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Apps;