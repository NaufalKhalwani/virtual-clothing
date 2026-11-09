import React from 'react';
import { RotateCw, RefreshCw, Box, Compass } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';
import { useDesignerStore } from '@/stores/designer.store';
import type { CameraPreset } from '@/constants/design.constants';

export const ViewportToolbar: React.FC = () => {
  const {
    activeCameraPreset,
    setActiveCameraPreset,
    autoRotate,
    toggleAutoRotate,
    wireframe,
    toggleWireframe,
  } = useUIStore();

  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const selectSurface = useDesignerStore((state) => state.selectSurface);

  const handlePresetClick = (preset: CameraPreset) => {
    setActiveCameraPreset(preset);
    if (preset === 'front') {
      selectSurface('front');
    } else if (preset === 'back') {
      selectSurface('back');
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200/80 shadow-md">
      {/* Surface Quick-Toggles */}
      <div className="flex items-center gap-1 pr-1.5 border-r border-neutral-200">
        <button
          type="button"
          onClick={() => {
            selectSurface('front');
            setActiveCameraPreset('front');
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSurface === 'front' && activeCameraPreset === 'front'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Switch to Front Surface View"
        >
          FRONT
        </button>
        <button
          type="button"
          onClick={() => {
            selectSurface('back');
            setActiveCameraPreset('back');
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            selectedSurface === 'back' && activeCameraPreset === 'back'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Switch to Back Surface View"
        >
          BACK
        </button>
      </div>

      {/* Side Views */}
      <div className="flex items-center gap-1 pr-1.5 border-r border-neutral-200">
        <button
          type="button"
          onClick={() => handlePresetClick('left')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeCameraPreset === 'left'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Left View"
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => handlePresetClick('right')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeCameraPreset === 'right'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Right View"
        >
          Right
        </button>
        <button
          type="button"
          onClick={() => handlePresetClick('isometric')}
          className={`p-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeCameraPreset === 'isometric'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Isometric View"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Action Toggles */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleAutoRotate}
          className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
            autoRotate
              ? 'bg-blue-50 text-blue-600 border border-blue-200'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Toggle 360° Auto-Rotation"
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Auto-Rotate</span>
        </button>

        <button
          type="button"
          onClick={toggleWireframe}
          className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
            wireframe
              ? 'bg-blue-50 text-blue-600 border border-blue-200'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          title="Toggle Wireframe Mesh"
        >
          <Box className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setActiveCameraPreset('front')}
          className="p-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
          title="Reset Camera Position"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
