/**
 * main.jsx — Vite entry point
 *
 * Mount order:
 *  1. Import global CSS  → Tailwind base + RPIT custom properties
 *  2. Import React / DOM
 *  3. Import App shell   → ErrorBoundary → HomePage
 *  4. createRoot().render() with React 18 concurrent features enabled
 *
 * StrictMode is intentionally kept ON in development:
 *  • Double-invokes effects to surface side-effect bugs early
 *  • Warns about deprecated lifecycle APIs
 *  • Has zero impact on the production build
 */

import './index.css';

// Font Awesome — import CSS once here so Vite bundles it.
// config.autoAddCss = false prevents the library from injecting a <style> tag
// at runtime (which causes a flash of unstyled icons on first paint).
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';
import App             from './App';

// ── Grab mount node ───────────────────────────────────────────────────────────
const rootEl = document.getElementById('root');

if (!rootEl) {
  // Should never happen with our index.html, but guard anyway
  throw new Error(
    '[RPIT] Could not find #root element. ' +
    'Make sure index.html contains <div id="root"></div>.'
  );
}

// ── React 18 concurrent root ──────────────────────────────────────────────────
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Dismiss the pre-React loading shell once React starts rendering.
// Moved here (instead of an inline <script> in index.html) so the shell stays
// visible from HTML-parse time (~10ms FCP) all the way until React mounts,
// eliminating the 244ms blank-page gap that occurred when the inline script
// ran at parse time before the JS module had executed.
const shell = document.getElementById('loading-shell');
if (shell) {
  shell.classList.add('fade-out');
  setTimeout(() => shell.remove(), 450);
}
document.body.classList.remove('is-loading');

// ── Development helpers ────────────────────────────────────────────────────────
if (import.meta.env.DEV) {
  // Log the Vite mode so you always know which env is active
  console.info(
    `%c RPIT %c ${import.meta.env.MODE.toUpperCase()} `,
    'background:#162456;color:#ffe355;font-family:monospace;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px',
    'background:#ffe355;color:#162456;font-family:monospace;font-weight:bold;padding:2px 6px;border-radius:0 3px 3px 0'
  );
}
