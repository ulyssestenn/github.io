# How to View the Site on the React Branch

This guide explains how to view and work with the React version of the Ulix website.

## Overview

The `react` branch contains a modern React application built with:
- **React 19.1.1** - Latest React version with modern features
- **Vite** - Fast build tool and development server
- **Modern JavaScript** - ES modules and modern syntax
- **Component-based architecture** - Modular, reusable components

## Quick Start

### 1. Switch to the React Branch

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/ulyssestenn/github.io.git
cd github.io

# Fetch and checkout the react branch
git fetch origin react:react
git checkout react
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required dependencies including React, Vite, and development tools.

### 3. Start the Development Server

```bash
npm run dev
```

The development server will start and you'll see output similar to:
```
  VITE v7.1.3  ready in 277 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. View the Site

Open your browser and navigate to **http://localhost:5173/**

The site will automatically reload when you make changes to the code.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on http://localhost:5173 |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Site header with navigation
│   ├── Hero.jsx        # Hero section with logo
│   ├── Apps.jsx        # Applications showcase
│   ├── Newsletter.jsx  # Newsletter signup
│   └── Footer.jsx      # Site footer
├── assets/             # Static assets
├── App.jsx             # Main App component
├── App.css             # App-specific styles
├── main.jsx            # React app entry point
├── index.css           # Global styles
└── styles.css          # Additional styles

public/                 # Public assets (images, icons, etc.)
dist/                   # Production build output (generated)
```

## Development Features

- **Hot Module Replacement (HMR)** - Instant updates without page refresh
- **Fast Development Server** - Vite provides lightning-fast startup and updates
- **Modern JavaScript** - ES6+ features and modules
- **Component Hot Reloading** - React components update instantly
- **Built-in Linting** - ESLint configured for React best practices

## Building for Production

To create a production build:

```bash
npm run build
```

This creates optimized files in the `dist/` directory:
- Minified and bundled JavaScript
- Optimized CSS
- Compressed assets
- Ready for deployment

To preview the production build locally:

```bash
npm run preview
```

## Differences from Main Branch

The React branch offers several advantages over the main branch:

### Modern Development Experience
- Component-based architecture for better code organization
- Hot module replacement for faster development
- Modern build tools (Vite) for optimal performance
- TypeScript support available

### Enhanced Performance
- Optimized bundling and code splitting
- Modern JavaScript features
- Efficient asset handling
- Production-ready builds

### Developer Tools
- React DevTools compatibility
- ESLint integration
- Modern debugging capabilities
- Better error handling

## Deployment Options

The built React app can be deployed to:

- **GitHub Pages** - Static hosting for the `dist/` folder
- **Netlify** - Drag and drop the `dist/` folder
- **Vercel** - Connect your repository for automatic deployments
- **Any static hosting** - Upload the contents of `dist/`

### GitHub Pages Deployment

To deploy to GitHub Pages:

1. Build the project: `npm run build`
2. The `dist/` folder contains all files needed for deployment
3. Push the built files to your GitHub Pages branch or repository

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically try the next available port.

### Missing Dependencies
If you see import errors, make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Check that all components are properly imported and there are no syntax errors:
```bash
npm run lint
```

## Contributing

When working on the React version:

1. Make sure the development server runs without errors
2. Test that the build process completes successfully
3. Run the linter to check code quality
4. Test the built version with `npm run preview`

## Need Help?

- Check the browser console for error messages
- Use React DevTools for component debugging
- Refer to the [Vite documentation](https://vitejs.dev/) for build tool questions
- Check [React documentation](https://react.dev/) for React-specific issues