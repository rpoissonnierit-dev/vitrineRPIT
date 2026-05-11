/**
 * ═══════════════════════════════════════════════════════════════
 *  RPIT — i18n system
 *  File: src/i18n/index.js
 * ═══════════════════════════════════════════════════════════════
 *
 *  HOW IT WORKS
 *  ────────────
 *  1. On first visit, the browser's preferred language is read
 *     (navigator.language). English → "en", everything else → "fr".
 *
 *  2. If the user manually switches language via the footer buttons,
 *     the choice is saved in localStorage ("rpit-lang") and survives
 *     page refreshes.
 *
 *  3. The active translation object is distributed to every component
 *     via React Context. Any component can call useLang() to get:
 *       - t   → the translation object  (t.nav.home, t.hero.headline…)
 *       - lang → the active language code ("fr" or "en")
 *       - setLang(code) → switch language
 *
 *  USAGE IN A COMPONENT
 *  ────────────────────
 *  import { useLang } from '../i18n';
 *
 *  function MyComponent() {
 *    const { t } = useLang();
 *    return <h1>{t.hero.firstName} {t.hero.lastName}</h1>;
 *  }
 * ═══════════════════════════════════════════════════════════════
 */

import { createContext, useContext, useState, useEffect } from 'react';
import fr from './fr.js';
import en from './en.js';

// All available translations — add a new file here to add a language
const TRANSLATIONS = { fr, en };

// Codes of supported languages
const SUPPORTED = ['fr', 'en'];

// Storage key used to remember the user's choice
const STORAGE_KEY = 'rpit-lang';

/**
 * Detect the language to use on first load.
 * Priority: saved preference > browser language > French (default).
 */
function detectLang() {
  // 1. Previously saved choice
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {
    // localStorage unavailable (private browsing on some browsers)
  }

  // 2. Browser / OS language preference
  const browser = (navigator.language || 'fr').split('-')[0].toLowerCase();
  if (browser === 'en') return 'en';

  // 3. Default → French (RPIT's home language)
  return 'fr';
}

// ── React context ──────────────────────────────────────────────────────────────
const LangContext = createContext({
  lang:    'fr',
  t:       fr,
  setLang: () => {},
});

/**
 * LangProvider
 * Wrap your app with this component to make useLang() available everywhere.
 *
 * <LangProvider>
 *   <App />
 * </LangProvider>
 */
export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = (code) => {
    if (!SUPPORTED.includes(code)) return;
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* ignore */ }
    setLangState(code);
  };

  // Keep the HTML lang attribute in sync (good for accessibility + SEO crawlers)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

/**
 * useLang()
 * Returns { lang, t, setLang } for the active language.
 */
export const useLang = () => useContext(LangContext);

// Also export the raw translation objects for non-component use (e.g. SEO scripts)
export { fr, en };
