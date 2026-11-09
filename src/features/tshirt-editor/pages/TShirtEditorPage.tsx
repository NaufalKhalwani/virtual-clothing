import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { EditorToolbar } from '../components/EditorToolbar';
import { EditPanel } from '../components/EditPanel';
import { Viewer3D } from '@/features/viewer-3d/components/Viewer3D';
import { useDesignerStore } from '@/stores/designer.store';

export const TShirtEditorPage: React.FC = () => {
  const setGarmentType = useDesignerStore((state) => state.setGarmentType);

  useEffect(() => {
    setGarmentType('tshirt');
  }, [setGarmentType]);

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

        {/* Center 3D Viewport */}
        <main className="flex-1 p-3 md:p-4 min-h-0 min-w-0 flex flex-col relative bg-neutral-100/60 dark:bg-slate-950">
          <Viewer3D />
        </main>

        {/* Right Settings & Editor Panel */}
        <div className="w-full md:w-auto h-[45vh] md:h-full border-t md:border-t-0 shadow-lg md:shadow-none z-30">
          <EditPanel />
        </div>
      </div>
    </div>
  );
};
