export type JerseyTemplateCategory = 'classic' | 'modern' | 'athletic' | 'elite';

export type JerseyTemplateId =
  // Classic & Heritage
  | 'heritage-stripes'
  | 'retro-horizontal'
  | 'classic-panel'
  | 'diagonal-sash'
  // Modern & Minimalist
  | 'minimal-pro'
  | 'split-identity'
  | 'dynamic-side'
  | 'monochrome-stealth'
  // Performance & Athletic
  | 'velocity'
  | 'aero-lines'
  | 'power-geometry'
  | 'raglan-speed'
  // Elite & Signature
  | 'elite-gradient'
  | 'signature-stripes'
  | 'royal-edition'
  | 'champion-gold'
  // Backward-compatibility aliases
  | 'classic-hoops'
  | 'vertical-stripes'
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

export type StripeOrientation =
  | 'horizontal'
  | 'vertical'
  | 'diagonal'
  | 'sash'
  | 'split'
  | 'panel'
  | 'gradient'
  | 'geometric';

export type StripeSurfaceScope =
  | 'front'
  | 'back'
  | 'both'
  | 'left'
  | 'right'
  | 'leftShoulder'
  | 'rightShoulder';

export interface StripeElementConfig {
  id: string;
  orientation: StripeOrientation;
  surface: StripeSurfaceScope;
  count: number;
  thickness: number;          // Thickness in px (e.g. 10 to 120)
  spacing: number;            // Spacing between multiple stripes
  positionY: number;          // Center Y position (for horizontal)
  positionX: number;          // Center X position (for vertical)
  color: string;              // Primary stripe color
  secondaryColor?: string;    // Optional secondary stripe color for alternating patterns
  opacity: number;
  protectText?: boolean;      // Clean exclusion zone around numbers & sponsors
  angle?: number;             // Angle for diagonal / sash stripes
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

export interface SurfaceViewport {
  zoom: number;  // Zoom scale multiplier (0.5 to 2.5, default 1.0)
  panX: number;  // Pan X offset in pixels (-300 to 300, default 0)
  panY: number;  // Pan Y offset in pixels (-300 to 300, default 0)
}

export interface JerseyTemplatePreset {
  id: JerseyTemplateId;
  name: string;
  category: JerseyTemplateCategory;
  description: string;
  thumbnailSvgFront: string;  // High-fidelity SVG front kit preview
  thumbnailSvgBack: string;   // High-fidelity SVG back kit preview
  thumbnailSvg?: string;      // Legacy compatibility
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
