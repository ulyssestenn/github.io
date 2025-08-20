import React from 'react';
import { useLocation } from 'react-router-dom';
import { privacyPolicies } from '../data/privacyPolicies.js';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const location = useLocation();
  // Extract policy ID from pathname, removing .html extension
  const policyId = location.pathname.replace('/', '').replace('.html', '');
  const policy = privacyPolicies[policyId];

  if (!policy) {
    return (
      <div className="ulix-bg ulix-ink antialiased privacy-page">
        <Header />
        <main>
          <h1>Privacy Policy Not Found</h1>
          <p>The requested privacy policy could not be found.</p>
          <p>
            <a href="/" className="gold-link">Ulix Home</a>
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ulix-bg ulix-ink antialiased privacy-page">
      <Header />
      <main>
        <h1>{policy.title}</h1>
        <p>
          <strong>{policy.appName}</strong> {policy.description.replace(policy.appName + ' ', '')}
        </p>
        <ul>
          {policy.points.map((point, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
          ))}
        </ul>
        <p>{policy.conclusion}</p>
        <p>
          <a href={policy.backLink.href} className="gold-link">{policy.backLink.text}</a> |{' '}
          <a href="/" className="gold-link">Ulix Home</a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;