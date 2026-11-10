import type {
  JerseyColors,
  JerseyTemplatePreset,
  SleevePatternConfig,
  StripeElementConfig,
} from '../types/jersey-template.types';
import type { DesignText, SurfaceDesign } from '@/types/designer.types';
import { generateSleevePatternDataUrl } from './jersey-pattern.service';

/**
 * Builds standard 2D and 3D surface representations for a selected Jersey Template
 */
export const buildJerseyTemplateSurfaces = (
  template: JerseyTemplatePreset,
  colors: JerseyColors,
  stripes: StripeElementConfig[],
  leftSleeve: SleevePatternConfig,
  rightSleeve: SleevePatternConfig,
  existingSurfaces: Record<string, SurfaceDesign>
): Record<string, SurfaceDesign> => {
  const surfaces: Record<string, SurfaceDesign> = { ...existingSurfaces };

  // 1. Generate Left and Right Sleeve Textures
  const leftSleeveUrl = generateSleevePatternDataUrl(leftSleeve);
  const rightSleeveUrl = generateSleevePatternDataUrl(rightSleeve);

  surfaces.left = {
    color: colors.sleeve,
    elements: [],
    textureDataUrl: leftSleeveUrl,
    canvasJson: null,
  };

  surfaces.right = {
    color: colors.sleeve,
    elements: [],
    textureDataUrl: rightSleeveUrl,
    canvasJson: null,
  };

  // 2. Build Front Elements (Team Name, Sponsor)
  const frontElements: DesignText[] = [];
  if (template.defaultText.frontTeamName) {
    const t = template.defaultText.frontTeamName;
    frontElements.push({
      id: `text_team_${Date.now()}_1`,
      type: 'text',
      content: t.text,
      fontFamily: t.fontFamily || 'Montserrat, sans-serif',
      fontSize: t.fontSize || 32,
      fontWeight: 'bold',
      color: colors.accent || t.color,
      textAlign: 'center',
      x: 512,
      y: 280,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 2,
    });
  }

  if (template.defaultText.frontSponsor) {
    const s = template.defaultText.frontSponsor;
    frontElements.push({
      id: `text_sponsor_${Date.now()}_2`,
      type: 'text',
      content: s.text,
      fontFamily: s.fontFamily || 'Oswald, sans-serif',
      fontSize: s.fontSize || 42,
      fontWeight: 'bold',
      color: colors.secondary || s.color,
      textAlign: 'center',
      x: 512,
      y: 480,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 3,
    });
  }

  // 3. Build Back Elements (Player Name, Squad Number)
  const backElements: DesignText[] = [];
  if (template.defaultText.backPlayerName) {
    const p = template.defaultText.backPlayerName;
    backElements.push({
      id: `text_player_${Date.now()}_3`,
      type: 'text',
      content: p.text,
      fontFamily: p.fontFamily || 'Montserrat, sans-serif',
      fontSize: p.fontSize || 36,
      fontWeight: 'bold',
      color: colors.secondary || p.color,
      textAlign: 'center',
      x: 512,
      y: 240,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 2,
    });
  }

  if (template.defaultText.backNumber) {
    const n = template.defaultText.backNumber;
    backElements.push({
      id: `text_number_${Date.now()}_4`,
      type: 'text',
      content: n.text,
      fontFamily: n.fontFamily || 'Oswald, sans-serif',
      fontSize: n.fontSize || 96,
      fontWeight: 'bold',
      color: colors.accent || n.color,
      textAlign: 'center',
      x: 512,
      y: 440,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 3,
    });
  }

  // 4. Render 2D Offscreen Canvas Composite for Front & Back
  const frontDataUrl = renderCompositeTexture(frontElements, stripes, 'front');
  const backDataUrl = renderCompositeTexture(backElements, stripes, 'back');

  surfaces.front = {
    color: colors.primary,
    elements: frontElements,
    textureDataUrl: frontDataUrl,
    canvasJson: null,
  };

  surfaces.back = {
    color: colors.primary,
    elements: backElements,
    textureDataUrl: backDataUrl,
    canvasJson: null,
  };

  surfaces.leftShoulder = {
    color: colors.primary,
    elements: [],
    textureDataUrl: null,
    canvasJson: null,
  };

  surfaces.rightShoulder = {
    color: colors.primary,
    elements: [],
    textureDataUrl: null,
    canvasJson: null,
  };

  return surfaces;
};

/**
 * Composite renderer for Torso Surfaces (combining stripes + athletic typography)
 */
export const renderCompositeTexture = (
  textElements: DesignText[],
  stripes: StripeElementConfig[],
  surface: 'front' | 'back',
  width = 1024,
  height = 1024
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Draw stripes if configured
  const relevantStripes = stripes.filter((s) => s.surface === 'both' || s.surface === surface);
  for (const s of relevantStripes) {
    ctx.fillStyle = s.color;
    ctx.globalAlpha = s.opacity ?? 1;

    if (s.orientation === 'horizontal') {
      const count = Math.max(1, s.count);
      const totalSpan = (count - 1) * s.spacing;
      const startY = s.positionY - totalSpan / 2;

      for (let i = 0; i < count; i++) {
        const y = startY + i * s.spacing - s.thickness / 2;
        ctx.fillRect(0, y, width, s.thickness);
      }
    } else {
      const count = Math.max(1, s.count);
      const totalSpan = (count - 1) * s.spacing;
      const startX = s.positionX - totalSpan / 2;

      for (let i = 0; i < count; i++) {
        const x = startX + i * s.spacing - s.thickness / 2;
        ctx.fillRect(x, 0, s.thickness, height);
      }
    }
  }

  // 2. Draw text typography elements
  ctx.globalAlpha = 1.0;
  for (const el of textElements) {
    ctx.font = `${el.fontWeight || 'bold'} ${el.fontSize}px ${el.fontFamily}`;
    ctx.fillStyle = el.color;
    ctx.textAlign = el.textAlign || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(el.content, el.x, el.y);
  }

  return canvas.toDataURL('image/png');
};
