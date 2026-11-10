import type {
  JerseyTemplatePreset,
  JerseyColors,
  SleevePatternConfig,
} from '../types/jersey-template.types';

export const DEFAULT_JERSEY_COLORS: JerseyColors = {
  primary: '#1E3A8A', // Royal Navy
  secondary: '#FFFFFF', // Clean White
  stripe: '#F59E0B',  // Amber Gold
  collar: '#FFFFFF',  // White Rib Collar
  sleeve: '#1E3A8A',  // Navy Sleeves
  accent: '#F59E0B',  // Gold Accent
};

export const DEFAULT_LEFT_SLEEVE: SleevePatternConfig = {
  type: 'solid',
  primaryColor: '#1E3A8A',
  accentColor: '#F59E0B',
  stripeCount: 3,
  thickness: 18,
};

export const DEFAULT_RIGHT_SLEEVE: SleevePatternConfig = {
  type: 'solid',
  primaryColor: '#1E3A8A',
  accentColor: '#F59E0B',
  stripeCount: 3,
  thickness: 18,
};

export const JERSEY_TEMPLATES: JerseyTemplatePreset[] = [
  {
    id: 'classic-hoops',
    name: 'Classic Hoops',
    description: 'Horizontal stripes across torso inspired by iconic European athletic kits',
    thumbnailSvg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#047857"/><rect y="20" width="80" height="12" fill="#FFFFFF"/><rect y="44" width="80" height="12" fill="#FFFFFF"/><rect y="68" width="80" height="8" fill="#FFFFFF"/><path d="M30 0L40 14L50 0" stroke="#F59E0B" stroke-width="3"/></svg>`,
    defaultColors: {
      primary: '#047857',
      secondary: '#FFFFFF',
      stripe: '#FFFFFF',
      collar: '#F59E0B',
      sleeve: '#047857',
      accent: '#F59E0B',
    },
    defaultStripes: [
      {
        id: 'stripe-h-1',
        orientation: 'horizontal',
        surface: 'both',
        count: 4,
        thickness: 48,
        spacing: 48,
        positionY: 260,
        positionX: 256,
        color: '#FFFFFF',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'horizontal-stripes',
      primaryColor: '#047857',
      accentColor: '#FFFFFF',
      stripeCount: 2,
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'horizontal-stripes',
      primaryColor: '#047857',
      accentColor: '#FFFFFF',
      stripeCount: 2,
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'CELTIC STAR', color: '#F59E0B', fontSize: 26, fontFamily: 'Montserrat' },
      frontSponsor: { text: 'EMIRATES', color: '#FFFFFF', fontSize: 34, fontFamily: 'Oswald' },
      backPlayerName: { text: 'RODRIGUEZ', color: '#FFFFFF', fontSize: 30, fontFamily: 'Montserrat' },
      backNumber: { text: '10', color: '#F59E0B', fontSize: 90, fontFamily: 'Oswald' },
    },
  },
  {
    id: 'vertical-stripes',
    name: 'Vertical Stripes',
    description: 'Alternating vertical stripes radiating classic championship prestige',
    thumbnailSvg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#18181B"/><rect x="14" width="14" height="80" fill="#FFFFFF"/><rect x="42" width="14" height="80" fill="#FFFFFF"/><rect x="70" width="10" height="80" fill="#FFFFFF"/><path d="M30 0L40 14L50 0" stroke="#DC2626" stroke-width="3"/></svg>`,
    defaultColors: {
      primary: '#18181B',
      secondary: '#FFFFFF',
      stripe: '#FFFFFF',
      collar: '#DC2626',
      sleeve: '#18181B',
      accent: '#DC2626',
    },
    defaultStripes: [
      {
        id: 'stripe-v-1',
        orientation: 'vertical',
        surface: 'both',
        count: 5,
        thickness: 44,
        spacing: 44,
        positionY: 256,
        positionX: 256,
        color: '#FFFFFF',
        opacity: 1,
      },
    ],
    defaultLeftSleeve: {
      type: 'solid',
      primaryColor: '#18181B',
      accentColor: '#DC2626',
      stripeCount: 1,
      thickness: 20,
    },
    defaultRightSleeve: {
      type: 'solid',
      primaryColor: '#18181B',
      accentColor: '#DC2626',
      stripeCount: 1,
      thickness: 20,
    },
    defaultText: {
      frontTeamName: { text: 'MILANO SC', color: '#DC2626', fontSize: 28, fontFamily: 'Montserrat' },
      frontSponsor: { text: 'PIRELLI', color: '#DC2626', fontSize: 36, fontFamily: 'Oswald' },
      backPlayerName: { text: 'MALDINHO', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat' },
      backNumber: { text: '3', color: '#DC2626', fontSize: 96, fontFamily: 'Oswald' },
    },
  },
  {
    id: 'diagonal-sash',
    name: 'Diagonal Sash',
    description: 'Dynamic diagonal sash running from shoulder to hip with sharp angular accents',
    thumbnailSvg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#F8FAFC"/><polygon points="0,0 24,0 80,56 80,80 56,80 0,24" fill="#DC2626"/><path d="M30 0L40 14L50 0" stroke="#18181B" stroke-width="3"/></svg>`,
    defaultColors: {
      primary: '#F8FAFC',
      secondary: '#DC2626',
      stripe: '#DC2626',
      collar: '#18181B',
      sleeve: '#F8FAFC',
      accent: '#DC2626',
    },
    defaultStripes: [],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#F8FAFC',
      accentColor: '#DC2626',
      thickness: 30,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#F8FAFC',
      accentColor: '#DC2626',
      thickness: 30,
    },
    defaultText: {
      frontTeamName: { text: 'RIVER PLATE', color: '#18181B', fontSize: 26, fontFamily: 'Montserrat' },
      frontSponsor: { text: 'CODERE', color: '#18181B', fontSize: 36, fontFamily: 'Oswald' },
      backPlayerName: { text: 'CRESPO', color: '#18181B', fontSize: 32, fontFamily: 'Montserrat' },
      backNumber: { text: '9', color: '#DC2626', fontSize: 96, fontFamily: 'Oswald' },
    },
  },
  {
    id: 'two-tone',
    name: 'Two-Tone Split',
    description: 'Bold contrast two-tone color block with distinctive sleeve and chest harmony',
    thumbnailSvg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="80" fill="#DC2626"/><rect x="40" width="40" height="80" fill="#1E3A8A"/><rect width="80" height="80" rx="16" stroke="#475569" stroke-width="2"/><path d="M30 0L40 14L50 0" stroke="#FFFFFF" stroke-width="3"/></svg>`,
    defaultColors: {
      primary: '#DC2626',
      secondary: '#1E3A8A',
      stripe: '#FFFFFF',
      collar: '#FFFFFF',
      sleeve: '#1E3A8A',
      accent: '#F59E0B',
    },
    defaultStripes: [],
    defaultLeftSleeve: {
      type: 'solid',
      primaryColor: '#DC2626',
      accentColor: '#FFFFFF',
    },
    defaultRightSleeve: {
      type: 'solid',
      primaryColor: '#1E3A8A',
      accentColor: '#FFFFFF',
    },
    defaultText: {
      frontTeamName: { text: 'ATLETICO FC', color: '#FFFFFF', fontSize: 26, fontFamily: 'Montserrat' },
      frontSponsor: { text: 'FLY HIGH', color: '#FFFFFF', fontSize: 34, fontFamily: 'Oswald' },
      backPlayerName: { text: 'TORRES', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat' },
      backNumber: { text: '9', color: '#F59E0B', fontSize: 96, fontFamily: 'Oswald' },
    },
  },
  {
    id: 'minimalist-pro',
    name: 'Minimalist Elite',
    description: 'Pure aesthetic luxury with monochrome fabric, gold details, and clean typography',
    thumbnailSvg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#0F172A"/><circle cx="40" cy="40" r="14" stroke="#F59E0B" stroke-width="2"/><path d="M30 0L40 14L50 0" stroke="#F59E0B" stroke-width="3"/></svg>`,
    defaultColors: {
      primary: '#0F172A',
      secondary: '#1E293B',
      stripe: '#F59E0B',
      collar: '#F59E0B',
      sleeve: '#0F172A',
      accent: '#F59E0B',
    },
    defaultStripes: [],
    defaultLeftSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0F172A',
      accentColor: '#F59E0B',
      thickness: 24,
    },
    defaultRightSleeve: {
      type: 'cuff-accent',
      primaryColor: '#0F172A',
      accentColor: '#F59E0B',
      thickness: 24,
    },
    defaultText: {
      frontTeamName: { text: 'ROYAL ATHLETIC', color: '#F59E0B', fontSize: 24, fontFamily: 'Montserrat' },
      frontSponsor: { text: 'AURA', color: '#FFFFFF', fontSize: 38, fontFamily: 'Montserrat' },
      backPlayerName: { text: 'ZIDANE', color: '#FFFFFF', fontSize: 32, fontFamily: 'Montserrat' },
      backNumber: { text: '5', color: '#F59E0B', fontSize: 96, fontFamily: 'Oswald' },
    },
  },
  {
    id: 'modern-geometric',
    name: 'Modern Geometric',
    description: 'High-tech tournament pattern with sharp tessellated facets and gradient energy',
    thumbnailSvg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="80" rx="16" fill="#1E3A8A"/><polygon points="20,20 40,40 20,60" fill="#2563EB"/><polygon points="60,20 40,40 60,60" fill="#38BDF8"/><path d="M30 0L40 14L50 0" stroke="#38BDF8" stroke-width="3"/></svg>`,
    defaultColors: {
      primary: '#1E3A8A',
      secondary: '#2563EB',
      stripe: '#38BDF8',
      collar: '#38BDF8',
      sleeve: '#1E3A8A',
      accent: '#38BDF8',
    },
    defaultStripes: [],
    defaultLeftSleeve: {
      type: 'geometric',
      primaryColor: '#1E3A8A',
      accentColor: '#38BDF8',
    },
    defaultRightSleeve: {
      type: 'geometric',
      primaryColor: '#1E3A8A',
      accentColor: '#38BDF8',
    },
    defaultText: {
      frontTeamName: { text: 'CYBER FORCE', color: '#38BDF8', fontSize: 26, fontFamily: 'Montserrat' },
      frontSponsor: { text: 'QUANTUM', color: '#FFFFFF', fontSize: 36, fontFamily: 'Oswald' },
      backPlayerName: { text: 'VALKYRIE', color: '#FFFFFF', fontSize: 30, fontFamily: 'Montserrat' },
      backNumber: { text: '7', color: '#38BDF8', fontSize: 94, fontFamily: 'Oswald' },
    },
  },
];
