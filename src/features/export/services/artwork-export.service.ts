import { Canvas } from 'fabric';
import JSZip from 'jszip';
import type { SurfaceDesign, GarmentType } from '@/types/designer.types';
import type { Export2DOptions, ExportResolution } from '../types/export.types';
import { sanitizeFileName, downloadDataUrl, downloadBlob, dataUrlToBlob } from '../utils/download.utils';
import { loadCanvasFromJson } from '@/features/texture-engine/services/canvas.service';

export interface RenderSurfaceOptions {
  surfaceKey: string;
  surfaceData?: SurfaceDesign;
  resolution: ExportResolution;
  format: 'png' | 'jpeg';
  background: 'transparent' | 'white' | 'fabric';
  baseColor: string;
}

/**
 * Renders a single design surface to high-resolution data URL using an offscreen Fabric canvas
 */
export const renderSurfaceToDataUrl = async (options: RenderSurfaceOptions): Promise<string> => {
  const { surfaceData, resolution, format, background, baseColor } = options;

  const tempEl = document.createElement('canvas');
  tempEl.width = 1024;
  tempEl.height = 1024;

  const canvas = new Canvas(tempEl, {
    width: 1024,
    height: 1024,
    backgroundColor: 'rgba(0,0,0,0)',
  });

  if (surfaceData?.canvasJson) {
    await loadCanvasFromJson(canvas, surfaceData.canvasJson);
  }

  // Set background fill according to selection
  if (format === 'jpeg') {
    canvas.backgroundColor = background === 'fabric' ? baseColor : '#ffffff';
  } else {
    if (background === 'transparent') {
      canvas.backgroundColor = 'rgba(0,0,0,0)';
    } else if (background === 'white') {
      canvas.backgroundColor = '#ffffff';
    } else {
      canvas.backgroundColor = baseColor;
    }
  }

  canvas.renderAll();

  const multiplier = resolution / 1024;
  const dataUrl = canvas.toDataURL({
    format,
    multiplier,
    quality: 0.95,
  });

  canvas.dispose();
  return dataUrl;
};

/**
 * Exports a single design surface directly to browser download
 */
export const exportSingleSurfaceArtwork = async (
  options: Export2DOptions,
  surfaceData: SurfaceDesign | undefined,
  garmentType: GarmentType,
  baseColor: string,
  projectName: string
): Promise<string> => {
  const sanitized = sanitizeFileName(projectName);
  const surfaceName = options.surface;
  const ext = options.format;
  const filename = `${sanitized}-${garmentType}-${surfaceName}.${ext}`;

  const dataUrl = await renderSurfaceToDataUrl({
    surfaceKey: surfaceName,
    surfaceData,
    resolution: options.resolution,
    format: options.format,
    background: options.background,
    baseColor,
  });

  downloadDataUrl(dataUrl, filename);
  return filename;
};

/**
 * Exports all surfaces of the garment bundled into a clean ZIP archive
 */
export const exportAllSurfacesZip = async (
  options: Export2DOptions,
  surfaces: Record<string, SurfaceDesign>,
  garmentType: GarmentType,
  baseColor: string,
  projectName: string,
  onProgress?: (current: number, total: number, surfaceName: string) => void
): Promise<string> => {
  const sanitized = sanitizeFileName(projectName);
  const zip = new JSZip();

  const targetSurfaces =
    garmentType === 'jersey'
      ? ['front', 'back', 'left', 'right', 'leftShoulder', 'rightShoulder']
      : ['front', 'back'];

  for (let i = 0; i < targetSurfaces.length; i++) {
    const surfaceKey = targetSurfaces[i];
    if (onProgress) {
      onProgress(i + 1, targetSurfaces.length, surfaceKey);
    }

    const dataUrl = await renderSurfaceToDataUrl({
      surfaceKey,
      surfaceData: surfaces[surfaceKey],
      resolution: options.resolution,
      format: options.format,
      background: options.background,
      baseColor,
    });

    const blob = await dataUrlToBlob(dataUrl);
    const filename = `${sanitized}-${garmentType}-${surfaceKey}.${options.format}`;
    zip.file(filename, blob);
  }

  // Include design manifesto & physical print specification disclaimer
  const manifestContent = `Virtual Clothing Designer — Design Export Manifesto
=====================================================
Project Name: ${projectName}
Garment Type: ${garmentType.toUpperCase()}
Base Fabric Color: ${baseColor}
Export Resolution: ${options.resolution} x ${options.resolution} px
Format: ${options.format.toUpperCase()}
Background: ${options.background}
Surfaces Included: ${targetSurfaces.join(', ')}
Export Timestamp: ${new Date().toISOString()}

Production Hand-off Notice:
- These files represent high-resolution digital design assets generated from the 3D studio.
- Prior to final textile printing (e.g. sublimation, screen-printing, DTF), please consult with your garment vendor for physical dimensions (cm/inches), bleed margin requirements, safe zones, and Pantone/CMYK profile color matching.
`;

  zip.file('EXPORT-SPECIFICATION.txt', manifestContent);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipFilename = `${sanitized}-${garmentType}-all-surfaces.zip`;
  downloadBlob(zipBlob, zipFilename);

  return zipFilename;
};
