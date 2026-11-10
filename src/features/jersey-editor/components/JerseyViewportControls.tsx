import React from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  AlignCenterHorizontal,
  AlignCenterVertical,
  Move,
} from 'lucide-react';

export const JerseyViewportControls: React.FC = () => {
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const surfaceViewports = useDesignerStore((state) => state.surfaceViewports);
  const setSurfaceZoom = useDesignerStore((state) => state.setSurfaceZoom);
  const setSurfacePan = useDesignerStore((state) => state.setSurfacePan);
  const resetSurfaceViewport = useDesignerStore((state) => state.resetSurfaceViewport);
  const fitSurfaceToCanvas = useDesignerStore((state) => state.fitSurfaceToCanvas);
  const centerSurfaceHorizontally = useDesignerStore((state) => state.centerSurfaceHorizontally);
  const centerSurfaceVertically = useDesignerStore((state) => state.centerSurfaceVertically);

  const currentVp = surfaceViewports[selectedSurface] || { zoom: 1.0, panX: 0, panY: 0 };
  const zoomPct = Math.round(currentVp.zoom * 100);

  const handleZoomDelta = (delta: number) => {
    setSurfaceZoom(selectedSurface, currentVp.zoom + delta);
  };

  return (
    <div className="p-2.5 bg-neutral-50/80 dark:bg-slate-900/60 rounded-xl border border-neutral-200/80 dark:border-slate-800 space-y-2">
      {/* Header bar: Surface Label + Quick Action Buttons */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            {selectedSurface} Viewport
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
            {zoomPct}%
          </span>
        </div>

        {/* Quick Align & Reset Actions */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => centerSurfaceHorizontally(selectedSurface)}
            className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/70 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Center Horizontally (Pan X: 0)"
          >
            <AlignCenterHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => centerSurfaceVertically(selectedSurface)}
            className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/70 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Center Vertically (Pan Y: 0)"
          >
            <AlignCenterVertical className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => fitSurfaceToCanvas(selectedSurface)}
            className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200/70 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Fit to Canvas (100%)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => resetSurfaceViewport(selectedSurface)}
            className="p-1 text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 hover:bg-neutral-200/70 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Reset Viewport (100%, 0, 0)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Zoom Slider + Plus/Minus Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleZoomDelta(-0.1)}
          disabled={currentVp.zoom <= 0.5}
          className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200/60 dark:hover:bg-slate-800 rounded"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <input
          type="range"
          min={0.5}
          max={2.5}
          step={0.05}
          value={currentVp.zoom}
          onChange={(e) => setSurfaceZoom(selectedSurface, parseFloat(e.target.value))}
          className="flex-1 accent-blue-600 h-1 bg-neutral-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />

        <button
          type="button"
          onClick={() => handleZoomDelta(0.1)}
          disabled={currentVp.zoom >= 2.5}
          className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200/60 dark:hover:bg-slate-800 rounded"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Position X / Y Offset Sliders */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-200/60 dark:border-slate-800/80">
        <div>
          <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mb-0.5">
            <span className="flex items-center gap-1 font-medium">
              <Move className="w-2.5 h-2.5" /> Pan X
            </span>
            <span className="font-mono">{currentVp.panX}px</span>
          </div>
          <input
            type="range"
            min={-200}
            max={200}
            step={5}
            value={currentVp.panX}
            onChange={(e) => setSurfacePan(selectedSurface, parseInt(e.target.value, 10), currentVp.panY)}
            className="w-full accent-blue-600 h-1 bg-neutral-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mb-0.5">
            <span className="flex items-center gap-1 font-medium">
              <Move className="w-2.5 h-2.5" /> Pan Y
            </span>
            <span className="font-mono">{currentVp.panY}px</span>
          </div>
          <input
            type="range"
            min={-200}
            max={200}
            step={5}
            value={currentVp.panY}
            onChange={(e) => setSurfacePan(selectedSurface, currentVp.panX, parseInt(e.target.value, 10))}
            className="w-full accent-blue-600 h-1 bg-neutral-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
