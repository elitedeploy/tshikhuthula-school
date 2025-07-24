import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static configuration for GitHub Pages
export default defineConfig({
  site: 'https://servaas101.github.io', // Update this for your GitHub Pages deployment
  output: 'static',
  integrations: [sitemap()],
  vite: {
    define: {
      global: 'globalThis'
    },
    build: {
      assetsDir: 'assets',
      minify: true,
      sourcemap: false
    }
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  compressHTML: true
});