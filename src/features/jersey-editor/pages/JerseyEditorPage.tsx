import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { EditorToolbar } from '@/features/tshirt-editor/components/EditorToolbar';
import { JerseyEditPanel } from '../components/JerseyEditPanel';
import { JerseyViewer3D } from '../components/JerseyViewer3D';
import { useDesignerStore } from '@/stores/designer.store';
import { useUIStore } from '@/stores/ui.store';
import type { JerseyTemplateId } from '../types/jersey-template.types';
import type { CameraPreset } from '@/constants/design.constants';

export const JerseyEditorPage: React.FC = () => {
  const setGarmentType = useDesignerStore((state) => state.setGarmentType);
  const setJerseyTemplate = useDesignerStore((state) => state.setJerseyTemplate);
  const selectSurface = useDesignerStore((state) => state.selectSurface);
  const setActiveCameraPreset = useUIStore((state) => state.setActiveCameraPreset);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setGarmentType('jersey');

    const templateParam = searchParams.get('template') as JerseyTemplateId | null;
    if (templateParam) {
      setJerseyTemplate(templateParam);
    }

    const cameraParam = searchParams.get('camera') as CameraPreset | null;
    if (cameraParam) {
      setActiveCameraPreset(cameraParam);
      if (cameraParam === 'back') {
        selectSurface('back');
      } else if (cameraParam === 'front') {
        selectSurface('front');
      }
    }
  }, [setGarmentType, setJerseyTemplate, selectSurface, setActiveCameraPreset, searchParams]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-200">
      {/* Top Header */}
      <Header />

      {/* Main Studio Area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden relative">
        {/* Left Toolbar (Desktop) */}
        <div className="hidden md:flex">
          <EditorToolbar />
        </div>

        {/* Center Jersey 3D Viewport */}
        <main className="flex-1 p-3 md:p-4 min-h-0 min-w-0 flex flex-col relative bg-neutral-100/60 dark:bg-slate-950">
          <JerseyViewer3D />
        </main>

        {/* Right Jersey 6-Panel & Settings Editor Panel */}
        <div className="w-full md:w-auto h-[45vh] md:h-full border-t md:border-t-0 shadow-lg md:shadow-none z-30">
          <JerseyEditPanel />
        </div>
      </div>
    </div>
  );
};
