/* ==========================================================================
   Ulix — shared site scripts
   --------------------------------------------------------------------------
   Two independent modules, each self-contained in an IIFE:
     1. Mobile drawer  — opens/closes with focus management and aria-expanded
     2. Product carousel (home page only) — dots, prev/next, pause, keyboard
   Both modules bail out quietly if their DOM elements aren't on the page.
   ========================================================================== */


/* 1. Mobile drawer
   ========================================================================== */
(function () {
  var toggle = document.getElementById('u-menu-btn');
  var drawer = document.getElementById('u-mobile');
  if (!toggle || !drawer) return;

  var panel = drawer.querySelector('.drawer__panel');
  var lastFocus = null;

  function focusables() {
    return panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function open() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var items = focusables();
    if (items.length) items[0].focus();
  }

  function close() {
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  toggle.addEventListener('click', function () {
    if (drawer.hidden) open(); else close();
  });

  drawer.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', function (e) {
    if (drawer.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {
      // Simple focus trap inside the panel.
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();


/* 2. Product carousel (home page)
   ========================================================================== */
(function () {
  var track = document.getElementById('product-carousel-track');
  var dotsHost = document.getElementById('product-carousel-dots');
  if (!track || !dotsHost) return;

  // Icon filenames, keyed by slug.
  var ICONS = {
    'shelf-scan':     './icons/shelfscan.png',
    'keep-clip':      './icons/keepclip.png',
    'track-analysis': './icons/trackanalysis.png',
    'guten':          './icons/guten.png',
    'loan-it':        './icons/loanit.png',
    'curious-air':    './icons/curiousair.png'
  };

  var PLAY_BADGE =
    '<span class="play-badge">' +
      '<svg aria-hidden="true" viewBox="0 0 512 512">' +
        '<defs><linearGradient id="gpb" x1="0" x2="1">' +
          '<stop offset="0%" stop-color="#34a853"/>' +
          '<stop offset="50%" stop-color="#fbbc04"/>' +
          '<stop offset="100%" stop-color="#ea4335"/>' +
        '</linearGradient></defs>' +
        '<path fill="url(#gpb)" d="M325 234L120 40c-7-6-20-1-20 10v412c0 11 13 16 20 10l205-194 61-44-61-44z"/>' +
        '<path fill="#4285f4" d="M390 190l-65 44 65 44c5 3 12-1 12-7v-74c0-6-7-10-12-7z"/>' +
      '</svg>' +
      '<span>Get it on Google Play</span>' +
    '</span>';

  // The list of apps shown in the carousel.
  var APPS = [
    { slug: 'shelf-scan',     name: 'Shelf Scan',     one: 'Search shelves instantly.',                  tag: 'CTRL+F your world. Find books, games, and movies fast.', playUrl: 'https://play.google.com/store/apps/details?id=com.ulix.shelfscan' },
    { slug: 'keep-clip',      name: 'Keep Clip',      one: 'Save text from anywhere. Organize. Export.',  tag: 'Your digital commonplace book. Search, filter, tag, export.', playUrl: 'https://play.google.com/store/apps/details?id=com.bhunt.keepclip' },
    { slug: 'track-analysis', name: 'Track Analysis', one: 'Wellness logging for analysis.',              tag: 'Log wellness data. Export in CSV.', playUrl: 'https://play.google.com/store/apps/details?id=com.ulix.trackanalysis' },
    { slug: 'guten',          name: 'Guten',          one: 'Beautiful reading of classics.',              tag: 'Project Gutenberg reader — now in Google Play testing.', playUrl: 'https://play.google.com/store/apps/details?id=com.bhunt.guten' },
    { slug: 'loan-it',        name: 'Loan It',        one: 'Snap a photo, add a name, never lose track.', tag: 'Track what you loan and to whom.', coming: true },
    { slug: 'curious-air',    name: 'Curious Air',    one: 'See signals around you.',                     tag: 'Explore the signal and sensor data your phone can detect.', coming: true }
  ];

  function slideMarkup(app) {
    var icon  = ICONS[app.slug] || './icons/favicon.png';
    var cta   = app.playUrl
      ? '<a href="' + app.playUrl + '" target="_blank" rel="noopener">' + PLAY_BADGE + '</a>'
      : '<span class="carousel__coming">Coming soon</span>';
    return (
      '<div class="carousel__slide" role="group" aria-roledescription="slide" aria-label="' + app.name + '">' +
        '<div class="carousel__inner">' +
          '<img src="' + icon + '" alt="' + app.name + ' icon" class="carousel__icon" />' +
          '<div>' +
            '<span class="carousel__tag">' + app.name + '</span>' +
            '<h3 class="carousel__title">' + app.one + '</h3>' +
            '<p class="carousel__desc">' + app.tag + '</p>' +
            '<div class="carousel__ctas">' + cta + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  track.innerHTML = APPS.map(slideMarkup).join('');

  // Dots
  dotsHost.innerHTML = APPS.map(function (app, i) {
    return '<button type="button" class="carousel__dot" data-dot="' + i + '" ' +
           'aria-label="Show ' + app.name + '"></button>';
  }).join('');

  var index = 0;
  var total = APPS.length;
  var paused = false;
  var AUTO_MS = 6000;
  var timer = null;

  var dots     = dotsHost.querySelectorAll('.carousel__dot');
  var prevBtn  = document.querySelector('[data-carousel-prev]');
  var nextBtn  = document.querySelector('[data-carousel-next]');
  var pauseBtn = document.querySelector('[data-carousel-pause]');
  var region   = document.querySelector('[data-carousel-region]');

  function render() {
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function (d, i) {
      if (i === index) d.setAttribute('aria-selected', 'true');
      else d.removeAttribute('aria-selected');
    });
  }

  function go(n) {
    index = (n + total) % total;
    render();
  }

  function startAuto() {
    stopAuto();
    if (paused) return;
    timer = window.setInterval(function () { go(index + 1); }, AUTO_MS);
  }
  function stopAuto() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      go(parseInt(d.getAttribute('data-dot'), 10));
      startAuto();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { go(index - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(index + 1); startAuto(); });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      pauseBtn.setAttribute('aria-label', paused ? 'Resume carousel' : 'Pause carousel');
      pauseBtn.innerHTML = paused ? playIcon() : pauseIcon();
      if (paused) stopAuto(); else startAuto();
    });
  }

  if (region) {
    region.addEventListener('mouseenter', stopAuto);
    region.addEventListener('mouseleave', function () { if (!paused) startAuto(); });
    region.addEventListener('focusin', stopAuto);
    region.addEventListener('focusout', function () { if (!paused) startAuto(); });
    region.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { go(index - 1); startAuto(); }
      if (e.key === 'ArrowRight') { go(index + 1); startAuto(); }
    });
  }

  // Honour prefers-reduced-motion: don't auto-advance.
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced && reduced.matches) { paused = true; }

  function pauseIcon() {
    return '<svg aria-hidden="true" viewBox="0 0 16 16"><rect x="3" y="2" width="3" height="12" fill="currentColor"/><rect x="10" y="2" width="3" height="12" fill="currentColor"/></svg>';
  }
  function playIcon() {
    return '<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3 2l11 6-11 6V2z" fill="currentColor"/></svg>';
  }
  if (pauseBtn) pauseBtn.innerHTML = pauseIcon();

  render();
  startAuto();
})();


/* 3. Featured apps on the home page
   ========================================================================== */
(function () {
  var grid = document.getElementById('featured-apps');
  if (!grid) return;

  var ICONS = {
    'shelf-scan':     './icons/shelfscan.png',
    'keep-clip':      './icons/keepclip.png',
    'track-analysis': './icons/trackanalysis.png',
    'guten':          './icons/guten.png'
  };

  var APPS = [
    { slug: 'shelf-scan', name: 'Shelf Scan', one: 'Search shelves instantly.',          playUrl: 'https://play.google.com/store/apps/details?id=com.ulix.shelfscan' },
    { slug: 'keep-clip',  name: 'Keep Clip',  one: 'Save text from anywhere. Organize.', playUrl: 'https://play.google.com/store/apps/details?id=com.bhunt.keepclip' },
    { slug: 'guten',      name: 'Guten',      one: 'Beautiful reading of classics.',     playUrl: 'https://play.google.com/store/apps/details?id=com.bhunt.guten' }
  ];

  var PLAY_BADGE =
    '<span class="play-badge">' +
      '<svg aria-hidden="true" viewBox="0 0 512 512">' +
        '<defs><linearGradient id="gpb2" x1="0" x2="1">' +
          '<stop offset="0%" stop-color="#34a853"/>' +
          '<stop offset="50%" stop-color="#fbbc04"/>' +
          '<stop offset="100%" stop-color="#ea4335"/>' +
        '</linearGradient></defs>' +
        '<path fill="url(#gpb2)" d="M325 234L120 40c-7-6-20-1-20 10v412c0 11 13 16 20 10l205-194 61-44-61-44z"/>' +
        '<path fill="#4285f4" d="M390 190l-65 44 65 44c5 3 12-1 12-7v-74c0-6-7-10-12-7z"/>' +
      '</svg>' +
      '<span>Get it on Google Play</span>' +
    '</span>';

  grid.innerHTML = APPS.map(function (app) {
    return (
      '<div class="card featured-card">' +
        '<img src="' + ICONS[app.slug] + '" alt="' + app.name + ' icon" class="featured-card__icon" />' +
        '<h3 class="card__title">' + app.name + '</h3>' +
        '<p class="card__text">' + app.one + '</p>' +
        '<div class="featured-card__actions">' +
          '<a href="' + app.playUrl + '" target="_blank" rel="noopener">' + PLAY_BADGE + '</a>' +
        '</div>' +
      '</div>'
    );
  }).join('');
})();
