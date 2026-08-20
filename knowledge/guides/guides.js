(() => {
  const cards = Array.from(document.querySelectorAll('[data-guide-card]'));
  const search = document.querySelector('#guide-search');
  const count = document.querySelector('#guide-results-count');
  const topicButtons = Array.from(document.querySelectorAll('[data-topic-filter]'));
  const appButtons = Array.from(document.querySelectorAll('[data-app-filter]'));

  const topicLabels = {
    books: 'Books & Collections',
    reading: 'Reading & Classics',
    pkm: 'Notes, Capture & PKM',
    lending: 'Lending & Shared Collections',
    'personal-data': 'Personal Data & Tracking',
    'research-archives': 'Research & Archives'
  };

  const topicBySection = {
    'collections': 'books',
    'books & libraries': 'books',
    'private libraries': 'books',
    'books & digital texts': 'books',
    'reading': 'reading',
    'reading & learning': 'reading',
    'learning & study methods': 'reading',
    'reading systems': 'reading',
    'classics': 'reading',
    'classics & meter': 'reading',
    'classics & translation': 'reading',
    'classics & reading': 'reading',
    'classics & oral tradition': 'reading',
    'pkm': 'pkm',
    'information systems': 'pkm',
    'digital life': 'pkm',
    'lending': 'lending',
    'comparison': 'lending',
    'personal systems': 'personal-data',
    'personal data': 'personal-data',
    'software costs': 'research-archives',
    'software & data': 'research-archives',
    'research': 'research-archives',
    'archives': 'research-archives'
  };

  const appSlugs = {
    'shelf-scan': new Set([
      'search-dvd-bluray-collection-by-spine-text','import-existing-shelf-photos-shelf-scan','searchable-shelf-photo-library-ten-minutes','i-cant-find-my-books','search-double-shelved-bookcase','make-inherited-library-searchable-before-sorting','find-specific-book-used-bookstore','find-books-packed-in-boxes','family-library-several-rooms','check-home-library-from-bookstore-shelf-scan','search-large-home-library-without-cataloging','avoid-buying-books-you-own','manage-1000-book-home-library','find-book-without-exact-title'
    ]),
    'guten': new Set([
      'open-project-gutenberg-link-in-guten','download-weekend-reading-stack-offline','make-dense-classic-easier-to-read-phone','search-inside-long-classic-guten','portable-reading-library-away-from-home','turn-commute-into-reading-time','guten-school-academic-research','share-favorite-quotes-guten','read-instead-of-scroll-guten','offline-classics-library-travel','read-classic-books-free','read-classics-without-kindle'
    ]),
    'keep-clip': new Set([
      'use-tag-autocomplete-keep-archive-consistent','find-clips-by-source-app','save-article-excerpt-title-url','save-passage-without-opening-notes','what-should-happen-after-a-highlight','tags-or-search-when-tagging-worth-it','save-reason-not-just-link','digital-commonplace-book-android','pkm-without-cloud','keep-clip-pkm-capture-inbox','analyze-keep-clip-export-with-ai','sending-links-to-yourself','do-you-need-a-second-brain'
    ]),
    'loan-it': new Set([
      'pick-borrower-without-address-book-access','scan-book-isbn-loan-it','photograph-what-you-lend','who-has-my-tools','things-you-lose-because-you-lent-them-out','why-due-date-lent-to-friend','lend-kit-without-losing-pieces','small-lending-closet-tools-games-equipment','manage-tiny-library-android-phone','lend-books-without-cataloging-library','keep-track-of-things-you-lend','paper-list-spreadsheet-or-app-lending'
    ]),
    'track-analysis': new Set([
      'tell-productivity-system-working','run-small-personal-experiment','when-should-you-stop-tracking','when-is-habit-tracking-worth-it','how-long-track-before-analyzing','why-timestamps-useful-personal-logs','symptom-food-diary-for-doctor-track-analysis','personal-log-ai-patterns','what-to-track-useful-personal-data'
    ])
  };

  const params = new URLSearchParams(window.location.search);
  let activeTopic = topicLabels[params.get('topic')] ? params.get('topic') : 'all';
  let activeApp = appSlugs[params.get('app')] ? params.get('app') : 'all';
  if (search && params.get('q')) search.value = params.get('q');

  cards.forEach(card => {
    const section = (card.dataset.section || '').trim().toLowerCase();
    card.dataset.topic = topicBySection[section] || 'research-archives';
    const slug = card.dataset.slug;
    card.dataset.apps = Object.entries(appSlugs)
      .filter(([, slugs]) => slugs.has(slug))
      .map(([app]) => app)
      .join(' ');
  });

  const setPressed = () => {
    topicButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topicFilter === activeTopic)));
    appButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.appFilter === activeApp)));
  };

  const syncUrl = () => {
    const next = new URLSearchParams();
    const q = search ? search.value.trim() : '';
    if (q) next.set('q', q);
    if (activeTopic !== 'all') next.set('topic', activeTopic);
    if (activeApp !== 'all') next.set('app', activeApp);
    const query = next.toString();
    history.replaceState(null, '', query ? `${location.pathname}?${query}` : location.pathname);
  };

  const apply = () => {
    const q = search ? search.value.trim().toLowerCase() : '';
    let visible = 0;
    cards.forEach(card => {
      const matchesText = !q || card.textContent.toLowerCase().includes(q);
      const matchesTopic = activeTopic === 'all' || card.dataset.topic === activeTopic;
      const matchesApp = activeApp === 'all' || card.dataset.apps.split(' ').includes(activeApp);
      const show = matchesText && matchesTopic && matchesApp;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} guide${visible === 1 ? '' : 's'}`;
    setPressed();
    syncUrl();
  };

  topicButtons.forEach(button => button.addEventListener('click', () => {
    activeTopic = button.dataset.topicFilter;
    apply();
  }));
  appButtons.forEach(button => button.addEventListener('click', () => {
    activeApp = button.dataset.appFilter;
    apply();
  }));
  if (search) search.addEventListener('input', apply);

  apply();
})();
