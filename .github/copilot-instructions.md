# Ulix Website (ulix.app)

Ulix is a static website built with Eleventy (11ty) that showcases privacy-first mobile applications. The site uses Nunjucks templating, custom CSS, and is hosted on GitHub Pages with a custom domain.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- Bootstrap, build, and run the repository:
  - `npm install` -- installs Eleventy and dependencies. Takes ~10 seconds.
  - `npm run build` -- builds the static site using Eleventy. Takes ~0.5 seconds. Very fast build.
- Run the development server:
  - `npx @11ty/eleventy --serve` -- starts development server on http://localhost:8080 with live reload
  - `npx @11ty/eleventy --serve --port=8081` -- to use a different port if needed
- Clean rebuild:
  - `rm -rf _site && npm run build` -- removes generated files and rebuilds from scratch

## Validation

- Always manually test the website after making changes by visiting http://localhost:8080
- ALWAYS verify navigation works correctly between pages:
  - Test Home -> Apps -> About -> Contact navigation flow
  - Click the "Explore Our Apps" button to verify smooth scrolling to apps section
  - Verify all external links to Google Play Store work (they open in new tabs)
- Verify the website loads correctly with a static server: `cd _site && python3 -m http.server 8081`
- No automated testing framework exists - manual validation is the primary testing method
- No linting tools are configured - rely on browser developer tools for debugging

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository root structure
```
.eleventy.js          -- Eleventy configuration
package.json          -- Node.js dependencies (only @11ty/eleventy)
src/                  -- Nunjucks template source files
  ├── _includes/      -- Template partials (base.njk, header.njk, footer.njk)
  ├── index.njk       -- Homepage template
  ├── about.njk       -- About page template
  ├── contact.njk     -- Contact page template
  └── *privacy.njk    -- Privacy policy templates
assets/               -- CSS and static assets
  └── styles.css      -- Main stylesheet
shelfscan/            -- Static HTML pages for Shelf Scan app (not templated)
_site/                -- Generated output (git-ignored)
*.png, *.mp4, *.gif   -- Static media files copied to output
CNAME                 -- GitHub Pages custom domain (ulix.app)
```

### Build output structure
```
_site/
├── index.html        -- Generated from src/index.njk
├── about.html        -- Generated from src/about.njk
├── contact.html      -- Generated from src/contact.njk
├── assets/           -- Copied from assets/
└── *.png, *.mp4      -- Copied static media files
```

### Key development commands and their timing
- `npm install` -- ~10 seconds, installs @11ty/eleventy@2.0.1
- `npm run build` -- ~0.5 seconds, very fast Eleventy build
- Development server startup -- ~2 seconds to start serving on port 8080
- Live reload time -- instant when files change

### Package.json scripts
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "eleventy"
  }
}
```

### Eleventy configuration (.eleventy.js)
```javascript
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({"*.png": "."});
  eleventyConfig.addPassthroughCopy({"*.mp4": "."});
  eleventyConfig.addPassthroughCopy({"*.gif": "."});
  return {
    dir: {
      input: "src",
      includes: "_includes", 
      output: "_site"
    }
  };
};
```

## Project Details

### Technology Stack
- **Static Site Generator**: Eleventy (11ty) v2.0.1
- **Templating**: Nunjucks (.njk files)
- **Styling**: Custom CSS (no preprocessor)
- **Node.js**: v20.19.4+ required
- **Hosting**: GitHub Pages with custom domain (ulix.app)

### Site Structure
- **Homepage**: Showcases 8 mobile apps with status badges (Live, In Development, In Closed Testing)
- **About Page**: Company mission and values, uses Tailwind CSS via CDN
- **Contact Page**: Contact information and social media links
- **Privacy Pages**: Individual privacy policies for each app
- **Shelf Scan Section**: Standalone HTML pages for the Shelf Scan app product

### Content Management
- **App Cards**: Defined in src/index.njk with status badges and descriptions
- **Navigation**: Consistent header/footer across all pages via _includes/
- **Social Links**: Twitter, Facebook, Instagram links in footer
- **Newsletter**: Embedded Buttondown newsletter signup form

### File Organization
- **Templates**: All .njk files in src/ directory use base.njk layout
- **Includes**: Header, footer, and base layout templates in src/_includes/
- **Static Assets**: Images, videos, and CSS in root and assets/ directories
- **App-Specific**: shelfscan/ directory contains standalone product pages

### Deployment
- **Domain**: ulix.app (configured via CNAME file)
- **Method**: GitHub Pages automatic deployment from main branch
- **Build**: Static files committed to repository (both source and generated)
- **CDN**: GitHub Pages CDN handles global distribution

### Common Modifications
- **Adding new apps**: Edit src/index.njk app cards section
- **Updating styles**: Modify assets/styles.css
- **Navigation changes**: Update src/_includes/header.njk
- **Footer updates**: Modify src/_includes/footer.njk
- **New pages**: Create new .njk file in src/ extending base.njk

Always rebuild with `npm run build` after template changes and test with the development server before committing changes.