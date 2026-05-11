/*
 * ════════════════════════════════════════════════════════════════════
 * RPIT — HomePage.jsx   (Vite + React + Tailwind CSS + Framer Motion)
 * Figma source: node 622:336
 * ════════════════════════════════════════════════════════════════════
 *
 * ┌── TAILWIND CONFIG ──────────────────────────────────────────────┐
 * │  Extend tailwind.config.js with:                                │
 * │                                                                 │
 * │  theme: { extend: {                                             │
 * │    fontFamily: {                                                │
 * │      limelight: ['Limelight', 'sans-serif'],                   │
 * │      plaster:   ['Plaster',   'sans-serif'],                   │
 * │      inter:     ['Inter',     'sans-serif'],                   │
 * │    },                                                           │
 * │    colors: { rpit: {                                            │
 * │      navy:   '#162456',  blue:  '#193cb8',                     │
 * │      yellow: '#ffe355',  gold:  '#f8cf00',                     │
 * │      cream:  '#fefce8',  dark:  '#000509',                     │
 * │    }},                                                          │
 * │  }}                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌── GOOGLE FONTS (add to index.html <head>) ──────────────────────┐
 * │  <link rel="preconnect" href="https://fonts.googleapis.com">    │
 * │  <link rel="preconnect" href="https://fonts.gstatic.com"        │
 * │        crossorigin>                                             │
 * │  <link href="https://fonts.googleapis.com/css2?family=          │
 * │    Limelight&family=Plaster&family=Inter:wght@400;500;600       │
 * │    &display=swap" rel="stylesheet">                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌── ASSET IMPORT GUIDE ───────────────────────────────────────────┐
 * │  Download Figma assets → place in /src/assets/, then replace    │
 * │  IMG_* constants at the top with Vite imports, e.g.:            │
 * │                                                                 │
 * │  File                    Constant      Figma asset UUID         │
 * │  ─────────────────────── ──────────── ─────────────────────     │
 * │  /public/mainwhalewhite.svg → IMG_LOGO   ✓ in place            │
 * │  /public/moi.png            → IMG_PHOTO  ✓ in place            │
 * │  /public/RGlogo.png         → IMG_RENAULT ✓ in place           │
 * │  /public/DanserLogo.png     → IMG_DANSER  ✓ in place           │
 * │  /public/CiteliveLogo.png   → IMG_CITELIV ✓ in place           │
 * │  Hanshak → replaced by faHandshake (FA solid icon) ✓            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌── INSTALL ───────────────────────────────────────────────────────┐
 * │  npm install framer-motion                                       │
 * │              @fortawesome/react-fontawesome                      │
 * │              @fortawesome/fontawesome-svg-core                   │
 * │              @fortawesome/free-solid-svg-icons                   │
 * │              @fortawesome/free-brands-svg-icons                  │
 * └─────────────────────────────────────────────────────────────────┘
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faChevronDown,
  faEye, faGear, faEnvelope, faUsers, faArrowRight,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook, faInstagram, faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

// ── Local assets (public/ folder — no expiry) ─────────────────────────────────
const IMG_UNION   = '/mainwhalewhite.svg';   // loading overlay — same mark as logo
const IMG_LOGO    = '/mainwhalewhite.svg';
const IMG_PHOTO   = '/moi.png';
const IMG_RENAULT = '/RGlogo.png';
const IMG_DANSER  = '/DanserLogo.png';
const IMG_CITELIV = '/CiteliveLogo.png';
// IMG_HANSHAK removed — replaced with faHandshake icon below

// ── Design tokens ─────────────────────────────────────────────────────────────
// Fast-out / near-zero-tail ease — RPIT signature feel
const E_EXPO   = [0.22, 1, 0.36, 1];
// Physical spring overshoot ease
const E_SPRING = [0.34, 1.56, 0.64, 1];

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'hero',        label: 'Accueil'   },
  { id: 'stats',       label: 'Solutions' },
  { id: 'references',  label: 'Portfolio' },
  { id: 'contact',     label: 'Contact'   },
];

// ── Small helpers ─────────────────────────────────────────────────────────────
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// fluid clamp: maps 0→1920 design px to a fluid CSS clamp string
const fl = (min, max) =>
  `clamp(${min}px, ${((max / 1920) * 100).toFixed(3)}vw, ${max}px)`;

// ── Noise overlay ─────────────────────────────────────────────────────────────
// SVG feTurbulence generates film-grain in the browser — no PNG needed.
// URL-encoded so it can live inside a CSS url() string.
// baseFrequency 0.75 + numOctaves 4 matches the Figma grain density.
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' " +
  "numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E\")";

// position:fixed so the grain is always viewport-relative (matches Figma behaviour).
// mix-blend-mode:overlay — on dark surfaces the grain shows; on pure-white (#fff)
// overlay always returns white, so the footer is unaffected.
function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:          'fixed',
        inset:             0,
        pointerEvents:     'none',
        zIndex:            9,          // above page content but below fixed NavBar (z-40)
        backgroundImage:   NOISE_BG,
        backgroundRepeat:  'repeat',
        backgroundSize:    '256px 256px',
        opacity:           0.07,
        mixBlendMode:      'overlay',
      }}
    />
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 1. LOADING OVERLAY  (Figma 485:313 × 486:345)
//
//  4-phase sequence matching Figma component states:
//  ┌─────────────────────────────────────────────────────────────────────┐
//  │  begin  (0–900ms)   Logo spin-in, large, centered                  │
//  │  left   (900ms+)    Logo slides left+shrinks.                       │
//  │                     Word scroller scrolls through 6 words:          │
//  │                     Bienvenue → RPIT → Sites → Logos →             │
//  │                     Design → Créations  (Figma 486:345)            │
//  │  last   (+400ms)    Words fade, logo returns to center, smaller    │
//  │  exit               Blur-iris fade, layoutId FLIP to hero badge    │
//  └─────────────────────────────────────────────────────────────────────┘
// ═════════════════════════════════════════════════════════════════════════════

// Exact words from Figma 486:345 — chargementMot column
const LOADING_WORDS = [
  { text: 'Bienvenue', size: 100, tracking: '20px',    casing: 'uppercase'   },
  { text: 'RPIT',      size: 93,  tracking: '18.6px',  casing: 'uppercase'   },
  { text: 'Sites',     size: 93,  tracking: '18.6px',  casing: 'capitalize'  },
  { text: 'Logos',     size: 93,  tracking: '13.95px', casing: 'capitalize'  },
  { text: 'Design',    size: 93,  tracking: '7.44px',  casing: 'capitalize'  },
  { text: 'Créations', size: 93,  tracking: '7.44px',  casing: 'capitalize'  },
];

// Y-stops: each word occupies one SLOT of exactly slotH pixels.
// slotH = the clip-window height, so scrolling by slotH shows the next word perfectly.
// No font-metric guessing — the word is centred inside its slot by CSS flexbox.
// Stops: word_i → y = -i * slotH
const getSlotH  = () => Math.round(132 * Math.min(window.innerWidth / 1920, 1));
const getYStops = () => {
  const slotH = getSlotH();
  return LOADING_WORDS.map((_, i) => -i * slotH);
};

// Logo geometry from Figma 485:313
const LOGO_W = 172;  // begin/ani1 width
const LOGO_H = 195;  // begin/ani1 height

function ProgressTicker({ totalMs }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const step = (totalMs * 0.74) / 100;
    let i = 0;
    const id = setInterval(() => { i++; setN(Math.min(i, 100)); if (i >= 100) clearInterval(id); }, step);
    return () => clearInterval(id);
  }, [totalMs]);
  return (
    <motion.span
      className="absolute bottom-5 font-inter text-white/40 tabular-nums text-[11px] tracking-[0.1em]"
      style={{ right: 'clamp(40px,4.2vw,80px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      {String(n).padStart(3, '0')} %
    </motion.span>
  );
}

function LoadingOverlay({ onComplete }) {
  const [show,      setShow     ] = useState(true);
  const [logoPhase, setLogoPhase] = useState('center'); // 'center' | 'left' | 'last'
  const [showWords, setShowWords] = useState(false);
  const wordAnim                  = useAnimation();
  const barAnim                   = useAnimation();

  // Timing constants (ms)
  const T_ENTRANCE  = 900;   // logo entrance
  const T_SETTLE    = 350;   // wait before words start scrolling
  const T_WORD_ANIM = 400;   // scroll animation per word
  const T_WORD_HOLD = 190;   // hold on each word
  const T_RETURN    = 420;   // logo return after words finish
  const TOTAL_MS    = T_ENTRANCE + T_SETTLE
    + (LOADING_WORDS.length - 1) * (T_WORD_ANIM + T_WORD_HOLD)
    + T_RETURN;              // ≈ 4070ms

  useEffect(() => {
    barAnim.start({ scaleX: 1, transition: { duration: TOTAL_MS / 1000, ease: 'linear' } });

    const run = async () => {
      await new Promise(r => setTimeout(r, T_ENTRANCE));

      // Phase: logo moves left + word scroller appears
      setLogoPhase('left');
      setShowWords(true);
      await new Promise(r => setTimeout(r, T_SETTLE));

      // Scroll through words
      const yStops = getYStops();
      for (let i = 1; i < yStops.length; i++) {
        await wordAnim.start({
          y: yStops[i],
          transition: { duration: T_WORD_ANIM / 1000, ease: E_EXPO },
        });
        await new Promise(r => setTimeout(r, T_WORD_HOLD));
      }

      // Phase: words out, logo returns to center
      setShowWords(false);
      setLogoPhase('last');
      await new Promise(r => setTimeout(r, T_RETURN));

      setShow(false);
      onComplete?.();
    };

    run();
  }, []); // eslint-disable-line

  // ── Logo position (pixels) ──────────────────────────────────────────────
  const vw        = typeof window !== 'undefined' ? window.innerWidth  : 1440;
  const vh        = typeof window !== 'undefined' ? window.innerHeight : 900;
  const scale     = Math.min(vw / 1920, 1);
  // Left phase: logo at x=40 (Figma ani2), scaled with viewport
  const logoLeftX = logoPhase === 'left' ? Math.round(40 * scale)
                                         : Math.round(vw / 2 - LOGO_W / 2);
  const logoTopY  = Math.round(vh / 2 - LOGO_H / 2);
  const logoScale = logoPhase === 'center' ? 1 : logoPhase === 'left' ? 0.7 : 0.62;

  // ── Word scroller dimensions ────────────────────────────────────────────
  const wordH = getSlotH();                            // slot height = clip-window height
  const wordW = Math.min(Math.round(vw * 0.80), 758); // 80 vw, max Figma width

  const BG = {
    background: 'radial-gradient(ellipse at 49.8% 50.6%,#01468b 0%,#01366a 25%,#00254a 50%,#00152a 75%,#000d19 87.5%,#000509 100%)',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden select-none"
          style={BG}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)', transition: { duration: 0.75, ease: E_EXPO } }}
          transition={{ duration: 0.45 }}
          role="status" aria-label="Chargement RPIT…"
        >
          {/* Vignette depth layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%,transparent 30%,rgba(0,5,9,.7) 100%)' }}
            initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: E_EXPO }}
          />

          {/* ── RPIT Logo ── layoutId FLIPs into hero badge on exit ───────── */}
          <motion.div
            layoutId="rpit-logo"
            className="absolute pointer-events-none"
            style={{ width: LOGO_W, height: LOGO_H, top: logoTopY, left: logoLeftX }}
            initial={{
              scale: 0, rotate: -40, opacity: 0, filter: 'blur(20px)',
              top: logoTopY, left: Math.round(vw / 2 - LOGO_W / 2),
            }}
            animate={{
              top:    logoTopY,
              left:   logoLeftX,
              scale:  logoPhase === 'center'
                ? [0, 1.25, 0.92, 1.05, 1]
                : logoScale,
              rotate: logoPhase === 'center' ? [-40, 8, -4, 2, 0] : 0,
              opacity: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              top:   { duration: 0 },                           // top never changes
              left:  { duration: 0.6, ease: E_EXPO },
              scale: logoPhase === 'center'
                ? { duration: 1.05, times: [0, .45, .7, .85, 1], ease: E_EXPO }
                : { duration: 0.55, ease: E_EXPO },
              rotate:  { duration: 1.05, ease: E_EXPO },
              opacity: { duration: 0.45 },
              filter:  { duration: 0.45 },
            }}
          >
            {/* Ambient glow — pulses during center phase, dims during left */}
            <motion.div
              className="absolute inset-0"
              animate={{
                filter: logoPhase === 'center'
                  ? [
                      'drop-shadow(0 0 10px rgba(255,255,255,.55))',
                      'drop-shadow(0 0 34px rgba(100,160,255,.95))',
                      'drop-shadow(0 0 10px rgba(255,255,255,.55))',
                    ]
                  : 'drop-shadow(0 0 5px rgba(255,255,255,.25))',
              }}
              transition={
                logoPhase === 'center'
                  ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }
                  : { duration: 0.5 }
              }
            >
              <div className="absolute" style={{ inset: '-13.91% -8.75% -9.81% -18.02%' }}>
                <img src={IMG_UNION} alt="RPIT" className="block w-full h-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Word scroller (left phase only) ────────────────────────────── */}
          {/*  Centered horizontally in the viewport so each word is easy to read. */}
          {/*  The clipping viewport (wordH tall, overflow:hidden) reveals one     */}
          {/*  word at a time. The inner column translates to each word's Y offset. */}
          <AnimatePresence>
            {showWords && (
              <motion.div
                className="absolute overflow-hidden"
                style={{
                  // Center horizontally — left edge = 50vw minus half the width
                  left:      Math.round(vw / 2 - wordW / 2),
                  top:       Math.round(vh / 2),
                  height:    wordH,
                  width:     wordW,
                  marginTop: -Math.round(wordH / 2),
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8, transition: { duration: 0.28 } }}
                transition={{ duration: 0.38, ease: E_EXPO }}
              >
                {/* Column of word-slots. Each slot is exactly `wordH` tall so
                    scrolling by wordH always lands the next word dead-centre.
                    The word is centred inside its slot by flexbox — no manual
                    line-height arithmetic needed. */}
                <motion.div
                  className="absolute left-0 top-0 font-limelight not-italic text-white"
                  style={{ width: wordW, textShadow: '3px 4px 8.3px #fefce8' }}
                  initial={{ y: 0 }}
                  animate={wordAnim}
                >
                  {LOADING_WORDS.map((w, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center"
                      style={{ height: wordH, width: wordW }}
                    >
                      <p
                        className="m-0"
                        style={{
                          fontSize:      `clamp(${Math.round(w.size * 0.3)}px,${(w.size / 1920 * 100).toFixed(3)}vw,${w.size}px)`,
                          letterSpacing: w.tracking,
                          textTransform: w.casing,
                          textAlign:     'center',
                          lineHeight:    1,
                        }}
                      >
                        {w.text}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gold progress bar */}
          <div
            className="absolute bottom-8 overflow-hidden rounded-full"
            style={{ left: 'clamp(40px,4.2vw,80px)', right: 'clamp(40px,4.2vw,80px)', height: 2 }}
          >
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
              style={{ background: 'linear-gradient(90deg,#ffe355,#f8cf00,#ffe355)' }}
              initial={{ scaleX: 0 }} animate={barAnim}
            />
          </div>
          <ProgressTicker totalMs={TOTAL_MS} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 2. CHARACTER REVEAL
//    Each character clips upward from behind overflow:hidden mask
// ═════════════════════════════════════════════════════════════════════════════

function CharReveal({ children, baseDelay = 0, step = 0.028 }) {
  return (
    <>
      {String(children).split('').map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '105%' },
              show: { y: 0, transition: { duration: .55, delay: baseDelay + i * step, ease: E_EXPO } },
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 3. LOGO MARQUEE
// ═════════════════════════════════════════════════════════════════════════════

const PARTNERS = [
  { src: IMG_RENAULT, alt: 'Renault Group — client RPIT création site web', ratio: '557/261' },
  { src: IMG_DANSER,  alt: 'Danser — partenaire RPIT',                       ratio: '400/182' },
  { src: IMG_CITELIV, alt: 'CitéLiv — partenaire RPIT',                      ratio: '400/182' },
];

function LogoStrip() {
  return (
    <div className="flex items-center gap-[clamp(40px,11.4vw,218px)] h-[clamp(50px,7.3vw,140px)] shrink-0 px-6">
      {PARTNERS.map((p, i) => (
        <div key={i} className="h-full shrink-0" style={{ aspectRatio: p.ratio }}>
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function LogoMarquee() {
  return (
    <div className="h-[clamp(80px,12.5vw,240px)] flex items-center overflow-hidden">
      <motion.div
        className="flex items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        <LogoStrip /><LogoStrip />
      </motion.div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 4. SECTION REVEAL HOOK
// ═════════════════════════════════════════════════════════════════════════════

function useReveal(threshold = '-10%') {
  const ref     = useRef(null);
  const visible = useInView(ref, { once: true, margin: `${threshold} 0px` });
  return { ref, visible };
}


// ═════════════════════════════════════════════════════════════════════════════
// 5. NAVBAR  (Figma node 254:735 — 3 states)
//
//  DEFAULT  (scrollY ≤ 120px)
//    Transparent bg · logo left · plain white links · "Audit offert" CTA right
//
//  SCROLLED — gold pill  (any section except Contact)
//    #f8cf00 pill · no logo · no CTA · active item → cream inner pill (#fefce8)
//    + blue-gradient text · inactive items → white text
//
//  SCROLLED — white pill  (Contact section in view)
//    #ffffff pill · same structure · active item → navy inner pill (#162456)
//    + white-to-cream gradient text · inactive → blue gradient text
//
//  Active indicator: Framer Motion layoutId="nav-pill-bg" slides between items.
// ═════════════════════════════════════════════════════════════════════════════

const GRAD_BLUE  = 'linear-gradient(95.97deg,rgb(25,60,184) 31.57%,rgb(22,36,86) 154.52%)';
const GRAD_WHITE = 'linear-gradient(95.97deg,#ffffff 31.57%,#fefce8 154.52%)';

function NavBar({ ready }) {
  const [open,          setOpen         ] = useState(false);
  const [scrolled,      setScrolled     ] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);

      // Active section = the nav section whose top most recently crossed 50% viewport.
      // Algorithm: among all sections whose top ≤ threshold, pick the one with the
      // highest (closest to threshold) top value. This cleanly follows the user's
      // scroll direction and never flickers between sections.
      const threshold = window.innerHeight * 0.5;
      let best = 'hero', bestTop = -Infinity;
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        if (top <= threshold && top > bestTop) {
          bestTop = top;
          best    = id;
        }
      });
      setActiveSection(best);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isContact = activeSection === 'contact';
  const pillBg    = isContact ? '#ffffff' : '#f8cf00';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: ready ? 0 : -80, opacity: ready ? 1 : 0 }}
      transition={{ duration: .6, ease: E_EXPO, delay: .1 }}
    >
      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      {/*  All elements are ALWAYS in the DOM — only opacity/pointerEvents change.
           This prevents the AnimatePresence unmount bug where re-mounted elements
           stay stuck at opacity:0 after scroll-up.                               */}
      <div className="hidden md:flex items-center justify-between pointer-events-auto
                      max-w-[1440px] mx-auto
                      px-6 lg:px-[clamp(40px,7.9vw,152px)]
                      py-[14px]">

        {/* ── Logo (visible when at top) ─────────────────────────────────── */}
        <motion.button
          onClick={() => scrollTo('hero')}
          className="flex items-center bg-transparent border-none cursor-pointer shrink-0"
          animate={{ opacity: scrolled ? 0 : 1, scale: scrolled ? 0.8 : 1 }}
          transition={{ duration: .28, ease: E_EXPO }}
          style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
          whileHover={{ scale: scrolled ? 0.8 : 1.06 }}
          whileTap={{ scale: .94 }}
        >
          <img src={IMG_LOGO} alt="RPIT" className="h-[34px] w-[28px] object-contain" />
        </motion.button>

        {/* ── Center area: default links (top) ↔ pill (scrolled) ──────────── */}
        {/*  Both live in a flex-1 container. Default links fade out when the   */}
        {/*  pill fades in — no mount/unmount, no stuck opacity.               */}
        <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 34 }}>

          {/* Default links — always rendered */}
          <motion.nav
            className="absolute inset-0 flex items-center justify-center gap-2"
            animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -6 : 0 }}
            transition={{ duration: .28, ease: E_EXPO }}
            style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
            aria-hidden={scrolled}
          >
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-limelight text-white uppercase
                           px-3 py-1 bg-transparent border-none cursor-pointer
                           hover:text-white/70 transition-colors"
                style={{ fontSize: 'clamp(16px,1.875vw,27px)', letterSpacing: '2.16px' }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Pill — always rendered */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.88, y: scrolled ? 0 : -10 }}
            transition={{ duration: .32, ease: E_EXPO }}
            style={{ pointerEvents: scrolled ? 'auto' : 'none' }}
            aria-hidden={!scrolled}
          >
            <div
              className="flex items-center justify-between h-[34px] px-[20px] rounded-[50px]"
              style={{
                backgroundColor: pillBg,
                boxShadow: '0px 4px 2px rgba(0,0,0,0.25)',
                width: 'clamp(380px, 59.2vw, 1136px)',
                transition: 'background-color .3s ease',
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive  = activeSection === item.id;
                const textGrad  = isActive
                  ? (isContact ? GRAD_WHITE : GRAD_BLUE)
                  : (isContact ? GRAD_BLUE  : null);
                const textColor = (!isActive && !isContact) ? '#ffffff' : 'transparent';

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="relative font-limelight uppercase bg-transparent border-none
                               cursor-pointer h-full flex items-center px-[13px]"
                    style={{ borderRadius: 19, fontSize: 'clamp(13px,1.25vw,21px)' }}
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill-bg"
                        className="absolute inset-0"
                        style={{ backgroundColor: isContact ? '#162456' : '#fefce8', borderRadius: 19 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${textGrad ? 'bg-clip-text' : ''}`}
                      style={{
                        color:           textColor,
                        backgroundImage: textGrad ?? undefined,
                        letterSpacing:   isActive ? '4.05px' : '2.43px',
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Audit offert CTA (visible when at top) ─────────────────────── */}
        <motion.button
          onClick={() => scrollTo('contact')}
          className="ml-3 px-6 py-2 bg-[#ffe355] text-[#162456] font-limelight
                     rounded-[29px] uppercase tracking-[.12em] border-none cursor-pointer shrink-0"
          style={{ fontSize: 'clamp(12px,1.1vw,17px)', pointerEvents: scrolled ? 'none' : 'auto' }}
          animate={{ opacity: scrolled ? 0 : 1, scale: scrolled ? 0.8 : 1 }}
          transition={{ duration: .28, ease: E_EXPO }}
          whileHover={{ scale: scrolled ? 0.8 : 1.04, filter: 'brightness(1.08)' }}
          whileTap={{ scale: .97 }}
        >
          Audit offert
        </motion.button>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between pointer-events-auto px-6 py-3">

        {/* Logo (top) ↔ mini section-pill (scrolled) — always in DOM */}
        <div className="relative" style={{ width: 40, height: 36 }}>
          <motion.button
            onClick={() => scrollTo('hero')}
            className="absolute inset-0 flex items-center bg-transparent border-none cursor-pointer"
            animate={{ opacity: scrolled ? 0 : 1, scale: scrolled ? 0.7 : 1 }}
            transition={{ duration: .2, ease: E_EXPO }}
            style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
          >
            <img src={IMG_LOGO} alt="RPIT" className="h-[36px] w-[30px] object-contain" />
          </motion.button>

          <motion.button
            onClick={() => scrollTo(activeSection)}
            className="absolute top-1/2 -translate-y-1/2 left-0
                       h-[28px] px-3 rounded-[50px] flex items-center
                       border-none cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: pillBg, boxShadow: '0px 2px 1px rgba(0,0,0,0.2)',
                     pointerEvents: scrolled ? 'auto' : 'none' }}
            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.85 }}
            transition={{ duration: .2, ease: E_EXPO }}
          >
            <span className="font-limelight uppercase text-[11px]"
                  style={{ letterSpacing: '1.5px', color: '#162456' }}>
              {NAV_ITEMS.find(n => n.id === activeSection)?.label ?? 'Menu'}
            </span>
          </motion.button>
        </div>

        <motion.button
          className="text-white bg-transparent border-none cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: .9 }}
        >
          {open
            ? <FontAwesomeIcon icon={faXmark} style={{ width: 22, fontSize: 22 }} />
            : <FontAwesomeIcon icon={faBars}  style={{ width: 22, fontSize: 22 }} />
          }
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden pointer-events-auto absolute top-full left-0 right-0
                       flex flex-col px-6 py-6 gap-1"
            style={{ background: 'rgba(0,5,9,.96)', backdropFilter: 'blur(20px)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .28, ease: E_EXPO }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => { scrollTo(item.id); setOpen(false); }}
                className="text-left font-limelight uppercase text-2xl tracking-[.1em]
                           py-3 border-b border-white/10 last:border-0
                           bg-transparent border-none cursor-pointer"
                style={{ color: activeSection === item.id ? '#f8cf00' : '#ffffff' }}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * .06, duration: .3, ease: E_EXPO }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => { scrollTo('contact'); setOpen(false); }}
              className="mt-4 py-3 bg-[#ffe355] text-[#162456] font-limelight text-xl
                         uppercase tracking-[.12em] rounded-[29px] border-none cursor-pointer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: NAV_ITEMS.length * .06 + .04, duration: .3, ease: E_EXPO }}
            >
              Audit offert
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 6. HERO SECTION
//    Layout: flex-col on mobile/tablet (photo top, text bottom)
//            flex-row on desktop  (text left, photo right)
//
//    Name animation: word-level clip reveal — each word slides up from behind
//    its own overflow:hidden mask. "REMY" line 1, "POISSONNIER" line 2.
//    This guarantees two clean horizontal lines on every screen size.
//
//    Parallax layers: photo 0.25×, text 0.05×, badge 0.40×
// ═════════════════════════════════════════════════════════════════════════════

function HeroSection({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0,  -40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -280]);

  const show = ready ? 'show' : 'hidden';

  return (
    // Reduced lateral padding on desktop so text + photo both have breathing room
    <section id="hero" ref={ref} aria-label="Présentation de Remy Poissonnier" className="relative min-h-screen w-full flex items-center overflow-hidden pt-20 md:pt-[72px]">
      <div className="w-full px-6 sm:px-10 lg:px-[clamp(40px,4.2vw,80px)]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-[clamp(32px,6vw,120px)] w-full">

          {/* ── Text — flex-1 so it fills whatever is left after the photo ── */}
          <motion.div
            className="flex flex-col items-start w-full lg:flex-1 lg:min-w-0"
            style={{ y: textY }}
            initial="hidden" animate={show}
          >
            {/* Subtitle — clips up from mask */}
            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <motion.p
                className="font-inter font-normal text-[#ffe355] leading-[1.2]"
                style={{ fontSize: 'clamp(14px,1.875vw,27px)' }}
                variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: .5, delay: .1, ease: E_EXPO } } }}
              >
                Gestionnaire de RPIT
              </motion.p>
            </div>

            {/* Name — semantic <h1>, word-level clip reveal.
                <p> inside <h1> is invalid HTML → use <span style="display:block">.
                The <h1> is the primary keyword signal for Google on this page. */}
            <h1
              className="font-limelight text-white mb-5 md:mb-7"
              style={{
                fontSize:   'clamp(36px,7vw,120px)',
                lineHeight: 1.05,
                textShadow: '13px 4px 2.8px rgba(0,0,0,.25)',
              }}
            >
              {['REMY', 'POISSONNIER'].map((word, i) => (
                <span key={word} style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.span
                    style={{ display: 'block' }}
                    className="leading-tight"
                    variants={{
                      hidden: { y: '105%' },
                      show: {
                        y: 0,
                        transition: { duration: .65, delay: .18 + i * .2, ease: E_EXPO },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Body */}
            <motion.p
              className="font-inter font-normal text-white leading-[1.2]"
              style={{ fontSize: 'clamp(14px,1.46vw,21px)', maxWidth: '52ch' }}
              variants={{
                hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
                show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: .6, delay: .65, ease: E_EXPO } },
              }}
            >
              Le design pour l&apos;image, le SEO pour la croissance. Depuis 5 ans, je transforme ma
              passion pour le web en leviers de performance mesurables pour mes partenaires.
            </motion.p>

            {/* Mobile/tablet CTA */}
            <motion.button
              className="mt-8 flex items-center gap-3 px-8 py-4 bg-[#ffe355] text-[#162456] font-limelight rounded-[29px] uppercase tracking-[.12em] border-none cursor-pointer lg:hidden"
              style={{ fontSize: 'clamp(13px,1.3vw,18px)' }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:   { opacity: 1, y: 0, transition: { duration: .5, delay: .8, ease: E_EXPO } },
              }}
              whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
              whileTap={{ scale: .97 }}
              onClick={() => scrollTo('contact')}
            >
              Réserver mon audit offert
              <FontAwesomeIcon icon={faArrowRight} style={{ width: 16, fontSize: 16 }} />
            </motion.button>
          </motion.div>

          {/* ── Photo — fixed intrinsic size, never shrinks ── */}
          <motion.div
            className="relative shrink-0 w-[clamp(200px,38vw,620px)]"
            style={{ y: photoY }}
            initial={{ x: '55vw', opacity: 0, rotateY: 14 }}
            animate={ready ? { x: 0, opacity: 1, rotateY: 0 } : {}}
            transition={{
              x:       { type: 'spring', stiffness: 55, damping: 14, delay: .05 },
              opacity: { duration: .4, ease: 'easeOut', delay: .05 },
              rotateY: { duration: .9, ease: E_EXPO,    delay: .05 },
            }}
          >
            {/* White pill container — exact Figma border-radius 107px */}
            <div
              className="bg-white overflow-hidden w-full"
              style={{
                borderRadius: 'clamp(36px,7.4vw,107px)',
                aspectRatio:  '1 / 1',
                boxShadow:    '13px 4px 4px 0px rgba(0,0,0,.25)',
              }}
            >
              <img
                src={IMG_PHOTO}
                alt="Remy Poissonnier, fondateur de RPIT — expert création site web et SEO à Bouchain, Nord"
                fetchpriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating RPIT badge — FLIP receiver from loading overlay.
                Navy bg so the white logo is visible against the white photo pill. */}
            <motion.div
              layoutId="rpit-logo"
              className="absolute -bottom-5 -left-5 bg-[#162456] rounded-full p-3 shadow-2xl"
              style={{ y: badgeY }}
              initial={{ scale: .6, opacity: 0 }}
              animate={ready ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: .6, delay: .7, ease: E_SPRING }}
            >
              <img src={IMG_LOGO} alt="RPIT" className="w-10 h-10 object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <span className="font-inter text-[10px] uppercase tracking-[.2em]">Scroll</span>
        <FontAwesomeIcon icon={faChevronDown} style={{ width: 14, fontSize: 14 }} />
      </motion.div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 7. STATS SECTION
//    "Augmentez votre visibilité de 60%…" + Eye icon
//    whileInView: text slides left, eye scales in from right
// ═════════════════════════════════════════════════════════════════════════════

function StatsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="stats" ref={ref} aria-label="Résultats et performance" className="w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[clamp(60px,12.7vw,244px)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">

          <motion.div
            className="flex flex-col gap-5 md:gap-6 w-full lg:max-w-[966px]"
            initial={{ opacity: 0, x: -60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .7, ease: E_EXPO }}
          >
            <h2
              className="font-limelight text-white leading-normal"
              style={{ fontSize: 'clamp(20px,3.3vw,47px)' }}
            >
              Augmentez votre visibilité de 60&nbsp;% et votre taux de conversion jusqu&apos;à 40&nbsp;%.
            </h2>
            <p
              className="font-inter font-normal text-white leading-[1.2]"
              style={{ fontSize: 'clamp(14px,1.875vw,27px)' }}
            >
              5 ans d&apos;expertise au service de votre croissance. J&apos;accompagne les entreprises
              dans leur transformation digitale avec des résultats visibles dès la 3e semaine.
            </p>
          </motion.div>

          <motion.div
            className="shrink-0 text-white/70"
            initial={{ opacity: 0, scale: .4, rotate: -20 }}
            animate={visible ? { opacity: .8, scale: 1, rotate: 0 } : {}}
            transition={{ duration: .7, delay: .15, ease: E_SPRING }}
          >
            <FontAwesomeIcon icon={faEye} style={{ fontSize: fl(60, 168) }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 8. PARTNERS SECTION
//    Users icon + white rounded logo marquee card
//    whileInView: card slides from right, icon pops with spring
// ═════════════════════════════════════════════════════════════════════════════

function PartnersSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="partners" ref={ref} aria-label="Clients et partenaires" className="w-full py-10 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[clamp(60px,12.7vw,244px)]">
        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-[clamp(40px,8.4vw,161px)]">

          <motion.div
            className="shrink-0 text-white/80"
            initial={{ opacity: 0, scale: .5 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: .6, delay: .1, ease: E_SPRING }}
          >
            <FontAwesomeIcon icon={faUsers} style={{ fontSize: fl(60, 161) }} />
          </motion.div>

          <motion.div
            className="flex-1 bg-white rounded-[32px] overflow-hidden min-w-0"
            style={{ boxShadow: '0px 4px 2px rgba(0,0,0,.25)' }}
            initial={{ opacity: 0, x: 60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .65, delay: .1, ease: E_EXPO }}
          >
            <LogoMarquee />
          </motion.div>

        </div>
      </div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 9. RESERVATION CTA SECTION
//    Ghost glow button — whiteInView scale + glow
// ═════════════════════════════════════════════════════════════════════════════

function ReservationSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="reservation" ref={ref} aria-label="Réserver un audit offert" className="w-full py-12 md:py-20 flex justify-center lg:justify-end">
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-[clamp(60px,12.7vw,244px)] flex flex-col sm:flex-row items-center sm:justify-end gap-6">
        <motion.button
          className="group flex items-center gap-4 bg-transparent border-none cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6, ease: E_EXPO }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: .97 }}
          onClick={() => scrollTo('contact')}
        >
          <span
            className="font-limelight text-white tracking-[3.76px] text-right leading-normal"
            style={{
              fontSize:   'clamp(20px,3.3vw,47px)',
              textShadow: '6px 6px 14.3px white',
            }}
          >
            Réserver mon audit offert
          </span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-white shrink-0 group-hover:translate-x-2 transition-transform duration-300"
            style={{ fontSize: fl(20, 36) }}
          />
        </motion.button>
      </div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 10. REFERENCES / PORTFOLIO SECTION
//     Rotating gear icon + glassmorphism placeholder cards
// ═════════════════════════════════════════════════════════════════════════════

function ReferencesSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="references" ref={ref} aria-label="Références et expertises" className="w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[clamp(60px,12.7vw,244px)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">

          <motion.div
            className="flex flex-col gap-[clamp(24px,4.2vw,80px)] w-full lg:max-w-[727px]"
            initial={{ opacity: 0, x: -60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .7, ease: E_EXPO }}
          >
            <h2
              className="font-limelight text-white leading-normal text-center lg:text-left"
              style={{ fontSize: 'clamp(20px,3.3vw,47px)' }}
            >
              Références &amp; Expertises
            </h2>
            <p
              className="font-inter font-normal text-white leading-[1.2] text-center lg:text-left"
              style={{ fontSize: 'clamp(14px,1.875vw,27px)' }}
            >
              Actuellement en cours de mise à jour, mon portfolio reflète 5 ans de collaborations
              avec des acteurs majeurs de l&apos;industrie.
            </p>
          </motion.div>

          {/* Continuously rotating gear */}
          <motion.div
            className="shrink-0 text-white/70"
            initial={{ opacity: 0, scale: .4, rotate: -90 }}
            animate={visible ? { opacity: .8, scale: 1, rotate: 0 } : {}}
            transition={{ duration: .8, delay: .2, ease: E_SPRING }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            >
              <FontAwesomeIcon icon={faGear} style={{ fontSize: fl(80, 229) }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Glassmorphism placeholder cards */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .7, delay: .3, ease: E_EXPO }}
        >
          {['Projet 01', 'Projet 02', 'Projet 03'].map((label, i) => (
            <motion.div
              key={label}
              className="rounded-[24px] aspect-video flex items-center justify-center cursor-pointer"
              style={{
                background:     'rgba(255,255,255,.06)',
                border:         '1px solid rgba(255,255,255,.1)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.02, background: 'rgba(255,255,255,.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <span className="font-limelight text-white/40 uppercase tracking-[.2em]"
                    style={{ fontSize: 'clamp(12px,1.1vw,18px)' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 11. COMMITMENT SECTION
//     faHandshake icon spins in, text slides from right
// ═════════════════════════════════════════════════════════════════════════════

function CommitmentSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="commitment" ref={ref} aria-label="Notre engagement" className="w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[clamp(60px,12.7vw,244px)]">
        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-[clamp(40px,8.4vw,161px)]">

          <motion.div
            className="shrink-0 text-white/80"
            initial={{ opacity: 0, scale: .4, rotate: -40 }}
            animate={visible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: .7, delay: .1, ease: E_SPRING }}
          >
            <FontAwesomeIcon
              icon={faHandshake}
              style={{ fontSize: fl(80, 235) }}
            />
          </motion.div>

          <motion.h2
            className="font-limelight text-white leading-normal text-justify w-full"
            style={{ fontSize: 'clamp(20px,3.3vw,47px)' }}
            initial={{ opacity: 0, x: 60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .7, delay: .15, ease: E_EXPO }}
          >
            Mon engagement&nbsp;: Un site livré et des premiers résultats concrets sous 21&nbsp;jours.
          </motion.h2>

        </div>
      </div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 12. CONTACT SECTION
//     Bouncing mail icon, CTA button with navy pill style from Figma
// ═════════════════════════════════════════════════════════════════════════════

function ContactSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="contact" ref={ref} aria-label="Contact et audit offert" className="w-full py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[clamp(60px,12.7vw,244px)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          <motion.div
            className="flex flex-col gap-[clamp(24px,4.2vw,80px)] items-start w-full lg:max-w-[681px]"
            initial={{ opacity: 0, x: -60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .7, ease: E_EXPO }}
          >
            <h2
              className="font-limelight text-white leading-normal"
              style={{ fontSize: 'clamp(20px,3.3vw,47px)', textShadow: '0px 4px 4px rgba(0,0,0,.25)' }}
            >
              Prêt à booster votre chiffre d&apos;affaires&nbsp;?
            </h2>
            <p
              className="font-inter font-normal text-white leading-[1.2] text-justify"
              style={{ fontSize: 'clamp(14px,1.875vw,27px)', textShadow: '0px 4px 4px rgba(0,0,0,.25)' }}
            >
              L&apos;audit de votre communication est la première étape vers votre succès digital.
              Discutons de votre projet lors d&apos;un appel de 15 minutes.
            </p>

            {/* CTA — bigger white centered text, same mailto link */}
            <motion.a
              href="mailto:rpoissonnier.it@gmail.com"
              className="flex items-center justify-center bg-[#1c398e] text-white font-limelight uppercase no-underline rounded-[29px] w-full"
              style={{
                fontSize:      'clamp(20px, 2.5vw, 38px)',
                letterSpacing: '3.76px',
                padding:       'clamp(10px, 1vw, 16px) clamp(24px, 3vw, 48px)',
                boxShadow:     '0px 4px 2px rgba(0,0,0,.25)',
                textShadow:    '6px 6px 14.3px rgba(255,255,255,0.15)',
              }}
              whileHover={{ scale: 1.03, filter: 'brightness(1.12)' }}
              whileTap={{ scale: .97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              Réserver mon audit offert
            </motion.a>
          </motion.div>

          {/* Bouncing mail icon — also links to the same mailto */}
          <motion.a
            href="mailto:rpoissonnier.it@gmail.com"
            className="shrink-0 text-white/80 no-underline"
            initial={{ opacity: 0, scale: .4, y: 40 }}
            animate={visible ? { opacity: .8, scale: 1, y: 0 } : {}}
            transition={{ duration: .8, delay: .2, ease: E_SPRING }}
            whileHover={{ opacity: 1, scale: 1.06 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: .8 }}
            >
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: fl(100, 235) }} />
            </motion.div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// 13. FOOTER  (Figma node 622:678 — updated to 3-col grid)
//
//  Desktop grid (3 equal columns):
//  ┌──────────────┬──────────────┬──────────────┐
//  │  Menu        │  Bureau      │  Social       │
//  │  Accueil     │  Bouchain…   │  Facebook     │
//  │  Solutions   │  email…      │  Instagram    │
//  │  Portfolio   │              │  LinkedIn     │
//  │  Contact     │              │               │
//  ├──────────────┴──────────────┴──────────────┤
//  │         RPIT  (429px, tracking 175.89px)    │
//  └─────────────────────────────────────────────┘
//
//  Responsive: single column on mobile, 3-col grid from md+
// ═════════════════════════════════════════════════════════════════════════════

// Font clamps — Figma 1920px baseline: heading 90px, items 50px
const F_HEAD  = 'clamp(28px, 4.69vw, 90px)';
const F_ITEMS = 'clamp(16px, 2.60vw, 50px)';

const FOOTER_NAV = [
  { label: 'Accueil',   id: 'hero'       },
  { label: 'Solutions', id: 'stats'      },
  { label: 'Portfolio', id: 'references' },
  { label: 'Contact',   id: 'contact'    },
];

const FOOTER_SOCIAL = [
  { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61589549072639', icon: faFacebook  },
  { label: 'Instagram', href: 'https://www.instagram.com/',                             icon: faInstagram },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/remy-poissonnier/',          icon: faLinkedin  },
];

// Reusable column block
function FooterCol({ heading, children, delay, visible }) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 44 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .65, delay, ease: E_EXPO }}
    >
      <h3
        className="font-limelight leading-none"
        style={{ fontSize: F_HEAD }}
      >
        {heading}
      </h3>
      <div
        className="flex flex-col font-inter font-normal"
        style={{ gap: 'clamp(6px, 1.51vw, 26px)', marginTop: 'clamp(8px, 1vw, 18px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Footer() {
  const { ref, visible } = useReveal('-5%');

  return (
    <footer ref={ref} className="w-full bg-white overflow-hidden py-[52px] text-[#162456]">

      {/* ── Top section: 3-column grid ──────────────────────────────────── */}
      <div className="px-4 sm:px-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

          {/* ── Col 1: Menu ── */}
          <FooterCol heading="Menu" delay={0} visible={visible}>
            {FOOTER_NAV.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-[#162456] bg-transparent border-none cursor-pointer hover:opacity-55 transition-opacity font-inter font-normal pl-[8px]"
                style={{ fontSize: F_ITEMS }}
              >
                {label}
              </button>
            ))}
          </FooterCol>

          {/* ── Col 2: Bureau — <address> tells search engines this is
                contact/location data, boosting local SEO signals ── */}
          <FooterCol heading="Bureau" delay={.1} visible={visible}>
            <address className="not-italic flex flex-col" style={{ gap: 'inherit' }}>
              <p style={{ fontSize: F_ITEMS }}>Bouchain, 59111</p>
              <a
                href="mailto:rpoissonnier.it@gmail.com"
                className="text-[#162456] no-underline hover:opacity-55 transition-opacity"
                style={{ fontSize: 'clamp(12px, 1.98vw, 38px)' }}
              >
                rpoissonnier.it@gmail.com
              </a>
            </address>
          </FooterCol>

          {/* ── Col 3: Social — FA brand icons lead each link ── */}
          <FooterCol heading="Social" delay={.2} visible={visible}>
            {FOOTER_SOCIAL.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank" rel="noreferrer"
                className="text-[#162456] no-underline hover:opacity-55 transition-opacity flex items-center gap-[0.5em]"
                style={{ fontSize: F_ITEMS }}
              >
                <FontAwesomeIcon
                  icon={icon}
                  fixedWidth
                  style={{ fontSize: '0.85em', opacity: 0.75 }}
                />
                {label}
              </a>
            ))}
          </FooterCol>

        </div>
      </div>

      {/* ── Giant RPIT logotype ───────────────────────────────────────────── */}
      {/* letterSpacing pushes chars apart; paddingLeft compensates so the
          word stays visually centered rather than shifted right. */}
      <motion.div
        className="flex items-end justify-center overflow-hidden mt-4"
        initial={{ opacity: 0, y: 80 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .9, delay: .25, ease: E_EXPO }}
      >
        <span
          className="font-limelight text-[#162456] text-center leading-none select-none"
          style={{
            fontSize:     'clamp(64px, 22.3vw, 429px)',
            letterSpacing:'clamp(12px, 9.16vw, 175.89px)',
            paddingLeft:  'clamp(12px, 9.16vw, 175.89px)',
          }}
        >
          RPIT
        </span>
      </motion.div>

    </footer>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT — HomePage
//
// State machine:
//   'loading'  → LoadingOverlay plays (position:fixed z-100)
//   'ready'    → Page fades in; NavBar + Hero animate in simultaneously
//
// LayoutGroup shares layoutId="rpit-logo" between LoadingOverlay and
// HeroSection so Framer Motion FLIP-animates the logo seamlessly.
// ═════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [phase, setPhase] = useState('loading');
  const handleDone = useCallback(() => setPhase('ready'), []);

  return (
    <LayoutGroup>
      {/* Loading overlay — unmounts itself after autoExitMs */}
      <LoadingOverlay onComplete={handleDone} />

      {/* Page content — fades in once loading exits */}
      <motion.div
        className="relative w-full min-h-screen"
        style={{ background: 'linear-gradient(179.83deg,#000509 1.3%,#01468b 99.96%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'ready' ? 1 : 0 }}
        transition={{ duration: .6, ease: E_EXPO }}
      >
        {/* Film-grain noise — fixed viewport overlay, matches Figma texture */}
        <NoiseOverlay />
        <NavBar ready={phase === 'ready'} />
        {/* <main> is the primary landmark — screen readers + Google use it
            to identify the page's core content vs. nav/footer boilerplate */}
        <main id="main-content">
          <HeroSection     ready={phase === 'ready'} />
          <StatsSection    />
          <PartnersSection />
          <ReservationSection />
          <ReferencesSection />
          <CommitmentSection />
          <ContactSection  />
        </main>
        <Footer />
      </motion.div>
    </LayoutGroup>
  );
}
