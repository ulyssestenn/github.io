import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site-header">
      <nav>
        <Link to="/">Home</Link>
        <a href="#apps">Apps</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact and Support</a>
      </nav>
    </header>
  );
};

export default Header;