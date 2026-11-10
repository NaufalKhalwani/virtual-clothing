export type JerseyTemplateId =
  | 'classic-hoops'
  | 'vertical-stripes'
  | 'diagonal-sash'
  | 'two-tone'
  | 'minimalist-pro'
  | 'modern-geometric';

export interface JerseyColors {
  primary: string;      // Main torso fabric color
  secondary: string;    // Split / secondary body color
  stripe: string;       // Stripe / graphic motif color
  collar: string;       // V-neck collar & bisban trim
  sleeve: string;       // Sleeves base color
  accent: string;       // Cuffs, text accents, details
}

export type StripeOrientation = 'horizontal' | 'vertical';

export interface StripeElementConfig {
  id: string;
  orientation: StripeOrientation;
  surface: 'front' | 'back' | 'both';
  count: number;
  thickness: number;    // Thickness in px (e.g. 10 to 120)
  spacing: number;      // Spacing between multiple stripes
  positionY: number;    // Center Y position (for horizontal)
  positionX: number;    // Center X position (for vertical)
  color: string;
  opacity: number;
}

export type SleevePatternType =
  | 'solid'
  | 'horizontal-stripes'
  | 'vertical-stripes'
  | 'diagonal-stripes'
  | 'geometric'
  | 'gradient'
  | 'cuff-accent';

export interface SleevePatternConfig {
  type: SleevePatternType;
  primaryColor: string;
  accentColor: string;
  stripeCount?: number;
  thickness?: number;
}

export interface JerseyTemplatePreset {
  id: JerseyTemplateId;
  name: string;
  description: string;
  thumbnailSvg: string; // Preview SVG data / markup
  defaultColors: JerseyColors;
  defaultStripes: StripeElementConfig[];
  defaultLeftSleeve: SleevePatternConfig;
  defaultRightSleeve: SleevePatternConfig;
  defaultText: {
    frontTeamName?: { text: string; color: string; fontSize: number; fontFamily: string };
    frontSponsor?: { text: string; color: string; fontSize: number; fontFamily: string };
    backPlayerName?: { text: string; color: string; fontSize: number; fontFamily: string };
    backNumber?: { text: string; color: string; fontSize: number; fontFamily: string };
  };
}
