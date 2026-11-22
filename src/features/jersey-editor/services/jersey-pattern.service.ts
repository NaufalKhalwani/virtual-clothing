import type { SleevePatternConfig, StripeElementConfig } from '../types/jersey-template.types';

/**
 * Procedural Athletic Sportswear Fabric Weave & Ambient Occlusion Shading
 * Adds micro-mesh texture and soft chest/flank contour depth.
 */
export const drawAthleticFabricWeave = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity = 0.04
): void => {
  ctx.save();
  ctx.globalAlpha = intensity;

  // 1. Subtle micro-pique / athletic knit repeat pattern
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 8;
  patternCanvas.height = 8;
  const pctx = patternCanvas.getContext('2d');
  if (pctx) {
    pctx.fillStyle = '#FFFFFF';
    pctx.fillRect(0, 0, 4, 4);
    pctx.fillRect(4, 4, 4, 4);
    pctx.fillStyle = '#000000';
    pctx.fillRect(4, 0, 4, 4);
    pctx.fillRect(0, 4, 4, 4);
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    }
  }

  // 2. Athletic flank depth shading (soft side-seam gradient)
  const flankGrad = ctx.createLinearGradient(0, 0, width, 0);
  flankGrad.addColorStop(0, 'rgba(0, 0, 0, 0.16)');
  flankGrad.addColorStop(0.1, 'rgba(0, 0, 0, 0.0)');
  flankGrad.addColorStop(0.9, 'rgba(0, 0, 0, 0.0)');
  flankGrad.addColorStop(1, 'rgba(0, 0, 0, 0.16)');
  ctx.fillStyle = flankGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
};

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

  // 1. Base primary fabric color
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = accentColor;
  ctx.strokeStyle = accentColor;

  switch (type) {
    case 'solid':
      break;

    case 'horizontal-stripes': {
      // Professional tournament sleeve hoops (e.g. England/France cuffs)
      const count = Math.max(1, stripeCount);
      const bandHeight = thickness;
      const startY = height - count * (bandHeight + 20) - 80;
      for (let i = 0; i < count; i++) {
        const y = startY + i * (bandHeight + 20);
        ctx.fillStyle = accentColor;
        ctx.fillRect(0, y, width, bandHeight);

        // Flanking precision pinstripe
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(0, y - 3, width, 2);
        ctx.fillRect(0, y + bandHeight + 1, width, 2);
      }
      break;
    }

    case 'vertical-stripes': {
      const count = Math.max(1, stripeCount);
      const bandWidth = thickness;
      const gap = (width - count * bandWidth) / (count + 1);
      for (let i = 0; i < count; i++) {
        const x = gap + i * (bandWidth + gap);
        ctx.fillStyle = accentColor;
        ctx.fillRect(x, 0, bandWidth, height);
      }
      break;
    }

    case 'diagonal-stripes': {
      ctx.lineWidth = thickness;
      ctx.strokeStyle = accentColor;
      const step = thickness * 2.8;
      for (let offset = -height; offset < width + height; offset += step) {
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + height, height);
        ctx.stroke();

        // Subtle accent pinstripe along diagonal
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(offset - thickness / 2 - 2, 0);
        ctx.lineTo(offset + height - thickness / 2 - 2, height);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'speed-bars': {
      // 3 iconic athletic speed bars along sleeve
      const barWidth = Math.max(18, thickness);
      const spacing = 16;
      const totalW = 3 * barWidth + 2 * spacing;
      const startX = (width - totalW) / 2;

      for (let i = 0; i < 3; i++) {
        const x = startX + i * (barWidth + spacing);
        ctx.fillStyle = accentColor;
        ctx.fillRect(x, 0, barWidth, height - 120);
      }
      break;
    }

    case 'chevrons': {
      // Downward athletic speed chevrons
      const size = Math.max(40, thickness * 1.5);
      const stepY = size * 1.8;
      ctx.lineWidth = thickness;
      ctx.strokeStyle = accentColor;
      ctx.lineJoin = 'miter';

      for (let y = 100; y < height - 100; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(width / 2 - 180, y);
        ctx.lineTo(width / 2, y + size);
        ctx.lineTo(width / 2 + 180, y);
        ctx.stroke();
      }
      break;
    }

    case 'geometric': {
      // Technical diamond tournament mesh facets
      const size = 96;
      for (let y = 0; y < height + size; y += size) {
        for (let x = 0; x < width + size; x += size) {
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x + size / 2, y);
          ctx.lineTo(x, y + size / 2);
          ctx.lineTo(x - size / 2, y);
          ctx.closePath();
          ctx.fillStyle = (x / size + y / size) % 2 === 0 ? accentColor : primaryColor;
          ctx.globalAlpha = 0.7;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;
      break;
    }

    case 'gradient': {
      // Smooth athletic shoulder-to-cuff ombre
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, primaryColor);
      grad.addColorStop(0.65, accentColor);
      grad.addColorStop(1, primaryColor);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case 'cuff-accent': {
      // Bold tournament cuff band with dual contrast pinstripes
      const cuffH = Math.max(64, thickness * 2.5);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, height - cuffH, width, cuffH);

      // Contrast upper pinstripe
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillRect(0, height - cuffH - 12, width, 6);
      ctx.fillRect(0, height - cuffH - 24, width, 3);
      break;
    }

    case 'retro-geometric': {
      // 90s retro angular sleeve chevrons
      const size = Math.max(48, thickness * 1.6);
      const stepY = size * 1.5;
      ctx.lineWidth = thickness;
      ctx.strokeStyle = accentColor;
      for (let y = 120; y < height - 120; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width / 2, y + size * 0.6);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      break;
    }

    case 'tonal-jacquard': {
      // Micro-jacquard weave overlay on sleeve
      const tileSize = Math.max(32, thickness);
      ctx.save();
      ctx.globalAlpha = 0.22;
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          if ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0) {
            ctx.fillStyle = accentColor;
            ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8);
          }
        }
      }
      ctx.restore();
      break;
    }

    case 'multi-width-stripes': {
      // Multi-gauge vertical stripes along sleeve
      const count = Math.max(2, stripeCount);
      const barW = thickness;
      const pinW = Math.max(4, Math.round(thickness * 0.25));
      const step = (width - 160) / count;
      for (let i = 0; i < count; i++) {
        const x = 80 + i * step;
        ctx.fillStyle = accentColor;
        ctx.fillRect(x, 0, barW, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(x + barW + 8, 0, pinW, height);
      }
      break;
    }

    case 'colorblock': {
      // Asymmetric top shoulder/bicep block with contrast trim
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height * 0.42);
      ctx.lineTo(0, height * 0.28);
      ctx.closePath();
      ctx.fill();

      // Piping accent line
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.28);
      ctx.lineTo(width, height * 0.42);
      ctx.stroke();
      break;
    }
  }

  // 2. Subtle micro-knit texture pass on sleeve
  drawAthleticFabricWeave(ctx, width, height, 0.04);

  return canvas.toDataURL('image/png');
};

/**
 * Procedural Fabric Pattern & Stripe Renderer
 * Renders high-fidelity athletic football jersey patterns (curved hoops, contoured vertical stripes,
 * diagonal sash with pinstripes, dynamic side panels, chevron velocity, split, geometric, gradient)
 * with authentic fabric drape and strict text protection.
 */
export const drawFabricPatternToContext = (
  ctx: CanvasRenderingContext2D,
  stripes: StripeElementConfig[],
  surface: 'front' | 'back' | string,
  width = 1024,
  height = 1024,
  baseColor?: string
): void => {
  // 1. Draw base primary fabric color if provided
  if (baseColor) {
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw subtle athletic micro-knit weave base
  drawAthleticFabricWeave(ctx, width, height, 0.035);

  const relevant = stripes.filter((s) => s.surface === 'both' || s.surface === surface);
  if (relevant.length === 0) return;

  for (const s of relevant) {
    ctx.save();
    ctx.globalAlpha = s.opacity ?? 1;

    switch (s.orientation) {
      case 'horizontal': {
        // Natural curved athletic hoops following chest and torso drape
        const count = Math.max(1, s.count);
        const totalSpan = (count - 1) * s.spacing;
        const startY = s.positionY - totalSpan / 2;

        for (let i = 0; i < count; i++) {
          const cy = startY + i * s.spacing;
          const bandColor = i % 2 === 1 && s.secondaryColor ? s.secondaryColor : s.color;
          const halfH = s.thickness / 2;

          // Gentle athletic curve downwards (chest drape)
          ctx.beginPath();
          ctx.moveTo(0, cy - halfH);
          ctx.quadraticCurveTo(width / 2, cy - halfH + 16, width, cy - halfH);
          ctx.lineTo(width, cy + halfH);
          ctx.quadraticCurveTo(width / 2, cy + halfH + 16, 0, cy + halfH);
          ctx.closePath();
          ctx.fillStyle = bandColor;
          ctx.fill();

          // Flanking accent pinstripes (subtle tournament highlight)
          ctx.lineWidth = 3;
          ctx.strokeStyle = s.secondaryColor || 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.moveTo(0, cy - halfH - 2);
          ctx.quadraticCurveTo(width / 2, cy - halfH + 14, width, cy - halfH - 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, cy + halfH + 2);
          ctx.quadraticCurveTo(width / 2, cy + halfH + 18, width, cy + halfH + 2);
          ctx.stroke();
        }
        break;
      }

      case 'vertical': {
        // Authentic football vertical stripes (e.g. Milan / Barca / Atletico)
        // Features subtle athletic waist taper and flanking pinstripes
        const count = Math.max(1, s.count);
        const totalSpan = (count - 1) * s.spacing;
        const startX = s.positionX - totalSpan / 2;

        for (let i = 0; i < count; i++) {
          const cx = startX + i * s.spacing;
          const bandColor = i % 2 === 1 && s.secondaryColor ? s.secondaryColor : s.color;
          const halfW = s.thickness / 2;

          // Subtle athletic inward taper at waist (y: 550 - 750)
          ctx.beginPath();
          ctx.moveTo(cx - halfW, 0);
          ctx.quadraticCurveTo(cx - halfW - 4, 620, cx - halfW, height);
          ctx.lineTo(cx + halfW, height);
          ctx.quadraticCurveTo(cx + halfW - 4, 620, cx + halfW, 0);
          ctx.closePath();
          ctx.fillStyle = bandColor;
          ctx.fill();

          // Precision contrast pinstripe borders
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = s.secondaryColor || 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.moveTo(cx - halfW, 0);
          ctx.quadraticCurveTo(cx - halfW - 4, 620, cx - halfW, height);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx + halfW, 0);
          ctx.quadraticCurveTo(cx + halfW - 4, 620, cx + halfW, height);
          ctx.stroke();
        }
        break;
      }

      case 'sash':
      case 'diagonal': {
        // Prestige diagonal sash (River Plate / Vasco / Monaco)
        ctx.save();
        ctx.translate(s.positionX, s.positionY);
        // If back surface, mirror angle so sash wraps over shoulder continuously
        const angle = surface === 'back' ? -(s.angle ?? -45) : (s.angle ?? -45);
        ctx.rotate((angle * Math.PI) / 180);

        const count = Math.max(1, s.count);
        const totalSpan = (count - 1) * s.spacing;
        const startOffset = -totalSpan / 2;

        for (let i = 0; i < count; i++) {
          const off = startOffset + i * s.spacing;
          const bandColor = i % 2 === 1 && s.secondaryColor ? s.secondaryColor : s.color;
          const halfT = s.thickness / 2;

          // Main sash body
          ctx.fillStyle = bandColor;
          ctx.fillRect(-width * 2, off - halfT, width * 4, s.thickness);

          // Double precision accent pinstripes flanking the sash
          ctx.fillStyle = s.secondaryColor || '#FFFFFF';
          ctx.fillRect(-width * 2, off - halfT - 6, width * 4, 3);
          ctx.fillRect(-width * 2, off + halfT + 3, width * 4, 3);
        }
        ctx.restore();
        break;
      }

      case 'split': {
        // Two-tone asymmetric split kit (Monaco / Galatasaray / Blackburn)
        const splitX = s.positionX ?? 512;
        ctx.fillStyle = s.color;
        ctx.fillRect(0, 0, splitX, height);
        ctx.fillStyle = s.secondaryColor || '#FFFFFF';
        ctx.fillRect(splitX, 0, width - splitX, height);

        // Center seam precision accent pinstripe
        ctx.fillStyle = s.secondaryColor ? s.color : '#000000';
        ctx.fillRect(splitX - 3, 0, 6, height);
        break;
      }

      case 'panel': {
        // Classic chest band panel (Boca Juniors / Sampdoria)
        const panelY = s.positionY ?? 440;
        const panelH = s.thickness ?? 190;
        ctx.fillStyle = s.color;
        ctx.fillRect(0, panelY - panelH / 2, width, panelH);

        // Flanking double accent pinstripes
        if (s.secondaryColor) {
          ctx.fillStyle = s.secondaryColor;
          ctx.fillRect(0, panelY - panelH / 2 - 8, width, 5);
          ctx.fillRect(0, panelY + panelH / 2 + 3, width, 5);
        }
        break;
      }

      case 'side-panel': {
        // Ergonomic athletic side flank panels (Nike VaporKnit / Adidas Tiro)
        const panelW = s.thickness || 120;
        const color = s.color;

        // Left flank
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.bezierCurveTo(panelW * 0.4, 380, panelW * 0.8, 620, panelW * 0.5, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        // Right flank
        ctx.beginPath();
        ctx.moveTo(width, 200);
        ctx.bezierCurveTo(width - panelW * 0.4, 380, width - panelW * 0.8, 620, width - panelW * 0.5, height);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Breathable micro-dot athletic mesh effect
        ctx.fillStyle = s.secondaryColor || 'rgba(255, 255, 255, 0.4)';
        for (let y = 300; y < 800; y += 24) {
          ctx.fillRect(20, y, 6, 6);
          ctx.fillRect(width - 26, y, 6, 6);
        }
        break;
      }

      case 'chevron': {
        // Athletic speed chevrons across chest
        const count = Math.max(1, s.count);
        const size = s.thickness || 60;
        const spacing = s.spacing || 90;
        const startY = s.positionY - ((count - 1) * spacing) / 2;

        ctx.lineWidth = size / 2;
        ctx.strokeStyle = s.color;
        ctx.lineJoin = 'miter';

        for (let i = 0; i < count; i++) {
          const y = startY + i * spacing;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 280, y);
          ctx.lineTo(width / 2, y + size);
          ctx.lineTo(width / 2 + 280, y);
          ctx.stroke();

          // Accent pinstripe chevron
          if (s.secondaryColor) {
            ctx.save();
            ctx.lineWidth = 3;
            ctx.strokeStyle = s.secondaryColor;
            ctx.beginPath();
            ctx.moveTo(width / 2 - 280, y - 8);
            ctx.lineTo(width / 2, y + size - 8);
            ctx.lineTo(width / 2 + 280, y - 8);
            ctx.stroke();
            ctx.restore();
          }
        }
        break;
      }

      case 'gradient': {
        // Multi-stage athletic ombre gradient with subtle stippling
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, s.color);
        grad.addColorStop(0.5, s.secondaryColor || s.color);
        grad.addColorStop(1, s.color);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Stipple mesh fade
        ctx.fillStyle = s.secondaryColor || '#FFFFFF';
        ctx.globalAlpha = 0.08;
        for (let y = 350; y < 700; y += 16) {
          for (let x = 80; x < width - 80; x += 16) {
            ctx.fillRect(x, y, 4, 4);
          }
        }
        ctx.globalAlpha = s.opacity ?? 1;
        break;
      }

      case 'geometric': {
        // Technical jacquard diamond facets
        const size = s.thickness || 80;
        for (let y = 0; y < height + size; y += size) {
          for (let x = 0; x < width + size; x += size) {
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2, y);
            ctx.lineTo(x, y + size / 2);
            ctx.lineTo(x - size / 2, y);
            ctx.closePath();
            ctx.fillStyle = (x / size + y / size) % 2 === 0 ? s.color : s.secondaryColor || s.color;
            ctx.globalAlpha = (x / size + y / size) % 2 === 0 ? 0.8 : 0.4;
            ctx.fill();
          }
        }
        ctx.globalAlpha = s.opacity ?? 1;
        break;
      }

      case 'retro-geometric': {
        // 90s retro angular block zigzag / diamond facet ribbons across chest & torso
        // Inspired by iconic 1990-1994 tournament kits (e.g., Germany 90, Denmark 92)
        const centerY = s.positionY ?? 400;
        const bandH = s.thickness || 180;
        const numChevrons = Math.max(3, s.count || 4);
        const segW = width / numChevrons;
        const color1 = s.color;
        const color2 = s.secondaryColor || '#FFFFFF';

        // Draw multiple stepped angular layers
        const layers = 3;
        const layerH = bandH / layers;

        for (let l = 0; l < layers; l++) {
          const ly = centerY - bandH / 2 + l * layerH;
          const layerColor = l === 0 ? color1 : l === 1 ? color2 : (s.secondaryColor ? color1 : '#111827');

          ctx.fillStyle = layerColor;
          ctx.beginPath();
          ctx.moveTo(0, ly);

          for (let i = 0; i <= numChevrons; i++) {
            const x1 = i * segW;
            const midX = x1 + segW / 2;
            const peakY = (i % 2 === 0) ? ly - 28 : ly + 28;
            ctx.lineTo(x1, peakY);
            if (i < numChevrons) {
              ctx.lineTo(midX, peakY + (i % 2 === 0 ? 32 : -32));
            }
          }

          ctx.lineTo(width, ly + layerH);
          for (let i = numChevrons; i >= 0; i--) {
            const x1 = i * segW;
            const midX = x1 - segW / 2;
            const peakY = (i % 2 === 0) ? ly + layerH - 28 : ly + layerH + 28;
            ctx.lineTo(x1, peakY);
            if (i > 0) {
              ctx.lineTo(midX, peakY + (i % 2 === 0 ? 32 : -32));
            }
          }
          ctx.closePath();
          ctx.fill();

          // Contrast piping highlight along facet edges
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.stroke();
        }
        break;
      }

      case 'tonal-jacquard': {
        // Authentic all-over micro-repeat tonal jacquard damask / houndstooth weave
        // Subtle optical sheen across fabric, ensuring sponsor and typography remain pristine
        const tileSize = Math.max(24, Math.min(80, s.thickness || 40));
        const color = s.color;
        const secondary = s.secondaryColor || 'rgba(255, 255, 255, 0.25)';

        ctx.save();
        // Keep jacquard subtle so direct-print text is crisp
        ctx.globalAlpha = (s.opacity ?? 1) * 0.22;

        for (let y = -tileSize; y < height + tileSize; y += tileSize) {
          for (let x = -tileSize; x < width + tileSize; x += tileSize) {
            const isAlt = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0;

            if (isAlt) {
              // Tonal diamond rhombus
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.moveTo(x + tileSize / 2, y);
              ctx.lineTo(x + tileSize, y + tileSize / 2);
              ctx.lineTo(x + tileSize / 2, y + tileSize);
              ctx.lineTo(x, y + tileSize / 2);
              ctx.closePath();
              ctx.fill();

              // Micro inner nested diamond
              ctx.fillStyle = secondary;
              ctx.beginPath();
              ctx.moveTo(x + tileSize / 2, y + tileSize * 0.25);
              ctx.lineTo(x + tileSize * 0.75, y + tileSize / 2);
              ctx.lineTo(x + tileSize / 2, y + tileSize * 0.75);
              ctx.lineTo(x + tileSize * 0.25, y + tileSize / 2);
              ctx.closePath();
              ctx.fill();
            } else {
              // Diagonal micro-lines texture inside alternate cells
              ctx.strokeStyle = secondary;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + tileSize, y + tileSize);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
        break;
      }

      case 'multi-width-stripes': {
        // Classic European club multi-gauge vertical stripes (e.g. Barcelona, Atletico, Newcastle)
        // Alternates broad main pillars, flanking pinstripes, and intermediate panels
        const centerX = s.positionX ?? width / 2;
        const broadW = Math.max(40, s.thickness || 70);
        const pinW = Math.max(4, Math.round(broadW * 0.12));
        const medW = Math.max(20, Math.round(broadW * 0.45));
        const gap = Math.max(16, s.spacing || 36);
        const cycleW = broadW + gap + pinW + gap + medW + gap + pinW + gap;

        const mainColor = s.color;
        const altColor = s.secondaryColor || '#FFFFFF';

        // Draw rhythmic multi-width stripes across the canvas width
        const numCycles = Math.ceil(width / cycleW) + 2;
        const startX = centerX - Math.floor(numCycles / 2) * cycleW;

        for (let c = 0; c < numCycles; c++) {
          let currX = startX + c * cycleW;

          // 1. Broad main pillar with athletic waist taper
          ctx.fillStyle = mainColor;
          ctx.beginPath();
          ctx.moveTo(currX - broadW / 2, 0);
          ctx.quadraticCurveTo(currX - broadW / 2 - 3, 620, currX - broadW / 2, height);
          ctx.lineTo(currX + broadW / 2, height);
          ctx.quadraticCurveTo(currX + broadW / 2 - 3, 620, currX + broadW / 2, 0);
          ctx.closePath();
          ctx.fill();

          // 2. First flanking pinstripe
          currX += broadW / 2 + gap + pinW / 2;
          ctx.fillStyle = altColor;
          ctx.fillRect(currX - pinW / 2, 0, pinW, height);

          // 3. Intermediate medium bar
          currX += pinW / 2 + gap + medW / 2;
          ctx.fillStyle = mainColor;
          ctx.fillRect(currX - medW / 2, 0, medW, height);

          // 4. Second flanking pinstripe
          currX += medW / 2 + gap + pinW / 2;
          ctx.fillStyle = altColor;
          ctx.fillRect(currX - pinW / 2, 0, pinW, height);
        }
        break;
      }

      case 'colorblock': {
        // 90s asymmetric shoulder & torso panel color blocking (e.g. Adidas Equipment / 90s Arsenal)
        const primaryBlockColor = s.color;
        const secondaryBlockColor = s.secondaryColor || '#FFFFFF';
        const isBack = surface === 'back';

        // Angular shoulder wedge
        ctx.fillStyle = primaryBlockColor;
        ctx.beginPath();
        if (!isBack) {
          ctx.moveTo(0, 0);
          ctx.lineTo(width * 0.72, 0);
          ctx.lineTo(0, height * 0.55);
        } else {
          // Mirrored on back surface for seamless shoulder drape
          ctx.moveTo(width, 0);
          ctx.lineTo(width * 0.28, 0);
          ctx.lineTo(width, height * 0.55);
        }
        ctx.closePath();
        ctx.fill();

        // Secondary color accent striping along seam
        ctx.fillStyle = secondaryBlockColor;
        ctx.beginPath();
        if (!isBack) {
          ctx.moveTo(0, height * 0.55);
          ctx.lineTo(width * 0.72, 0);
          ctx.lineTo(width * 0.78, 0);
          ctx.lineTo(0, height * 0.60);
        } else {
          ctx.moveTo(width, height * 0.55);
          ctx.lineTo(width * 0.28, 0);
          ctx.lineTo(width * 0.22, 0);
          ctx.lineTo(width, height * 0.60);
        }
        ctx.closePath();
        ctx.fill();

        // Contrast piping seam stroke
        ctx.lineWidth = 3;
        ctx.strokeStyle = secondaryBlockColor;
        ctx.beginPath();
        if (!isBack) {
          ctx.moveTo(0, height * 0.55);
          ctx.lineTo(width * 0.72, 0);
        } else {
          ctx.moveTo(width, height * 0.55);
          ctx.lineTo(width * 0.28, 0);
        }
        ctx.stroke();

        // Opposite lower flank colorblock accent
        ctx.fillStyle = primaryBlockColor;
        ctx.beginPath();
        if (!isBack) {
          ctx.moveTo(width, height * 0.65);
          ctx.lineTo(width * 0.75, height);
          ctx.lineTo(width, height);
        } else {
          ctx.moveTo(0, height * 0.65);
          ctx.lineTo(width * 0.25, height);
          ctx.lineTo(0, height);
        }
        ctx.closePath();
        ctx.fill();
        break;
      }
    }

    ctx.restore();
  }
};

/**
 * Generate Procedural Stripes Overlay Data URL for Torso (Front / Back)
 */
export const generateStripesOverlayDataUrl = (
  stripes: StripeElementConfig[],
  surface: 'front' | 'back' | string,
  width = 1024,
  height = 1024,
  baseColor?: string
): string | null => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  drawFabricPatternToContext(ctx, stripes, surface, width, height, baseColor);
  return canvas.toDataURL('image/png');
};
