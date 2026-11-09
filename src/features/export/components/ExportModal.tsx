import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Download,
  Image as ImageIcon,
  Shirt,
  Box,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
} from 'lucide-react';
import { useDesignerStore } from '@/stores/designer.store';
import type {
  ExportType,
  ExportResolution,
  CameraAngle,
  ExportBackground,
} from '../types/export.types';
import {
  renderSurfaceToDataUrl,
  exportSingleSurfaceArtwork,
  exportAllSurfacesZip,
} from '../services/artwork-export.service';
import {
  render3DMockupToDataUrl,
  export3DMockup,
} from '../services/mockup-export.service';
import {
  bakeUVTextureToDataUrl,
  exportUVTexture,
} from '../services/uv-baker.service';
import { ExportNotice, GPUCapabilityNotice } from './ExportNotice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const garmentType = useDesignerStore((state) => state.garmentType);
  const baseColor = useDesignerStore((state) => state.baseColor);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const currentProjectName = useDesignerStore((state) => state.currentProjectName);

  const [exportType, setExportType] = useState<ExportType>('artwork-2d');
  const [resolution, setResolution] = useState<ExportResolution>(2048);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');

  // 2D Options
  const [surface2D, setSurface2D] = useState<string>('all');
  const [background2D, setBackground2D] = useState<'transparent' | 'white' | 'fabric'>('transparent');

  // 3D Options
  const [cameraAngle3D, setCameraAngle3D] = useState<CameraAngle>('front');
  const [background3D, setBackground3D] = useState<ExportBackground>('transparent');

  // State
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progressText, setProgressText] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableSurfaces =
    garmentType === 'jersey'
      ? [
          { id: 'front', label: 'Front Body' },
          { id: 'back', label: 'Back Body' },
          { id: 'left', label: 'Left Sleeve' },
          { id: 'right', label: 'Right Sleeve' },
          { id: 'leftShoulder', label: 'Left Shoulder' },
          { id: 'rightShoulder', label: 'Right Shoulder' },
        ]
      : [
          { id: 'front', label: 'Front Chest' },
          { id: 'back', label: 'Back Print' },
        ];

  // Generate lightweight 512px preview on setting change
  const generatePreview = useCallback(async () => {
    setIsGeneratingPreview(true);
    setErrorMessage(null);

    try {
      if (exportType === 'artwork-2d') {
        const targetSurface = surface2D === 'all' ? selectedSurface : surface2D;
        const url = await renderSurfaceToDataUrl({
          surfaceKey: targetSurface,
          surfaceData: surfaces[targetSurface],
          resolution: 512 as ExportResolution,
          format,
          background: background2D,
          baseColor,
        });
        setPreviewUrl(url);
      } else if (exportType === 'mockup-3d') {
        const url = await render3DMockupToDataUrl({
          garmentType,
          options: {
            resolution: 512 as ExportResolution,
            format,
            cameraAngle: cameraAngle3D,
            background: background3D,
          },
          baseColor,
          surfaces,
        });
        setPreviewUrl(url);
      } else if (exportType === 'uv-texture') {
        const url = await bakeUVTextureToDataUrl({
          garmentType,
          options: {
            resolution: 512 as ExportResolution,
            format,
          },
          baseColor,
          surfaces,
        });
        setPreviewUrl(url);
      }
    } catch (err) {
      console.error('Preview generation error:', err);
      setErrorMessage('Could not generate real-time preview.');
    } finally {
      setIsGeneratingPreview(false);
    }
  }, [
    exportType,
    surface2D,
    selectedSurface,
    format,
    background2D,
    baseColor,
    surfaces,
    garmentType,
    cameraAngle3D,
    background3D,
  ]);

  useEffect(() => {
    if (isOpen) {
      setSuccessMessage(null);
      setErrorMessage(null);
      generatePreview();
    }
  }, [isOpen, generatePreview]);

  if (!isOpen) return null;

  // Handle high-resolution final export execution
  const handleExport = async () => {
    setIsExporting(true);
    setProgressText('Preparing high-resolution export assets...');
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (exportType === 'artwork-2d') {
        if (surface2D === 'all') {
          setProgressText('Bundling all surface graphics into ZIP...');
          const zipName = await exportAllSurfacesZip(
            {
              resolution,
              format,
              surface: 'all',
              background: background2D,
            },
            surfaces,
            garmentType,
            baseColor,
            currentProjectName,
            (curr, total, sName) => {
              setProgressText(`Rendering surface ${curr}/${total} (${sName})...`);
            }
          );
          setSuccessMessage(`Downloaded "${zipName}" successfully.`);
        } else {
          setProgressText(`Rendering ${surface2D} at ${resolution}×${resolution} px...`);
          const fname = await exportSingleSurfaceArtwork(
            {
              resolution,
              format,
              surface: surface2D,
              background: background2D,
            },
            surfaces[surface2D],
            garmentType,
            baseColor,
            currentProjectName
          );
          setSuccessMessage(`Downloaded "${fname}" successfully.`);
        }
      } else if (exportType === 'mockup-3d') {
        setProgressText(`Rendering 3D ${cameraAngle3D} mockup at ${resolution}×${resolution} px...`);
        const fname = await export3DMockup(
          garmentType,
          {
            resolution,
            format,
            cameraAngle: cameraAngle3D,
            background: background3D,
          },
          baseColor,
          surfaces,
          currentProjectName
        );
        setSuccessMessage(`Downloaded "${fname}" successfully.`);
      } else if (exportType === 'uv-texture') {
        setProgressText(`Baking GPU UV texture atlas at ${resolution}×${resolution} px...`);
        const fname = await exportUVTexture(
          garmentType,
          {
            resolution,
            format,
          },
          baseColor,
          surfaces,
          currentProjectName
        );
        setSuccessMessage(`Downloaded "${fname}" successfully.`);
      }
    } catch (err: unknown) {
      console.error('Export error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Export failed. Please try a lower resolution.');
    } finally {
      setIsExporting(false);
      setProgressText(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-neutral-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                  Export Design Studio
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {garmentType}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Download 2D artwork, photorealistic 3D mockups, and baked UV texture maps
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Configuration Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Export Type Tabs */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Export Target
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setExportType('artwork-2d')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                    exportType === 'artwork-2d'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-2xs font-semibold'
                      : 'border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <ImageIcon className="w-5 h-5 mb-1.5" />
                  <span className="text-xs">2D Artwork</span>
                  <span className="text-[10px] text-neutral-400">Vector / PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExportType('mockup-3d')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                    exportType === 'mockup-3d'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-2xs font-semibold'
                      : 'border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Shirt className="w-5 h-5 mb-1.5" />
                  <span className="text-xs">3D Mockup</span>
                  <span className="text-[10px] text-neutral-400">Real Studio Render</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExportType('uv-texture')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                    exportType === 'uv-texture'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-2xs font-semibold'
                      : 'border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Box className="w-5 h-5 mb-1.5" />
                  <span className="text-xs">UV Texture</span>
                  <span className="text-[10px] text-neutral-400">GPU Baked Atlas</span>
                </button>
              </div>
            </div>

            {/* 2. Specific Settings per Export Type */}
            {exportType === 'artwork-2d' && (
              <div className="space-y-4 p-4 rounded-2xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-200/80 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Design Surfaces
                  </label>
                  <select
                    value={surface2D}
                    onChange={(e) => setSurface2D(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">📦 All Surfaces (Bundled ZIP Archive)</option>
                    {availableSurfaces.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label} ({s.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Background Fill
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setBackground2D('transparent')}
                      className={`px-3 py-2 text-xs rounded-xl border transition-colors ${
                        background2D === 'transparent'
                          ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-semibold shadow-2xs'
                          : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      Transparent (PNG)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackground2D('white')}
                      className={`px-3 py-2 text-xs rounded-xl border transition-colors ${
                        background2D === 'white'
                          ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-semibold shadow-2xs'
                          : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      White
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackground2D('fabric')}
                      className={`px-3 py-2 text-xs rounded-xl border transition-colors flex items-center justify-center gap-1.5 ${
                        background2D === 'fabric'
                          ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-semibold shadow-2xs'
                          : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: baseColor }}
                      />
                      <span>Fabric Color</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {exportType === 'mockup-3d' && (
              <div className="space-y-4 p-4 rounded-2xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-200/80 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Camera Angle
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['front', 'back', 'left', 'right', 'isometric'] as CameraAngle[]).map((angle) => (
                      <button
                        key={angle}
                        type="button"
                        onClick={() => setCameraAngle3D(angle)}
                        className={`py-2 text-[11px] capitalize rounded-xl border text-center transition-colors ${
                          cameraAngle3D === angle
                            ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-bold shadow-2xs'
                            : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {angle}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Studio Background
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setBackground3D('transparent')}
                      className={`px-3 py-2 text-xs rounded-xl border transition-colors ${
                        background3D === 'transparent'
                          ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-semibold shadow-2xs'
                          : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      Transparent
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackground3D('white')}
                      className={`px-3 py-2 text-xs rounded-xl border transition-colors ${
                        background3D === 'white'
                          ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-semibold shadow-2xs'
                          : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      White
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackground3D('studio')}
                      className={`px-3 py-2 text-xs rounded-xl border transition-colors ${
                        background3D === 'studio'
                          ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-semibold shadow-2xs'
                          : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      Slate Studio
                    </button>
                  </div>
                </div>
              </div>
            )}

            {exportType === 'uv-texture' && (
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-slate-800/50 border border-neutral-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Real GLB UV Geometry Texture Baking</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Bakes all active panels directly onto the 3D model’s UV map. Ready to import as an
                  albedo texture in Blender, Maya, Unreal Engine, or CLO3D.
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-200/70 dark:bg-slate-700/60 text-[10px] font-mono text-neutral-700 dark:text-neutral-300">
                  <span>Model: {garmentType === 'jersey' ? 'Medina3D V-Neck (CLO3D Pattern)' : 'Crewneck T-Shirt UV Layout'}</span>
                </div>
              </div>
            )}

            {/* 3. Output Resolution & Format */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Resolution
                </label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(Number(e.target.value) as ExportResolution)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1024}>1024 × 1024 px (Fast / Web)</option>
                  <option value={2048}>2048 × 2048 px (Recommended HD)</option>
                  <option value={4096}>4096 × 4096 px (Ultra-HD / Production)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  File Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat('png')}
                    className={`py-2 text-xs rounded-xl border text-center transition-colors font-medium ${
                      format === 'png'
                        ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-bold shadow-2xs'
                        : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    PNG (Alpha)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('jpeg')}
                    className={`py-2 text-xs rounded-xl border text-center transition-colors font-medium ${
                      format === 'jpeg'
                        ? 'border-blue-600 bg-white dark:bg-slate-900 text-blue-600 font-bold shadow-2xs'
                        : 'border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    JPEG
                  </button>
                </div>
              </div>
            </div>

            <GPUCapabilityNotice />
          </div>

          {/* Right Column: Live Preview & Action (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-neutral-500" />
                  Live Pratinjau
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Target: {resolution}×{resolution} px
                </span>
              </div>

              {/* Preview Box */}
              <div className="relative w-full aspect-square rounded-2xl bg-neutral-100 dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
                {isGeneratingPreview ? (
                  <div className="flex flex-col items-center gap-2 text-neutral-400">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="text-xs">Generating preview...</span>
                  </div>
                ) : previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Export Preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-xs text-neutral-400 flex flex-col items-center gap-1">
                    <AlertCircle className="w-5 h-5 text-neutral-400" />
                    <span>No preview available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            {progressText && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>{progressText}</span>
              </div>
            )}

            {successMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="truncate">{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Production Notice */}
            <ExportNotice />

            {/* Download Button */}
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing High-Res Export...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    {exportType === 'artwork-2d' && surface2D === 'all'
                      ? 'Download All Surfaces (ZIP)'
                      : `Download ${resolution}×${resolution} ${format.toUpperCase()}`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
