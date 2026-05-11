/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────────────────────
      // Loaded via Google Fonts in index.html
      fontFamily: {
        limelight: ['Limelight', 'sans-serif'],
        plaster:   ['Plaster',   'sans-serif'],
        inter:     ['Inter',     'sans-serif'],
      },

      // ── RPIT design tokens ─────────────────────────────────────────────
      colors: {
        rpit: {
          dark:   '#000509',   // page bg top
          navy:   '#162456',   // deep blue (footer text, active nav pill)
          blue:   '#193cb8',   // primary blue
          mid:    '#1c398e',   // CTA button bg (Variant2)
          yellow: '#ffe355',   // --secondary accent
          gold:   '#f8cf00',   // nav active bar bg
          cream:  '#fefce8',   // yellow/50, CTA text
          cream2: '#fef9c2',   // yellow/100
        },
      },

      // ── Background gradients ───────────────────────────────────────────
      backgroundImage: {
        'rpit-page':
          'linear-gradient(179.83deg, #000509 1.3%, #01468b 99.96%)',
        'rpit-radial':
          'radial-gradient(ellipse at 49.8% 50.6%, #01468b 0%, #01366a 25%, #00254a 50%, #00152a 75%, #000d19 87.5%, #000509 100%)',
        'rpit-cta':
          'linear-gradient(95.97deg, rgb(25,60,184) 31.57%, rgb(22,36,86) 154.52%)',
      },

      // ── Border radius ──────────────────────────────────────────────────
      borderRadius: {
        'pill':  '29px',
        'photo': '107px',
        'card':  '32px',
      },

      // ── Box shadows ────────────────────────────────────────────────────
      boxShadow: {
        'rpit':  '13px 4px 4px 0px rgba(0,0,0,0.25)',
        'nav':   '0px 4px 2px rgba(0,0,0,0.25)',
      },

      // ── Text shadows (requires @tailwindcss/typography plugin or custom) ──
      // Used inline via style props in components

      // ── Keyframes for pure-CSS fallback animations ─────────────────────
      keyframes: {
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.55))' },
          '50%':      { filter: 'drop-shadow(0 0 34px rgba(100,160,255,0.95))' },
        },
      },
      animation: {
        'marquee':   'marquee 20s linear infinite',
        'float':     'float 3.2s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        'glow':      'glow-pulse 2.2s ease-in-out infinite',
      },

      // ── Spacing extras ─────────────────────────────────────────────────
      spacing: {
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '152': '38rem',
        '244': '61rem',
      },

      // ── Screen breakpoints ─────────────────────────────────────────────
      screens: {
        'xs':  '390px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },

      // ── z-index scale ──────────────────────────────────────────────────
      zIndex: {
        '60':  '60',
        '70':  '70',
        '100': '100',
      },
    },
  },
  plugins: [],
};
