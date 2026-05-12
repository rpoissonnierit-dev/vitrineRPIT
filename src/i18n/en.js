/**
 * ═══════════════════════════════════════════════════════════════
 *  RPIT — Website text  (language: English)
 *  File: src/i18n/en.js
 * ═══════════════════════════════════════════════════════════════
 *
 *  This file contains ALL visible text on the website.
 *  To change any text: find the matching key,
 *  edit only the value in quotes, then save.
 *
 *  Structure:
 *    loading        →  Loading screen (plays before the page appears)
 *    nav            →  Navigation bar links
 *    hero           →  Main section (name, title, description)
 *    stats          →  Key figures (visibility, conversion)
 *    partners       →  Client / partner logos
 *    cta            →  "Book my audit" button (mid-page)
 *    references     →  Portfolio / References section
 *    commitment     →  21-day delivery promise
 *    contact        →  Contact section (bottom of page)
 *    footer         →  Footer (menu, address, social links, language)
 *    seo            →  Hidden text read by Google
 *    errors         →  Error messages (technical issues)
 * ═══════════════════════════════════════════════════════════════
 */

const en = {

  // ─────────────────────────────────────────────────────────────
  //  LOADING SCREEN
  //  These words scroll one by one before the site appears.
  //  They represent the services RPIT offers.
  //  ⚠️  Keep each word under 12 characters (or it may overflow).
  // ─────────────────────────────────────────────────────────────
  loading: {
    // Welcome word — first word shown
    welcome:    'Welcome',

    // Brand name
    brand:      'RPIT',

    // Scrolling services (in order of appearance)
    service1:   'Sites',
    service2:   'Logos',
    service3:   'Design',
    service4:   'Creation',

    // Text read by screen readers during loading
    ariaLabel:  'Loading RPIT…',
  },


  // ─────────────────────────────────────────────────────────────
  //  NAVIGATION
  //  Links shown in the navigation bar at the top of the page.
  // ─────────────────────────────────────────────────────────────
  nav: {
    home:       'Home',
    solutions:  'Solutions',
    portfolio:  'Portfolio',
    contact:    'Contact',

    // Call-to-action button inside the navigation bar
    ctaButton:  'Free Audit',

    // Screen-reader accessible labels (aria-label)
    openMenu:   'Open menu',
    closeMenu:  'Close menu',
  },


  // ─────────────────────────────────────────────────────────────
  //  HERO SECTION
  //  First thing visible after the loading screen.
  // ─────────────────────────────────────────────────────────────
  hero: {
    // Job title (shown in yellow, above the name)
    jobTitle:   'CEO of RPIT',

    // First and last name — each word on its own line
    firstName:  'REMY',
    lastName:   'POISSONNIER',

    // Presentation sentence (below the name)
    description:
      'Design for your image, SEO for your growth. ' +
      'For 5 years, I have turned my passion for the web into ' +
      'measurable performance levers for my partners.',

    // Button visible on mobile / tablet only
    mobileCtaButton: 'Book my free audit',

    // Subtle scroll hint at the bottom of the hero
    scrollHint: 'Scroll',

    // Photo description for screen readers and Google Images
    photoAlt:
      'Remy Poissonnier, founder of RPIT — ' +
      'web design and SEO expert based in Bouchain, Northern France',
  },


  // ─────────────────────────────────────────────────────────────
  //  KEY FIGURES  ("Solutions" section)
  //  Displayed just after the hero section.
  // ─────────────────────────────────────────────────────────────
  stats: {
    // Eye-catching headline with percentages
    headline:
      'Boost your visibility by 60 % and your conversion rate by up to 40 %.',

    // Explanatory paragraph below the headline
    body:
      '5 years of expertise at the service of your growth. ' +
      'I support companies through their digital transformation ' +
      'with measurable results from the 3rd week onwards.',
  },


  // ─────────────────────────────────────────────────────────────
  //  PARTNERS / CLIENTS
  //  Logos that loop in an infinite scroll.
  // ─────────────────────────────────────────────────────────────
  partners: {
    // Alternative texts for logos (read by screen readers)
    renaultAlt: 'Renault Group — RPIT web client',
    danserAlt:  'Danser — RPIT partner',
    citelivAlt: 'CitéLiv — RPIT partner',
  },


  // ─────────────────────────────────────────────────────────────
  //  CTA BUTTON  (mid-page)
  //  Invitation to book an audit — appears twice:
  //  once subtly in the centre, once again at the bottom.
  // ─────────────────────────────────────────────────────────────
  cta: {
    reserveAudit: 'Book my free audit',
  },


  // ─────────────────────────────────────────────────────────────
  //  PORTFOLIO / REFERENCES
  //  Section showcasing past work.
  // ─────────────────────────────────────────────────────────────
  references: {
    // Section title
    title:    'References & Expertise',

    // Explanatory text (portfolio is being updated)
    body:
      'Currently being updated, my portfolio reflects ' +
      '5 years of collaborations with major industry players.',
  },


  // ─────────────────────────────────────────────────────────────
  //  COMMITMENT  (21-day delivery promise)
  //  Highlights the fast-results guarantee.
  // ─────────────────────────────────────────────────────────────
  commitment: {
    // Central phrase — the main promise
    promise:
      'My commitment: A website delivered and first concrete ' +
      'results within 21 days.',
  },


  // ─────────────────────────────────────────────────────────────
  //  CONTACT  (bottom of page, before the footer)
  //  Final section with a button and a mail icon.
  // ─────────────────────────────────────────────────────────────
  contact: {
    // Engaging question for the visitor
    headline:   'Ready to grow your revenue?',

    // Explanatory paragraph
    body:
      'Auditing your communication is the first step towards ' +
      'your digital success. Let\'s discuss your project ' +
      'in a 15-minute call.',

    // Main button
    ctaButton:  'Book my free audit',

    // Contact email address (also used as the mailto: link)
    email:      'rpoissonnier.it@gmail.com',

    // Accessible label for the mail icon (screen readers)
    mailIconLabel: 'Send an email to RPIT',
  },


  // ─────────────────────────────────────────────────────────────
  //  FOOTER  (white background, very bottom)
  // ─────────────────────────────────────────────────────────────
  footer: {
    // ── Column 1: Menu ────────────────────────────────────────
    menuHeading:  'Menu',
    // (Links re-use the same text as nav.* above)

    // ── Column 2: Office (contact details) ───────────────────
    bureauHeading:  'Office',
    city:           'Bouchain, 59111 — France',
    email:          'rpoissonnier.it@gmail.com',

    // ── Column 3: Social networks ────────────────────────────
    socialHeading:  'Social',
    facebook:       'Facebook',
    instagram:      'Instagram',
    linkedin:       'LinkedIn',

    // Social profile URLs
    facebookUrl:    'https://www.facebook.com/profile.php?id=61589549072639',
    instagramUrl:   'https://www.instagram.com/',
    linkedinUrl:    'https://www.linkedin.com/in/remy-poissonnier/',

    // ── Column 4: Language switcher ──────────────────────────
    langHeading:  'Language',
    langFr:       'FR — Français',
    langEn:       'EN — English',

    // Large decorative text at the very bottom
    bigLogoText:  'RPIT',
  },


  // ─────────────────────────────────────────────────────────────
  //  SEO  (hidden text, but read by Google)
  //  These texts directly affect your natural search ranking.
  //  ⚠️  Edit with care — they impact your Google position.
  // ─────────────────────────────────────────────────────────────
  seo: {
    // Browser tab and title in Google results
    pageTitle:
      'Web Design & SEO | Remy Poissonnier — RPIT',

    // Description shown below the title in Google (150–160 chars)
    metaDescription:
      'Custom websites, SEO and visual identity. ' +
      '+60 % visibility from week 3. ' +
      'Free audit — Remy Poissonnier, RPIT, Bouchain, France.',

    // Keywords (useful for Bing, Yandex)
    metaKeywords:
      'web design, SEO, freelance web agency, web designer, ' +
      'visual identity, logo, professional website, ' +
      'Bouchain, Nord, Hauts-de-France, France, ' +
      'Remy Poissonnier, RPIT',

    // Title shared on Facebook / LinkedIn / WhatsApp
    ogTitle:
      'Web Design & SEO | Remy Poissonnier — RPIT',

    // Description shared on social networks
    ogDescription:
      'Custom websites, SEO and visual identity. ' +
      '+60 % visibility from week 3. ' +
      'Free audit — RPIT, Bouchain, France.',

    // Alternative text for the shared image on social networks
    ogImageAlt:
      'Remy Poissonnier, founder of RPIT — web design and SEO agency',

    // Short description for Twitter / X
    twitterDescription:
      'Custom websites, SEO and visual identity. ' +
      '+60 % visibility from week 3. Free audit.',

    // JSON-LD description (read by Google for rich results)
    businessDescription:
      'Freelance digital agency specialised in custom website creation, ' +
      'SEO, graphic design and visual identity. ' +
      '5 years of expertise. Results visible from week 3.',

    // Short bio for Remy Poissonnier (for Google Knowledge Panel)
    personDescription:
      'Freelance web developer and SEO expert based in Bouchain, ' +
      'Northern France. Founder of RPIT, I have supported companies ' +
      'through their digital transformation for 5 years.',

    // Service descriptions (shown in Google rich results)
    serviceWebsite:
      'Professional custom websites, optimised for performance, ' +
      'SEO and conversion. Delivered in 21 days.',

    serviceSEO:
      'Advanced SEO strategies to improve your Google ranking ' +
      'and generate qualified, sustainable traffic.',

    serviceIdentity:
      'Logo creation, brand guidelines and consistent visual identity ' +
      'to strengthen your brand image.',

    serviceAudit:
      'Free audit of your digital communication — ' +
      '15-minute discovery call, no commitment.',
  },


  // ─────────────────────────────────────────────────────────────
  //  ERROR MESSAGES
  //  Shown only if the site encounters a technical problem.
  // ─────────────────────────────────────────────────────────────
  errors: {
    // Error page title
    title:      'Something went wrong',

    // Generic message when no detail is available
    fallback:   'An unexpected error occurred.',

    // Button to reload the page
    retryButton: 'Try again',
  },

};

export default en;
