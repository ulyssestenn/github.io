#!/usr/bin/env python3
import html, json, re
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / '_publish_batch'
M = json.loads((BATCH / 'manifest.json').read_text())
GUIDES = M['guides']; LASTMOD = M.get('lastmod', '2026-08-24')
APP = {
 'guten': ('Guten','/guten/','https://ulix.app/icons/guten.png','summary'),
 'shelf-scan': ('Shelf Scan','/shelfscan/','https://ulix.app/assets/shelfscan/shelfscansocialshare.jpg','summary_large_image'),
 'keep-clip': ('Keep Clip','/keepclip/','https://ulix.app/icons/keepclip.png','summary'),
 'track-analysis': ('Track Analysis','/trackanalysis/','https://ulix.app/icons/trackanalysis.png','summary'),
 'breaker-of-horses': ('Breaker of Horses','/breakerofhorses/','https://ulix.app/assets/breaker_of_horses/breaker_of_horses_share.jpg','summary_large_image'),
 'curious-air': ('Curious Air','/curiousair/','https://ulix.app/icons/curiousair.png','summary'),
}

def plain(s):
 s=re.sub(r'\[([^\]]+)\]\([^\)]+\)',r'\1',s); s=re.sub(r'[`*_>#]','',s); return re.sub(r'\s+',' ',s).strip()

def parse(text):
 lines=text.splitlines(); title=lines[0][2:].strip(); meta={}; i=1
 while i<len(lines):
  z=lines[i].strip()
  m=re.match(r'\*\*([^:]+):\*\*\s*(.*)',z)
  if m: meta[m.group(1).lower()]=m.group(2).strip(); i+=1; continue
  if not z and meta: i+=1; break
  i+=1
 body='\n'.join(lines[i:]).strip(); parts=re.split(r'\n## Product connection\s*\n',body,maxsplit=1)
 body=parts[0].strip(); product=parts[1].strip() if len(parts)>1 else ''
 deck=plain(re.split(r'\n\s*\n',body)[0]); return title,meta,body,product,deck

def page(g, source):
 title,meta,body,product,deck=parse(source); author=meta.get('author',g['author']); section=g['section']
 app_name,app_url,image,card=APP[g['app_slug']]; canonical=f"https://ulix.app/knowledge/{g['slug']}/"
 desc=deck if len(deck)<=158 else deck[:155].rsplit(' ',1)[0]+'...'
 body_html=markdown.markdown(body,extensions=['tables','sane_lists'])
 product=re.sub(rf'^\*\*{re.escape(app_name)}\.?\*\*\s*','',product,flags=re.I)
 card_html=markdown.markdown(product,extensions=['sane_lists'])
 related=''.join(f'<a href="../{html.escape(x["slug"])}/">{html.escape(x["title"])}</a>' for x in g.get('related',[]))
 rel=f'<aside class="related"><h2>Related</h2>{related}</aside>' if related else ''
 schema={'@context':'https://schema.org','@type':'Article','headline':title,'description':desc,'mainEntityOfPage':canonical,'articleSection':section,'author':{'@type':'Person','name':author},'about':{'@type':'SoftwareApplication','name':app_name,'operatingSystem':'Android','url':'https://ulix.app'+app_url},'publisher':{'@type':'Organization','name':'Ulix LLC','url':'https://ulix.app/'},'isPartOf':{'@type':'CollectionPage','name':'Ulix Knowledge','url':'https://ulix.app/knowledge/'}}
 return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{html.escape(title)} — Ulix Knowledge</title><meta name="description" content="{html.escape(desc,quote=True)}" /><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="{canonical}" /><meta name="theme-color" content="#0F0E0C" />
<meta property="og:type" content="article" /><meta property="og:site_name" content="Ulix" /><meta property="og:title" content="{html.escape(title,quote=True)}" /><meta property="og:description" content="{html.escape(desc,quote=True)}" /><meta property="og:url" content="{canonical}" /><meta property="og:image" content="{image}" /><meta property="article:section" content="{html.escape(section,quote=True)}" /><meta name="twitter:card" content="{card}" />
<link rel="icon" href="/icons/favicon.ico" sizes="any" /><link rel="stylesheet" href="../../assets/ulix.css" /><link rel="stylesheet" href="../../assets/home.css" /><link rel="stylesheet" href="../knowledge.css" /><link rel="preload" as="font" type="font/woff2" href="../../assets/fonts/geist-latin.woff2" crossorigin /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet" /><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script></head>
<body class="home-page knowledge-page"><a href="#main" class="skip-link">Skip to content</a><header class="site-header"><div class="container container--wide site-header__inner"><a href="../../index.html" class="site-brand"><img src="../../icons/favicon.png" alt="" class="site-brand__logo" width="64" height="64" /><span class="site-brand__name">ULIX</span></a><nav class="site-nav" aria-label="Primary"><a href="../../index.html" class="site-nav__link">Home</a><a href="../../apps.html" class="site-nav__link">Apps</a><a href="../../blog.html" class="site-nav__link">Blog</a><a href="../../about.html" class="site-nav__link">About</a><a href="../../contact.html" class="site-nav__link">Contact</a></nav><div class="site-header__actions"><a href="../" class="btn btn--primary btn--header">Knowledge →</a></div></div></header>
<main id="main"><div class="article-shell"><p class="article-breadcrumbs"><a href="../">Ulix Knowledge</a> / {html.escape(section)}</p><header class="article-header"><p class="article-header__meta">{html.escape(section)} · {html.escape(app_name)}</p><h1>{html.escape(title)}</h1><p class="article-deck">{html.escape(deck)}</p><p class="article-byline">{html.escape(author)}</p></header><article class="article-body">{body_html}<section class="product-note"><p class="product-note__label">The tool used in this workflow</p><h2>{html.escape(app_name)}</h2>{card_html}<p><a href="../..{app_url}">See {html.escape(app_name)}</a>.</p></section></article>{rel}</div></main>
<footer class="site-footer"><div class="container"><p class="footer-credo">Find the <b>book</b> <span class="sep">·</span> Save the <b>passage</b> <span class="sep">·</span> Read the <b>classic</b> <span class="sep">·</span> Keep the <b>record</b> <span class="sep">·</span> Own the <b>data</b></p><div class="site-footer__grid"><div class="site-footer__brand"><img src="../../icons/ulixwordmarkclear.png" alt="Ulix — Precision tools for modern odysseys" class="footer-wordmark" width="1754" height="717" /></div><div class="site-footer__links"><a href="../../apps.html">Apps</a><a href="../">Knowledge</a><a href="../../about.html">About</a><a href="../../privacy.html">Privacy</a></div><div><div class="site-footer__copyright">© 2026 Ulix LLC. All rights reserved.</div></div></div></div></footer><script src="../../assets/ulix.js" defer></script></body></html>'''

parsed=[]
for g in GUIDES:
 src=(BATCH/(g['slug']+'.md')).read_text(); title,meta,body,prod,deck=parse(src); author=meta.get('author',g['author']); parsed.append((g,title,author,deck,src))
 out=ROOT/'knowledge'/g['slug']/'index.html'; out.parent.mkdir(parents=True,exist_ok=True); out.write_text(page(g,src))
new=list(reversed(parsed))

idxp=ROOT/'knowledge/guides/index.html'; idx=idxp.read_text()
cards='\n'.join(f'<a class="guide-index-card" data-guide-card data-slug="{g["slug"]}" data-section="{html.escape(g["section"],quote=True)}" href="../{g["slug"]}/"><span>{html.escape(a)} · {html.escape(g["section"])}</span><h2>{html.escape(t)}</h2></a>' for g,t,a,d,s in new)+'\n'
idx=idx.replace('<div class="guide-index-grid">\n','<div class="guide-index-grid">\n'+cards,1)
for slug in dict.fromkeys(g['app_slug'] for g in GUIDES):
 if f'data-app-filter="{slug}"' not in idx:
  label=APP[slug][0]; marker='<button class="filter-chip" type="button" data-app-filter="track-analysis">Track Analysis</button>'
  idx=idx.replace(marker,marker+f'<button class="filter-chip" type="button" data-app-filter="{slug}">{label}</button>',1)
idxp.write_text(idx)

jsp=ROOT/'knowledge/guides/guides.js'; js=jsp.read_text(); by={}
for g in GUIDES: by.setdefault(g['app_slug'],[]).append(g['slug'])
for slug,slugs in by.items():
 pat=re.compile(rf"('{re.escape(slug)}': new Set\(\[\n\s*)(.*?)(\n\s*\]\),?)",re.S); m=pat.search(js)
 if m:
  cur=m.group(2).rstrip(); add=[s for s in slugs if f"'{s}'" not in cur]
  if add:
   cur=cur+(',' if cur and not cur.endswith(',') else '')+','.join(f"'{s}'" for s in add); js=js[:m.start(2)]+cur+js[m.end(2):]
 else:
  # Make the previous final property comma-safe, then append a new set.
  js=re.sub(r'(\n\s*\]\))(\n\s*};\n\n  const params)',r'\1,\2',js,count=1)
  block=f"    '{slug}': new Set([\n      "+','.join(f"'{s}'" for s in slugs)+"\n    ]),\n"
  js=js.replace('  };\n\n  const params',block+'  };\n\n  const params',1)
jsp.write_text(js)

hp=ROOT/'knowledge/index.html'; home=hp.read_text(); pat=re.compile(r'(<section class="knowledge-section" aria-labelledby="recent-guides-heading">.*?<div class="knowledge-grid">\n)(.*?)(\n</div></section>)',re.S); m=pat.search(home)
old=re.findall(r'<a class="knowledge-card".*?</a>',m.group(2),re.S)
newcards=[f'<a class="knowledge-card" href="./{g["slug"]}/"><div class="knowledge-card__meta"><span>{html.escape(a)}</span><span>{html.escape(g["section"])}</span></div><h3>{html.escape(t)}</h3><p>{html.escape(d)}</p></a>' for g,t,a,d,s in new]
seen=set(); allcards=[]
for c in newcards+old:
 k=re.search(r'href="([^"]+)"',c).group(1)
 if k not in seen: seen.add(k); allcards.append(c)
home=home[:m.start(2)]+'\n'.join(allcards[:20])+home[m.end(2):]
for slug in dict.fromkeys(g['app_slug'] for g in GUIDES):
 if f'./guides/?app={slug}' not in home:
  am=re.search(r'(<section class="knowledge-section" aria-labelledby="apps-heading">.*?<div class="app-links">)(.*?)(</div></section>)',home,re.S)
  if am: home=home[:am.end(2)]+f'<a class="app-link" href="./guides/?app={slug}">{APP[slug][0]}</a>'+home[am.end(2):]
hp.write_text(home)

lp=ROOT/'llms.txt'; ll=lp.read_text(); lm=re.search(r'(\[All Knowledge Guides\]\(https://ulix\.app/knowledge/guides/\).*?\n\n)',ll,re.S)
lines='\n'.join(f'- [{t}](https://ulix.app/knowledge/{g["slug"]}/)' for g,t,a,d,s in new)+'\n'; ll=ll[:lm.end()]+lines+ll[lm.end():]; lp.write_text(ll)
sp=ROOT/'sitemap.xml'; sm=sp.read_text()
for loc in ['https://ulix.app/knowledge/','https://ulix.app/knowledge/guides/']: sm=re.sub(rf'(<url><loc>{re.escape(loc)}</loc><lastmod>)[^<]+',rf'\g<1>{LASTMOD}',sm)
entries='\n'.join(f'  <url><loc>https://ulix.app/knowledge/{g["slug"]}/</loc><lastmod>{LASTMOD}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>' for g,t,a,d,s in new)+'\n'; mm=re.search(r'  <url><loc>https://ulix\.app/knowledge/guides/</loc>.*?</url>\n',sm); sm=sm[:mm.end()]+entries+sm[mm.end():]; sp.write_text(sm)
print('Rendered',len(GUIDES),'guides')
