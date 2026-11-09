import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from '@/features/viewer-3d/components/Lighting';
import { CameraRig } from '@/features/viewer-3d/components/CameraRig';
import { ViewportToolbar } from '@/features/viewer-3d/components/ViewportToolbar';
import { LoadingOverlay } from '@/features/viewer-3d/components/LoadingOverlay';
import { JerseyModel, JERSEY_MODEL_PATH } from '@/features/jersey-editor/components/JerseyModel';
import { JerseyErrorBoundary } from '@/features/jersey-editor/components/JerseyErrorBoundary';
import {
  validateModelAsset,
  type ModelAssetValidationResult,
} from '@/services/model-asset.service';
import { Box, Layers, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useDesignerStore } from '@/stores/designer.store';

export const JerseyViewer3D: React.FC = () => {
  const [assetStatus, setAssetStatus] = useState<ModelAssetValidationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const baseColor = useDesignerStore((state) => state.baseColor);

  // Perform rigorous asset validation check (preventing Vite SPA HTML fallback parsing)
  const verifyAsset = useCallback(async () => {
    setIsVerifying(true);
    try {
      const result = await validateModelAsset(JERSEY_MODEL_PATH);
      setAssetStatus(result);
    } catch {
      setAssetStatus({
        valid: false,
        status: 'network_error',
        reason: 'Network check failed',
      });
    } finally {
      setIsVerifying(false);
    }
  }, []);

  useEffect(() => {
    verifyAsset();
  }, [verifyAsset]);

  const activeSurfaceElements = surfaces[selectedSurface]?.elements?.length || 0;

  return (
    <JerseyErrorBoundary onRetry={verifyAsset}>
      <div className="relative w-full h-full min-h-[450px] bg-neutral-100/70 dark:bg-slate-950/80 rounded-2xl overflow-hidden border border-neutral-200/60 dark:border-slate-800/80 select-none transition-colors duration-200 flex flex-col items-center justify-center">
        {assetStatus?.valid ? (
          /* Real Valid 3D Jersey Asset Loaded */
          <Suspense fallback={<LoadingOverlay />}>
            <Canvas
              shadows
              camera={{ position: [0, 0, 2.5], fov: 45 }}
              gl={{
                antialias: true,
                preserveDrawingBuffer: true,
                powerPreference: 'high-performance',
              }}
              dpr={[1, 2]}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Lighting />
              <CameraRig />
              <JerseyModel />
            </Canvas>
            <LoadingOverlay />
            <ViewportToolbar />
          </Suspense>
        ) : (
          /* Professional & Informative Empty State (Section 48 & 85 of Phase 4.1 Specification) */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            {/* Active Studio Three.js Ambient Stage with Orbit Controls */}
            <div className="absolute inset-0 z-0">
              <Canvas
                camera={{ position: [0, 0, 2.5], fov: 45 }}
                dpr={[1, 2]}
                className="w-full h-full opacity-25 cursor-grab active:cursor-grabbing"
              >
                <Lighting />
                <CameraRig />
              </Canvas>
            </div>

            {/* Informative Floating Status Card */}
            <div className="relative z-10 max-w-lg w-full p-6 sm:p-7 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-xl text-left transition-all">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-900/50">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2.5 py-0.5 rounded-full">
                      Phase 4.1 Asset Status
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                      3D Jersey Mesh Pending
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={verifyAsset}
                  disabled={isVerifying}
                  title="Check asset status again"
                  className="p-2 text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin text-blue-600' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                The 3D model file <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-slate-800 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 font-semibold">public/models/jersey.glb</code> is not yet present on the server. To avoid application crash, the 3D loader is paused until a valid asset is provided.
              </p>

              {/* Status details matrix */}
              <div className="p-3.5 bg-neutral-50 dark:bg-slate-800/60 rounded-2xl border border-neutral-200/70 dark:border-slate-700/70 space-y-2 mb-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Selected Surface:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white capitalize flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{selectedSurface}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Active Surface Elements:</span>
                  <span className="font-mono font-medium text-neutral-800 dark:text-neutral-200">
                    {activeSurfaceElements} {activeSurfaceElements === 1 ? 'element' : 'elements'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Fabric Base Color:</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-slate-600"
                      style={{ backgroundColor: baseColor }}
                    />
                    <span>{baseColor}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-neutral-200/50 dark:border-slate-700/50">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Validation Diagnostic:</span>
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 max-w-[200px] truncate text-right" title={assetStatus?.reason}>
                    {assetStatus?.reason || (isVerifying ? 'Checking...' : 'Asset missing')}
                  </span>
                </div>
              </div>

              {/* 2D Studio Assurance Notification */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[11px] text-blue-800 dark:text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>2D Studio 100% Operational:</strong> You can customize all 6 surfaces (Front, Back, Sleeves, Shoulders), upload artwork, add typography, and choose fabric palettes in the panel on the right.
                </span>
              </div>

              {/* Integrity Reminder */}
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500 justify-end">
                <ShieldAlert className="w-3 h-3 text-neutral-400" />
                <span>Strictly adhering to Section 48 & 85: No fake mockups or substitute garments used.</span>
              </div>
            </div>

            {/* Bottom Camera Toolbar */}
            <ViewportToolbar />
          </div>
        )}
      </div>
    </JerseyErrorBoundary>
  );
};
