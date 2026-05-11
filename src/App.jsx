/**
 * App.jsx — Shell component
 *
 * Responsibilities:
 *  • Provides the React error boundary so a crash in HomePage
 *    shows a friendly fallback instead of a blank screen.
 *  • Wraps everything in <HelmetProvider> if you later add react-helmet
 *    for per-page <head> management (the import is pre-wired as a comment).
 *  • Keeps App.jsx thin — all real routing goes here once you add pages.
 *
 * To add a second page later:
 *   1. npm install react-router-dom
 *   2. Wrap children in <BrowserRouter><Routes> etc.
 *   3. Keep HomePage.jsx as the "/" route.
 */

import { Component } from 'react';
import HomePage from './HomePage';

// ── Error boundary ────────────────────────────────────────────────────────────
// Catches render errors in the tree and shows a recovery UI instead of
// crashing the whole page. React class component (hooks can't do this yet).
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Wire this to Sentry / LogRocket in production:
    // Sentry.captureException(error, { contexts: { react: info } });
    console.error('[RPIT ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            background: '#000509',
            padding: '40px',
            fontFamily: 'Inter, sans-serif',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 64, lineHeight: 1 }}>⚡</div>

          <h1
            style={{
              fontFamily: 'Limelight, sans-serif',
              fontSize:   'clamp(28px, 5vw, 56px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Une erreur est survenue
          </h1>

          <p
            style={{
              fontSize:  'clamp(14px, 1.5vw, 20px)',
              color:     'rgba(255,255,255,0.6)',
              maxWidth:  540,
              lineHeight: 1.5,
              margin:    0,
            }}
          >
            {this.state.error.message || "Quelque chose s'est mal passé."}
          </p>

          <button
            onClick={this.handleReset}
            style={{
              marginTop:     8,
              padding:       '14px 36px',
              background:    '#ffe355',
              color:         '#162456',
              fontFamily:    'Limelight, sans-serif',
              fontSize:      18,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border:        'none',
              borderRadius:  29,
              cursor:        'pointer',
            }}
          >
            Réessayer
          </button>

          {import.meta.env.DEV && (
            <pre
              style={{
                marginTop:   16,
                padding:     '16px 20px',
                background:  'rgba(255,255,255,0.05)',
                borderRadius: 12,
                fontSize:    12,
                color:       '#ff8080',
                textAlign:   'left',
                maxWidth:    '90vw',
                overflow:    'auto',
                whiteSpace:  'pre-wrap',
              }}
            >
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      {/*
       * Future routing goes here, e.g.:
       *
       *   <BrowserRouter>
       *     <Routes>
       *       <Route path="/"          element={<HomePage />}    />
       *       <Route path="/solutions" element={<SolutionsPage />} />
       *       <Route path="*"          element={<NotFound />}    />
       *     </Routes>
       *   </BrowserRouter>
       *
       * For now the single-page site renders directly:
       */}
      <HomePage />
    </ErrorBoundary>
  );
}
