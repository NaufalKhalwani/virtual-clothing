export type JerseyTemplateCategory =
  | 'classic'
  | 'modern'
  | 'athletic'
  | 'elite'
  | 'vintage'
  | 'club-inspired';

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
  // Phase 8.4: Vintage Football Collection
  | 'vintage-80s-classic'
  | 'vintage-90s-geometric'
  | 'vintage-90s-sublimated'
  | 'vintage-retro-hoops'
  | 'vintage-vertical-stripes'
  | 'vintage-cream-heritage'
  | 'vintage-90s-colorblock'
  | 'vintage-polo-collar'
  | 'vintage-diagonal-sash'
  | 'vintage-minimal-2000s'
  // Phase 8.4: European Elite Club Inspired Collection
  | 'club-madrid-white-gold'
  | 'club-manchester-sky'
  | 'club-manchester-red'
  | 'club-catalan-blaugrana'
  | 'club-north-london-red'
  | 'club-merseyside-red'
  | 'club-milan-rossoneri'
  | 'club-turin-bianconeri'
  | 'club-munich-red'
  | 'club-milan-nerazzurri'
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
  | 'geometric'
  | 'chevron'
  | 'side-panel'
  | 'retro-geometric'
  | 'tonal-jacquard'
  | 'multi-width-stripes'
  | 'colorblock';

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
  protectText?: boolean;      // Deprecated: preserved for backward compatibility with existing saved projects
  angle?: number;             // Angle for diagonal / sash stripes
}

export type SleevePatternType =
  | 'solid'
  | 'horizontal-stripes'
  | 'vertical-stripes'
  | 'diagonal-stripes'
  | 'geometric'
  | 'gradient'
  | 'cuff-accent'
  | 'speed-bars'
  | 'chevrons'
  | 'retro-geometric'
  | 'tonal-jacquard'
  | 'multi-width-stripes'
  | 'colorblock';

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
