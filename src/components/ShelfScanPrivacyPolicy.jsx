import React from 'react';
import PrivacyPolicyLayout from './PrivacyPolicyLayout';

const ShelfScanPrivacyPolicy = () => {
  return (
    <PrivacyPolicyLayout title="Shelf Scan Privacy Policy">
      <p>
        <strong>Shelf Scan</strong> is built to help you search your shelves
        without compromising your privacy. Here's how your data is handled:
      </p>
      <ul>
        <li>
          Captured images and recognized text are saved
          <strong> locally</strong> on your device in the app's private storage.
        </li>
        <li>
          No personal data is collected or transmitted. The app functions
          entirely <strong>offline</strong>.
        </li>
        <li>
          There are
          <strong> no analytics, advertising, or third-party integrations</strong>.
        </li>
        <li>
          You may choose to export or share your saved library using Android's
          standard share features. This is completely optional and controlled by
          you.
        </li>
        <li>
          The app requests access to your <strong>camera</strong> (to take
          photos for OCR) and uses <strong>vibration</strong> (for haptic
          feedback when scanning).
        </li>
      </ul>
      <p>
        Your data stays on your device unless you decide to share it. Shelf Scan
        is designed to work powerfully without ever needing an internet
        connection.
      </p>
      <p>
        <a href="/shelfscan/" className="gold-link">Back to Shelf Scan</a> |{" "}
        <a href="/" className="gold-link">Ulix Home</a>
      </p>
    </PrivacyPolicyLayout>
  );
};

export default ShelfScanPrivacyPolicy;