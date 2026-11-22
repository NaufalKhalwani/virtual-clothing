import type {
  JerseyColors,
  JerseyTemplatePreset,
  SleevePatternConfig,
  StripeElementConfig,
} from '../types/jersey-template.types';
import type { DesignText, SurfaceDesign } from '@/types/designer.types';
import {
  generateSleevePatternDataUrl,
  drawFabricPatternToContext,
} from './jersey-pattern.service';

/**
 * Serializes design text elements into a valid Fabric.js v7 canvas JSON string
 * Ensuring clean 100% transparent text backgrounds without any rectangular containers
 */
export const serializeElementsToFabricJson = (elements: DesignText[]): string | null => {
  if (elements.length === 0) return null;
  return JSON.stringify({
    version: '7.4.0',
    objects: elements.map((el) => {
      const isLight =
        el.color.startsWith('#F') ||
        el.color.startsWith('#f') ||
        el.color.startsWith('#E') ||
        el.color.startsWith('#e') ||
        el.color.toLowerCase() === '#ffffff';

      return {
        type: 'Textbox',
        version: '7.4.0',
        originX: 'center',
        originY: 'center',
        left: el.x,
        top: el.y,
        width: Math.max(el.fontSize * 5, 320),
        fill: el.color,
        text: el.content,
        fontSize: el.fontSize,
        fontWeight: el.fontWeight || 'bold',
        fontFamily: el.fontFamily || 'Oswald, sans-serif',
        textAlign: el.textAlign || 'center',
        backgroundColor: '', // 100% transparent background, no box
        shadow: {
          color: isLight ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.35)',
          blur: Math.min(Math.max(el.fontSize * 0.04, 2), 5),
          offsetX: 0,
          offsetY: 1.5,
        },
        id: el.id,
        cornerColor: '#2563eb',
        cornerStrokeColor: '#ffffff',
        cornerStyle: 'circle',
        borderColor: '#2563eb',
        cornerSize: 10,
        transparentCorners: false,
        padding: 6,
      };
    }),
  });
};

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
      fontSize: t.fontSize || 34,
      fontWeight: 'bold',
      color: t.color || colors.secondary,
      textAlign: 'center',
      x: 512,
      y: 260,
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
      fontSize: s.fontSize || 68,
      fontWeight: 'bold',
      color: s.color || colors.secondary,
      textAlign: 'center',
      x: 512,
      y: 490,
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
      fontSize: p.fontSize || 48,
      fontWeight: 'bold',
      color: p.color || colors.secondary,
      textAlign: 'center',
      x: 512,
      y: 270,
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
      fontSize: n.fontSize || 220,
      fontWeight: 'bold',
      color: n.color || colors.secondary,
      textAlign: 'center',
      x: 512,
      y: 490,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 3,
    });
  }

  // 4. Render 2D Offscreen Canvas Composite for Front & Back (Pattern Base -> Text Top)
  const frontDataUrl = renderCompositeTexture(frontElements, stripes, 'front', 1024, 1024, colors.primary);
  const backDataUrl = renderCompositeTexture(backElements, stripes, 'back', 1024, 1024, colors.primary);

  surfaces.front = {
    color: colors.primary,
    elements: frontElements,
    textureDataUrl: frontDataUrl,
    canvasJson: serializeElementsToFabricJson(frontElements),
  };

  surfaces.back = {
    color: colors.primary,
    elements: backElements,
    textureDataUrl: backDataUrl,
    canvasJson: serializeElementsToFabricJson(backElements),
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
 * Composite renderer for Torso Surfaces:
 * 1. Base Fabric Pattern / Stripes with optional baseColor fill & micro-knit weave
 * 2. Clean typography & player numbers rendered directly on fabric without background boxes
 */
export const renderCompositeTexture = (
  textElements: DesignText[],
  stripes: StripeElementConfig[],
  surface: 'front' | 'back' | string,
  width = 1024,
  height = 1024,
  baseColor?: string
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Draw base color + fabric pattern & stripes first (Base Layer)
  drawFabricPatternToContext(ctx, stripes, surface, width, height, baseColor);

  // 2. Draw clean typography elements directly on top (Athletic Direct Print)
  ctx.globalAlpha = 1.0;
  for (const el of textElements) {
    ctx.save();
    ctx.font = `${el.fontWeight || 'bold'} ${el.fontSize}px ${el.fontFamily}`;
    ctx.textAlign = el.textAlign || 'center';
    ctx.textBaseline = 'middle';

    // Athletic vinyl contour separation for high contrast across fabric lines
    const isLight =
      el.color.startsWith('#F') ||
      el.color.startsWith('#f') ||
      el.color.startsWith('#E') ||
      el.color.startsWith('#e') ||
      el.color.toLowerCase() === '#ffffff';

    ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.35)';
    ctx.shadowBlur = Math.min(Math.max(el.fontSize * 0.04, 2), 5);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1.5;

    ctx.fillStyle = el.color;
    ctx.fillText(el.content, el.x, el.y);
    ctx.restore();
  }

  return canvas.toDataURL('image/png');
};

/**
 * Composites user's Fabric artwork/logos with underlying fabric stripes pattern
 */
export const compositeFabricArtworkWithPattern = async (
  fabricDataUrl: string | null,
  stripes: StripeElementConfig[],
  surface: 'front' | 'back' | string,
  width = 1024,
  height = 1024,
  baseColor?: string
): Promise<string | null> => {
  const hasStripes = stripes.some((s) => s.surface === 'both' || s.surface === surface);
  if (!hasStripes && !fabricDataUrl && !baseColor) return null;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Draw fabric pattern & stripes first with baseColor
  drawFabricPatternToContext(ctx, stripes, surface, width, height, baseColor);

  // 2. Draw user's artwork & text from Fabric canvas on top
  if (fabricDataUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(img, 0, 0, width, height);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = fabricDataUrl;
    });
  }

  return canvas.toDataURL('image/png');
};
