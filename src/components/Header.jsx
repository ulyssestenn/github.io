import React from 'react';

const Header = () => {
  return (
    <header className="site-header">
      <nav>
        <a href="/" className="logo-link">
          <img src="/ulixlogomark.png" alt="Ulix" className="header-logo" />
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#apps">Apps</a>
          <a href="/about.html">About</a>
          <a href="/contact.html">Contact and Support</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;