import type { JerseyTemplatePreset } from '../types/jersey-template.types';

/**
 * Phase 8.4: European Elite Club Inspired Collection (10 Kits)
 * Inspired by the visual identity, colors, and design characteristics of top European clubs.
 * Uses generic placeholder crests and sponsors with direct-print typography and zero background boxes.
 */
export const CLUB_JERSEY_TEMPLATES: JerseyTemplatePreset[] = [
  // 1. club-madrid-white-gold: Madrid White Heritage
  {
    id: 'club-madrid-white-gold',
    name: 'Madrid White Heritage',
    category: 'club-inspired',
    description: 'Pristine royal white fabric with brushed royal gold trim, subtle tonal jacquard weave, and regal squad lettering',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8FAFC"/>
      <!-- Subtle gold shoulder stripes -->
      <line x1="16" y1="0" x2="32" y2="22" stroke="#D97706" stroke-width="2"/>
      <line x1="84" y1="0" x2="68" y2="22" stroke="#D97706" stroke-width="2"/>
      <!-- Tonal jacquard sheen overlay -->
      <pattern id="madrid-tonal-front" width="14" height="14" patternUnits="userSpaceOnUse">
        <polygon points="7,0 14,7 7,14 0,7" fill="#E2E8F0" opacity="0.45"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#madrid-tonal-front)"/>
      <!-- Gold & navy V-neck collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#D97706" stroke-width="4"/>
      <path d="M43 0 L50 11 L57 0" stroke="#1E3A8A" stroke-width="1.5"/>
      <!-- Direct print sponsor -->
      <text x="50" y="58" fill="#1E3A8A" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">EMIRATES</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8FAFC"/>
      <pattern id="madrid-tonal-back" width="14" height="14" patternUnits="userSpaceOnUse">
        <polygon points="7,0 14,7 7,14 0,7" fill="#E2E8F0" opacity="0.45"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#madrid-tonal-back)"/>
      <text x="50" y="24" fill="#1E3A8A" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">MODRIĆ</text>
      <text x="50" y="64" fill="#D97706" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#F8FAFC',   // Royal Pristine White
      secondary: '#1E3A8A', // Deep Royal Navy
      stripe: '#D97706',    // Brushed Gold Accent
      collar: '#D97706',    // Gold Collar Trim
      sleeve: '#F8FAFC',    // White Sleeves
      accent: '#1E3A8A',    // Navy Details
    },
    defaultStripes: [
      {
        id: 'stripe-madrid-tonal',
        orientation: 'tonal-jacquard',
        surface: 'both',
        count: 1,
        thickness: 36,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#E2E8F0',
        secondaryColor: 'rgba(217, 119, 6, 0.25)',
        opacity: 0.35,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#F8FAFC',
      accentColor: '#D97706',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#F8FAFC',
      accentColor: '#D97706',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'REAL MADRID CF', color: '#1E3A8A', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'EMIRATES', color: '#1E3A8A', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'MODRIĆ', color: '#1E3A8A', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#D97706', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 2. club-manchester-sky: Manchester Sky Blue
  {
    id: 'club-manchester-sky',
    name: 'Manchester Sky Blue',
    category: 'club-inspired',
    description: 'Iconic Manchester sky blue body with white side panels, navy bisban collar trim, and clean modern championship styling',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#6BA4D9"/>
      <!-- White athletic flank panels -->
      <path d="M0 24 Q14 55 8 100 L0 100 Z" fill="#FFFFFF"/>
      <path d="M100 24 Q86 55 92 100 L100 100 Z" fill="#FFFFFF"/>
      <!-- Navy & white collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#0F172A" stroke-width="4"/>
      <path d="M43 0 L50 11 L57 0" stroke="#FFFFFF" stroke-width="2"/>
      <text x="50" y="58" fill="#0F172A" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">ETIHAD</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#6BA4D9"/>
      <path d="M0 24 Q14 55 8 100 L0 100 Z" fill="#FFFFFF"/>
      <path d="M100 24 Q86 55 92 100 L100 100 Z" fill="#FFFFFF"/>
      <text x="50" y="24" fill="#0F172A" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">DE BRUYNE</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">17</text>
    </svg>`,
    defaultColors: {
      primary: '#6BA4D9',   // Classic Manchester Sky Blue
      secondary: '#FFFFFF', // Clean White
      stripe: '#FFFFFF',    // White Flank Panels
      collar: '#0F172A',    // Navy Blue Rib Collar
      sleeve: '#6BA4D9',    // Sky Blue Sleeves
      accent: '#0F172A',    // Deep Navy Accent
    },
    defaultStripes: [
      {
        id: 'stripe-manc-sky-flanks',
        orientation: 'side-panel',
        surface: 'both',
        count: 1,
        thickness: 105,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#FFFFFF',
        secondaryColor: 'rgba(15, 23, 42, 0.25)',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#6BA4D9',
      accentColor: '#0F172A',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#6BA4D9',
      accentColor: '#0F172A',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'MANCHESTER CITY', color: '#0F172A', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'ETIHAD', color: '#0F172A', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'DE BRUYNE', color: '#0F172A', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '17', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 3. club-manchester-red: Manchester Red Classic
  {
    id: 'club-manchester-red',
    name: 'Manchester Red Classic',
    category: 'club-inspired',
    description: 'Iconic Old Trafford deep crimson red with black and white shoulder panels, ribbed collar, and bold squad numbers',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#B91C1C"/>
      <!-- Shoulder speed bars & black flank piping -->
      <line x1="0" y1="22" x2="30" y2="22" stroke="#FFFFFF" stroke-width="2.5"/>
      <line x1="70" y1="22" x2="100" y2="22" stroke="#FFFFFF" stroke-width="2.5"/>
      <path d="M0 45 Q12 70 6 100 L0 100 Z" fill="#0F172A"/>
      <path d="M100 45 Q88 70 94 100 L100 100 Z" fill="#0F172A"/>
      <!-- Black & white ribbed collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#0F172A" stroke-width="4"/>
      <path d="M43 0 L50 11 L57 0" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">TEAMVIEWER</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#B91C1C"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">FERNANDES</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">8</text>
    </svg>`,
    defaultColors: {
      primary: '#B91C1C',   // Deep Manchester Crimson Red
      secondary: '#0F172A', // Obsidian Black
      stripe: '#0F172A',    // Black Flank Panels
      collar: '#0F172A',    // Black Rib Collar
      sleeve: '#B91C1C',    // Red Sleeves
      accent: '#FFFFFF',    // Pure White Accent
    },
    defaultStripes: [
      {
        id: 'stripe-manc-red-flanks',
        orientation: 'side-panel',
        surface: 'both',
        count: 1,
        thickness: 95,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#0F172A',
        secondaryColor: '#FFFFFF',
        opacity: 0.95,
      },
    ],
    defaultLeftSleeve: {
      type: 'speed-bars',
      primaryColor: '#B91C1C',
      accentColor: '#FFFFFF',
      thickness: 20,
    },
    defaultRightSleeve: {
      type: 'speed-bars',
      primaryColor: '#B91C1C',
      accentColor: '#FFFFFF',
      thickness: 20,
    },
    defaultText: {
      frontTeamName: { text: 'MANCHESTER UNITED', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'TEAMVIEWER', color: '#FFFFFF', fontSize: 40, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'FERNANDES', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '8', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 4. club-catalan-blaugrana: Catalan Blaugrana
  {
    id: 'club-catalan-blaugrana',
    name: 'Catalan Blaugrana',
    category: 'club-inspired',
    description: 'Iconic deep garnet maroon and royal blue vertical stripes with golden Senyera collar accent and championship typography',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E3A8A"/>
      <!-- Deep garnet maroon vertical stripes -->
      <rect x="18" width="16" height="100" fill="#991B1B"/>
      <rect x="42" width="16" height="100" fill="#991B1B"/>
      <rect x="66" width="16" height="100" fill="#991B1B"/>
      <!-- Gold Catalan Senyera collar detail -->
      <path d="M40 0 L50 16 L60 0" stroke="#F59E0B" stroke-width="4"/>
      <path d="M44 0 L50 10 L56 0" stroke="#991B1B" stroke-width="1.5"/>
      <text x="50" y="58" fill="#F59E0B" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">SPOTIFY</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E3A8A"/>
      <rect x="18" width="16" height="100" fill="#991B1B"/>
      <rect x="42" width="16" height="100" fill="#991B1B"/>
      <rect x="66" width="16" height="100" fill="#991B1B"/>
      <text x="50" y="24" fill="#F59E0B" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">GAVI</text>
      <text x="50" y="64" fill="#F59E0B" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">6</text>
    </svg>`,
    defaultColors: {
      primary: '#1E3A8A',   // Royal Blaugrana Navy
      secondary: '#991B1B', // Deep Garnet Maroon
      stripe: '#991B1B',    // Maroon Vertical Stripes
      collar: '#F59E0B',    // Catalan Gold Collar
      sleeve: '#1E3A8A',    // Navy Sleeves
      accent: '#F59E0B',    // Senyera Gold Trim
    },
    defaultStripes: [
      {
        id: 'stripe-blaugrana-v',
        orientation: 'vertical',
        surface: 'both',
        count: 5,
        thickness: 78,
        spacing: 82,
        positionX: 512,
        positionY: 512,
        color: '#991B1B',
        secondaryColor: '#1E3A8A',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#1E3A8A',
      accentColor: '#991B1B',
      thickness: 26,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#1E3A8A',
      accentColor: '#991B1B',
      thickness: 26,
    },
    defaultText: {
      frontTeamName: { text: 'FC BARCELONA', color: '#F59E0B', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'SPOTIFY', color: '#F59E0B', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'GAVI', color: '#F59E0B', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '6', color: '#F59E0B', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 5. club-north-london-red: North London Red
  {
    id: 'club-north-london-red',
    name: 'North London Red',
    category: 'club-inspired',
    description: 'Classic North London scarlet torso with contrasting pure white raglan sleeves, gold trim, and pristine squad print',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#DC2626"/>
      <!-- White raglan sleeves & side trim -->
      <path d="M0 0 L24 0 L14 42 L0 42 Z" fill="#FFFFFF"/>
      <path d="M100 0 L76 0 L86 42 L100 42 Z" fill="#FFFFFF"/>
      <!-- Gold lightning bisban detail -->
      <line x1="24" y1="0" x2="14" y2="42" stroke="#F59E0B" stroke-width="1.5"/>
      <line x1="76" y1="0" x2="86" y2="42" stroke="#F59E0B" stroke-width="1.5"/>
      <!-- White ribbed collar -->
      <path d="M38 0 L50 16 L62 0" stroke="#FFFFFF" stroke-width="4"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">FLY BETTER</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#DC2626"/>
      <path d="M0 0 L24 0 L14 42 L0 42 Z" fill="#FFFFFF"/>
      <path d="M100 0 L76 0 L86 42 L100 42 Z" fill="#FFFFFF"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">SAKA</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">7</text>
    </svg>`,
    defaultColors: {
      primary: '#DC2626',   // Scarlet Arsenal Red
      secondary: '#FFFFFF', // Pure White Sleeves
      stripe: '#F59E0B',    // Gold Trim Lines
      collar: '#FFFFFF',    // White Collar
      sleeve: '#FFFFFF',    // Contrast White Sleeves
      accent: '#F59E0B',    // Warm Amber Gold
    },
    defaultStripes: [
      {
        id: 'stripe-north-london-sides',
        orientation: 'side-panel',
        surface: 'both',
        count: 1,
        thickness: 80,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#FFFFFF',
        secondaryColor: '#F59E0B',
        opacity: 0.9,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#FFFFFF',
      accentColor: '#DC2626',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#FFFFFF',
      accentColor: '#DC2626',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'ARSENAL FC', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'FLY BETTER', color: '#FFFFFF', fontSize: 42, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'SAKA', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '7', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 6. club-merseyside-red: Merseyside Red
  {
    id: 'club-merseyside-red',
    name: 'Merseyside Red',
    category: 'club-inspired',
    description: 'Anfield deep crimson red with all-over tonal diagonal jacquard weave, crisp white rib collar, and teal accents',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#991B1B"/>
      <!-- Tonal houndstooth jacquard texture -->
      <pattern id="merseyside-tonal-front" width="12" height="12" patternUnits="userSpaceOnUse">
        <polygon points="6,0 12,6 6,12 0,6" fill="#7F1D1D" opacity="0.6"/>
        <line x1="0" y1="0" x2="12" y2="12" stroke="#B91C1C" stroke-width="1"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#merseyside-tonal-front)"/>
      <!-- White & teal collar trim -->
      <path d="M40 0 L50 16 L60 0" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M43 0 L50 11 L57 0" stroke="#0D9488" stroke-width="1.5"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8" font-weight="900" text-anchor="middle" font-family="sans-serif">STANDARD</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#991B1B"/>
      <pattern id="merseyside-tonal-back" width="12" height="12" patternUnits="userSpaceOnUse">
        <polygon points="6,0 12,6 6,12 0,6" fill="#7F1D1D" opacity="0.6"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#merseyside-tonal-back)"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">SALAH</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">11</text>
    </svg>`,
    defaultColors: {
      primary: '#991B1B',   // Deep Crimson Anfield Red
      secondary: '#FFFFFF', // Crisp White
      stripe: '#0D9488',    // Liver Bird Teal Accent
      collar: '#FFFFFF',    // White Collar Trim
      sleeve: '#991B1B',    // Red Sleeves
      accent: '#0D9488',    // Subtle Teal Accent
    },
    defaultStripes: [
      {
        id: 'stripe-merseyside-tonal',
        orientation: 'tonal-jacquard',
        surface: 'both',
        count: 1,
        thickness: 40,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#7F1D1D',
        secondaryColor: 'rgba(255, 255, 255, 0.2)',
        opacity: 0.65,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#991B1B',
      accentColor: '#FFFFFF',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#991B1B',
      accentColor: '#FFFFFF',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'LIVERPOOL FC', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'STANDARD CHARTERED', color: '#FFFFFF', fontSize: 36, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'SALAH', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '11', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 7. club-milan-rossoneri: Milan Rossoneri
  {
    id: 'club-milan-rossoneri',
    name: 'Milan Rossoneri',
    category: 'club-inspired',
    description: 'Iconic San Siro Devil red and pitch black vertical stripes with sleek modern collar trim and pure white lettering',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#0A0A0A"/>
      <!-- Scarlet red vertical stripes -->
      <rect x="16" width="15" height="100" fill="#DC2626"/>
      <rect x="42" width="16" height="100" fill="#DC2626"/>
      <rect x="69" width="15" height="100" fill="#DC2626"/>
      <!-- Subtle white pinstripe borders -->
      <line x1="16" y1="0" x2="16" y2="100" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>
      <line x1="31" y1="0" x2="31" y2="100" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>
      <line x1="42" y1="0" x2="42" y2="100" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>
      <line x1="58" y1="0" x2="58" y2="100" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>
      <line x1="69" y1="0" x2="69" y2="100" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>
      <line x1="84" y1="0" x2="84" y2="100" stroke="#FFFFFF" stroke-width="0.8" opacity="0.4"/>
      <!-- Black V-neck collar with red bisban -->
      <path d="M40 0 L50 16 L60 0" stroke="#DC2626" stroke-width="4"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">EMIRATES</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#0A0A0A"/>
      <rect x="16" width="15" height="100" fill="#DC2626"/>
      <rect x="42" width="16" height="100" fill="#DC2626"/>
      <rect x="69" width="15" height="100" fill="#DC2626"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">LEÃO</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#0A0A0A',   // Pitch Black
      secondary: '#DC2626', // Devil Scarlet Red
      stripe: '#DC2626',    // Red Vertical Stripes
      collar: '#DC2626',    // Red V-Neck Collar
      sleeve: '#0A0A0A',    // Black Sleeves
      accent: '#FFFFFF',    // Pure White Accent
    },
    defaultStripes: [
      {
        id: 'stripe-rossoneri-v',
        orientation: 'vertical',
        surface: 'both',
        count: 5,
        thickness: 78,
        spacing: 80,
        positionX: 512,
        positionY: 512,
        color: '#DC2626',
        secondaryColor: '#0A0A0A',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0A0A0A',
      accentColor: '#DC2626',
      thickness: 26,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0A0A0A',
      accentColor: '#DC2626',
      thickness: 26,
    },
    defaultText: {
      frontTeamName: { text: 'AC MILAN', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'EMIRATES', color: '#FFFFFF', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'LEÃO', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 8. club-turin-bianconeri: Turin Bianconeri
  {
    id: 'club-turin-bianconeri',
    name: 'Turin Bianconeri',
    category: 'club-inspired',
    description: 'Iconic Juventus black and white vertical stripes with brushed championship gold stars and squad details',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#0A0A0A"/>
      <!-- Pure white vertical stripes -->
      <rect x="18" width="16" height="100" fill="#FFFFFF"/>
      <rect x="42" width="16" height="100" fill="#FFFFFF"/>
      <rect x="66" width="16" height="100" fill="#FFFFFF"/>
      <!-- Gold star trim & collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#F59E0B" stroke-width="4"/>
      <text x="50" y="58" fill="#F59E0B" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">JEEP</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#0A0A0A"/>
      <rect x="18" width="16" height="100" fill="#FFFFFF"/>
      <rect x="42" width="16" height="100" fill="#FFFFFF"/>
      <rect x="66" width="16" height="100" fill="#FFFFFF"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">VLAHOVIĆ</text>
      <text x="50" y="64" fill="#F59E0B" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">9</text>
    </svg>`,
    defaultColors: {
      primary: '#0A0A0A',   // Onyx Black
      secondary: '#FFFFFF', // Pure White
      stripe: '#FFFFFF',    // White Vertical Stripes
      collar: '#F59E0B',    // Championship Gold Collar
      sleeve: '#0A0A0A',    // Black Sleeves
      accent: '#F59E0B',    // Gold Star Trim
    },
    defaultStripes: [
      {
        id: 'stripe-bianconeri-v',
        orientation: 'vertical',
        surface: 'both',
        count: 5,
        thickness: 78,
        spacing: 80,
        positionX: 512,
        positionY: 512,
        color: '#FFFFFF',
        secondaryColor: '#0A0A0A',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0A0A0A',
      accentColor: '#FFFFFF',
      thickness: 26,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0A0A0A',
      accentColor: '#FFFFFF',
      thickness: 26,
    },
    defaultText: {
      frontTeamName: { text: 'JUVENTUS FC', color: '#F59E0B', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'JEEP', color: '#F59E0B', fontSize: 48, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'VLAHOVIĆ', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '9', color: '#F59E0B', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 9. club-munich-red: Munich Red
  {
    id: 'club-munich-red',
    name: 'Munich Red',
    category: 'club-inspired',
    description: 'Bavarian scarlet red with dynamic tonal soundwave diamond facets, white 3-bar shoulders, and clean squad lettering',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#DC2626"/>
      <!-- Shoulder speed bars -->
      <line x1="0" y1="20" x2="28" y2="20" stroke="#FFFFFF" stroke-width="2.5"/>
      <line x1="72" y1="20" x2="100" y2="20" stroke="#FFFFFF" stroke-width="2.5"/>
      <!-- Tonal Bavarian diamond facets -->
      <pattern id="munich-tonal-front" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="8,0 16,8 8,16 0,8" fill="#B91C1C" opacity="0.6"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#munich-tonal-front)"/>
      <!-- White V-neck collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#FFFFFF" stroke-width="4"/>
      <text x="50" y="58" fill="#FFFFFF" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">TELEKOM</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#DC2626"/>
      <pattern id="munich-tonal-back" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="8,0 16,8 8,16 0,8" fill="#B91C1C" opacity="0.6"/>
      </pattern>
      <rect width="100" height="100" rx="14" fill="url(#munich-tonal-back)"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">MUSIALA</text>
      <text x="50" y="64" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">42</text>
    </svg>`,
    defaultColors: {
      primary: '#DC2626',   // Bavarian Scarlet Red
      secondary: '#FFFFFF', // Crisp White
      stripe: '#B91C1C',    // Tonal Diamond Red
      collar: '#FFFFFF',    // White Collar Trim
      sleeve: '#DC2626',    // Red Sleeves
      accent: '#FFFFFF',    // Pure White Accent
    },
    defaultStripes: [
      {
        id: 'stripe-munich-tonal',
        orientation: 'tonal-jacquard',
        surface: 'both',
        count: 1,
        thickness: 48,
        spacing: 0,
        positionX: 512,
        positionY: 512,
        color: '#B91C1C',
        secondaryColor: 'rgba(255, 255, 255, 0.25)',
        opacity: 0.55,
      },
    ],
    defaultLeftSleeve: {
      type: 'speed-bars',
      primaryColor: '#DC2626',
      accentColor: '#FFFFFF',
      thickness: 20,
    },
    defaultRightSleeve: {
      type: 'speed-bars',
      primaryColor: '#DC2626',
      accentColor: '#FFFFFF',
      thickness: 20,
    },
    defaultText: {
      frontTeamName: { text: 'BAYERN MÜNCHEN', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'TELEKOM', color: '#FFFFFF', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'MUSIALA', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '42', color: '#FFFFFF', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },

  // 10. club-milan-nerazzurri: Milan Nerazzurri
  {
    id: 'club-milan-nerazzurri',
    name: 'Milan Nerazzurri',
    category: 'club-inspired',
    description: 'Iconic Biscione royal blue and pitch black vertical stripes with bright cyan highlights and clean squad typography',
    thumbnailSvgFront: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#0A0A0A"/>
      <!-- Royal Biscione blue vertical stripes -->
      <rect x="16" width="15" height="100" fill="#0284C7"/>
      <rect x="42" width="16" height="100" fill="#0284C7"/>
      <rect x="69" width="15" height="100" fill="#0284C7"/>
      <!-- Bright cyan precision pinstripes -->
      <line x1="16" y1="0" x2="16" y2="100" stroke="#38BDF8" stroke-width="0.8" opacity="0.6"/>
      <line x1="31" y1="0" x2="31" y2="100" stroke="#38BDF8" stroke-width="0.8" opacity="0.6"/>
      <line x1="42" y1="0" x2="42" y2="100" stroke="#38BDF8" stroke-width="0.8" opacity="0.6"/>
      <line x1="58" y1="0" x2="58" y2="100" stroke="#38BDF8" stroke-width="0.8" opacity="0.6"/>
      <line x1="69" y1="0" x2="69" y2="100" stroke="#38BDF8" stroke-width="0.8" opacity="0.6"/>
      <line x1="84" y1="0" x2="84" y2="100" stroke="#38BDF8" stroke-width="0.8" opacity="0.6"/>
      <!-- Blue V-neck collar -->
      <path d="M40 0 L50 16 L60 0" stroke="#0284C7" stroke-width="4"/>
      <text x="50" y="58" fill="#F59E0B" font-size="8.5" font-weight="900" text-anchor="middle" font-family="sans-serif">PIRELLI</text>
    </svg>`,
    thumbnailSvgBack: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#0A0A0A"/>
      <rect x="16" width="15" height="100" fill="#0284C7"/>
      <rect x="42" width="16" height="100" fill="#0284C7"/>
      <rect x="69" width="15" height="100" fill="#0284C7"/>
      <text x="50" y="24" fill="#FFFFFF" font-size="7" font-weight="bold" text-anchor="middle" font-family="sans-serif">MARTÍNEZ</text>
      <text x="50" y="64" fill="#F59E0B" font-size="28" font-weight="900" text-anchor="middle" font-family="sans-serif">10</text>
    </svg>`,
    defaultColors: {
      primary: '#0A0A0A',   // Pitch Black
      secondary: '#0284C7', // Biscione Royal Blue
      stripe: '#0284C7',    // Blue Vertical Stripes
      collar: '#0284C7',    // Royal Blue Collar
      sleeve: '#0A0A0A',    // Black Sleeves
      accent: '#F59E0B',    // Amber Gold Accent
    },
    defaultStripes: [
      {
        id: 'stripe-nerazzurri-v',
        orientation: 'vertical',
        surface: 'both',
        count: 5,
        thickness: 78,
        spacing: 80,
        positionX: 512,
        positionY: 512,
        color: '#0284C7',
        secondaryColor: '#0A0A0A',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0A0A0A',
      accentColor: '#0284C7',
      thickness: 26,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0A0A0A',
      accentColor: '#0284C7',
      thickness: 26,
    },
    defaultText: {
      frontTeamName: { text: 'INTER MILANO', color: '#F59E0B', fontSize: 26, fontFamily: 'Montserrat, sans-serif' },
      frontSponsor: { text: 'PIRELLI', color: '#F59E0B', fontSize: 44, fontFamily: 'Oswald, sans-serif' },
      backPlayerName: { text: 'MARTÍNEZ', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat, sans-serif' },
      backNumber: { text: '10', color: '#F59E0B', fontSize: 96, fontFamily: 'Oswald, sans-serif' },
    },
  },
];
