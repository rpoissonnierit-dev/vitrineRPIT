# RPIT Component Documentation

**Stack:** React + Vite · Tailwind CSS · Framer Motion · Lucide React  
**Design file:** [Figma — RPIT](https://www.figma.com/design/Gxj4ftJ6irOueMfaH7gNdl/RPIT)

---

## Quick Setup

```bash
npm install framer-motion lucide-react
```

**`tailwind.config.js`**
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        limelight: ['Limelight', 'sans-serif'],
        plaster:   ['Plaster',   'sans-serif'],
        inter:     ['Inter',     'sans-serif'],
      },
      colors: {
        rpit: {
          navy:   '#162456',
          blue:   '#193cb8',
          yellow: '#ffe355',
          gold:   '#f8cf00',
          cream:  '#fefce8',
        },
      },
    },
  },
  plugins: [],
};
```

**`index.html`** — add inside `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Limelight&family=Plaster&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 1. LogoPartners — Infinite Marquee

**Figma node:** `540:212`

### Technical Overview
A horizontal infinite-scroll marquee. The logo strip is duplicated and driven by Framer Motion's `animate` with an `x` keyframe from `0%` to `-50%`, looping seamlessly. `repeat: Infinity` with `ease: "linear"` gives constant-velocity motion. The component accepts a `speed` prop (seconds per cycle) so the host page can slow or accelerate it.

### Code

```jsx
// src/components/LogoPartners.jsx
import { motion } from 'framer-motion';

// ⚠️  Figma asset URLs expire in 7 days — replace with your own hosted images.
const IMG_RENAULT = "https://www.figma.com/api/mcp/asset/30213e81-fe55-4bb6-8686-a0b8d980e427";
const IMG_DANSER  = "https://www.figma.com/api/mcp/asset/58dc9543-d68a-45eb-a04d-8defd1a98df1";
const IMG_CITELIV = "https://www.figma.com/api/mcp/asset/1a0153ff-f01c-48bd-a793-1c1af981691c";

const LOGOS = [
  { src: IMG_RENAULT, alt: "Renault Group", ratio: "557 / 261" },
  { src: IMG_DANSER,  alt: "Danser",        ratio: "400 / 182" },
  { src: IMG_CITELIV, alt: "CitéLiv",       ratio: "400 / 182" },
];

function LogoStrip() {
  return (
    <div className="flex items-center gap-[218px] h-[140px] shrink-0">
      {LOGOS.map((logo, i) => (
        <div
          key={i}
          className="h-full shrink-0"
          style={{ aspectRatio: logo.ratio }}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * @param {{ speed?: number, className?: string }} props
 * speed — duration in seconds for one full cycle (default 18)
 */
export default function LogoPartners({ speed = 18, className = "" }) {
  return (
    <div
      className={`h-[271px] flex items-center overflow-hidden relative ${className}`}
      aria-label="Partenaires"
    >
      {/* Fade masks on edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to right, #e8e0d8, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to left, #e8e0d8, transparent)" }} />

      <motion.div
        className="flex items-center gap-[218px] px-[23px]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {/* Duplicate for seamless loop */}
        <LogoStrip />
        <LogoStrip />
      </motion.div>
    </div>
  );
}
```

### Usage

```jsx
// App.jsx
import LogoPartners from './components/LogoPartners';

export default function App() {
  return (
    <section className="bg-[#e8e0d8] py-12">
      <h2 className="text-center font-limelight text-2xl text-[#162456] mb-8 uppercase tracking-[0.2em]">
        Ils nous font confiance
      </h2>
      <LogoPartners speed={20} />
    </section>
  );
}
```

---

## 2. ReservationCTA — Call-to-Action Button

**Figma node:** `569:239`

### Technical Overview
Two visual states: `default` (ghost with white glow text) and `active` (navy-blue pill with cream underlined uppercase text). Framer Motion `whileHover` applies `scale: 1.03` + `brightness(1.08)` on hover and `scale: 0.97` on tap. `transition` uses a `spring` with `stiffness: 350` to match the snappy feel of the RPIT design system.

### Code

```jsx
// src/components/ReservationCTA.jsx
import { motion } from 'framer-motion';

/**
 * @param {{
 *   variant?: 'default' | 'active',
 *   onClick?: () => void,
 *   className?: string
 * }} props
 */
export default function ReservationCTA({
  variant  = 'default',
  onClick,
  className = '',
}) {
  const isActive = variant === 'active';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={[
        'flex items-center justify-center cursor-pointer border-none outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#ffe355] focus-visible:ring-offset-2',
        isActive
          ? 'bg-[#1c398e] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] py-[6px] px-[106px] rounded-[29px] w-full max-w-[1027px]'
          : 'bg-transparent px-[106px] w-full max-w-[949px]',
        className,
      ].join(' ')}
      aria-label="Réserver mon audit offert"
    >
      <span
        className={[
          'font-limelight not-italic leading-normal whitespace-nowrap select-none',
          'text-[clamp(28px,3.3vw,47px)] tracking-[3.76px]',
          isActive
            ? 'text-[#fef9c2] underline decoration-solid uppercase'
            : 'text-white [text-shadow:6px_6px_14.3px_white]',
        ].join(' ')}
      >
        {isActive ? 'RÉSERVER MON AUDIT OFFERT' : 'Réserver mon audit offert'}
      </span>
    </motion.button>
  );
}
```

### Usage

```jsx
// App.jsx
import ReservationCTA from './components/ReservationCTA';

export default function App() {
  const handleClick = () => window.open('https://cal.com/rpit', '_blank');

  return (
    <section className="flex flex-col items-center gap-8 py-24 bg-[#e8e0d8]">
      {/* Ghost / default state */}
      <ReservationCTA variant="default" onClick={handleClick} />
      {/* Filled / active state */}
      <ReservationCTA variant="active"  onClick={handleClick} />
    </section>
  );
}
```

---

## 3. Navigation — Responsive Navbar

**Figma node:** `254:735`

### Technical Overview
Four active-state variants (`default`, `solution`, `works`, `contact`) drive the visual treatment of the pill bar. Framer Motion `layout` animates the background-color transition of the bar. Each nav item uses `whileHover: { scale: 1.06 }`. The active item pill is highlighted per variant: cream pill (`#fefce8`) for yellow-bar pages, navy pill (`#162456`) for the white-bar contact state. All gradient text is applied via inline `backgroundImage` + `bg-clip-text`.

### Code

```jsx
// src/components/Navigation.jsx
import { motion } from 'framer-motion';

// ⚠️  Replace with hosted asset after Figma URL expires.
const IMG_LOGO = "https://www.figma.com/api/mcp/asset/48ade50d-d2fc-45c2-82d6-00f920492278";

const NAV_ITEMS = [
  { id: 'accueil',   label: 'Accueil'   },
  { id: 'solutions', label: 'Solutions' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact',   label: 'Contact'   },
];

const PAGE_META = {
  default:  { barBg: 'transparent', activeId: null         },
  solution: { barBg: '#f8cf00',     activeId: 'solutions'  },
  works:    { barBg: '#f8cf00',     activeId: 'portfolio'  },
  contact:  { barBg: '#ffffff',     activeId: 'contact'    },
};

const GRAD_BLUE_STEEP  = 'linear-gradient(95.97deg, rgb(25,60,184) 31.57%, rgb(22,36,86) 154.52%)';
const GRAD_BLUE_FLAT   = 'linear-gradient(95.61deg, rgb(25,60,184) 31.57%, rgb(22,36,86) 154.52%)';
const GRAD_WHITE       = 'linear-gradient(95.97deg, #ffffff 31.57%, #fefce8 154.52%)';

/**
 * @param {{
 *   currentPage?: 'default' | 'solution' | 'works' | 'contact',
 *   onNavigate?: (id: string) => void,
 *   className?: string
 * }} props
 */
export default function Navigation({
  currentPage = 'default',
  onNavigate,
  className   = '',
}) {
  const meta      = PAGE_META[currentPage] ?? PAGE_META.default;
  const isDefault = currentPage === 'default';
  const isContact = currentPage === 'contact';

  return (
    <div
      className={[
        'flex items-center justify-center overflow-hidden',
        'w-full max-w-[1440px] mx-auto',
        'px-[clamp(40px,10.55vw,152px)]',
        isDefault ? 'py-[30px]' : 'py-[63px]',
        className,
      ].join(' ')}
    >
      <motion.div
        layout
        className={[
          'flex items-center justify-between w-full h-[34px] rounded-[50px] overflow-hidden',
          !isDefault && 'drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]',
          !isDefault && 'px-[20px]',
        ].filter(Boolean).join(' ')}
        animate={{ backgroundColor: meta.barBg }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {isDefault ? (
          /* ── Default: logo + plain white links ── */
          <>
            <div className="h-[43px] w-[38px] relative shrink-0">
              <img src={IMG_LOGO} alt="RPIT" className="absolute inset-0 w-full h-full object-contain" />
            </div>
            <nav className="flex flex-1 items-center justify-between px-[31px] py-[7px]">
              {NAV_ITEMS.map(item => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.06, opacity: 0.85 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                  onClick={() => onNavigate?.(item.id)}
                  className="font-limelight text-[clamp(18px,1.875vw,27px)] text-white tracking-[2.16px] uppercase whitespace-nowrap bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </>
        ) : (
          /* ── Solution / Works / Contact: pill bar ── */
          <nav className="flex items-center justify-between w-full">
            {NAV_ITEMS.map(item => {
              const isActive   = item.id === meta.activeId;
              let pillBg       = 'transparent';
              let gradientImg  = null;
              let letterSpacing = '2.43px';

              if (isActive) {
                pillBg       = isContact ? '#162456' : '#fefce8';
                gradientImg  = isContact ? GRAD_WHITE : GRAD_BLUE_STEEP;
                letterSpacing = '4.05px';
              } else if (isContact) {
                gradientImg  = GRAD_BLUE_FLAT;
              }

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                  onClick={() => onNavigate?.(item.id)}
                  className={[
                    'font-limelight text-[clamp(18px,1.875vw,27px)] uppercase whitespace-nowrap',
                    'bg-transparent border-none cursor-pointer relative',
                    (isActive || isContact) ? 'bg-clip-text text-transparent' : 'text-white',
                    isActive ? 'px-[13px] rounded-[19px]' : '',
                  ].join(' ')}
                  style={{
                    backgroundColor: pillBg !== 'transparent' ? pillBg : undefined,
                    backgroundImage: gradientImg ?? undefined,
                    letterSpacing,
                  }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </nav>
        )}
      </motion.div>
    </div>
  );
}
```

### Usage

```jsx
// App.jsx
import { useState } from 'react';
import Navigation from './components/Navigation';

export default function App() {
  const [page, setPage] = useState('default');

  return (
    <div className="min-h-screen bg-[#e8e0d8]">
      <Navigation currentPage={page} onNavigate={setPage} />

      {/* Quick demo switcher */}
      <div className="flex gap-3 justify-center mt-8">
        {['default', 'solution', 'works', 'contact'].map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className="px-4 py-2 bg-[#162456] text-white rounded-lg capitalize text-sm"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. TextHeader — Navigation Link Atom

**Figma node:** `306:144`

### Technical Overview
The atomic nav-link used inside `Navigation`. Four variants match the four nav-bar states: `default` (white text, fixed 168×34 px container), `active` (cream pill `#fefce8` with blue gradient text, 4.05px tracking), `invert` (gradient text without pill background, for the white contact bar), `invert-active` (navy `#162456` pill with white-to-cream gradient text). Framer Motion `whileHover` + `whileTap` provide the micro-interaction.

### Code

```jsx
// src/components/TextHeader.jsx
import { motion } from 'framer-motion';

const GRAD_STEEP = 'linear-gradient(95.97deg, rgb(25,60,184) 31.57%, rgb(22,36,86) 154.52%)';
const GRAD_FLAT  = 'linear-gradient(95.61deg, rgb(25,60,184) 31.57%, rgb(22,36,86) 154.52%)';
const GRAD_WHITE = 'linear-gradient(95.97deg, #ffffff 31.57%, #fefce8 154.52%)';

/**
 * @param {{
 *   label?: string,
 *   variant?: 'default' | 'active' | 'invert' | 'invert-active',
 *   onClick?: () => void,
 *   className?: string
 * }} props
 */
export default function TextHeader({
  label   = 'EXEMPLE',
  variant = 'default',
  onClick,
  className = '',
}) {
  const isDefault      = variant === 'default';
  const isActive       = variant === 'active';
  const isInvert       = variant === 'invert';
  const isInvertActive = variant === 'invert-active';

  const showGradientText = !isDefault;
  const gradImg = isInvertActive ? GRAD_WHITE : isInvert ? GRAD_FLAT : GRAD_STEEP;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      className={[
        'relative inline-flex items-center justify-center cursor-pointer',
        'bg-transparent border-none select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe355]',
        isDefault      ? 'h-[34px] w-[168px]'                    : '',
        isActive       ? 'bg-[#fefce8] px-[13px] rounded-[19px]' : '',
        isInvert       ? 'px-[13px] rounded-[19px]'              : '',
        isInvertActive ? 'bg-[#162456] px-[13px] rounded-[19px]' : '',
        className,
      ].join(' ')}
    >
      {isDefault ? (
        /* White text positioned to fill the fixed-size container */
        <span
          className="absolute font-limelight text-[27px] text-white tracking-[2.43px] uppercase leading-normal not-italic flex items-center justify-center"
          style={{ inset: '2.94% 8.33% 0 8.33%' }}
        >
          {label}
        </span>
      ) : (
        <span
          className="font-limelight text-[27px] text-transparent bg-clip-text uppercase leading-normal not-italic whitespace-nowrap"
          style={{
            backgroundImage: gradImg,
            letterSpacing: isInvert ? '2.43px' : '4.05px',
          }}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
```

### Usage

```jsx
// App.jsx
import TextHeader from './components/TextHeader';

export default function App() {
  return (
    <div className="flex flex-col gap-8 p-12 bg-[#f8cf00]">
      <TextHeader label="Accueil"   variant="default"       onClick={() => console.log('accueil')} />
      <TextHeader label="Solutions" variant="active"        onClick={() => console.log('solutions')} />
      <TextHeader label="Portfolio" variant="invert"        onClick={() => console.log('portfolio')} />
      <TextHeader label="Contact"   variant="invert-active" onClick={() => console.log('contact')} />
    </div>
  );
}
```

---

## 5. TextLoadingScroller — Animated Word Ticker

**Figma node:** `486:345`

### Technical Overview
A clipped viewport window (`h-[132px]`) through which a tall column of words scrolls upward. The column container is 818 px tall and contains 6 words stacked with `gap: 24px`. Framer Motion `useAnimation` drives a sequential `y` animation, stopping at each word's offset for `holdMs` milliseconds before advancing. Y-offset keyframes are taken **exactly** from the Figma animation states: `[0, -144, -284, -424, -561, -701]`. An `onComplete` callback fires after the last word, letting the parent chain it to the next phase.

### Code

```jsx
// src/components/TextLoadingScroller.jsx
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const WORDS = [
  { text: 'Bienvenue', fontSize: '100px', tracking: '20px',    textTransform: 'uppercase'  },
  { text: 'RPIT',      fontSize: '93px',  tracking: '18.6px',  textTransform: 'uppercase'  },
  { text: 'Sites',     fontSize: '93px',  tracking: '18.6px',  textTransform: 'capitalize' },
  { text: 'Logos',     fontSize: '93px',  tracking: '13.95px', textTransform: 'capitalize' },
  { text: 'Design',    fontSize: '93px',  tracking: '7.44px',  textTransform: 'capitalize' },
  { text: 'Créations', fontSize: '93px',  tracking: '7.44px',  textTransform: 'capitalize' },
];

// Exact Y offsets per Figma animation frames (px, negative = scroll up)
const Y_STOPS = [0, -144, -284, -424, -561, -701];

/**
 * @param {{
 *   holdMs?: number,
 *   stepDuration?: number,
 *   onComplete?: () => void,
 *   className?: string
 * }} props
 * holdMs       — pause duration on each word in ms (default 350)
 * stepDuration — scroll animation duration per step in seconds (default 0.55)
 */
export default function TextLoadingScroller({
  holdMs       = 350,
  stepDuration = 0.55,
  onComplete,
  className    = '',
}) {
  const controls = useAnimation();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (let i = 1; i < Y_STOPS.length; i++) {
        if (cancelled) return;
        await controls.start({
          y: Y_STOPS[i],
          transition: { duration: stepDuration, ease: [0.4, 0, 0.2, 1] },
        });
        await new Promise(r => setTimeout(r, holdMs));
      }
      if (!cancelled) onComplete?.();
    };

    run();
    return () => { cancelled = true; };
  }, []); // intentionally stable — runs once on mount

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      style={{ height: '132px', width: 'clamp(320px, 71.7vw, 1033px)' }}
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        className="absolute left-0 top-0 flex flex-col font-limelight not-italic text-white"
        style={{
          gap:        '24px',
          width:      '758px',
          textShadow: '3px 4px 8.3px #fefce8',
        }}
        initial={{ y: 0 }}
        animate={controls}
      >
        {WORDS.map((w, i) => (
          <p
            key={i}
            className="relative shrink-0 w-full leading-normal"
            style={{
              fontSize:      w.fontSize,
              letterSpacing: w.tracking,
              textTransform: w.textTransform,
            }}
          >
            {w.text}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
```

### Usage

```jsx
// App.jsx
import { useState } from 'react';
import TextLoadingScroller from './components/TextLoadingScroller';

export default function App() {
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-8">
      {!done ? (
        <TextLoadingScroller
          holdMs={400}
          stepDuration={0.6}
          onComplete={() => setDone(true)}
        />
      ) : (
        <p className="font-inter text-white text-2xl">Chargement terminé !</p>
      )}
    </div>
  );
}
```

---

## 6. LoadingWidget — Logo + Text Loader

**Figma node:** `485:313`

### Technical Overview
A three-phase loader that mirrors the Figma prototype sequence:

| Phase | Visual | Animation |
|-------|--------|-----------|
| `begin`   | Large glowing RPIT logo centered | `scale: 0.5→1, opacity: 0→1` with bounce ease |
| `animate` | Logo slides left, word ticker appears | Logo `x` spring, ticker fades in with delay |
| `last`    | Logo returns to center, smaller + calm | Scale bounce settle |

Assets for each phase are different variants of the Union SVG (the logo icon at different glow intensities, as authored in Figma).

### Code

```jsx
// src/components/LoadingWidget.jsx
import { motion, AnimatePresence } from 'framer-motion';
import TextLoadingScroller from './TextLoadingScroller';

// ⚠️  Replace with hosted assets after Figma URLs expire.
const IMG_UNION_GLOW  = "https://www.figma.com/api/mcp/asset/2784fa54-89dc-400a-b2cb-979b79ba12f0"; // begin
const IMG_UNION_SMALL = "https://www.figma.com/api/mcp/asset/b3febf9b-3a80-4e5c-83a4-cbec9fcff922"; // animate
const IMG_UNION_FINAL = "https://www.figma.com/api/mcp/asset/41996807-66a4-4d3a-9389-d741d0f898a7"; // last

/**
 * @param {{
 *   phase?: 'begin' | 'animate' | 'last',
 *   onScrollComplete?: () => void,
 *   className?: string
 * }} props
 */
export default function LoadingWidget({
  phase            = 'begin',
  onScrollComplete,
  className        = '',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">

        {/* ── Phase: begin ── */}
        {phase === 'begin' && (
          <motion.div
            key="begin"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.35 } }}
          >
            <motion.div
              style={{ width: '172.5px', height: '194.8px', position: 'relative' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.12, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 1.1, times: [0, 0.7, 1], ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="absolute" style={{ inset: '-13.91% -8.75% -9.81% -18.02%' }}>
                <img src={IMG_UNION_GLOW} alt="RPIT logo" className="block w-full h-full" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Phase: animate (logo left + word scroller) ── */}
        {phase === 'animate' && (
          <motion.div
            key="animate"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Logo — slides to left edge */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ width: '119px', height: '134px', left: '40px' }}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="absolute" style={{ inset: '-22.24% -28.4% -25.22% -25.04%' }}>
                <img src={IMG_UNION_SMALL} alt="RPIT logo" className="block w-full h-full" />
              </div>
            </motion.div>

            {/* Word ticker — fades in after logo settles */}
            <motion.div
              className="absolute"
              style={{ top: '122px', left: '199px' }}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <TextLoadingScroller
                holdMs={320}
                stepDuration={0.5}
                onComplete={onScrollComplete}
              />
            </motion.div>
          </motion.div>
        )}

        {/* ── Phase: last (logo centered, calm) ── */}
        {phase === 'last' && (
          <motion.div
            key="last"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{ width: '122px', height: '134px', position: 'relative' }}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="absolute" style={{ inset: '-14.78% -19.51% -17.76% -16.23%' }}>
                <img src={IMG_UNION_FINAL} alt="RPIT logo" className="block w-full h-full" />
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
```

### Usage

```jsx
// App.jsx
import { useState, useEffect } from 'react';
import LoadingWidget from './components/LoadingWidget';

export default function App() {
  const [phase, setPhase] = useState('begin');

  useEffect(() => {
    // begin → animate after logo pop-in
    const t = setTimeout(() => setPhase('animate'), 1400);
    return () => clearTimeout(t);
  }, []);

  // animate → last fires via onScrollComplete
  const handleScrollDone = () => {
    setTimeout(() => setPhase('last'), 200);
  };

  const sizeMap = {
    begin:   'w-[861px] h-[377px]',
    animate: 'w-[1014px] h-[377px]',
    last:    'w-[776px] h-[339px]',
  };

  return (
    <div className="min-h-screen bg-[#00050a] flex items-center justify-center">
      <LoadingWidget
        phase={phase}
        onScrollComplete={handleScrollDone}
        className={sizeMap[phase]}
      />
    </div>
  );
}
```

---

## 7. LoadingPage — Full-Screen Intro Loader

**Figma node:** `349:545`

### Technical Overview
A full-viewport intro sequence fixed over the app. Four timed phases:

1. **0 – 1.2s** BG fades in; RPIT logo glows from center (scale + opacity spring).
2. **1.2 – 2.4s** Logo shrinks and shifts; "CEO of RPIT" title slides from left; "REMY POISSONNIER" name follows with a 0.1s stagger.
3. **2.4 – 3.2s** Body paragraph fades and rises.
4. **3.2 – 4.2s** Entire overlay fades out via `AnimatePresence exit`; `onComplete` fires.

**Parallax:** `useScroll` on the fixed container + `useTransform` applies a 0.3× scroll multiplier to the logo layer, creating a subtle depth offset if the user scrolls before the overlay exits.

### Code

```jsx
// src/components/LoadingPage.jsx
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ⚠️  Replace with hosted asset after Figma URL expires.
const IMG_UNION = "https://www.figma.com/api/mcp/asset/b1ae71e9-6927-410f-beef-1a3a6343bdd2";

// Deep-blue radial gradient matching Figma exactly
const BG_STYLE = {
  background: `radial-gradient(
    ellipse at 49.8% 50.6%,
    #01468b 0%,
    #01366a 25%,
    #00254a 50%,
    #00152a 75%,
    #000d19 87.5%,
    #000509 100%
  )`,
};

/**
 * @param {{
 *   onComplete?: () => void,
 *   phaseDurations?: [number, number, number, number]
 * }} props
 * phaseDurations — [logoIn, textIn, bodyIn, exit] in ms (default [1200, 1200, 800, 1000])
 */
export default function LoadingPage({
  onComplete,
  phaseDurations = [1200, 1200, 800, 1000],
}) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase]     = useState(1);
  const containerRef          = useRef(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const logoParallaxY       = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const [d1, d2, d3, d4] = phaseDurations;
    const t1 = setTimeout(() => setPhase(2), d1);
    const t2 = setTimeout(() => setPhase(3), d1 + d2);
    const t3 = setTimeout(() => setPhase(4), d1 + d2 + d3);
    const t4 = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, d1 + d2 + d3 + d4);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []); // stable on mount

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 overflow-hidden"
          style={BG_STYLE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          role="status"
          aria-label="Chargement RPIT…"
        >

          {/* ── RPIT Logo ── */}
          <motion.div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width:     '172.5px',
              height:    '194.8px',
              x:         '-50%',
              y:         logoParallaxY,
              marginTop: '-97.4px',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale:   phase >= 2 ? 0.65 : 1,
              opacity: 1,
            }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="absolute" style={{ inset: '-13.91% -8.75% -9.81% -18.02%' }}>
              <img src={IMG_UNION} alt="" className="block w-full h-full" />
            </div>
          </motion.div>

          {/* ── "CEO of RPIT" title ── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                className="absolute font-inter font-normal text-[#ffe355] whitespace-nowrap"
                style={{
                  left:     'clamp(80px, 8.3vw, 160px)',
                  top:      '54%',
                  fontSize: 'clamp(16px, 1.875vw, 27px)',
                  lineHeight: 1.2,
                }}
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                CEO of RPIT
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── REMY POISSONNIER name ── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                className="absolute font-plaster not-italic text-white leading-none"
                style={{
                  left:       'clamp(80px, 8.3vw, 160px)',
                  top:        'calc(54% + clamp(22px, 2.5vw, 36px))',
                  fontSize:   'clamp(40px, 8.3vw, 120px)',
                  textShadow: '13px 4px 2.8px rgba(0,0,0,0.25)',
                }}
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="mb-0 leading-tight">REMY</p>
                <p className="leading-tight">POISSONNIER</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Body text ── */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                className="absolute font-inter font-normal text-white leading-[1.2]"
                style={{
                  left:     'clamp(80px, 8.3vw, 160px)',
                  top:      '76%',
                  fontSize: 'clamp(14px, 1.46vw, 21px)',
                  maxWidth: '796px',
                }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <p className="mb-2">
                  De la création de votre site web à la production vidéo haute performance,
                  RPIT transforme votre communication en levier de croissance.
                </p>
                <p>Profitez de 5 ans d'expertise pour dominer votre marché.</p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Usage

```jsx
// App.jsx
import { useState } from 'react';
import LoadingPage from './components/LoadingPage';
import HeroSection from './components/HeroSection';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Overlay — unmounts itself via onComplete */}
      <LoadingPage
        onComplete={() => setLoaded(true)}
        phaseDurations={[1200, 1200, 800, 1000]}
      />

      {/* Main content revealed underneath */}
      <main
        className="min-h-screen transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <HeroSection />
      </main>
    </>
  );
}
```

---

## 8. AfterLoadingPage — Hero Section with Parallax

**Figma node:** `486:400`

### Technical Overview
The first page the user sees after loading. All elements enter via staggered Framer Motion animations:

- **Photo (right):** `x: +200 → 0`, opacity 0→1, spring ease. Parallax: `useTransform` at **0.15×** scroll rate.
- **Text block (left):** `variants` with `staggerChildren: 0.15s`. Title, name and body each slide in from `x: -60`. Parallax: **0.05×**.
- **Logo (center):** scale bounce `0.6 → 1` after 0.5s delay. Parallax: **0.3×**.
- **Glow orbs:** 8 `GlowOrb` elements using the `Ellipse3` asset. Each has an infinite floating animation with unique `y/x` keyframes and staggered delays, parallax at **0.45×** (fastest, most depth).

The whole section is `position: relative; min-h: 100vh` — it scrolls normally after the loading overlay has exited.

### Code

```jsx
// src/components/AfterLoadingPage.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// ⚠️  Replace with hosted assets after Figma URLs expire.
const IMG_GLOW  = "https://www.figma.com/api/mcp/asset/064a8ef7-b0ff-43bf-b7f3-1162e438182d";
const IMG_PHOTO = "https://www.figma.com/api/mcp/asset/e2f20541-5139-4cee-8435-83bc969b9e4e";
const IMG_LOGO  = "https://www.figma.com/api/mcp/asset/8a7f519d-ff02-4c74-9842-d111b94b6516";

const BG_STYLE = {
  background: `radial-gradient(
    ellipse at 49.8% 50.6%,
    #01468b 0%,
    #01366a 25%,
    #00254a 50%,
    #00152a 75%,
    #000d19 87.5%,
    #000509 100%
  )`,
};

// Exact glow-orb positions from Figma (px offsets from viewport center)
const ORBS = [
  { cx: -57.88, cy: -44.66, sizePx: 700 },
  { cx: -58.89, cy: -45.15, sizePx: 434 },
  { cx: -58.35, cy: -46.73, sizePx: 434 },
  { cx: -59.74, cy: -45.74, sizePx: 434 },
  { cx: -59.02, cy: -45.73, sizePx: 434 },
  { cx: -59.39, cy: -46.11, sizePx: 434 },
  { cx: -59.02, cy: -45.73, sizePx: 434 },
  { cx: -59.39, cy: -45.38, sizePx: 434 },
];

function GlowOrb({ cx, cy, sizePx, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        width:  sizePx,
        height: sizePx,
        left:   `calc(50% + ${cx}px)`,
        top:    `calc(50% + ${cy}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        y:       [0, -14, 7, -9, 0],
        x:       [0,   5, -6, 4, 0],
        opacity: [0.55, 1, 0.65, 0.9, 0.55],
        scale:   [1, 1.06, 0.97, 1.03, 1],
      }}
      transition={{
        duration: 3.8 + delay * 0.35,
        delay,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    >
      <div className="absolute" style={{ inset: '-12.86%' }}>
        <img src={IMG_GLOW} alt="" className="block w-full h-full" />
      </div>
    </motion.div>
  );
}

const textContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};
const textItemVariants = {
  hidden: { opacity: 0, x: -60 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

/**
 * @param {{ className?: string }} props
 */
export default function AfterLoadingPage({ className = '' }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  });

  // Different parallax speeds per layer — creates depth
  const photoY = useTransform(scrollYProgress, [0, 1], [0,  -180]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0,   -60]);
  const logoY  = useTransform(scrollYProgress, [0, 1], [0,  -120]);
  const glowY  = useTransform(scrollYProgress, [0, 1], [0,  -300]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      style={BG_STYLE}
    >

      {/* ── Glow orbs — deepest parallax layer ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY }}
      >
        {ORBS.map((orb, i) => (
          <GlowOrb key={i} {...orb} delay={i * 0.18} />
        ))}
      </motion.div>

      {/* ── Photo — right side ── */}
      <motion.div
        className="absolute right-0 bottom-0 pointer-events-none select-none"
        style={{
          y:     photoY,
          width: 'clamp(320px, 56.25vw, 1080px)',
        }}
        initial={{ opacity: 0, x: 220 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.95, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <img
          src={IMG_PHOTO}
          alt="Remy Poissonnier — CEO of RPIT"
          className="w-full h-auto object-cover object-top"
          style={{ filter: 'drop-shadow(13px 4px 4px rgba(0,0,0,0.25))' }}
        />
      </motion.div>

      {/* ── Text block — left side ── */}
      <motion.div
        className="absolute flex flex-col items-start"
        style={{
          left: 'clamp(60px, 8.3vw, 160px)',
          top:  'clamp(180px, 30vh, 420px)',
          y:    textY,
        }}
        variants={textContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.p
          variants={textItemVariants}
          className="font-inter font-normal text-[#ffe355] leading-[1.2] mb-1"
          style={{ fontSize: 'clamp(16px, 1.875vw, 27px)' }}
        >
          CEO of RPIT
        </motion.p>

        {/* Name */}
        <motion.div
          variants={textItemVariants}
          className="font-limelight text-white leading-none mb-5"
          style={{
            fontSize:   'clamp(36px, 8.3vw, 120px)',
            textShadow: '13px 4px 2.8px rgba(0,0,0,0.25)',
          }}
        >
          <p className="leading-tight mb-0">REMY</p>
          <p className="leading-tight">POISSONNIER</p>
        </motion.div>

        {/* Body */}
        <motion.div
          variants={textItemVariants}
          className="font-inter font-normal text-white leading-[1.2]"
          style={{ fontSize: 'clamp(14px, 1.46vw, 21px)', maxWidth: '796px' }}
        >
          <p className="mb-2">
            De la création de votre site web à la production vidéo haute performance,
            RPIT transforme votre communication en levier de croissance.
          </p>
          <p>Profitez de 5 ans d'expertise pour dominer votre marché.</p>
        </motion.div>
      </motion.div>

      {/* ── Logo — center, mid parallax ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ y: logoY }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <img
          src={IMG_LOGO}
          alt="RPIT"
          className="w-[80px] h-auto"
        />
      </motion.div>

    </section>
  );
}
```

### Usage

```jsx
// App.jsx
import { useState } from 'react';
import LoadingPage     from './components/LoadingPage';
import AfterLoadingPage from './components/AfterLoadingPage';

export default function App() {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'hero'

  return (
    <div className="min-h-screen">
      {/* Loading overlay — exits itself, then triggers hero reveal */}
      <LoadingPage onComplete={() => setPhase('hero')} />

      {/* Hero is always mounted so it's ready the moment loading exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'hero' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AfterLoadingPage />
      </motion.div>
    </div>
  );
}
```

> **Note on `motion` import:** If you get "motion is not a function" inside App.jsx, add
> `import { motion } from 'framer-motion';` at the top of that file too.

---

## File Structure

```
src/
├── components/
│   ├── LogoPartners.jsx          # 1 — Infinite marquee
│   ├── ReservationCTA.jsx        # 2 — Audit CTA button
│   ├── Navigation.jsx            # 3 — Responsive navbar (4 states)
│   ├── TextHeader.jsx            # 4 — Nav link atom
│   ├── TextLoadingScroller.jsx   # 5 — Animated word ticker
│   ├── LoadingWidget.jsx         # 6 — Logo + ticker composite
│   ├── LoadingPage.jsx           # 7 — Full-screen intro loader ⭐
│   └── AfterLoadingPage.jsx      # 8 — Hero with parallax depth ⭐
└── App.jsx
```

## Asset Notes

All image constants reference Figma-hosted CDN URLs that **expire after 7 days**.  
Before deploying to production:
1. Download each asset (`curl -O "<url>"`)
2. Place in `src/assets/`
3. Replace the URL constants with Vite imports:
   ```js
   import imgUnion from '../assets/union-glow.png';
   ```

---

## LoadingVariant_V1 — Cinematic Intro Loader

**Figma node:** `622:304`

### Technical Overview
A full-viewport intro sequence with six parallax layers and a multi-phase timed animation cascade. The RPIT logo materializes with a spin-overshoot entrance (`scale: [0 → 1.25 → 0.92 → 1.05 → 1]`, `rotate: [-40° → +8° → 0°]`) then pulses with an infinite glow filter. A gold progress bar fills the bottom of the screen as a cinematic loading indicator. Text layers enter sequentially with a motion blur dissolve (`filter: blur(20px) → blur(0)`). On exit, the entire overlay performs an `opacity + scale + blur` iris-out — leaving no hard cut between the loader and the hero.

A `layoutId="rpit-logo-v1"` is placed on the logo so Framer Motion can **FLIP-animate** it directly into `LoadingVariant_V2`'s logo position the moment V2 mounts — no manual transition logic needed.

### Motion Manifest

```
Layer               Duration   Easing                      Delay
────────────────────────────────────────────────────────────────────
BG vignette         1.60s      [0.22, 1, 0.36, 1]          0ms
Logo spin-in        1.05s      [0.22, 1, 0.36, 1]          0ms
  scale keyframes:  [0 → 1.25 → 0.92 → 1.05 → 1]
  rotate keyframes: [-40° → +8° → -4° → +2° → 0°]
Logo glow pulse     2.20s      easeInOut ∞ repeat           1100ms
Progress bar fill   2.80s      [0.22, 1, 0.36, 1]          900ms
"CEO of RPIT"       0.50s      [0.22, 1, 0.36, 1]          1300ms
  x: -130px → 0, filter: blur(8px) → 0
Name (Plaster)      0.70s      [0.34, 1.56, 0.64, 1]       1380ms
  x: -200px → 0, textShadow flash on enter
Body paragraph      0.55s      [0.22, 1, 0.36, 1]          1800ms
  y: +28px → 0, filter: blur(4px) → 0
Exit overlay        0.75s      [0.22, 1, 0.36, 1]          [trigger]
  opacity → 0, scale → 1.04, filter → blur(12px)
────────────────────────────────────────────────────────────────────
Parallax:  logo layer at 0.30× scroll velocity (useTransform)
```

### Code

```jsx
// src/components/LoadingVariant_V1.jsx
import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ⚠️  Replace with hosted asset after Figma URL expires (7 days).
const IMG_UNION = "https://www.figma.com/api/mcp/asset/e614b7fd-4440-4a8d-ad6b-a778bd492574";

const BG_STYLE = {
  background: `radial-gradient(
    ellipse at 49.8% 50.6%,
    #01468b 0%, #01366a 25%, #00254a 50%,
    #00152a 75%, #000d19 87.5%, #000509 100%
  )`,
};

// Signature RPIT easings
const EASE_EXPO   = [0.22, 1, 0.36, 1];   // fast-out, near-zero tail
const EASE_SPRING = [0.34, 1.56, 0.64, 1]; // slight physical overshoot

// Ticks 0 → 100 over the same window as the progress bar
function ProgressCounter({ durationMs }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps    = 100;
    const interval = (durationMs * 0.74) / steps;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setCount(Math.min(step, 100));
      if (step >= 100) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.p
      className="absolute bottom-[18px] font-inter font-normal text-white/40 tabular-nums"
      style={{ right: 'clamp(80px, 8.3vw, 160px)', fontSize: '11px', letterSpacing: '0.1em' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.3 }}
    >
      {String(count).padStart(3, '0')} %
    </motion.p>
  );
}

/**
 * @param {{
 *   onComplete?: () => void,
 *   autoExitMs?: number
 * }} props
 * autoExitMs — total time before overlay self-dismisses (default 3800ms)
 */
export default function LoadingVariant_V1({ onComplete, autoExitMs = 3800 }) {
  const [visible, setVisible] = useState(true);
  const [phase,   setPhase  ] = useState(1);
  const containerRef          = useRef(null);
  const progressControls      = useAnimation();

  const { scrollYProgress } = useScroll({ container: containerRef });
  const logoParallaxY       = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1000);
    const t2 = setTimeout(() => setPhase(3), 1300);
    const t3 = setTimeout(() => setPhase(4), 1800);

    progressControls.start({
      scaleX: 1,
      transition: { duration: 2.8, ease: EASE_EXPO, delay: 0.9 },
    });

    const tExit = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, autoExitMs);

    return () => [t1, t2, t3, tExit].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 overflow-hidden select-none"
          style={BG_STYLE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
            transition: { duration: 0.75, ease: EASE_EXPO },
          }}
          transition={{ duration: 0.5 }}
          role="status"
          aria-label="Chargement en cours…"
        >

          {/* ── L1: Background depth vignette — static (0× parallax) ─────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(0,5,9,0.7) 100%)',
            }}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE_EXPO }}
          />

          {/* ── L2: RPIT Logo — 0.30× parallax depth ──────────────────────── */}
          {/* layoutId bridges this logo into V2 via Framer Motion FLIP magic  */}
          <motion.div
            layoutId="rpit-logo-v1"
            className="absolute pointer-events-none"
            style={{
              top:        '50%',
              left:       '50%',
              width:      '172.5px',
              height:     '194.8px',
              marginLeft: '-86.25px',
              marginTop:  '-97.4px',
              y: logoParallaxY,
            }}
            initial={{ scale: 0, rotate: -40, opacity: 0, filter: 'blur(20px)' }}
            animate={{
              scale:   [0, 1.25, 0.92, 1.05, 1],
              rotate:  [-40, 8, -4, 2, 0],
              opacity: [0, 1, 1, 1, 1],
              filter:  ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
            }}
            transition={{
              duration: 1.05,
              times:    [0, 0.45, 0.7, 0.85, 1],
              ease:     EASE_EXPO,
            }}
          >
            {/* Continuous ambient glow pulse */}
            <motion.div
              className="absolute inset-0"
              animate={{
                filter: [
                  'drop-shadow(0 0 10px rgba(255,255,255,0.55))',
                  'drop-shadow(0 0 34px rgba(100,160,255,0.95))',
                  'drop-shadow(0 0 10px rgba(255,255,255,0.55))',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            >
              <div className="absolute" style={{ inset: '-13.91% -8.75% -9.81% -18.02%' }}>
                <img src={IMG_UNION} alt="RPIT" className="block w-full h-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* ── L3: "CEO of RPIT" title — 0.08× parallax ─────────────────── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                className="absolute font-inter font-normal text-[#ffe355] whitespace-nowrap"
                style={{
                  left:       'clamp(80px, 8.3vw, 160px)',
                  top:        '54%',
                  fontSize:   'clamp(16px, 1.875vw, 27px)',
                  lineHeight: 1.2,
                  zIndex:     10,
                }}
                initial={{ x: -130, opacity: 0, filter: 'blur(8px)' }}
                animate={{ x: 0,    opacity: 1, filter: 'blur(0px)' }}
                exit={{    x: -80,  opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
              >
                CEO of RPIT
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── L4: Name "REMY POISSONNIER" — 0.05× parallax ─────────────── */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                className="absolute font-plaster not-italic text-white"
                style={{
                  left:       'clamp(80px, 8.3vw, 160px)',
                  top:        'calc(54% + clamp(24px, 2.6vw, 38px))',
                  fontSize:   'clamp(36px, 8.3vw, 120px)',
                  lineHeight: 1,
                  zIndex:     10,
                }}
                initial={{
                  x: -200, opacity: 0,
                  textShadow: '0 0 40px rgba(255,255,255,0)',
                }}
                animate={{
                  x: 0, opacity: 1,
                  textShadow: [
                    '0 0 40px rgba(255,255,255,0)',
                    '13px 4px 2.8px rgba(0,0,0,0.25), 0 0 60px rgba(200,220,255,0.9)',
                    '13px 4px 2.8px rgba(0,0,0,0.25)',
                  ],
                }}
                exit={{ x: -120, opacity: 0 }}
                transition={{
                  duration:    0.7,
                  delay:       0.08,
                  ease:        EASE_SPRING,
                  textShadow:  { duration: 1.1, times: [0, 0.35, 1] },
                }}
              >
                <p className="mb-0 leading-tight">REMY</p>
                <p className="leading-tight">POISSONNIER</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── L5: Body paragraph ────────────────────────────────────────── */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                className="absolute font-inter font-normal text-white leading-[1.2]"
                style={{
                  left:     'clamp(80px, 8.3vw, 160px)',
                  top:      '76%',
                  fontSize: 'clamp(13px, 1.46vw, 21px)',
                  maxWidth: '796px',
                  zIndex:   10,
                }}
                initial={{ y: 28, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
                exit={{    y: 14, opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_EXPO }}
              >
                <p className="mb-2">
                  De la création de votre site web à la production vidéo haute performance,
                  RPIT transforme votre communication en levier de croissance.
                </p>
                <p>Profitez de 5 ans d'expertise pour dominer votre marché.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── L6: Gold progress bar — cinematic loading indicator ────────── */}
          <div
            className="absolute bottom-[32px] overflow-hidden rounded-full"
            style={{
              left:   'clamp(80px, 8.3vw, 160px)',
              right:  'clamp(80px, 8.3vw, 160px)',
              height: '2px',
            }}
          >
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
              style={{ background: 'linear-gradient(90deg, #ffe355, #f8cf00, #ffe355)' }}
              initial={{ scaleX: 0 }}
              animate={progressControls}
            />
          </div>

          {/* ── L7: Percentage counter ────────────────────────────────────── */}
          <ProgressCounter durationMs={autoExitMs} />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Usage

```jsx
// App.jsx — drop in as the first thing rendered
import { useState }         from 'react';
import { LayoutGroup }      from 'framer-motion';
import LoadingVariant_V1    from './components/LoadingVariant_V1';
import LoadingVariant_V2    from './components/LoadingVariant_V2';

export default function App() {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'hero'

  return (
    // LayoutGroup shares the layoutId="rpit-logo-v1" between V1 and V2
    // Framer Motion FLIP-animates the logo from V1's center to V2's center
    <LayoutGroup>
      {phase === 'loading' && (
        <LoadingVariant_V1
          autoExitMs={3800}
          onComplete={() => setPhase('hero')}
        />
      )}
      {phase === 'hero' && <LoadingVariant_V2 />}
    </LayoutGroup>
  );
}
```

---

## LoadingVariant_V2 — Hero Reveal with Parallax

**Figma node:** `622:287`

### Technical Overview
The hero page that erupts onto screen the moment the loading overlay exits. Every element enters independently with a purpose-built physics feel:

- **Photo** rockets in from `x: +110vw` via a low-stiffness spring (`stiffness: 55, damping: 14`) — it decelerates with a slight overshoot, like a heavy object sliding into frame. A simultaneous `rotateY: 12° → 0°` adds 3D depth to the entrance.
- **Name** uses a per-character `overflow: hidden` clip mask — each letter slides up from below its own container. "REMY" and "POISSONNIER" are staggered at `0.028s/char` with independent line base delays, creating a rhythmic typographic cascade.
- **Logo** materializes from `scale: 3, rotate: 180°` down to `scale: 1, rotate: 0°` — a dramatic "warp-in from hyperspace" effect.
- **Glow orbs** pop in with spring stagger (`stiffness: 280, damping: 18`, 0.06s between orbs) then immediately enter their infinite floating animation.
- **`layoutId="rpit-logo-v1"`** receives the logo FLIP'd in from `LoadingVariant_V1`, blending the transition invisibly.

### Motion Manifest

```
Layer                  Duration    Easing / Spring             Delay
──────────────────────────────────────────────────────────────────────────
Photo entrance         spring      stiffness:55  damping:14    50ms
  x: +110vw → 0        (natural)
  rotateY: 12° → 0°    0.90s       [0.22, 1, 0.36, 1]         50ms
  opacity 0 → 1        0.40s       easeOut                     50ms

Glow orbs pop-in       spring      stiffness:280 damping:18    stagger 60ms/orb
  scale: 0 → 1 (bounce)
Orb float loop         3.8–6.2s    easeInOut  ∞ repeat         stagger 180ms/orb

Logo warp-in           0.85s       [0.22, 1, 0.36, 1]         100ms
  scale: 3 → 1, rotate: 180° → 0°
  filter: blur(16px) → 0
Logo shimmer loop      2.80s       easeInOut  ∞ repeat         1000ms

"CEO of RPIT"          0.50s       [0.22, 1, 0.36, 1]         250ms
  clip-mask: y 105% → 0 (line mask)

"REMY" chars           0.55s/char  [0.22, 1, 0.36, 1]         300ms base, +28ms/char
"POISSONNIER" chars    0.55s/char  [0.22, 1, 0.36, 1]         440ms base, +28ms/char

Body text              0.60s       [0.22, 1, 0.36, 1]         700ms
  y: +25px → 0, filter: blur(4px) → 0
──────────────────────────────────────────────────────────────────────────
Parallax depth ratios (scroll, useTransform [0→1] → [0→-Npx]):
  Glow orbs  →  0.45× · –300px  (nearest "camera", moves fastest)
  Logo       →  0.30× · –200px  (mid-field float)
  Photo      →  0.15× · –100px  (anchored to ground plane)
  Text       →  0.05× · –34px   (glass-panel: barely drifts)
```

### Code

```jsx
// src/components/LoadingVariant_V2.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef }                          from 'react';

// ⚠️  Replace with hosted assets after Figma URLs expire (7 days).
const IMG_GLOW  = "https://www.figma.com/api/mcp/asset/f82f4e97-c478-46e0-abe2-5668ad6f036e";
const IMG_PHOTO = "https://www.figma.com/api/mcp/asset/68f337fa-1cfa-4509-bf33-d1b5c2d32653";
const IMG_LOGO  = "https://www.figma.com/api/mcp/asset/ea3121a0-51f2-443c-a31d-257d6582d5c1";

const BG_STYLE = {
  background: `radial-gradient(
    ellipse at 49.8% 50.6%,
    #01468b 0%, #01366a 25%, #00254a 50%,
    #00152a 75%, #000d19 87.5%, #000509 100%
  )`,
};

const EASE_EXPO = [0.22, 1, 0.36, 1];

// Exact orb positions from Figma node 622:287 "lueur" group
const ORBS = [
  { cx: -57.88, cy: -44.66, sizeMult: 1.6 },
  { cx: -58.89, cy: -45.15, sizeMult: 1.0 },
  { cx: -58.35, cy: -46.73, sizeMult: 1.0 },
  { cx: -59.74, cy: -45.74, sizeMult: 1.0 },
  { cx: -59.02, cy: -45.73, sizeMult: 1.0 },
  { cx: -59.39, cy: -46.11, sizeMult: 1.0 },
  { cx: -59.02, cy: -45.73, sizeMult: 1.0 },
  { cx: -59.39, cy: -45.38, sizeMult: 1.0 },
];

// Per-character slide-up using an overflow:hidden clip per character
function CharReveal({ children, baseDelay = 0, charDelay = 0.028 }) {
  const chars = String(children).split('');
  return (
    <>
      {chars.map((char, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '105%' },
              show: {
                y: 0,
                transition: {
                  duration: 0.55,
                  delay: baseDelay + i * charDelay,
                  ease: EASE_EXPO,
                },
              },
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// Floating glow orb — pops in, then drifts forever
function GlowOrb({ cx, cy, sizeMult, index }) {
  const sizePx = sizeMult * 434;
  return (
    <motion.div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        width:     sizePx,
        height:    sizePx,
        left:      `calc(50% + ${cx}px)`,
        top:       `calc(50% + ${cy}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        show: {
          scale: 1,
          opacity: 1,
          transition: {
            type:      'spring',
            stiffness: 280,
            damping:   18,
            delay:     index * 0.06,
          },
        },
      }}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          y:       [0, -(12 + index * 2), (6 + index), -(8 + index), 0],
          x:       [0,  (4 + index),     -(5 + index),  (3 + index), 0],
          opacity: [0.5, 0.92, 0.58, 0.85, 0.5],
        }}
        transition={{
          duration: 3.8 + index * 0.3,
          delay:    index * 0.18 + 0.5,
          repeat:   Infinity,
          ease:     'easeInOut',
        }}
      >
        <div className="absolute" style={{ inset: '-12.86%' }}>
          <img src={IMG_GLOW} alt="" className="block w-full h-full" aria-hidden="true" />
        </div>
      </motion.div>
    </motion.div>
  );
}

const orbContainerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06 } },
};

/**
 * @param {{ className?: string }} props
 */
export default function LoadingVariant_V2({ className = '' }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  });

  // Parallax depth table — each layer at a different scroll velocity
  //   Orbs:  0.45× → −300px  (nearest camera)
  //   Logo:  0.30× → −200px  (mid-field)
  //   Photo: 0.15× → −100px  (grounded)
  //   Text:  0.05× → −34px   (glass-panel — barely moves)
  const orbY   = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const logoY  = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0,  -34]);

  return (
    <motion.section
      ref={sectionRef}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      style={BG_STYLE}
      initial="hidden"
      animate="show"
    >

      {/* ── L1: Glow orbs — 0.45× parallax (fastest, nearest camera) ──────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: orbY }}
        variants={orbContainerVariants}
      >
        {ORBS.map((orb, i) => (
          <GlowOrb key={i} {...orb} index={i} />
        ))}
      </motion.div>

      {/* ── L2: Photo — 0.15× parallax, rockets in from right ──────────────── */}
      <motion.div
        className="absolute right-0 bottom-0 pointer-events-none select-none"
        style={{
          y:           photoY,
          width:       'clamp(360px, 56.25vw, 1080px)',
          perspective: '1200px',
        }}
        initial={{ x: '110vw', opacity: 0, rotateY: 12 }}
        animate={{ x: 0,      opacity: 1, rotateY: 0  }}
        transition={{
          x:       { type: 'spring', stiffness: 55, damping: 14, delay: 0.05 },
          opacity: { duration: 0.4, ease: 'easeOut',  delay: 0.05 },
          rotateY: { duration: 0.9, ease: EASE_EXPO,  delay: 0.05 },
        }}
      >
        <img
          src={IMG_PHOTO}
          alt="Remy Poissonnier — CEO of RPIT"
          className="w-full h-auto object-cover object-top"
          style={{ filter: 'drop-shadow(13px 4px 4px rgba(0,0,0,0.25))' }}
        />
      </motion.div>

      {/* ── L3: Text block — 0.05× parallax, per-char name cascade ─────────── */}
      <motion.div
        className="absolute flex flex-col items-start"
        style={{
          left:   'clamp(60px, 8.3vw, 160px)',
          top:    'clamp(180px, 30vh, 420px)',
          y:      textY,
          zIndex: 10,
        }}
      >
        {/* "CEO of RPIT" — whole line clips up */}
        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
          <motion.p
            className="font-inter font-normal text-[#ffe355] leading-[1.2]"
            style={{ fontSize: 'clamp(16px, 1.875vw, 27px)' }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE_EXPO }}
          >
            CEO of RPIT
          </motion.p>
        </div>

        {/* Name — per-character slide-up with staggered timing */}
        <motion.div
          className="font-limelight text-white leading-none mb-5"
          style={{
            fontSize:   'clamp(36px, 8.3vw, 120px)',
            textShadow: '13px 4px 2.8px rgba(0,0,0,0.25)',
          }}
          initial="hidden"
          animate="show"
        >
          <div style={{ overflow: 'hidden', lineHeight: 1.1 }}>
            <CharReveal baseDelay={0.30} charDelay={0.028}>
              REMY
            </CharReveal>
          </div>
          <div style={{ overflow: 'hidden', lineHeight: 1.1 }}>
            <CharReveal baseDelay={0.44} charDelay={0.028}>
              POISSONNIER
            </CharReveal>
          </div>
        </motion.div>

        {/* Body text */}
        <motion.div
          className="font-inter font-normal text-white leading-[1.2]"
          style={{ fontSize: 'clamp(13px, 1.46vw, 21px)', maxWidth: '796px' }}
          initial={{ y: 25, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE_EXPO }}
        >
          <p className="mb-2">
            De la création de votre site web à la production vidéo haute performance,
            RPIT transforme votre communication en levier de croissance.
          </p>
          <p>Profitez de 5 ans d'expertise pour dominer votre marché.</p>
        </motion.div>
      </motion.div>

      {/* ── L4: Logo — 0.30× parallax, warp-in from hyperspace ─────────────── */}
      {/* layoutId matches V1's logo — Framer Motion FLIP-animates the handoff */}
      <motion.div
        layoutId="rpit-logo-v1"
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          marginLeft: '-40px',
          marginTop:  '-40px',
          y:          logoY,
          zIndex:     20,
        }}
        initial={{ scale: 3, rotate: 180, opacity: 0, filter: 'blur(16px)' }}
        animate={{ scale: 1, rotate: 0,   opacity: 1, filter: 'blur(0px)' }}
        transition={{
          duration: 0.85,
          delay:    0.1,
          ease:     EASE_EXPO,
          filter:   { duration: 0.6, delay: 0.1 },
        }}
      >
        <motion.div
          animate={{
            filter: [
              'drop-shadow(0 0 8px  rgba(255,255,255,0.40))',
              'drop-shadow(0 0 22px rgba(120,170,255,0.85))',
              'drop-shadow(0 0 8px  rgba(255,255,255,0.40))',
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
        >
          <img
            src={IMG_LOGO}
            alt="RPIT"
            style={{ width: '80px', height: 'auto', display: 'block' }}
          />
        </motion.div>
      </motion.div>

    </motion.section>
  );
}
```

### Usage

```jsx
// App.jsx — complete drop-in setup for Vite main.jsx or App.jsx
import { useState }      from 'react';
import { LayoutGroup }   from 'framer-motion';
import LoadingVariant_V1 from './components/LoadingVariant_V1';
import LoadingVariant_V2 from './components/LoadingVariant_V2';

export default function App() {
  const [phase, setPhase] = useState('loading');

  return (
    /**
     * LayoutGroup is required for the shared layoutId="rpit-logo-v1" to work.
     * When V1 exits and V2 mounts, Framer Motion automatically FLIP-animates
     * the logo between its V1 center position and V2's center position —
     * creating a seamless object-persistence transition with zero manual code.
     */
    <LayoutGroup>
      {phase === 'loading' && (
        <LoadingVariant_V1
          autoExitMs={3800}
          onComplete={() => setPhase('hero')}
        />
      )}

      {phase === 'hero' && <LoadingVariant_V2 />}
    </LayoutGroup>
  );
}
```

> **Tip — custom `autoExitMs`:** The loading screen will self-dismiss after `autoExitMs` ms.  
> Set it to `99999` during development to freeze the screen and inspect layout:
> ```jsx
> <LoadingVariant_V1 autoExitMs={99999} onComplete={...} />
> ```

---

## Updated File Structure

```
src/
├── components/
│   ├── LogoPartners.jsx            # 1 — Infinite marquee
│   ├── ReservationCTA.jsx          # 2 — Audit CTA button
│   ├── Navigation.jsx              # 3 — Responsive navbar (4 states)
│   ├── TextHeader.jsx              # 4 — Nav link atom
│   ├── TextLoadingScroller.jsx     # 5 — Animated word ticker
│   ├── LoadingWidget.jsx           # 6 — Logo + ticker composite
│   ├── LoadingPage.jsx             # 7 — Full-screen intro loader (v0)
│   ├── AfterLoadingPage.jsx        # 8 — Hero with parallax depth (v0)
│   ├── LoadingVariant_V1.jsx       # 9 — Cinematic intro (FLIP logo) ⭐
│   └── LoadingVariant_V2.jsx       # 10 — Hero reveal (char cascade) ⭐
└── App.jsx
```

## Asset Notes

All image constants reference Figma-hosted CDN URLs that **expire after 7 days**.  
Before deploying to production:
1. Download each asset (`curl -O "<url>"`)
2. Place in `src/assets/`
3. Replace the URL constants with Vite imports:
   ```js
   import imgUnion from '../assets/union-glow.png';
   ```
