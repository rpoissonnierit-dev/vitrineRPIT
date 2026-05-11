/**
 * ═══════════════════════════════════════════════════════════════
 *  RPIT — Textes du site  (langue : Français)
 *  Fichier : src/i18n/fr.js
 * ═══════════════════════════════════════════════════════════════
 *
 *  CE FICHIER contient TOUS les textes visibles sur le site.
 *  Pour modifier un texte : trouvez la clé correspondante,
 *  changez uniquement la valeur entre guillemets, sauvegardez.
 *
 *  Structure :
 *    loading        →  Écran de chargement (avant l'arrivée sur la page)
 *    nav            →  Barre de navigation (liens du menu)
 *    hero           →  Section principale (nom, titre, description)
 *    stats          →  Chiffres clés (visibilité, conversion)
 *    partners       →  Logos des clients / partenaires
 *    cta            →  Bouton "Réserver mon audit" (milieu de page)
 *    references     →  Section Portfolio / Références
 *    commitment     →  Promesse des 21 jours
 *    contact        →  Section de contact (bas de page)
 *    footer         →  Pied de page (menu, adresse, réseaux sociaux)
 *    seo            →  Textes invisibles mais lus par Google
 *    errors         →  Messages d'erreur (problème technique)
 * ═══════════════════════════════════════════════════════════════
 */

const fr = {

  // ─────────────────────────────────────────────────────────────
  //  ÉCRAN DE CHARGEMENT
  //  Ces mots défilent un par un avant que le site apparaisse.
  //  Ils représentent les services proposés par RPIT.
  //  ⚠️  Ne pas dépasser 12 caractères par mot (sinon débordement).
  // ─────────────────────────────────────────────────────────────
  loading: {
    // Mot d'accueil — premier mot affiché
    welcome:    'Bienvenue',

    // Nom de la marque
    brand:      'RPIT',

    // Services défilants (dans l'ordre d'apparition)
    service1:   'Sites',
    service2:   'Logos',
    service3:   'Design',
    service4:   'Créations',

    // Message lu par les lecteurs d'écran pendant le chargement
    ariaLabel:  'Chargement RPIT…',
  },


  // ─────────────────────────────────────────────────────────────
  //  NAVIGATION
  //  Liens affichés dans la barre de menu (en haut de page).
  // ─────────────────────────────────────────────────────────────
  nav: {
    home:       'Accueil',
    solutions:  'Solutions',
    portfolio:  'Portfolio',
    contact:    'Contact',

    // Bouton d'appel à l'action dans la barre de navigation
    ctaButton:  'Audit offert',
  },


  // ─────────────────────────────────────────────────────────────
  //  SECTION PRINCIPALE (HERO)
  //  Première chose visible après le chargement.
  // ─────────────────────────────────────────────────────────────
  hero: {
    // Titre de la fonction (affiché en jaune, au-dessus du nom)
    jobTitle:   'CEO de RPIT',

    // Prénom et nom — chaque mot sur sa propre ligne
    firstName:  'REMY',
    lastName:   'POISSONNIER',

    // Phrase de présentation (sous le nom)
    description:
      'Le design pour l\'image, le SEO pour la croissance. ' +
      'Depuis 5 ans, je transforme ma passion pour le web en ' +
      'leviers de performance mesurables pour mes partenaires.',

    // Bouton visible uniquement sur mobile / tablette
    mobileCtaButton: 'Réserver mon audit offert',

    // Texte discret en bas de page pour inviter à défiler
    scrollHint: 'Scroll',

    // Description de la photo pour les non-voyants et Google Images
    photoAlt:
      'Remy Poissonnier, fondateur de RPIT — ' +
      'expert création site web et SEO à Bouchain, Nord',
  },


  // ─────────────────────────────────────────────────────────────
  //  CHIFFRES CLÉS  (section "Solutions")
  //  Mis en avant juste après la section principale.
  // ─────────────────────────────────────────────────────────────
  stats: {
    // Titre accrocheur avec les pourcentages
    headline:
      'Augmentez votre visibilité de 60 % et votre taux de conversion jusqu\'à 40 %.',

    // Paragraphe d'explication sous le titre
    body:
      '5 ans d\'expertise au service de votre croissance. ' +
      'J\'accompagne les entreprises dans leur transformation ' +
      'digitale avec des résultats visibles dès la 3e semaine.',
  },


  // ─────────────────────────────────────────────────────────────
  //  PARTENAIRES / CLIENTS
  //  Logos qui défilent en boucle.
  // ─────────────────────────────────────────────────────────────
  partners: {
    // Textes alternatifs des logos (lus par les lecteurs d'écran)
    renaultAlt: 'Renault Group — client RPIT création site web',
    danserAlt:  'Danser — partenaire RPIT',
    citelivAlt: 'CitéLiv — partenaire RPIT',
  },


  // ─────────────────────────────────────────────────────────────
  //  BOUTON CTA  (milieu de page)
  //  Invitation à réserver un audit — apparaît deux fois :
  //  une fois sobrement au centre, et une fois en bas de page.
  // ─────────────────────────────────────────────────────────────
  cta: {
    reserveAudit: 'Réserver mon audit offert',
  },


  // ─────────────────────────────────────────────────────────────
  //  PORTFOLIO / RÉFÉRENCES
  //  Section présentant les travaux passés.
  // ─────────────────────────────────────────────────────────────
  references: {
    // Titre de la section
    title:    'Références & Expertises',

    // Texte explicatif (le portfolio est en cours de mise à jour)
    body:
      'Actuellement en cours de mise à jour, mon portfolio reflète ' +
      '5 ans de collaborations avec des acteurs majeurs de l\'industrie.',
  },


  // ─────────────────────────────────────────────────────────────
  //  ENGAGEMENT  (promesse des 21 jours)
  //  Mise en avant de la garantie de résultats rapides.
  // ─────────────────────────────────────────────────────────────
  commitment: {
    // Phrase centrale — la promesse principale
    promise:
      'Mon engagement : Un site livré et des premiers ' +
      'résultats concrets sous 21 jours.',
  },


  // ─────────────────────────────────────────────────────────────
  //  CONTACT  (bas de page, avant le footer)
  //  Dernière section avec un bouton et une icône de mail.
  // ─────────────────────────────────────────────────────────────
  contact: {
    // Question accrocheur pour engager le visiteur
    headline:   'Prêt à booster votre chiffre d\'affaires ?',

    // Paragraphe d'explication
    body:
      'L\'audit de votre communication est la première étape ' +
      'vers votre succès digital. Discutons de votre projet ' +
      'lors d\'un appel de 15 minutes.',

    // Bouton principal
    ctaButton:  'Réserver mon audit offert',

    // Adresse e-mail de contact (aussi utilisée comme lien mailto:)
    email:      'rpoissonnier.it@gmail.com',
  },


  // ─────────────────────────────────────────────────────────────
  //  PIED DE PAGE  (fond blanc, tout en bas)
  // ─────────────────────────────────────────────────────────────
  footer: {
    // ── Colonne 1 : Menu ──────────────────────────────────────
    menuHeading:  'Menu',
    // (Les liens reprennent les mêmes textes que nav.* ci-dessus)

    // ── Colonne 2 : Bureau (coordonnées) ─────────────────────
    bureauHeading:  'Bureau',
    city:           'Bouchain, 59111',
    email:          'rpoissonnier.it@gmail.com',

    // ── Colonne 3 : Réseaux sociaux ───────────────────────────
    socialHeading:  'Social',
    facebook:       'Facebook',
    instagram:      'Instagram',
    linkedin:       'LinkedIn',

    // URLs des profils sociaux
    facebookUrl:    'https://www.facebook.com/profile.php?id=61589549072639',
    instagramUrl:   'https://www.instagram.com/',
    linkedinUrl:    'https://www.linkedin.com/in/remy-poissonnier/',

    // ── Colonne 4 : Sélecteur de langue ──────────────────────────
    langHeading:  'Langue',
    langFr:       'FR — Français',
    langEn:       'EN — English',

    // Grand texte décoratif tout en bas
    bigLogoText:    'RPIT',
  },


  // ─────────────────────────────────────────────────────────────
  //  SEO  (textes invisibles, mais lus par Google)
  //  Ces textes influencent le référencement naturel.
  //  ⚠️  Modifier avec soin — ils impactent votre position Google.
  // ─────────────────────────────────────────────────────────────
  seo: {
    // Onglet du navigateur et titre dans les résultats Google
    pageTitle:
      'Création Site Web & SEO | Remy Poissonnier — RPIT',

    // Description affichée sous le titre dans Google (150–160 caractères)
    metaDescription:
      'Création de sites web sur-mesure, référencement SEO et ' +
      'identité visuelle. +60 % de visibilité dès la 3e semaine. ' +
      'Audit offert — Remy Poissonnier, RPIT, Bouchain (59).',

    // Mots-clés (utiles pour Bing, Yandex)
    metaKeywords:
      'création site web, référencement SEO, agence web freelance, ' +
      'web designer freelance, identité visuelle, logo, ' +
      'site web professionnel, Bouchain, Nord, Hauts-de-France, ' +
      'Remy Poissonnier, RPIT',

    // Titre partagé sur Facebook / LinkedIn / WhatsApp
    ogTitle:
      'Création Site Web & SEO | Remy Poissonnier — RPIT',

    // Description partagée sur les réseaux sociaux
    ogDescription:
      'Sites web sur-mesure, SEO et identité visuelle. ' +
      '+60 % de visibilité dès la 3e semaine. ' +
      'Audit offert — RPIT, Bouchain (Nord).',

    // Texte alternatif de l'image partagée sur les réseaux
    ogImageAlt:
      'Remy Poissonnier, fondateur de RPIT — agence création site web et SEO',

    // Description courte pour Twitter / X
    twitterDescription:
      'Sites web sur-mesure, SEO et identité visuelle. ' +
      '+60 % de visibilité dès la 3e semaine. Audit offert.',

    // Description JSON-LD (lue par Google pour l'affichage enrichi)
    businessDescription:
      'Agence digitale freelance spécialisée en création de sites web ' +
      'sur-mesure, référencement SEO, design graphique et identité ' +
      'visuelle. 5 ans d\'expertise. Résultats visibles dès la 3e semaine.',

    // Présentation courte de Remy Poissonnier (pour Google Knowledge Panel)
    personDescription:
      'Développeur web et expert SEO freelance basé à Bouchain (Nord). ' +
      'Fondateur de RPIT, j\'accompagne les entreprises dans leur ' +
      'transformation digitale depuis 5 ans.',

    // Descriptions des services (affichées dans les résultats Google enrichis)
    serviceWebsite:
      'Sites web professionnels sur-mesure, optimisés pour la performance, ' +
      'le SEO et la conversion. Livraison en 21 jours.',

    serviceSEO:
      'Stratégies SEO avancées pour améliorer votre positionnement ' +
      'Google et générer un trafic qualifié et durable.',

    serviceIdentity:
      'Création de logo, charte graphique et identité visuelle ' +
      'cohérente pour renforcer votre image de marque.',

    serviceAudit:
      'Audit gratuit de votre communication digitale — ' +
      'appel découverte de 15 minutes sans engagement.',
  },


  // ─────────────────────────────────────────────────────────────
  //  MESSAGES D'ERREUR
  //  Affichés uniquement si le site rencontre un problème technique.
  // ─────────────────────────────────────────────────────────────
  errors: {
    // Titre de la page d'erreur
    title:      'Une erreur est survenue',

    // Message générique si aucun détail n'est disponible
    fallback:   'Quelque chose s\'est mal passé.',

    // Bouton pour relancer la page
    retryButton: 'Réessayer',
  },

};

export default fr;
