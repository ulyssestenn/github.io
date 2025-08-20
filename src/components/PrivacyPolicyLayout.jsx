import React, { useEffect } from 'react';

const PrivacyPolicyLayout = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="ulix-bg ulix-ink antialiased privacy-page">
      <header className="site-header">
        <nav>
          <a href="/">Home</a>
          <a href="/#apps">Apps</a>
          <a href="/about.html">About</a>
          <a href="/contact.html">Contact and Support</a>
        </nav>
      </header>

      <main>
        <h1>{title}</h1>
        {children}
      </main>

      <footer className="site-footer">
        <p>&copy; 2025 Ulix. Precision Tools for Modern Odysseys.</p>
        <p>
          <a href="https://x.com/ulixapp" target="_blank" rel="noopener noreferrer" className="gold-link">Twitter</a> |{" "}
          <a href="https://www.facebook.com/profile.php?id=61578604255907" target="_blank" rel="noopener noreferrer" className="gold-link">Facebook</a> |{" "}
          <a href="https://www.instagram.com/ulixapp/" target="_blank" rel="noopener noreferrer" className="gold-link">Instagram</a>
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicyLayout;