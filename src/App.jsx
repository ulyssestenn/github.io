import React, { useEffect, useMemo, useRef, useState } from "react";

// Ulix — Modern Corporate Luxe (React mock site)
// Mobile-ready with hero carousel (dots, auto-advance with reduced-motion respect), simple mobile menu,
// wordmark above headline, Blog route, newsletter signup, Support form (mailto + anti-spam), and Terms page.

// ---- THEME TOKENS ----
const THEME = {
  primary: "#00142F",   // deep navy
  accent:  "#B49041",   // gold
  bg:      "#F7F7F5",   // ivory
  surface: "#FFFFFF",
  muted:   "#B9C0C8",
  highlight:"#1F4068",
};

// ---- ICON PATHS (place files in /public/icons/) ----
const ICONS = {
  ulixWord: "/icons/ulixh.png",
  ulixMark: "/icons/ulix.png",
  shipBadge: "/icons/favicon.png",
  guten: "/icons/guten.png",
  keepclip: "/icons/keepclip.png",
  shelfscan: "/icons/storeicon.png",
  loanit: "/icons/Loan It Icon 512.png",
  track: "/icons/TrackAnalysis Icon 512.png",
  curiousair: "/icons/curiousair.png",
  feature: "/icons/ulixfeature.png",
};

// ---- APP DATA (no prices) ----
const APPS = [
  { slug: "shelf-scan", icon: "shelfscan", name: "Shelf Scan", oneLiner: "Find any book in seconds.", tagline: "Camera shelf search — find anything in seconds.", platforms: ["Android"], accentColor: "#2B79FF" },
  { slug: "keep-clip", icon: "keepclip", name: "Keep Clip", oneLiner: "Save text from anywhere, privately.", tagline: "Your private digital commonplace book.", platforms: ["Android"], accentColor: THEME.primary },
  { slug: "guten", icon: "guten", name: "Guten", oneLiner: "Beautiful reading of classics.", tagline: "Project Gutenberg reader — elegant and fast.", platforms: ["Android"], accentColor: THEME.accent },
  { slug: "loan-it", icon: "loanit", name: "Loan It", oneLiner: "Snap a photo, add a name, never lose track.", tagline: "Track what you loan and to whom.", platforms: ["Android"], accentColor: "#2BAA4A" },
  { slug: "track-analysis", icon: "track", name: "Track Analysis", oneLiner: "Private wellness logging.", tagline: "Private wellness logging — local‑only data.", platforms: ["Android"], accentColor: THEME.primary },
  { slug: "curious-air", icon: "curiousair", name: "Curious Air", oneLiner: "See signals around you.", tagline: "Explore signals around you — Bluetooth, Wi‑Fi & sensors.", platforms: ["Android"], accentColor: "#2B79FF", comingSoon: true },
];

// ---- ENDPOINTS ----
const BUTTONDOWN_EMBED_ACTION = "https://buttondown.com/api/emails/embed-subscribe/ulix";
const BUTTONDOWN_POPUP_URL = "https://buttondown.com/ulix";
const SUPPORT_EMAIL = "support@ulix.app";
const SUPPORT_POST_ENDPOINT = null; // e.g. "/api/support" if you add a backend later
const TERMS_LAST_UPDATED = "2025-08-16";

// ---- SHARED UI ----
function Container({ className = "", children }) {
  return <div className={`mx-auto max-w-[1120px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Img({ src, alt, size = 48, w, h, radius = 16, fallbackColor = THEME.accent }) {
  const [err, setErr] = useState(false);
  const width = w ?? size;
  const height = h ?? size;
  if (err || !src) {
    return <div style={{ width, height, borderRadius: radius, background: fallbackColor, boxShadow: "0 6px 14px rgba(0,0,0,.12)" }} aria-label={alt} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      style={{ width, height, borderRadius: radius, objectFit: "cover", boxShadow: "0 6px 14px rgba(0,0,0,.12)" }}
    />
  );
}

function Button({ variant = "primary", onClick, href, children }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none";
  const Comp = href ? "a" : "button";
  const baseStyle = variant === "primary"
    ? { background: THEME.accent, color: "#111", border: `1.5px solid ${THEME.accent}` }
    : { background: THEME.bg, color: THEME.primary, border: `1.5px solid ${THEME.accent}` };
  const ring = (hovered || focused) ? `0 0 0 3px rgba(180,144,65,.45)` : `0 0 0 0 transparent`;
  const style = { ...baseStyle, boxShadow: `0 6px 14px rgba(0,0,0,.12), ${ring}` };
  return (
    <Comp
      onClick={onClick}
      href={href}
      className={base}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </Comp>
  );
}

function Card({ children }) {
  return (
    <div className="h-full rounded-2xl border bg-white p-5 shadow" style={{ borderColor: "rgba(0,20,47,0.08)", boxShadow: "0 10px 25px rgba(0,0,0,.12)" }}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ borderColor: THEME.accent, color: THEME.accent }}>
      {children}
    </span>
  );
}

function EmailSignup({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "ok" | "err"
  const submit = (e) => {
    const valid = /.+@.+\..+/.test(email);
    if (!valid) { e.preventDefault(); setStatus("err"); return; }
    try {
      // Open Buttondown subscribe UI in a named window while allowing the POST to proceed
      window.open(BUTTONDOWN_POPUP_URL, "bd-subscribe");
      setStatus("ok");
    } catch (err) {
      console.error(err);
      // Even if popup is blocked, the form will still POST to Buttondown
    }
  };
  return (
    <form onSubmit={submit} action={BUTTONDOWN_EMBED_ACTION} method="post" target="bd-subscribe" className={compact ? "flex gap-2" : "grid gap-2"} aria-label="Email signup">
      {!compact && <label className="text-sm">Get product updates</label>}
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          id="bd-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-xl border px-3 py-2"
          style={{ borderColor: "rgba(0,0,0,.15)" }}
          aria-label="Email address"
        />
        <Button>{status === "ok" ? "Thanks!" : "Subscribe"}</Button>
      </div>
      {status === "err" && <span className="text-xs text-red-600">Enter a valid email.</span>}
    </form>
  );
}

// ---- NAV + MOBILE MENU ----
function Nav({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "apps", label: "Apps" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-40 border-b border-white/10" style={{ background: THEME.primary }}>
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Img src={ICONS.shipBadge} alt="Ulix mark" size={36} radius={10} />
          <span className="text-lg font-semibold tracking-wide text-white">ULIX</span>
        </div>
        <nav className="hidden gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`text-sm font-medium text-white/80 hover:text-white ${route === l.id ? "underline decoration-[3px] decoration-[#B49041] underline-offset-8" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 text-white">
              <span style={{ width: 18, height: 2, background: "white", display: "block", boxShadow: "0 6px 0 0 white, 0 -6px 0 0 white" }} />
            </button>
          </div>
          <div className="hidden md:block">
            <Button onClick={() => navigate("apps")} variant="primary">Explore Apps</Button>
          </div>
        </div>
      </Container>
      {open && <MobileMenu onClose={() => setOpen(false)} links={links} navigate={navigate} />}
    </div>
  );
}

function MobileMenu({ onClose, links, navigate }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold" style={{ color: THEME.primary }}>Menu</span>
          <button aria-label="Close menu" onClick={onClose} className="h-8 w-8 rounded-md border" style={{ borderColor: "rgba(0,0,0,.12)" }}>×</button>
        </div>
        <div className="grid gap-2">
          {links.map(l => (
            <button key={l.id} onClick={() => { navigate(l.id); onClose(); }} className="rounded-lg px-3 py-2 text-left hover:bg-black/5" style={{ color: THEME.primary }}>
              {l.label}
            </button>
          ))}
          <div className="pt-3">
            <Button onClick={() => { navigate('apps'); onClose(); }} variant="primary">Explore Apps</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- HERO WITH CAROUSEL (Option A) ----
function Hero({ navigate }) {
  return (
    <section className="py-16 text-white" style={{ background: `linear-gradient(180deg, #001227, ${THEME.primary})` }}>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            {/* brand wordmark above headline */}
            <div className="mb-4">
              <Img src={ICONS.ulixWord} alt="Ulix wordmark" w={210} h={56} radius={12} />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Tools, Not Traps</h1>
            <p className="mt-4 max-w-xl text-white/80">
              Privacy‑first utilities for everyday computing. No accounts. No dark patterns. Fair pricing.
              Software that does the job beautifully.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => navigate("apps")} variant="primary">Explore Apps</Button>
              <Button onClick={() => navigate("about")} variant="secondary">Why Ulix?</Button>
            </div>
          </div>
          <div>
            <HeroCarousel navigate={navigate} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroCarousel({ navigate }) {
  const slides = useMemo(() => APPS.filter(a => ["shelf-scan","keep-clip","guten","curious-air"].includes(a.slug)), []);
  const [index, setIndex] = useState(0);
  const isReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const touchRef = useRef({ x: 0, y: 0, active: false });

  const next = (n = 1) => setIndex(i => (i + n + slides.length) % slides.length);
  const goTo = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  useEffect(() => {
    if (isReduced) return; // respect reduced motion
    timerRef.current && clearInterval(timerRef.current);
    if (!pausedRef.current) {
      timerRef.current = setInterval(() => next(1), 6000);
    }
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [index, isReduced]);

  const pause = () => { pausedRef.current = true; timerRef.current && clearInterval(timerRef.current); };
  const resume = () => { pausedRef.current = false; };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, active: true };
    pause();
  };
  const onTouchMove = (e) => {
    if (!touchRef.current.active) return;
    const t = e.touches[0];
    const dx = t.clientX - touchRef.current.x;
    touchRef.current.dx = dx;
  };
  const onTouchEnd = () => {
    const dx = touchRef.current.dx || 0;
    const THRESHOLD = 40; // standard swipe threshold
    if (dx > THRESHOLD) goTo(index - 1);
    else if (dx < -THRESHOLD) goTo(index + 1);
    touchRef.current = { x: 0, y: 0, active: false };
    resume();
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border shadow"
      style={{ borderColor: "rgba(255,255,255,.12)", height: 260, background: "rgba(255,255,255,0.04)" }}
      aria-roledescription="carousel"
      aria-label="App highlights"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="whitespace-nowrap transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s) => (
          <div key={s.slug} className="inline-block w-full align-top">
            <div className="grid h-[260px] grid-cols-5 items-center gap-4 px-5 text-white/90">
              <div className="col-span-2 flex items-center justify-center">
                <Img src={ICONS[s.icon]} alt={`${s.name} icon`} size={96} radius={20} />
              </div>
              <div className="col-span-3">
                <Badge>{s.name}</Badge>
                <h3 className="mt-2 text-xl font-semibold">{s.oneLiner}</h3>
                <p className="mt-1 text-sm text-white/70">{s.tagline}</p>
                <div className="mt-4">
                  <Button variant="secondary" onClick={() => { if (!s.comingSoon) navigate(`product:${s.slug}`); }}>
                    {s.comingSoon ? "Coming soon" : "Learn more"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="h-2 w-2 rounded-full"
            style={{ background: i === index ? THEME.accent : "rgba(255,255,255,.5)" }}
          />
        ))}
      </div>
    </div>
  );
}

// ---- PAGES ----
function Pillar({ title, body }) {
  return (
    <Card>
      <div className="mb-2 h-10 w-10 rounded-lg" style={{ background: THEME.accent }} />
      <h3 className="text-lg font-semibold" style={{ color: THEME.primary }}>{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </Card>
  );
}

function AppCard({ app, navigate }) {
  return (
    <Card>
      <div className="flex h-full items-stretch gap-3">
        <Img src={ICONS[app.icon]} alt={`${app.name} icon`} size={56} radius={14} />
        <div className="flex min-h-[160px] flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: THEME.primary }}>{app.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{app.oneLiner}</p>
            </div>
            <Badge>{app.platforms.join(" • ")}</Badge>
          </div>
          <div className="mt-auto pt-4 flex items-center justify-end gap-3">
            <Button onClick={() => !app.comingSoon && navigate(`product:${app.slug}`)} variant="secondary">
              {app.comingSoon ? "Coming soon" : "Learn more"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Home({ navigate }) {
  return (
    <main style={{ background: THEME.bg }}>
      <Hero navigate={navigate} />
      <section className="py-12">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: THEME.primary }}>Why Ulix</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Pillar title="Privacy by Default" body="Your data stays on your device. Offline works. No accounts required." />
            <Pillar title="Precision Tools" body="Focused apps that do one thing extremely well." />
            <Pillar title="Stable & Lightweight" body="Fast to install, effortless to keep. Minimal footprint." />
            <Pillar title="Fair Pricing" body="Simple, transparent pricing with no lock‑in." />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: THEME.primary }}>Featured Apps</h2>
            <Button onClick={() => navigate("apps")} variant="secondary">View All</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPS.slice(0,3).map((app) => (
              <AppCard key={app.slug} app={app} navigate={navigate} />
            ))}
          </div>
        </Container>
      </section>

      <SignupBand />
      <Footer navigate={navigate} />
    </main>
  );
}

function AppsIndex({ navigate }) {
  return (
    <main>
      <section className="border-b py-10" style={{ background: THEME.bg, borderColor: "rgba(0,20,47,0.08)" }}>
        <Container>
          <h1 className="text-3xl font-semibold" style={{ color: THEME.primary }}>Apps</h1>
          <p className="mt-1 text-slate-600">Privacy‑first tools for everyday computing. Local‑first, lightweight, and fair.</p>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPS.map((app) => (
              <AppCard key={app.slug} app={app} navigate={navigate} />
            ))}
          </div>
        </Container>
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function ShelfScanPage({ navigate }) {
  return (
    <main>
      <section className="py-14 text-white" style={{ background: THEME.primary }}>
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Img src={ICONS.shelfscan} alt="Shelf Scan icon" size={56} radius={14} />
              <div>
                <h1 className="text-3xl font-semibold">Shelf Scan</h1>
                <p className="mt-2 text-white/85">Camera shelf search. Find books, movies, and games instantly by pointing your camera at your shelves. No cataloging. Works offline.</p>
                <div className="mt-6 flex gap-3">
                  <Button href="#" variant="primary">Get it on Google Play</Button>
                  <Button variant="secondary" onClick={() => navigate("apps")}>Back to apps</Button>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="aspect-video w-full rounded-xl bg-black/30" />
                <p className="mt-2 text-sm text-white/70">30s demo preview</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12" style={{ background: THEME.bg }}>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {["Point your camera","Instant match highlight","No organizing required"].map((t) => (
              <Card key={t}>
                <h3 className="text-lg font-semibold" style={{ color: THEME.primary }}>{t}</h3>
                <p className="mt-1 text-sm text-slate-600">Shelf Scan reads visible spine text on‑device and guides you to the match with crisp, unobtrusive highlights.</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid items-start gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold" style={{ color: THEME.primary }}>How it works</h3>
              <ol className="mt-3 space-y-2 text-sm text-slate-600">
                <li>1. Open the app and point your camera at your shelves.</li>
                <li>2. Type a title or author; Shelf Scan searches visible text on‑device.</li>
                <li>3. Follow the subtle highlight to your target in seconds.</li>
              </ol>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold" style={{ color: THEME.primary }}>Privacy</h3>
              <p className="mt-1 text-sm text-slate-600">All OCR and search run on your device. No accounts. No cloud sync.</p>
            </Card>
          </div>
        </Container>
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function BlogIndex({ navigate }) {
  const posts = [
    { id: 1, title: "Designing Tools, Not Traps", excerpt: "How we decide what to build (and what to leave out).", date: "2025-01-08" },
    { id: 2, title: "Shelf Scan dev notes", excerpt: "On-device OCR, latency, and highlight UX.", date: "2025-01-15" },
  ];
  return (
    <main>
      <section className="py-14" style={{ background: THEME.bg }}>
        <Container>
          <h1 className="text-3xl font-semibold" style={{ color: THEME.primary }}>Blog</h1>
          <p className="mt-1 text-slate-600">Notes on building small, respectful software.</p>
        </Container>
      </section>
      <section className="py-10" style={{ background: THEME.bg }}>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 grid gap-4">
              {posts.map(p => (
                <Card key={p.id}>
                  <div className="text-xs text-slate-500">{p.date}</div>
                  <h3 className="text-lg font-semibold" style={{ color: THEME.primary }}>{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{p.excerpt}</p>
                </Card>
              ))}
            </div>
            <div>
              <Card>
                <h4 className="font-semibold" style={{ color: THEME.primary }}>Subscribe</h4>
                <p className="mt-1 text-sm text-slate-600">Get new posts and product updates.</p>
                <div className="mt-3"><EmailSignup /></div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function Terms() {
  return (
    <main>
      <section className="py-14" style={{ background: THEME.bg }}>
        <Container>
          <h1 className="text-3xl font-semibold" style={{ color: THEME.primary }}>Terms of Service</h1>
          <div className="text-sm text-slate-600">Last updated: {TERMS_LAST_UPDATED}</div>

          <div className="mt-6 grid gap-6">
            <Card>
              <h2 className="text-lg font-semibold" style={{ color: THEME.primary }}>Plain‑English summary</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>You can use Ulix apps under a personal, non‑transferable license.</li>
                <li>Purchases and refunds are handled by the app store (e.g., Google Play).</li>
                <li>We own the Ulix site/app content and trademarks; all rights reserved.</li>
                <li>We don't accept unsolicited ideas; if you send them, we have no obligations and may use similar ideas.</li>
                <li>We provide the software "as is"; our liability is limited.</li>
                <li>We respect privacy; see the Privacy Policy for details.</li>
                <li>Arkansas law applies; venue is Washington County (Springdale), USA.</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Acceptance of Terms</h3>
              <p className="mt-2 text-sm text-slate-700">These Terms of Service ("Terms") are an agreement between you and Ulix LLC ("Ulix," "we," or "us"). By accessing the Ulix website or using any Ulix application (collectively, the "Services"), you agree to these Terms. If you do not agree, do not use the Services. We may update these Terms from time to time; changes apply prospectively and will be indicated by an updated date above.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Eligibility</h3>
              <p className="mt-2 text-sm text-slate-700">You must be able to form a binding contract in your jurisdiction. The Services are intended for personal use. Where applicable, you are responsible for compliance with local laws.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>License and Acceptable Use</h3>
              <p className="mt-2 text-sm text-slate-700">Subject to these Terms, Ulix grants you a limited, non‑exclusive, non‑transferable, revocable license to install and use our apps for personal, non‑commercial purposes. You agree not to: (a) reverse engineer, decompile, or attempt to derive source code except as permitted by law; (b) sell, sublicense, or otherwise commercialize the Services; (c) access the Services to build a competing product; (d) abuse, disrupt, or interfere with the Services or other users; or (e) use the Services for unlawful purposes.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Purchases and Refunds</h3>
              <p className="mt-2 text-sm text-slate-700">If you purchase an Ulix app through a platform (e.g., Google Play), the platform's terms govern billing, taxes, and refunds. Please refer to the store's policies for refund eligibility and timelines. If you have an issue, contact us at <a className="underline" href="mailto:support@ulix.app">support@ulix.app</a>.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>User Content</h3>
              <p className="mt-2 text-sm text-slate-700">Ulix does not host accounts for most apps and aims for local‑first processing. If you submit content to us (e.g., via support email), you retain ownership of your content. You grant Ulix a limited license to use that content solely to provide support and operate or improve the Services.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Intellectual Property</h3>
              <p className="mt-2 text-sm text-slate-700">All rights, title, and interest in and to the Services—including software, text, graphics, UI, and design—are owned by Ulix or its licensors and are protected by copyright, trademark, and other laws. "ULIX" and related logos are trademarks of Ulix LLC. Third‑party names and marks are the property of their respective owners. No rights are granted except as expressly set out in these Terms.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Feedback and Unsolicited Ideas</h3>
              <p className="mt-2 text-sm text-slate-700">Ulix does not accept or consider unsolicited ideas or proposals (including product ideas, features, or concepts). If you nevertheless send any, you agree that (i) they are non‑confidential and non‑proprietary; (ii) we have no obligation to review, keep, respond to, or compensate you for them; (iii) Ulix may already be developing, or may later develop, products or features that are similar or identical; and (iv) to the extent any rights apply, you grant Ulix a perpetual, irrevocable, worldwide, royalty‑free license to use, reproduce, modify, publish, and commercialize such feedback without attribution or compensation.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Privacy</h3>
              <p className="mt-2 text-sm text-slate-700">Your privacy matters. Our apps are designed to minimize data collection and favor on‑device processing. Please review our Privacy Policy for details on what we collect (if anything) and why.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Third‑Party Services and Links</h3>
              <p className="mt-2 text-sm text-slate-700">The Services may reference third‑party sites, stores, libraries, or services. Ulix is not responsible for third‑party content, policies, or practices. Your use of third‑party services is governed by their terms and policies.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Disclaimers</h3>
              <p className="mt-2 text-sm text-slate-700">TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT. Ulix does not warrant that the Services will be uninterrupted, secure, or error‑free.</p>
            </Card>

            <Card>
              <h3 className="font-semibold" style={{ color: THEME.primary }}>Limitation of Liability</h3>
              <p className="mt-2 text-sm text-slate-700">TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL ULIX, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING DAMAGES FOR LOSS OF REVENUE, PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES) ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF ULIX HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}

function About({ navigate }) {
  return (
    <main>
      <section className="py-14" style={{ background: THEME.bg }}>
        <Container>
          <h1 className="text-3xl font-semibold" style={{ color: THEME.primary }}>About Ulix</h1>
          <p className="mt-1 text-slate-600">Precision, privacy‑first tools for modern odysseys.</p>
        </Container>
      </section>
      <section className="py-10" style={{ background: THEME.bg }}>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold" style={{ color: THEME.primary }}>Our Mission</h2>
              <p className="mt-2 text-sm text-slate-700">We design tools that are fast, focused, and respectful of your privacy. From scanning bookshelves offline to tracking health without accounts, every Ulix product is built to be both powerful and private.</p>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold" style={{ color: THEME.primary }}>Our Values</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>Privacy‑first design</li>
                <li>Local‑first processing</li>
                <li>Elegant simplicity</li>
                <li>User autonomy</li>
              </ul>
            </Card>
          </div>
          <div className="mt-10">
            <Button onClick={() => navigate("apps")} variant="primary">Explore our apps</Button>
          </div>
        </Container>
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function Contact({ navigate }) {
  return (
    <main>
      <section className="py-14" style={{ background: THEME.bg }}>
        <Container>
          <h1 className="text-3xl font-semibold" style={{ color: THEME.primary }}>Contact & Support</h1>
          <p className="mt-1 text-slate-600">Get in touch with questions, feedback, or support requests.</p>
        </Container>
      </section>
      <section className="py-10" style={{ background: THEME.bg }}>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold" style={{ color: THEME.primary }}>Support</h2>
              <p className="mt-2 text-sm text-slate-700">For app support, bug reports, or feature requests, email us at:</p>
              <p className="mt-2">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 underline">
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold" style={{ color: THEME.primary }}>Newsletter</h2>
              <p className="mt-2 text-sm text-slate-700">Stay updated with new releases and product updates:</p>
              <div className="mt-3">
                <EmailSignup />
              </div>
            </Card>
          </div>
          <div className="mt-10">
            <Button onClick={() => navigate("home")} variant="secondary">Back to home</Button>
          </div>
        </Container>
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function SignupBand() {
  return (
    <section className="py-10" style={{ background: THEME.primary }}>
      <Container>
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold">Stay in the loop</h2>
          <p className="mt-2 text-white/80">Get notified about new apps and updates.</p>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-md">
              <EmailSignup compact />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="border-t py-8" style={{ background: THEME.bg, borderColor: "rgba(0,20,47,0.08)" }}>
      <Container>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Img src={ICONS.shipBadge} alt="Ulix mark" size={32} radius={8} />
            <span className="font-semibold" style={{ color: THEME.primary }}>ULIX</span>
          </div>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigate("about")} className="text-slate-600 hover:text-slate-900">About</button>
            <button onClick={() => navigate("contact")} className="text-slate-600 hover:text-slate-900">Contact</button>
            <button onClick={() => navigate("terms")} className="text-slate-600 hover:text-slate-900">Terms</button>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-500">
          © 2024 Ulix LLC. Privacy‑first tools for modern odysseys.
        </div>
      </Container>
    </footer>
  );
}

// ---- MAIN APP WITH ROUTING ----
function App() {
  const [route, setRoute] = useState("home");
  
  const navigate = (newRoute) => {
    setRoute(newRoute);
    window.scrollTo(0, 0);
  };

  // Router component based on current route
  const renderPage = () => {
    switch (route) {
      case "home": return <Home navigate={navigate} />;
      case "apps": return <AppsIndex navigate={navigate} />;
      case "blog": return <BlogIndex navigate={navigate} />;
      case "about": return <About navigate={navigate} />;
      case "contact": return <Contact navigate={navigate} />;
      case "terms": return <Terms navigate={navigate} />;
      case "product:shelf-scan": return <ShelfScanPage navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div style={{ background: THEME.bg, minHeight: "100vh" }}>
      <Nav route={route} navigate={navigate} />
      {renderPage()}
    </div>
  );
}

export default App;