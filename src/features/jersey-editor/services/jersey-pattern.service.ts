import type { SleevePatternConfig, StripeElementConfig } from '../types/jersey-template.types';

/**
 * Procedural Sleeve Pattern Generator
 * Generates high-resolution 1024x1024 texture Data URLs for left & right jersey sleeves
 */
export const generateSleevePatternDataUrl = (
  config: SleevePatternConfig,
  width = 1024,
  height = 1024
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const { type, primaryColor, accentColor, stripeCount = 3, thickness = 28 } = config;

  // 1. Draw base primary fabric color
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = accentColor;
  ctx.strokeStyle = accentColor;

  switch (type) {
    case 'solid':
      // Solid color without pattern
      break;

    case 'horizontal-stripes': {
      const count = Math.max(1, stripeCount);
      const bandHeight = thickness;
      const gap = (height - count * bandHeight) / (count + 1);
      for (let i = 0; i < count; i++) {
        const y = gap + i * (bandHeight + gap);
        ctx.fillRect(0, y, width, bandHeight);
      }
      break;
    }

    case 'vertical-stripes': {
      const count = Math.max(1, stripeCount);
      const bandWidth = thickness;
      const gap = (width - count * bandWidth) / (count + 1);
      for (let i = 0; i < count; i++) {
        const x = gap + i * (bandWidth + gap);
        ctx.fillRect(x, 0, bandWidth, height);
      }
      break;
    }

    case 'diagonal-stripes': {
      ctx.lineWidth = thickness;
      const step = thickness * 2.5;
      for (let offset = -height; offset < width + height; offset += step) {
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + height, height);
        ctx.stroke();
      }
      break;
    }

    case 'geometric': {
      // Modern tournament diamond & chevron facets
      const size = 128;
      for (let y = 0; y < height + size; y += size) {
        for (let x = 0; x < width + size; x += size) {
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x + size / 2, y);
          ctx.lineTo(x, y + size / 2);
          ctx.lineTo(x - size / 2, y);
          ctx.closePath();
          ctx.fillStyle = (x / size + y / size) % 2 === 0 ? accentColor : primaryColor;
          ctx.globalAlpha = 0.85;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;
      break;
    }

    case 'gradient': {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, primaryColor);
      grad.addColorStop(0.5, accentColor);
      grad.addColorStop(1, primaryColor);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case 'cuff-accent': {
      // Bold professional cuff band at sleeve edge
      const cuffH = Math.max(40, thickness * 2);
      ctx.fillRect(0, height - cuffH, width, cuffH);
      // Fine accent pinstripe above cuff
      ctx.fillRect(0, height - cuffH - 12, width, 6);
      break;
    }
  }

  return canvas.toDataURL('image/png');
};

/**
 * Generate Procedural Stripes Overlay Data URL for Torso (Front / Back)
 */
export const generateStripesOverlayDataUrl = (
  stripes: StripeElementConfig[],
  surface: 'front' | 'back',
  width = 1024,
  height = 1024
): string | null => {
  const relevant = stripes.filter((s) => s.surface === 'both' || s.surface === surface);
  if (relevant.length === 0) return null;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  for (const s of relevant) {
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

  return canvas.toDataURL('image/png');
};
