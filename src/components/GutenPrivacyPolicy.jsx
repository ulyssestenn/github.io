import React from 'react';
import PrivacyPolicyLayout from './PrivacyPolicyLayout';

const GutenPrivacyPolicy = () => {
  return (
    <PrivacyPolicyLayout title="Guten Privacy Policy">
      <p>
        <strong>Guten</strong> is a reading app that helps you explore
        public-domain books with full respect for your privacy. Here's how your
        data is handled:
      </p>
      <ul>
        <li>
          The app uses internet access only to fetch and download public-domain
          books and metadata from trusted sources such as the Gutendex API and
          Project Gutenberg.
        </li>
        <li>
          <strong>No personal information is collected, transmitted, or
            shared.</strong>
        </li>
        <li>
          Guten includes <strong>no analytics, advertising, or account-based services</strong>.
        </li>
        <li>
          Downloaded books, bookmarks, reading progress, and similar records are
          stored <strong>locally</strong> on your device using private storage.
          This data never leaves your device unless you manually back it up or
          share it.
        </li>
        <li>
          When opening or sharing external links (e.g., to Project Gutenberg),
          you may be directed to third-party websites. Their privacy policies
          apply independently of this app.
        </li>
      </ul>
      <p>
        Guten is designed to give you a distraction-free reading experience with
        complete control over your data.
      </p>
      <p>
        <a href="/#apps" className="gold-link">Back to Guten</a> |{" "}
        <a href="/" className="gold-link">Ulix Home</a>
      </p>
    </PrivacyPolicyLayout>
  );
};

export default GutenPrivacyPolicy;