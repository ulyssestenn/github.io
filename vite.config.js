import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL('.', import.meta.url)), 'index.html'),
        gutenprivacy: resolve(fileURLToPath(new URL('.', import.meta.url)), 'gutenprivacy.html'),
        keepclipprivacypolicy: resolve(fileURLToPath(new URL('.', import.meta.url)), 'keepclipprivacypolicy.html'),
        shelfscanprivacy: resolve(fileURLToPath(new URL('.', import.meta.url)), 'shelfscanprivacy.html'),
        trackanalysisprivacy: resolve(fileURLToPath(new URL('.', import.meta.url)), 'trackanalysisprivacy.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  publicDir: 'public'
})
