export const privacyPolicies = {
  gutenprivacy: {
    title: 'Guten Privacy Policy',
    appName: 'Guten',
    description: 'Guten is a reading app that helps you explore public-domain books with full respect for your privacy. Here\'s how your data is handled:',
    points: [
      'The app uses internet access only to fetch and download public-domain books and metadata from trusted sources such as the Gutendx API and Project Gutenberg.',
      'No personal information is collected, transmitted, or shared.',
      'Guten includes no analytics, advertising, or account-based services.',
      'Downloaded books, bookmarks, reading progress, and similar records are stored locally on your device using private storage. This data never leaves your device unless you manually back it up or share it.',
      'When opening or sharing external links (e.g., to Project Gutenberg), you may be directed to third-party websites. Their privacy policies apply independently of this app.'
    ],
    conclusion: 'Guten is designed to give you a distraction-free reading experience with complete control over your data.',
    backLink: { text: 'Back to Guten', href: '/#apps' }
  },
  keepclipprivacypolicy: {
    title: 'Keep Clip Privacy Policy',
    appName: 'Keep Clip',
    description: 'Keep Clip is a tool for collecting and organizing text snippets with full respect for your privacy. Here\'s how your data is handled:',
    points: [
      'All clips, tags, and context you save are stored locally on your device in a private database.',
      'The app does not collect personal data or send your clips to any server.',
      'Keep Clip includes no advertising, analytics, or third-party tracking libraries.',
      'The app requests internet access only to fetch metadata (like page titles) for links you choose to save.',
      'Your data stays on your device unless you choose to share or export it.',
      'Android\'s built-in backup system may back up the local database to your Google account, depending on your device settings.'
    ],
    conclusion: 'Keep Clip is designed to give you full control over your saved text, with minimal permissions and no external data sharing.',
    backLink: { text: 'Back to Keep Clip', href: '/#apps' }
  },
  shelfscanprivacy: {
    title: 'Shelf Scan Privacy Policy',
    appName: 'Shelf Scan',
    description: 'Shelf Scan is built to help you search your shelves without compromising your privacy. Here\'s how your data is handled:',
    points: [
      'Captured images and recognized text are saved locally on your device in the app\'s private storage.',
      'No personal data is collected or transmitted. The app functions entirely offline.',
      'There are no analytics, advertising, or third-party integrations.',
      'You may choose to export or share your saved library using Android\'s standard share features. This is completely optional and controlled by you.',
      'The app requests access to your camera (to take photos for OCR) and uses vibration (for haptic feedback when scanning).'
    ],
    conclusion: 'Your data stays on your device unless you decide to share it. Shelf Scan is designed to work powerfully without ever needing an internet connection.',
    backLink: { text: 'Back to Shelf Scan', href: '/shelfscan/' }
  },
  trackanalysisprivacy: {
    title: 'Track Analysis Privacy Policy',
    appName: 'Track Analysis',
    description: 'Track Analysis is a personal logging app designed with privacy in mind. Here\'s how your data is handled:',
    points: [
      'All data you enter—such as event type, details, and timestamps—is stored locally on your device.',
      'No data is collected, transmitted, or stored by us.',
      'The app includes no advertising, no analytics, and no third-party integrations.',
      'The only optional export is a CSV file saved in your app\'s private storage. You may share it manually using Android\'s standard sharing options.',
      'The app does not request access to your location, contacts, network, or other device features.',
      'A disclaimer in the app reminds users that it is for personal use only and is not medical advice.'
    ],
    conclusion: 'Android\'s built-in backup system may back up the local database to your Google account, depending on your device settings.',
    backLink: { text: 'Back to Track Analysis', href: 'https://play.google.com/store/apps/details?id=com.ulix.trackanalysis' }
  }
};