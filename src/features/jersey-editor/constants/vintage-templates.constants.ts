import type { JerseyTemplatePreset } from '../types/jersey-template.types';

/**
 * Phase 8.4: Vintage Football Jersey Collection (10 Authentic Retro Kits)
 * Inspired by iconic 1980s, 1990s, and early 2000s football kits.
 * Direct sublimation & screenprint styling with zero text protection boxes.
 */
export const VINTAGE_JERSEY_TEMPLATES: JerseyTemplatePreset[] = [
  // 1. vintage-80s-classic: 80s Classic Collar
  {
    id: 'vintage-80s-classic',
    name: '80s Classic Collar',
    category: 'vintage',
    description: 'Wide heritage fold collar with contrast bisban piping, clean chest drape, and classic 80s football typography',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E3A8A"/>
      <!-- Shoulder & chest piping -->
      <path d="M0 24 L100 24" stroke="#FFFFFF" stroke-width="2"/>
      <path d="M0 28 L100 28" stroke="#F59E0B" stroke-width="1"/>
      <!-- Wide 80s fold collar -->
      <path d="M30 0 L40 18 L50 24 L60 18 L70 0 L58 0 L50 14 L42 0 Z" fill="#FFFFFF"/>
      <path d="M40 18 L50 24 L60 18" stroke="#F59E0B" stroke-width="1.5"/>
      <!-- Direct print typography -->
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif" letter-spacing="1.5">HOLSTEN</text>
      <!-- Contrast sleeve cuffs -->
      <rect x="0" y="88" width="10" height="12" fill="#FFFFFF"/>
      <rect x="90" y="88" width="10" height="12" fill="#FFFFFF"/>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E3A8A"/>
      <path d="M0 24 L100 24" stroke="#FFFFFF" stroke-width="2"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">LINEKER</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#1E3A8A',   // Heritage Deep Royal Blue
      secondary: '#FFFFFF', // Clean White
      stripe: '#F59E0B',    // Amber Gold trim
      collar: '#FFFFFF',    // Wide White Collar
      sleeve: '#1E3A8A',    // Royal Blue Sleeves
      accent: '#F59E0B',    // Gold Accents
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-80s-panel',
        orientation: 'panel',
        surface: 'front',
        count: 1,
        thickness: 14,
        spacing: 0,
        positionX: 512,
        positionY: 240,
        color: '#FFFFFF',
        secondaryColor: '#F59E0B',
        opacity: 0.9,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#1E3A8A',
      accentColor: '#FFFFFF',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#1E3A8A',
      accentColor: '#FFFFFF',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'TOTTENHAM SC', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'HOLSTEN', color: '#FFFFFF', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'LINEKER', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 2. vintage-90s-geometric: 90s Geometric
  {
    id: 'vintage-90s-geometric',
    name: '90s Geometric',
    category: 'vintage',
    description: 'Iconic 1990 tournament stepped zigzag chevron facets across chest with dynamic retro contrast trim',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8FAFC"/>
      <!-- Stepped 90s chevron zigzag ribbon -->
      <path d="M0 26 L25 42 L50 26 L75 42 L100 26 L100 36 L75 52 L50 36 L25 52 L0 36 Z" fill="#000000"/>
      <path d="M0 36 L25 52 L50 36 L75 52 L100 36 L100 46 L75 62 L50 46 L25 62 L0 46 Z" fill="#DC2626"/>
      <path d="M0 46 L25 62 L50 46 L75 62 L100 46 L100 54 L75 70 L50 54 L25 70 L0 54 Z" fill="#F59E0B"/>
      <!-- V-neck collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#000000" stroke-width="4"/>
      <!-- Direct print typography with shadow -->
      <text x="50" y="80" fill="#0F172A" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">DEUTSCHLAND</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8FAFC"/>
      <!-- Mirrored chevron ribbons on upper back -->
      <path d="M0 16 L25 30 L50 16 L75 30 L100 16 L100 24 L75 38 L50 24 L25 38 L0 24 Z" fill="#000000"/>
      <path d="M0 24 L25 38 L50 24 L75 38 L100 24 L100 32 L75 46 L50 32 L25 46 L0 32 Z" fill="#DC2626"/>
      <text x="50" y="24" fill="#0F172A" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">MATTHÄUS</text>
      <text x="50" y="70" fill="#0F172A" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#F8FAFC',   // Vintage White
      secondary: '#DC2626', // Scarlet Red
      stripe: '#000000',    // Black Facets
      collar: '#000000',    // Black Collar
      sleeve: '#F8FAFC',    // White Sleeves
      accent: '#F59E0B',    // Gold Trim
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-90s-geom',
        orientation: 'retro-geometric',
        surface: 'both',
        count: 4,
        thickness: 190,
        spacing: 0,
        positionX: 512,
        positionY: 380,
        color: '#000000',
        secondaryColor: '#DC2626',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'retro-geometric',
      primaryColor: '#F8FAFC',
      accentColor: '#DC2626',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'retro-geometric',
      primaryColor: '#F8FAFC',
      accentColor: '#DC2626',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'DEUTSCHLAND', color: '#0F172A', fontSize: 28, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'CONTINENTAL', color: '#0F172A', fontSize: 40, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'MATTHÄUS', color: '#0F172A', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#0F172A', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 3. vintage-90s-sublimated: 90s All-Over Print
  {
    id: 'vintage-90s-sublimated',
    name: '90s All-Over Sublimation',
    category: 'vintage',
    description: 'All-over woven jacquard damask diamond weave texture with rich 90s emerald and gold athletic trim',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#065F46"/>
      <!-- Jacquard diamond repeat matrix -->
      <pattern id="v-jacq-front" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="8,0 16,8 8,16 0,8" fill="#047857" opacity="0.65"/>
        <polygon points="8,4 12,8 8,12 4,8" fill="#10B981" opacity="0.45"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#v-jacq-front)"/>
      <!-- V-neck collar & shoulder bands -->
      <path d="M40 0 L50 16 L60 0" stroke="#F59E0B" stroke-width="4"/>
      <path d="M43 0 L50 12 L57 0" stroke="#FFFFFF" stroke-width="2"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">SHARP</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#065F46"/>
      <pattern id="v-jacq-back" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="8,0 16,8 8,16 0,8" fill="#047857" opacity="0.65"/>
        <polygon points="8,4 12,8 8,12 4,8" fill="#10B981" opacity="0.45"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#v-jacq-back)"/>
      <text x="50" y="24" fill="#F59E0B" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">CANTONA</text>
      <text x="50" y="64" fill="#F59E0B" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">7</text>
    </svg>`,
    defaultColors: {
      primary: '#065F46',   // Deep Vintage Emerald
      secondary: '#10B981', // Jade Green
      stripe: '#34D399',    // Mint Damask
      collar: '#F59E0B',    // Amber Gold Collar
      sleeve: '#065F46',    // Emerald Sleeves
      accent: '#FFFFFF',    // Crisp White Accent
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-sublimated',
        orientation: 'tonal-jacquard',
        surface: 'both',
        count: 1,
        thickness: 44,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#10B981',
        secondaryColor: 'rgba(255, 255, 255, 0.3)',
        opacity: 0.85,
      },
    ],
    defaultLeftSleeve: {
      type: 'tonal-jacquard',
      primaryColor: '#065F46',
      accentColor: '#10B981',
      thickness: 36,
    },
    defaultRightSleeve: {
      type: 'tonal-jacquard',
      primaryColor: '#065F46',
      accentColor: '#10B981',
      thickness: 36,
    },
    defaultText: {
      frontTeamName: { text: 'UNITED FC', color: '#F59E0B', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'SHARP', color: '#FFFFFF', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'CANTONA', color: '#F59E0B', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '7', color: '#F59E0B', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 4. vintage-retro-hoops: Retro Hoops
  {
    id: 'vintage-retro-hoops',
    name: 'Retro Hoops',
    category: 'vintage',
    description: 'Classic European broad horizontal hoop bands, ribbed collar, and authentic vintage sleeve band detailing',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#15803D"/>
      <!-- Curved horizontal hoops -->
      <path d="M0 22 Q50 28 100 22 L100 36 Q50 42 0 36 Z" fill="#FFFFFF"/>
      <path d="M0 50 Q50 56 100 50 L100 64 Q50 70 0 64 Z" fill="#FFFFFF"/>
      <path d="M0 78 Q50 84 100 78 L100 92 Q50 98 0 92 Z" fill="#FFFFFF"/>
      <!-- Vintage amber pinstripe divider -->
      <path d="M0 21 Q50 27 100 21" stroke="#EAB308" stroke-width="1.5" fill="none"/>
      <path d="M0 49 Q50 55 100 49" stroke="#EAB308" stroke-width="1.5" fill="none"/>
      <!-- Ribbed collar -->
      <path d="M38 0 L50 16 L62 0" stroke="#FFFFFF" stroke-width="5"/>
      <text x="50" y="44" fill="#15803D" font-size="8" font-weight="900" text-anchor="middle" font-family="sans-serif">CR SMITH</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#15803D"/>
      <path d="M0 22 Q50 28 100 22 L100 36 Q50 42 0 36 Z" fill="#FFFFFF"/>
      <path d="M0 50 Q50 56 100 50 L100 64 Q50 70 0 64 Z" fill="#FFFFFF"/>
      <path d="M0 78 Q50 84 100 78 L100 92 Q50 98 0 92 Z" fill="#FFFFFF"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">LARSSON</text>
      <text x="50" y="66" fill="#EAB308" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">7</text>
    </svg>`,
    defaultColors: {
      primary: '#15803D',   // Celtic Forest Green
      secondary: '#FFFFFF', // Pure White
      stripe: '#FFFFFF',    // White Hoops
      collar: '#FFFFFF',    // White Rib Collar
      sleeve: '#15803D',    // Green Sleeves
      accent: '#EAB308',    // Heritage Yellow Trim
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-hoops',
        orientation: 'horizontal',
        surface: 'both',
        count: 4,
        thickness: 90,
        spacing: 120,
        positionX: 512,
        positionY: 512,
        color: '#FFFFFF',
        secondaryColor: '#EAB308',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'horizontal-stripes',
      primaryColor: '#15803D',
      accentColor: '#FFFFFF',
      stripeCount: 3,
      thickness: 26,
    },
    defaultRightSleeve: {
      type: 'horizontal-stripes',
      primaryColor: '#15803D',
      accentColor: '#FFFFFF',
      stripeCount: 3,
      thickness: 26,
    },
    defaultText: {
      frontTeamName: { text: 'CELTIC GLASGOW', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'CR SMITH', color: '#15803D', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'LARSSON', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '7', color: '#EAB308', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 5. vintage-vertical-stripes: Heritage Stripes
  {
    id: 'vintage-vertical-stripes',
    name: 'Heritage Stripes',
    category: 'vintage',
    description: 'Multi-gauge rhythmic vertical stripes with authentic flanking pinstripes and classic monochrome prestige',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#09090B"/>
      <!-- Multi-gauge vertical stripes -->
      <rect x="18" width="16" height="100" fill="#F4F4F5"/>
      <rect x="36" width="4" height="100" fill="#F4F4F5"/>
      <rect x="42" width="16" height="100" fill="#F4F4F5"/>
      <rect x="60" width="4" height="100" fill="#F4F4F5"/>
      <rect x="66" width="16" height="100" fill="#F4F4F5"/>
      <!-- Gold pinstripe accent -->
      <line x1="18" y1="0" x2="18" y2="100" stroke="#D97706" stroke-width="1.5"/>
      <line x1="82" y1="0" x2="82" y2="100" stroke="#D97706" stroke-width="1.5"/>
      <!-- Vintage fold collar -->
      <path d="M38 0 L50 16 L62 0" stroke="#D97706" stroke-width="4"/>
      <text x="50" y="58" fill="#D97706" font-size="8" font-weight="900" text-anchor="middle" font-family="sans-serif">SONY</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#09090B"/>
      <rect x="18" width="16" height="100" fill="#F4F4F5"/>
      <rect x="42" width="16" height="100" fill="#F4F4F5"/>
      <rect x="66" width="16" height="100" fill="#F4F4F5"/>
      <text x="50" y="24" fill="#F4F4F5" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">DEL PIERO</text>
      <text x="50" y="64" fill="#D97706" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#09090B',   // Onyx Black
      secondary: '#F4F4F5', // Heritage White
      stripe: '#F4F4F5',    // White Multi-width Stripes
      collar: '#D97706',    // Amber Gold Trim Collar
      sleeve: '#09090B',    // Black Sleeves
      accent: '#D97706',    // Warm Amber Gold
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-multi-v',
        orientation: 'multi-width-stripes',
        surface: 'both',
        count: 5,
        thickness: 72,
        spacing: 40,
        positionX: 512,
        positionY: 512,
        color: '#F4F4F5',
        secondaryColor: '#D97706',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'multi-width-stripes',
      primaryColor: '#09090B',
      accentColor: '#F4F4F5',
      stripeCount: 3,
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'multi-width-stripes',
      primaryColor: '#09090B',
      accentColor: '#F4F4F5',
      stripeCount: 3,
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'TURIN JUVENTUS', color: '#F4F4F5', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'SONY', color: '#D97706', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'DEL PIERO', color: '#F4F4F5', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#D97706', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 6. vintage-cream-heritage: Cream Heritage
  {
    id: 'vintage-cream-heritage',
    name: 'Cream Heritage',
    category: 'vintage',
    description: 'Off-white ivory cream base with forest pine green and rich burgundy heritage trim details',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FDFBF7"/>
      <!-- Forest pine & burgundy collar piping -->
      <path d="M0 24 L100 24" stroke="#14532D" stroke-width="3"/>
      <path d="M0 28 L100 28" stroke="#831843" stroke-width="1.5"/>
      <!-- Vintage jacquard lattice background -->
      <pattern id="v-cream-grid" width="12" height="12" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="12" y2="12" stroke="#E2D9C8" stroke-width="1"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#v-cream-grid)" opacity="0.4"/>
      <!-- Heritage polo placket -->
      <path d="M42 0 L50 14 L58 0" stroke="#14532D" stroke-width="4"/>
      <line x1="50" y1="14" x2="50" y2="28" stroke="#14532D" stroke-width="2.5"/>
      <circle cx="50" cy="20" r="1.5" fill="#831843"/>
      <text x="50" y="58" fill="#14532D" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">JVC</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FDFBF7"/>
      <path d="M0 24 L100 24" stroke="#14532D" stroke-width="3"/>
      <text x="50" y="24" fill="#831843" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">BERGKAMP</text>
      <text x="50" y="64" fill="#14532D" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#FDFBF7',   // Vintage Ivory Cream
      secondary: '#14532D', // Deep Forest Green
      stripe: '#831843',    // Vintage Burgundy
      collar: '#14532D',    // Forest Pine Collar
      sleeve: '#FDFBF7',    // Cream Sleeves
      accent: '#831843',    // Burgundy Accent
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-cream-jacq',
        orientation: 'tonal-jacquard',
        surface: 'both',
        count: 1,
        thickness: 38,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#E2D9C8',
        secondaryColor: '#14532D',
        opacity: 0.35,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#FDFBF7',
      accentColor: '#14532D',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#FDFBF7',
      accentColor: '#14532D',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'HIGHBURY SC', color: '#14532D', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'JVC', color: '#14532D', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'BERGKAMP', color: '#831843', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#14532D', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 7. vintage-90s-colorblock: 90s Color Block
  {
    id: 'vintage-90s-colorblock',
    name: '90s Color Block',
    category: 'vintage',
    description: 'Iconic mid-90s asymmetric shoulder wedge color blocking with bold dynamic cut-and-sew panels',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1D4ED8"/>
      <!-- Asymmetric shoulder color wedge -->
      <polygon points="0,0 72,0 0,55" fill="#DC2626"/>
      <polygon points="0,55 72,0 78,0 0,60" fill="#FFFFFF"/>
      <!-- Opposite flank color block -->
      <polygon points="100,65 75,100 100,100" fill="#DC2626"/>
      <!-- V-neck collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#FFFFFF" stroke-width="4"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8" font-weight="900" text-anchor="middle" font-family="sans-serif">EQUIPMENT</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1D4ED8"/>
      <!-- Mirrored back shoulder wedge -->
      <polygon points="100,0 28,0 100,55" fill="#DC2626"/>
      <polygon points="100,55 28,0 22,0 100,60" fill="#FFFFFF"/>
      <polygon points="0,65 25,100 0,100" fill="#DC2626"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">KLINSMANN</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">18</text>
    </svg>`,
    defaultColors: {
      primary: '#1D4ED8',   // Royal Cobalt Blue
      secondary: '#DC2626', // Scarlet Red
      stripe: '#FFFFFF',    // Crisp White Piping
      collar: '#FFFFFF',    // White Collar
      sleeve: '#1D4ED8',    // Blue Sleeves
      accent: '#FFFFFF',    // White Trim
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-colorblock',
        orientation: 'colorblock',
        surface: 'both',
        count: 1,
        thickness: 160,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#DC2626',
        secondaryColor: '#FFFFFF',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'colorblock',
      primaryColor: '#1D4ED8',
      accentColor: '#DC2626',
      thickness: 28,
    },
    defaultRightSleeve: {
      type: 'colorblock',
      primaryColor: '#1D4ED8',
      accentColor: '#DC2626',
      thickness: 28,
    },
    defaultText: {
      frontTeamName: { text: 'BAVARIA SC', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'EQUIPMENT', color: '#FFFFFF', fontSize: 40, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'KLINSMANN', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '18', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 8. vintage-polo-collar: Retro Polo Collar
  {
    id: 'vintage-polo-collar',
    name: 'Retro Polo Collar',
    category: 'vintage',
    description: 'Fold-over polo collar with placket detailing, ribbed cuffs, and iconic 90s Theatre of Dreams red and black palette',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#991B1B"/>
      <!-- Vintage fold-over polo collar & placket -->
      <path d="M28 0 L40 16 L50 20 L60 16 L72 0 L58 0 L50 12 L42 0 Z" fill="#0F172A"/>
      <rect x="47" y="18" width="6" height="14" fill="#0F172A"/>
      <circle cx="50" cy="22" r="1.2" fill="#F59E0B"/>
      <circle cx="50" cy="28" r="1.2" fill="#F59E0B"/>
      <!-- Black & white chest band -->
      <path d="M0 38 L100 38" stroke="#0F172A" stroke-width="4"/>
      <path d="M0 42 L100 42" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">VODAFONE</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#991B1B"/>
      <path d="M0 38 L100 38" stroke="#0F172A" stroke-width="4"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">BECKHAM</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">7</text>
    </svg>`,
    defaultColors: {
      primary: '#991B1B',   // Deep Crimson Red
      secondary: '#0F172A', // Obsidian Black
      stripe: '#0F172A',    // Black Band
      collar: '#0F172A',    // Black Polo Collar
      sleeve: '#991B1B',    // Crimson Sleeves
      accent: '#F59E0B',    // Amber Gold Trim
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-polo-chest',
        orientation: 'panel',
        surface: 'front',
        count: 1,
        thickness: 24,
        spacing: 0,
        positionX: 512,
        positionY: 340,
        color: '#0F172A',
        secondaryColor: '#FFFFFF',
        opacity: 0.9,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#991B1B',
      accentColor: '#0F172A',
      thickness: 26,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#991B1B',
      accentColor: '#0F172A',
      thickness: 26,
    },
    defaultText: {
      frontTeamName: { text: 'RED DEVILS', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'VODAFONE', color: '#FFFFFF', fontSize: 42, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'BECKHAM', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '7', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 9. vintage-diagonal-sash: Classic Diagonal Sash
  {
    id: 'vintage-diagonal-sash',
    name: 'Classic Diagonal Sash',
    category: 'vintage',
    description: 'Prestige 55-degree heritage sash traversing from shoulder to waist flank with sharp contrast double pinstripes',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FAFAFA"/>
      <!-- Diagonal red sash with dark borders -->
      <polygon points="20,0 46,0 100,68 100,94" fill="#E11D48"/>
      <line x1="20" y1="0" x2="100" y2="68" stroke="#18181B" stroke-width="1.5"/>
      <line x1="46" y1="0" x2="100" y2="94" stroke="#18181B" stroke-width="1.5"/>
      <!-- V-neck collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#18181B" stroke-width="4"/>
      <text x="50" y="58" fill="#18181B" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">QUILMES</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FAFAFA"/>
      <!-- Mirrored diagonal sash on back -->
      <polygon points="80,0 54,0 0,68 0,94" fill="#E11D48"/>
      <line x1="80" y1="0" x2="0" y2="68" stroke="#18181B" stroke-width="1.5"/>
      <line x1="54" y1="0" x2="0" y2="94" stroke="#18181B" stroke-width="1.5"/>
      <text x="50" y="24" fill="#18181B" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">CRESPO</text>
      <text x="50" y="64" fill="#E11D48" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">9</text>
    </svg>`,
    defaultColors: {
      primary: '#FAFAFA',   // Heritage White
      secondary: '#E11D48', // Scarlet Crimson Sash
      stripe: '#E11D48',    // Sash Color
      collar: '#18181B',    // Black Collar
      sleeve: '#FAFAFA',    // White Sleeves
      accent: '#18181B',    // Black Accent
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-sash',
        orientation: 'sash',
        surface: 'both',
        count: 1,
        thickness: 140,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#E11D48',
        secondaryColor: '#18181B',
        opacity: 1,
        angle: -45,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#FAFAFA',
      accentColor: '#E11D48',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#FAFAFA',
      accentColor: '#E11D48',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'RIVER PLATE', color: '#18181B', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'QUILMES', color: '#18181B', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'CRESPO', color: '#18181B', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '9', color: '#E11D48', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 10. vintage-minimal-2000s: Early 2000s Minimal
  {
    id: 'vintage-minimal-2000s',
    name: 'Early 2000s Minimal',
    category: 'vintage',
    description: 'Turn-of-the-millennium ergonomic curved side panels, dynamic piping, and silver athletic graphite accents',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E293B"/>
      <!-- Ergonomic curved 2000s side flank panels -->
      <path d="M0 24 Q18 50 12 100 L0 100 Z" fill="#0EA5E9"/>
      <path d="M100 24 Q82 50 88 100 L100 100 Z" fill="#0EA5E9"/>
      <!-- Contrast athletic piping along seams -->
      <path d="M0 24 Q18 50 12 100" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
      <path d="M100 24 Q82 50 88 100" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
      <!-- Modern crossover collar -->
      <path d="M38 0 L50 14 L62 0" stroke="#0EA5E9" stroke-width="4"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">O2</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E293B"/>
      <path d="M0 24 Q18 50 12 100 L0 100 Z" fill="#0EA5E9"/>
      <path d="M100 24 Q82 50 88 100 L100 100 Z" fill="#0EA5E9"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">HENRY</text>
      <text x="50" y="64" fill="#0EA5E9" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">14</text>
    </svg>`,
    defaultColors: {
      primary: '#1E293B',   // Slate Graphite
      secondary: '#0EA5E9', // Electric Cyan
      stripe: '#0EA5E9',    // Cyan Flanks
      collar: '#0EA5E9',    // Cyan Collar
      sleeve: '#1E293B',    // Slate Sleeves
      accent: '#FFFFFF',    // Crisp White Trim
    },
    defaultStripes: [
      {
        id: 'stripe-vintage-2000s-flanks',
        orientation: 'side-panel',
        surface: 'both',
        count: 1,
        thickness: 110,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#0EA5E9',
        secondaryColor: '#FFFFFF',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'speed-bars',
      primaryColor: '#1E293B',
      accentColor: '#0EA5E9',
      thickness: 20,
    },
    defaultRightSleeve: {
      type: 'speed-bars',
      primaryColor: '#1E293B',
      accentColor: '#0EA5E9',
      thickness: 20,
    },
    defaultText: {
      frontTeamName: { text: 'LONDON GUNNERS', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'O2', color: '#FFFFFF', fontSize: 46, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'HENRY', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '14', color: '#0EA5E9', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },
];
