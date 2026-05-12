import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Injects <link rel="preload" as="style"> before each CSS <link rel="stylesheet">
// so the browser discovers CSS from the HTML itself — breaking the HTML→JS→CSS
// 3-level critical chain down to a 2-level HTML→(JS + CSS in parallel) structure.
function cssPreloadPlugin() {
  return {
    name: 'vite-plugin-css-preload',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /(<link rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*\/?>)/g,
          '<link rel="preload" as="style" href="$2">$1'
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
