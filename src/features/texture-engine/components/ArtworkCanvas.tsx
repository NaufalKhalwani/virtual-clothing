import React, { useEffect, useRef, useCallback } from 'react';
import {
  createFabricCanvas,
  exportCanvasAsDataUrl,
  serializeCanvas,
  loadCanvasFromJson,
  CANVAS_SIZE,
} from '../services/canvas.service';
import { useDesignerStore } from '@/stores/designer.store';
import { compositeFabricArtworkWithPattern } from '@/features/jersey-editor/services/jersey-template-renderer';
import type { Canvas, FabricObject } from 'fabric';

interface ArtworkCanvasProps {
  onCanvasReady?: (canvas: Canvas) => void;
  onTextureUpdate?: (surface: string, dataUrl: string) => void;
}

export const ArtworkCanvas: React.FC<ArtworkCanvasProps> = ({
  onCanvasReady,
  onTextureUpdate,
}) => {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const isSwitchingSurface = useRef(false);

  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const garmentType = useDesignerStore((state) => state.garmentType);
  const jerseyStripes = useDesignerStore((state) => state.jerseyStripes);
  const surfaceViewports = useDesignerStore((state) => state.surfaceViewports);
  const setSurfaceTexture = useDesignerStore((state) => state.setSurfaceTexture);
  const selectElement = useDesignerStore((state) => state.selectElement);
  const pushHistory = useDesignerStore((state) => state.pushHistory);

  const currentVp = surfaceViewports?.[selectedSurface] || { zoom: 1.0, panX: 0, panY: 0 };
  const surfaceJson = surfaces[selectedSurface]?.canvasJson || null;
  const lastLoadedJsonRef = useRef<string | null>(null);

  // Synchronize canvas to 3D texture and store with pattern layering
  const syncTexture = useCallback(async () => {
    if (!fabricRef.current || isSwitchingSurface.current) return;

    const canvas = fabricRef.current;
    const objects = canvas.getObjects();

    let rawDataUrl: string | null = null;
    if (objects.length > 0) {
      rawDataUrl = exportCanvasAsDataUrl(canvas);
    }

    const json = serializeCanvas(canvas);
    lastLoadedJsonRef.current = json;

    if (garmentType === 'jersey') {
      const currentColors = useDesignerStore.getState().jerseyColors;
      const baseCol = currentColors?.primary || useDesignerStore.getState().baseColor;
      const compositedUrl = await compositeFabricArtworkWithPattern(
        rawDataUrl,
        jerseyStripes,
        selectedSurface,
        CANVAS_SIZE.width,
        CANVAS_SIZE.height,
        baseCol
      );
      setSurfaceTexture(selectedSurface, compositedUrl || rawDataUrl, json);

      if (compositedUrl && onTextureUpdate) {
        onTextureUpdate(selectedSurface, compositedUrl);
      }
    } else {
      setSurfaceTexture(selectedSurface, rawDataUrl, json);

      if (rawDataUrl && onTextureUpdate) {
        onTextureUpdate(selectedSurface, rawDataUrl);
      }
    }
  }, [selectedSurface, garmentType, jerseyStripes, setSurfaceTexture, onTextureUpdate]);

  // Initialize Canvas
  useEffect(() => {
    if (!canvasElRef.current) return;

    const fabricCanvas = createFabricCanvas(canvasElRef.current, CANVAS_SIZE);
    fabricRef.current = fabricCanvas;

    let rafId: number | null = null;
    const handleTransformationEnd = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      pushHistory();
      syncTexture();
    };

    // Throttle live transform sync via requestAnimationFrame to avoid blocking the main thread
    const handleActiveMoving = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        syncTexture();
        rafId = null;
      });
    };

    const handleSelection = (e: { selected?: FabricObject[] }) => {
      if (e.selected && e.selected.length > 0) {
        const obj = e.selected[0];
        const customId = (obj as unknown as { id?: string }).id || `obj_${Date.now()}`;
        (obj as unknown as { id: string }).id = customId;
        selectElement(customId);
      } else {
        selectElement(null);
      }
    };

    const handleSelectionCleared = () => {
      selectElement(null);
    };

    fabricCanvas.on('object:modified', handleTransformationEnd);
    fabricCanvas.on('object:moving', handleActiveMoving);
    fabricCanvas.on('object:scaling', handleActiveMoving);
    fabricCanvas.on('object:rotating', handleActiveMoving);
    fabricCanvas.on('selection:created', handleSelection);
    fabricCanvas.on('selection:updated', handleSelection);
    fabricCanvas.on('selection:cleared', handleSelectionCleared);

    if (onCanvasReady) {
      onCanvasReady(fabricCanvas);
    }

    // Load initial surface data if available
    const initialSurface = surfaces[selectedSurface];
    if (initialSurface?.canvasJson) {
      loadCanvasFromJson(fabricCanvas, initialSurface.canvasJson).then(() => {
        lastLoadedJsonRef.current = initialSurface.canvasJson ?? null;
        syncTexture();
      });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      fabricCanvas.dispose();
      fabricRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Surface Switch or External Project Load Handler
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Skip if canvas already matches this JSON
    if (surfaceJson === lastLoadedJsonRef.current && lastLoadedJsonRef.current !== null) {
      return;
    }

    isSwitchingSurface.current = true;
    canvas.clear();
    selectElement(null);

    if (surfaceJson) {
      loadCanvasFromJson(canvas, surfaceJson).then(() => {
        lastLoadedJsonRef.current = surfaceJson;
        isSwitchingSurface.current = false;
        syncTexture();
      });
    } else {
      lastLoadedJsonRef.current = null;
      isSwitchingSurface.current = false;
      syncTexture();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSurface, surfaceJson]);

  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto rounded-2xl bg-neutral-100/80 dark:bg-slate-800/70 p-3 border border-neutral-200/80 dark:border-slate-700/80 shadow-inner flex items-center justify-center transition-colors duration-200 overflow-hidden">
      {/* Printable Area dashed guide */}
      <div className="absolute inset-3 rounded-xl border border-dashed border-neutral-300 dark:border-slate-600 pointer-events-none flex flex-col justify-between p-2 z-10">
        <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest text-center">
          {selectedSurface} Area
        </span>
        <div className="flex justify-between text-[9px] text-neutral-300 dark:text-slate-600 font-mono">
          <span>+</span>
          <span>+</span>
        </div>
      </div>

      {/* Fabric.js Canvas Viewport with Independent Zoom & Pan */}
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-lg">
        <div
          className="w-full h-full relative transition-transform duration-100 origin-center flex items-center justify-center"
          style={{
            transform: `scale(${currentVp.zoom}) translate(${currentVp.panX}px, ${currentVp.panY}px)`,
          }}
        >
          <canvas
            ref={canvasElRef}
            style={{
              width: '100%',
              height: '100%',
              touchAction: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
