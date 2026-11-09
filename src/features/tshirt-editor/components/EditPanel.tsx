import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/stores/ui.store';
import { useDesignerStore } from '@/stores/designer.store';
import { ColorEditor } from '@/features/color-editor/components/ColorEditor';
import { ArtworkCanvas } from '@/features/texture-engine/components/ArtworkCanvas';
import { useArtworkCanvas } from '@/features/texture-engine/hooks/useArtworkCanvas';
import { ArtworkUploader } from '@/features/image-editor/components/ArtworkUploader';
import { TextEditor, type TextOptions } from '@/features/text-editor/components/TextEditor';
import { ImageProperties } from '@/features/image-editor/components/ImageProperties';
import { LayerManager } from '@/features/image-editor/components/LayerManager';
import { Undo2, Redo2, RotateCcw, Sparkles, Layers, Type, Palette, Upload } from 'lucide-react';
import type { FabricObject } from 'fabric';

export const EditPanel: React.FC = () => {
  const activeTab = useUIStore((state) => state.activeTab);
  const setActiveTab = useUIStore((state) => state.setActiveTab);
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const selectSurface = useDesignerStore((state) => state.selectSurface);
  const setActiveCameraPreset = useUIStore((state) => state.setActiveCameraPreset);
  const resetSurface = useDesignerStore((state) => state.resetSurface);

  const undo = useDesignerStore((state) => state.undo);
  const redo = useDesignerStore((state) => state.redo);
  const history = useDesignerStore((state) => state.history);

  const {
    canvasInstance,
    setCanvasInstance,
    addImage,
    addText,
    updateSelectedObject,
    deleteSelected,
    duplicateSelected,
    centerSelected,
    updateTexture,
  } = useArtworkCanvas();

  const [selectedFabricObject, setSelectedFabricObject] = useState<FabricObject | null>(null);

  // Sync active object from Fabric canvas
  useEffect(() => {
    if (!canvasInstance) return;

    const updateSelection = () => {
      const active = canvasInstance.getActiveObject();
      setSelectedFabricObject(active || null);
    };

    canvasInstance.on('selection:created', updateSelection);
    canvasInstance.on('selection:updated', updateSelection);
    canvasInstance.on('selection:cleared', () => setSelectedFabricObject(null));
  }, [canvasInstance]);

  // Global Keyboard Shortcuts (Ctrl+Z, Ctrl+Shift+Z, Delete)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedFabricObject) {
          e.preventDefault();
          deleteSelected();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedFabricObject, deleteSelected]);

  const handleSurfaceChange = (surface: 'front' | 'back') => {
    selectSurface(surface);
    setActiveCameraPreset(surface);
  };

  const isSelectedText =
    selectedFabricObject?.type === 'textbox' || selectedFabricObject?.type === 'text';
  const isSelectedImage =
    selectedFabricObject?.type === 'fabricimage' || selectedFabricObject?.type === 'image';

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white dark:bg-slate-900 border-l border-neutral-200/80 dark:border-slate-800 flex flex-col h-full overflow-y-auto shrink-0 select-none transition-colors duration-200">
      {/* Surface Selector & History Bar */}
      <div className="p-4 border-b border-neutral-100 dark:border-slate-800/80 bg-neutral-50/70 dark:bg-slate-900/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Editing Surface
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 capitalize">
              {selectedSurface}
            </span>
          </div>

          {/* Undo / Redo / Reset Surface buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={undo}
              disabled={history.past.length === 0}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                history.past.length > 0
                  ? 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-slate-800'
                  : 'text-neutral-300 dark:text-slate-600 cursor-not-allowed'
              }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={history.future.length === 0}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                history.future.length > 0
                  ? 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-slate-800'
                  : 'text-neutral-300 dark:text-slate-600 cursor-not-allowed'
              }`}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => resetSurface(selectedSurface)}
              className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-neutral-200 dark:hover:bg-slate-800 rounded-lg text-xs transition-colors"
              title="Clear current surface design"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Surface Switch Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-neutral-200/60 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => handleSurfaceChange('front')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedSurface === 'front'
                ? 'bg-white dark:bg-slate-700 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Front Surface
          </button>
          <button
            type="button"
            onClick={() => handleSurfaceChange('back')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedSurface === 'back'
                ? 'bg-white dark:bg-slate-700 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Back Surface
          </button>
        </div>
      </div>

      {/* 2D Interactive Composition Canvas */}
      <div className="p-4 border-b border-neutral-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            2D Artwork Composition
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
            Drag, scale, or rotate handles
          </span>
        </div>
        <ArtworkCanvas
          onCanvasReady={(inst) => setCanvasInstance(inst)}
          onTextureUpdate={() => {}}
        />
      </div>

      {/* Quick Tool Navigation (Mobile / Small Screens) */}
      <div className="flex md:hidden border-b border-neutral-100 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-900 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('color')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1 ${
            activeTab === 'color'
              ? 'bg-white dark:bg-slate-800 shadow-2xs text-blue-600 dark:text-blue-400'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Color
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1 ${
            activeTab === 'upload'
              ? 'bg-white dark:bg-slate-800 shadow-2xs text-blue-600 dark:text-blue-400'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Artwork
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1 ${
            activeTab === 'text'
              ? 'bg-white dark:bg-slate-800 shadow-2xs text-blue-600 dark:text-blue-400'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Text
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1 ${
            activeTab === 'layers'
              ? 'bg-white dark:bg-slate-800 shadow-2xs text-blue-600 dark:text-blue-400'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Layers
        </button>
      </div>

      {/* Tab Specific Content */}
      <div className="p-5 flex-1 space-y-6">
        {activeTab === 'color' && <ColorEditor />}

        {activeTab === 'upload' && (
          <div className="space-y-5">
            {isSelectedImage ? (
              <ImageProperties
                selectedObject={selectedFabricObject}
                onUpdate={updateSelectedObject}
                onDelete={deleteSelected}
                onDuplicate={duplicateSelected}
                onCenter={centerSelected}
              />
            ) : null}

            <div>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">
                Upload New Artwork
              </span>
              <ArtworkUploader onImageSelected={(dataUrl) => addImage(dataUrl)} />
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div>
            <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">
              {isSelectedText ? 'Edit Selected Text' : 'Add Custom Typography'}
            </span>
            <TextEditor
              isEditingSelected={isSelectedText}
              initialValues={
                isSelectedText
                  ? {
                      content: (selectedFabricObject as unknown as { text?: string }).text || '',
                      fontFamily:
                        (selectedFabricObject as unknown as { fontFamily?: string }).fontFamily ||
                        'Inter, sans-serif',
                      fontSize:
                        (selectedFabricObject as unknown as { fontSize?: number }).fontSize || 54,
                      fontWeight:
                        (selectedFabricObject as unknown as { fontWeight?: string | number })
                          .fontWeight || 'bold',
                      color:
                        (selectedFabricObject as unknown as { fill?: string }).fill || '#171717',
                      textAlign:
                        ((selectedFabricObject as unknown as { textAlign?: string })
                          .textAlign as 'left' | 'center' | 'right') || 'center',
                    }
                  : undefined
              }
              onAddText={(opts: TextOptions) => addText(opts)}
              onUpdateText={(updates) => updateSelectedObject(updates)}
              onDelete={deleteSelected}
              onDuplicate={duplicateSelected}
            />
          </div>
        )}

        {activeTab === 'layers' && (
          <LayerManager canvas={canvasInstance} onLayerChange={updateTexture} />
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="p-3 border-t border-neutral-100 dark:border-slate-800 bg-neutral-50/60 dark:bg-slate-900/60 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Real-time Decal Projection</span>
        </span>
        <span className="font-mono text-neutral-400 dark:text-neutral-500">Phase 3.1 & 3.2</span>
      </div>
    </aside>
  );
};
