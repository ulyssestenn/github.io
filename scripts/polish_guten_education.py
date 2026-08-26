from pathlib import Path
import re

page = Path('guten/education/index.html')
text = page.read_text()

old_title = '<title>Guten for Education | Free Classic Books & Study Tools for Students</title>\n  <meta name="description" content="Guten helps students discover, download, read offline, highlight, annotate, and study thousands of public-domain books from Project Gutenberg on Android. Core reading and study tools are free." />'
new_title = '<title>Guten for Education | Free Classic Books for Students</title>\n  <meta name="description" content="Guten gives students free Android access to Project Gutenberg books with offline reading, highlights, notes, search, bookmarks, reading goals, and more." />\n  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />'
if old_title not in text:
    raise RuntimeError('Title/description target not found')
text = text.replace(old_title, new_title, 1)

text = text.replace('  <meta property="og:site_name" content="Ulix" />', '  <meta property="og:site_name" content="Ulix" />\n  <meta property="og:locale" content="en_US" />', 1)
text = text.replace('  <meta property="og:image" content="https://ulix.app/assets/guten/gutenshare.jpg" />', '  <meta property="og:image" content="https://ulix.app/assets/guten/gutenshare.jpg" />\n  <meta property="og:image:alt" content="Guten, an Android reader for Project Gutenberg books" />', 1)
text = text.replace('  <meta name="twitter:image" content="https://ulix.app/assets/guten/gutenshare.jpg" />', '  <meta name="twitter:image" content="https://ulix.app/assets/guten/gutenshare.jpg" />\n  <meta name="twitter:image:alt" content="Guten, an Android reader for Project Gutenberg books" />', 1)

jsonld = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://ulix.app/guten/education/#webpage",
        "url": "https://ulix.app/guten/education/",
        "name": "Guten for Education | Free Classic Books for Students",
        "description": "Guten gives students free Android access to Project Gutenberg books with offline reading, highlights, notes, search, bookmarks, reading goals, and more.",
        "inLanguage": "en",
        "dateModified": "2026-08-26",
        "isPartOf": {"@type": "WebSite", "@id": "https://ulix.app/#website", "name": "Ulix", "url": "https://ulix.app/"},
        "about": {"@id": "https://ulix.app/guten/#software"},
        "audience": [
          {"@type": "EducationalAudience", "educationalRole": "student"},
          {"@type": "EducationalAudience", "educationalRole": "teacher"}
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://ulix.app/guten/#software",
        "name": "Guten",
        "url": "https://ulix.app/guten/",
        "downloadUrl": "https://play.google.com/store/apps/details?id=com.bhunt.guten",
        "operatingSystem": "Android",
        "applicationCategory": "BookApplication",
        "isAccessibleForFree": true,
        "description": "An Android reader for Project Gutenberg books with free offline reading, bookmarks, highlights, notes, in-book search, reading goals, backup and Basic Share Studio.",
        "featureList": [
          "Browse and download Project Gutenberg books",
          "Offline reading",
          "Bookmarks, highlights and notes",
          "Per-book annotation review and search",
          "Search within books and definition lookup",
          "Customizable typography and reader themes",
          "Reading goals, streaks and statistics",
          "Backup and restore",
          "Basic Share Studio quote cards"
        ],
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Core reading and study features are free. Optional Premium is a one-time in-app purchase for additional tools."},
        "publisher": {"@type": "Organization", "name": "Ulix LLC", "url": "https://ulix.app/"}
      },
      {
        "@type": "FAQPage",
        "@id": "https://ulix.app/guten/education/#faq",
        "mainEntity": [
          {"@type": "Question", "name": "Is Guten free?", "acceptedAnswer": {"@type": "Answer", "text": "Core reading and study features are free. Students can browse, download, read, bookmark, highlight, take notes, search, set reading goals, use Basic Share Studio, back up their data, and read offline without buying Premium."}},
          {"@type": "Question", "name": "Can students highlight and take notes for free?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Highlighting and note-taking are free, as is reviewing notes and highlights within an individual book. Premium adds the cross-library Notes Manager and dedicated annotation-export formats."}},
          {"@type": "Question", "name": "Do students need an account?", "acceptedAnswer": {"@type": "Answer", "text": "No account is required to use Guten. Downloading the app through Google Play uses the student's normal Google Play environment."}},
          {"@type": "Question", "name": "Does Guten contain advertising?", "acceptedAnswer": {"@type": "Answer", "text": "No. Guten has no advertising network and does not use reading behavior for advertising or behavioral marketing."}},
          {"@type": "Question", "name": "Does Guten work offline?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. After a book has been downloaded, it can be read without a continuous internet connection."}},
          {"@type": "Question", "name": "Does a school need a license or institutional account?", "acceptedAnswer": {"@type": "Answer", "text": "No. A school, library, university, ministry, or literacy program can simply recommend Guten's Google Play listing to students. There is no institutional setup required for the free reading experience."}}
        ]
      }
    ]
  }
  </script>'''
text, count = re.subn(r'  <script type="application/ld\+json">.*?  </script>', jsonld, text, count=1, flags=re.DOTALL)
if count != 1:
    raise RuntimeError(f'Expected one JSON-LD block; found {count}')

old_css = '.checks{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 16px}.checks li{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.4}'
new_css = '.checks{columns:3;column-gap:28px}.checks li{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.4;break-inside:avoid;margin-bottom:10px}'
if old_css not in text:
    raise RuntimeError('Desktop checks CSS target not found')
text = text.replace(old_css, new_css, 1)
text = text.replace('.checks{grid-template-columns:repeat(2,1fr)}', '.checks{columns:2}', 1)
text = text.replace('.checks{grid-template-columns:1fr}', '.checks{columns:1}', 1)
page.write_text(text)

llms = Path('llms.txt')
llms_text = llms.read_text()
old_guten = '- [Guten](https://ulix.app/guten/): Android ereader for 70,000+ public-domain classics from Project Gutenberg. Read offline, highlight, annotate, and export notes. Free.'
new_guten = '- [Guten](https://ulix.app/guten/): Android ereader for Project Gutenberg books. Browse, download, read offline, bookmark, highlight, annotate, search, set reading goals, and back up reading data for free. Optional one-time Premium adds Read Aloud, the cross-library Notes Manager, dedicated annotation export, Collections, Pomodoro, and advanced Share Studio.\n  - [Guten for Education](https://ulix.app/guten/education/): Institutional overview for schools, libraries, universities, ministries, and literacy programs. Explains the free student feature set, offline use, no-account/no-advertising model, privacy, and the optional Premium boundary.'
if old_guten not in llms_text:
    raise RuntimeError('llms.txt Guten line not found')
llms.write_text(llms_text.replace(old_guten, new_guten, 1))

sitemap = Path('sitemap.xml')
sm = sitemap.read_text()
marker = '  <url><loc>https://ulix.app/guten/</loc><lastmod>2026-06-12</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>'
education = '  <url><loc>https://ulix.app/guten/education/</loc><lastmod>2026-08-26</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>'
if education not in sm:
    if marker not in sm:
        raise RuntimeError('Guten sitemap marker not found')
    sitemap.write_text(sm.replace(marker, marker + '\n' + education, 1))
