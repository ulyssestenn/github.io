#!/usr/bin/env python3
import html
import json
import re
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / "_publish_batch"
manifest = json.loads((BATCH / "manifest.json").read_text(encoding="utf-8"))
guides = manifest["guides"]
lastmod = manifest.get("lastmod", "2026-08-24")

APP_INFO = {
    "guten": {"name": "Guten", "url": "/guten/", "image": "https://ulix.app/icons/guten.png", "card": "summary"},
    "shelf-scan": {"name": "Shelf Scan", "url": "/shelfscan/", "image": "https://ulix.app/assets/shelfscan/shelfscansocialshare.jpg", "card": "summary_large_image"},
    "keep-clip": {"name": "Keep Clip", "url": "/keepclip/", "image": "https://ulix.app/icons/keepclip.png", "card": "summary"},
    "track-analysis": {"name": "Track Analysis", "url": "/trackanalysis/", "image": "https://ulix.app/icons/trackanalysis.png", "card": "summary"},
    "breaker-of-horses": {"name": "Breaker of Horses", "url": "/breakerofhorses/", "image": "https://ulix.app/assets/breaker_of_horses/breaker_of_horses_share.jpg", "card": "summary_large_image"},
    "curious-air": {"name": "Curious Air", "url": "/curiousair/", "image": "https://ulix.app/icons/curiousair.png", "card": "summary"},
}

APP_FILTER_LABELS = {k: v["name"] for k, v in APP_INFO.items()}


def strip_md(s: str) -> str:
    s = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", s)
    s = re.sub(r"[`*_>#]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def parse_source(text: str):
    lines = text.splitlines()
    title = lines[0].removeprefix("# ").strip()
    meta = {}
    i = 1
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith("**") and ":**" in line:
            m = re.match(r"\*\*([^:]+):\*\*\s*(.*)", line)
            if m:
                meta[m.group(1).strip().lower()] = m.group(2).strip()
            i += 1
            continue
        if not line:
            i += 1
            if meta:
                break
            continue
        i += 1
    body = "\n".join(lines[i:]).strip()
    product_part = ""
    parts = re.split(r"\n## Product connection\s*\n", body, maxsplit=1)
    if len(parts) == 2:
        body, product_part = parts[0].strip(), parts[1].strip()
    paragraphs = re.split(r"\n\s*\n", body)
    deck = strip_md(paragraphs[0]) if paragraphs else title
    return title, meta, body, product_part, deck


def product_card_text(product_md: str, product_name: str) -> str:
    cleaned = re.sub(rf"^\*\*{re.escape(product_name)}\.?\*\*\s*", "", product_md.strip(), flags=re.I)
    cleaned = re.sub(r"^\*\*[^*]+\*\*\s*", "", cleaned)
    return markdown.markdown(cleaned, extensions=["sane_lists"]) if cleaned else ""


def page_html(g, source):
    title, meta, body_md, product_md, deck = parse_source(source)
    author = meta.get("author", g["author"])
    section = g["section"]
    app = APP_INFO[g["app_slug"]]
    app_name = app["name"]
    canonical = f"https://ulix.app/knowledge/{g['slug']}/"
    desc = deck if len(deck) <= 158 else deck[:155].rsplit(" ", 1)[0] + "..."
    body_html = markdown.markdown(body_md, extensions=["tables", "sane_lists"])
    card_html = product_card_text(product_md, app_name)
    related = "".join(
        f'<a href="../{html.escape(r["slug"])}/">{html.escape(r["title"])}</a>' for r in g.get("related", [])
    )
    related_html = f'<aside class="related"><h2>Related</h2>{related}</aside>' if related else ""
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": desc,
        "mainEntityOfPage": canonical,
        "articleSection": section,
        "author": {"@type": "Person", "name": author},
        "about": {"@type": "SoftwareApplication", "name": app_name, "operatingSystem": "Android", "url": "https://ulix.app" + app["url"]},
        "publisher": {"@type": "Organization", "name": "Ulix LLC", "url": "https://ulix.app/"},
        "isPartOf": {"@type": "CollectionPage", "name": "Ulix Knowledge", "url": "https://ulix.app/knowledge/"},
    }
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{html.escape(title)} — Ulix Knowledge</title>
  <meta name="description" content="{html.escape(desc, quote=True)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="{canonical}" />
  <meta name="theme-color" content="#0F0E0C" />
  <meta property="og:type" content="article" /><meta property="og:site_name" content="Ulix" /><meta property="og:title" content="{html.escape(title, quote=True)}" /><meta property="og:description" content="{html.escape(desc, quote=True)}" /><meta property="og:url" content="{canonical}" /><meta property="og:image" content="{app['image']}" /><meta property="article:section" content="{html.escape(section, quote=True)}" /><meta name="twitter:card" content="{app['card']}" />
  <link rel="icon" href="/icons/favicon.ico" sizes="any" /><link rel="stylesheet" href="../../assets/ulix.css" /><link rel="stylesheet" href="../../assets/home.css" /><link rel="stylesheet" href="../knowledge.css" /><link rel="preload" as="font" type="font/woff2" href="../../assets/fonts/geist-latin.woff2" crossorigin /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet" />
  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>
</head>
<body class="home-page knowledge-page"><a href="#main" class="skip-link">Skip to content</a>
<header class="site-header"><div class="container container--wide site-header__inner"><a href="../../index.html" class="site-brand"><img src="../../icons/favicon.png" alt="" class="site-brand__logo" width="64" height="64" /><span class="site-brand__name">ULIX</span></a><nav class="site-nav" aria-label="Primary"><a href="../../index.html" class="site-nav__link">Home</a><a href="../../apps.html" class="site-nav__link">Apps</a><a href="../../blog.html" class="site-nav__link">Blog</a><a href="../../about.html" class="site-nav__link">About</a><a href="../../contact.html" class="site-nav__link">Contact</a></nav><div class="site-header__actions"><a href="../" class="btn btn--primary btn--header">Knowledge →</a></div></div></header>
<main id="main"><div class="article-shell"><p class="article-breadcrumbs"><a href="../">Ulix Knowledge</a> / {html.escape(section)}</p>
<header class="article-header"><p class="article-header__meta">{html.escape(section)} · {html.escape(app_name)}</p><h1>{html.escape(title)}</h1><p class="article-deck">{html.escape(deck)}</p><p class="article-byline">{html.escape(author)}</p></header>
<article class="article-body">
{body_html}
<section class="product-note"><p class="product-note__label">The tool used in this workflow</p><h2>{html.escape(app_name)}</h2>{card_html}<p><a href="../..{app['url']}">See {html.escape(app_name)}</a>.</p></section>
</article>
{related_html}
</div></main>
<footer class="site-footer"><div class="container"><p class="footer-credo">Find the <b>book</b> <span class="sep">·</span> Save the <b>passage</b> <span class="sep">·</span> Read the <b>classic</b> <span class="sep">·</span> Keep the <b>record</b> <span class="sep">·</span> Own the <b>data</b></p><div class="site-footer__grid"><div class="site-footer__brand"><img src="../../icons/ulixwordmarkclear.png" alt="Ulix — Precision tools for modern odysseys" class="footer-wordmark" width="1754" height="717" /></div><div class="site-footer__links"><a href="../../apps.html">Apps</a><a href="../">Knowledge</a><a href="../../about.html">About</a><a href="../../privacy.html">Privacy</a></div><div><div class="site-footer__copyright">© 2026 Ulix LLC. All rights reserved.</div></div></div></div></footer><script src="../../assets/ulix.js" defer></script></body></html>
'''


def guide_index_card(g, title, author):
    return f'<a class="guide-index-card" data-guide-card data-slug="{g["slug"]}" data-section="{html.escape(g["section"], quote=True)}" href="../{g["slug"]}/"><span>{html.escape(author)} · {html.escape(g["section"])}</span><h2>{html.escape(title)}</h2></a>'


def home_card(g, title, author, deck):
    return f'<a class="knowledge-card" href="./{g["slug"]}/"><div class="knowledge-card__meta"><span>{html.escape(author)}</span><span>{html.escape(g["section"])}</span></div><h3>{html.escape(title)}</h3><p>{html.escape(deck)}</p></a>'

parsed = []
for g in guides:
    source_path = BATCH / (g["slug"] + ".md")
    source = source_path.read_text(encoding="utf-8")
    title, meta, body_md, product_md, deck = parse_source(source)
    author = meta.get("author", g["author"])
    parsed.append((g, title, author, deck, source))
    out = ROOT / "knowledge" / g["slug"] / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page_html(g, source), encoding="utf-8")

# Newest first on public listing surfaces.
newest = list(reversed(parsed))

# All Guides index.
idx_path = ROOT / "knowledge" / "guides" / "index.html"
idx = idx_path.read_text(encoding="utf-8")
insert = "\n".join(guide_index_card(g, title, author) for g, title, author, deck, source in newest) + "\n"
idx = idx.replace('<div class="guide-index-grid">\n', '<div class="guide-index-grid">\n' + insert, 1)
for app_slug in dict.fromkeys(g["app_slug"] for g in guides):
    if f'data-app-filter="{app_slug}"' not in idx:
        label = APP_FILTER_LABELS[app_slug]
        marker = '<button class="filter-chip" type="button" data-app-filter="track-analysis">Track Analysis</button>'
        idx = idx.replace(marker, marker + f'<button class="filter-chip" type="button" data-app-filter="{app_slug}">{html.escape(label)}</button>', 1)
idx_path.write_text(idx, encoding="utf-8")

# Guide filter app mappings.
js_path = ROOT / "knowledge" / "guides" / "guides.js"
js = js_path.read_text(encoding="utf-8")
by_app = {}
for g in guides:
    by_app.setdefault(g["app_slug"], []).append(g["slug"])
for app_slug, slugs in by_app.items():
    pat = re.compile(rf"('{re.escape(app_slug)}': new Set\(\[\n\s*)(.*?)(\n\s*\]\),)", re.S)
    m = pat.search(js)
    if m:
        existing = m.group(2).rstrip()
        additions = [s for s in slugs if f"'{s}'" not in existing]
        if additions:
            sep = "," if existing and not existing.rstrip().endswith(",") else ""
            updated = existing + sep + ",".join(f"'{s}'" for s in additions)
            js = js[:m.start(2)] + updated + js[m.end(2):]
    else:
        block = f"    '{app_slug}': new Set([\n      " + ",".join(f"'{s}'" for s in slugs) + "\n    ]),\n"
        js = js.replace("  };\n\n  const params", block + "  };\n\n  const params", 1)
js_path.write_text(js, encoding="utf-8")

# Homepage Recently Added Guides, capped at 20 cards.
home_path = ROOT / "knowledge" / "index.html"
home = home_path.read_text(encoding="utf-8")
sec_pat = re.compile(r'(<section class="knowledge-section" aria-labelledby="recent-guides-heading">.*?<div class="knowledge-grid">\n)(.*?)(\n</div></section>)', re.S)
m = sec_pat.search(home)
if not m:
    raise SystemExit("Recently Added Guides section not found")
old_cards = re.findall(r'<a class="knowledge-card".*?</a>', m.group(2), flags=re.S)
new_cards = [home_card(g, title, author, deck) for g, title, author, deck, source in newest]
seen = set()
combined = []
for card in new_cards + old_cards:
    href_m = re.search(r'href="([^"]+)"', card)
    key = href_m.group(1) if href_m else card
    if key not in seen:
        seen.add(key)
        combined.append(card)
combined = combined[:20]
home = home[:m.start(2)] + "\n".join(combined) + home[m.end(2):]
# Add app links for newly represented apps.
for app_slug in dict.fromkeys(g["app_slug"] for g in guides):
    if f'./guides/?app={app_slug}' not in home:
        label = APP_FILTER_LABELS[app_slug]
        app_sec = re.compile(r'(<section class="knowledge-section" aria-labelledby="apps-heading">.*?<div class="app-links">)(.*?)(</div></section>)', re.S)
        am = app_sec.search(home)
        if am:
            addition = f'<a class="app-link" href="./guides/?app={app_slug}">{html.escape(label)}</a>'
            home = home[:am.end(2)] + addition + home[am.end(2):]
home_path.write_text(home, encoding="utf-8")

# llms.txt: newest guides first.
llms_path = ROOT / "llms.txt"
llms = llms_path.read_text(encoding="utf-8")
lines = "\n".join(f'- [{title}](https://ulix.app/knowledge/{g["slug"]}/)' for g, title, author, deck, source in newest) + "\n"
marker_pat = re.compile(r'(\[All Knowledge Guides\]\(https://ulix\.app/knowledge/guides/\).*?\n\n)', re.S)
lm = marker_pat.search(llms)
if not lm:
    raise SystemExit("llms Guides marker not found")
llms = llms[:lm.end()] + lines + llms[lm.end():]
llms_path.write_text(llms, encoding="utf-8")

# Sitemap: add guide URLs and refresh Knowledge index lastmod.
smap_path = ROOT / "sitemap.xml"
smap = smap_path.read_text(encoding="utf-8")
for loc in ["https://ulix.app/knowledge/", "https://ulix.app/knowledge/guides/"]:
    smap = re.sub(rf'(<url><loc>{re.escape(loc)}</loc><lastmod>)[^<]+', rf'\g<1>{lastmod}', smap)
entries = "\n".join(f'  <url><loc>https://ulix.app/knowledge/{g["slug"]}/</loc><lastmod>{lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>' for g, title, author, deck, source in newest) + "\n"
needle = re.search(r'  <url><loc>https://ulix\.app/knowledge/guides/</loc>.*?</url>\n', smap)
if not needle:
    raise SystemExit("sitemap guides entry not found")
smap = smap[:needle.end()] + entries + smap[needle.end():]
smap_path.write_text(smap, encoding="utf-8")

print(f"Rendered and indexed {len(guides)} Knowledge guides")
