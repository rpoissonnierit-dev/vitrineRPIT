import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Makes every Vite-injected CSS <link rel="stylesheet"> non-render-blocking.
// Pattern mirrors the loadCSS technique used for Google Fonts:
//   1. <link rel="preload" as="style">  → download CSS at high priority, no render-block
//   2. media="print" + onload           → swap to media="all" once loaded (no FOUC because
//                                         CSS finishes ~537ms, React renders ~694ms)
//   3. <noscript> fallback              → blocking stylesheet for JS-disabled browsers
// Net result: FCP from the pre-React shell fires at HTML-parse time (~10ms) instead of
// waiting for CSS (~537ms), cutting the critical-chain depth from 3 to 2 levels.
function cssPreloadPlugin() {
  return {
    name: 'vite-plugin-css-preload',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"([^>]*href="([^"]+\.css)"[^>]*)>/g,
          (_, attrs, url) =>
            `<link rel="preload" as="style" href="${url}">` +
            `<link rel="stylesheet"${attrs} media="print" onload="this.onload=null;this.media='all'">` +
            `<noscript><link rel="stylesheet" href="${url}"></noscript>`
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), cssPreloadPlugin()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir:  'dist',

    // No source maps in production — smaller bundles and no code exposure
    sourcemap: false,

    // Inline assets < 4 KB as base64 (fewer HTTP round-trips for tiny SVGs/icons)
    assetsInlineLimit: 4096,

    // Raise the warning threshold — framer-motion is intentionally large
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Split vendors so browsers can cache them separately from app code
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          // All four FA packages in one chunk — they must be co-located
          'fa-vendor': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/react-fontawesome',
          ],
        },
      },
    },
  },
});
