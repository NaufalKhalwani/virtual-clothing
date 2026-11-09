import React from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import { useUIStore } from '@/stores/ui.store';
import type { CameraPreset } from '@/constants/design.constants';

interface JerseyPanelConfig {
  id: string;
  name: string;
  shortLabel: string;
  cameraPreset: CameraPreset;
}

const JERSEY_PANELS: JerseyPanelConfig[] = [
  { id: 'front', name: 'Front Body', shortLabel: 'Front', cameraPreset: 'front' },
  { id: 'back', name: 'Back Body', shortLabel: 'Back', cameraPreset: 'back' },
  { id: 'left', name: 'Left Sleeve/Side', shortLabel: 'Left Side', cameraPreset: 'left' },
  { id: 'right', name: 'Right Sleeve/Side', shortLabel: 'Right Side', cameraPreset: 'right' },
  { id: 'leftShoulder', name: 'Left Shoulder', shortLabel: 'L-Shoulder', cameraPreset: 'left' },
  { id: 'rightShoulder', name: 'Right Shoulder', shortLabel: 'R-Shoulder', cameraPreset: 'right' },
];

export const JerseyPanelSelector: React.FC = () => {
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const selectSurface = useDesignerStore((state) => state.selectSurface);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const setActiveCameraPreset = useUIStore((state) => state.setActiveCameraPreset);

  const handleSelectPanel = (panel: JerseyPanelConfig) => {
    selectSurface(panel.id);
    setActiveCameraPreset(panel.cameraPreset);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          6 Design Surfaces
        </span>
        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 capitalize">
          {JERSEY_PANELS.find((p) => p.id === selectedSurface)?.name || selectedSurface}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 bg-neutral-200/60 dark:bg-slate-800 p-1.5 rounded-xl">
        {JERSEY_PANELS.map((panel) => {
          const isSelected = selectedSurface === panel.id;
          const surfaceData = surfaces[panel.id];
          const hasElements = surfaceData?.elements && surfaceData.elements.length > 0;

          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => handleSelectPanel(panel)}
              className={`relative py-2 px-1 text-center rounded-lg transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-700 text-neutral-900 dark:text-white font-bold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 text-xs'
              }`}
            >
              <span className="block text-[11px] truncate">{panel.shortLabel}</span>
              {hasElements && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
