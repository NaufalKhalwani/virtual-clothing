import React, { useState, useEffect } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import { ArtworkCanvas } from '@/features/texture-engine/components/ArtworkCanvas';
import { useArtworkCanvas } from '@/features/texture-engine/hooks/useArtworkCanvas';
import { ArtworkUploader } from '@/features/image-editor/components/ArtworkUploader';
import { TextEditor, type TextOptions } from '@/features/text-editor/components/TextEditor';
import { ImageProperties } from '@/features/image-editor/components/ImageProperties';
import { LayerManager } from '@/features/image-editor/components/LayerManager';
import { JerseyPanelSelector } from './JerseyPanelSelector';
import { JerseyTemplatePicker } from './JerseyTemplatePicker';
import { JerseyColorCustomizer } from './JerseyColorCustomizer';
import { JerseyStripeBuilder } from './JerseyStripeBuilder';
import { JerseySleeveCustomizer } from './JerseySleeveCustomizer';
import { JerseyTextCustomizer } from './JerseyTextCustomizer';
import { JerseyViewportControls } from './JerseyViewportControls';
import {
  Undo2,
  Redo2,
  RotateCcw,
  Sparkles,
  Palette,
  Rows3,
  Shirt,
  Type,
  Upload,
  Layers,
} from 'lucide-react';
import type { FabricObject } from 'fabric';

export type JerseyCustomizerTab =
  | 'templates'
  | 'colors'
  | 'stripes'
  | 'sleeves'
  | 'text'
  | 'artwork'
  | 'layers';

export const JerseyEditPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<JerseyCustomizerTab>('templates');
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
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

  const isSelectedText =
    selectedFabricObject?.type === 'textbox' || selectedFabricObject?.type === 'text';
  const isSelectedImage =
    selectedFabricObject?.type === 'fabricimage' || selectedFabricObject?.type === 'image';

  const tabs: { id: JerseyCustomizerTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'templates', label: 'Templates', icon: Sparkles },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'stripes', label: 'Stripes', icon: Rows3 },
    { id: 'sleeves', label: 'Sleeves', icon: Shirt },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'artwork', label: 'Artwork', icon: Upload },
    { id: 'layers', label: 'Layers', icon: Layers },
  ];

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white dark:bg-slate-900 border-l border-neutral-200/80 dark:border-slate-800 flex flex-col h-full overflow-y-auto shrink-0 select-none transition-colors duration-200">
      {/* 6-Panel Surface Selector Bar */}
      <div className="p-3.5 border-b border-neutral-100 dark:border-slate-800/80 bg-neutral-50/70 dark:bg-slate-900/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Jersey Studio
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              V-Neck 3D
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

        {/* 6 Design Surfaces Grid */}
        <JerseyPanelSelector />
      </div>

      {/* 2D Interactive Composition Canvas & Independent Viewport Controls */}
      <div className="p-3.5 border-b border-neutral-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 capitalize">
            {selectedSurface} Canvas (2D)
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
            Interactive Drag & Scale
          </span>
        </div>
        <ArtworkCanvas
          onCanvasReady={(inst) => setCanvasInstance(inst)}
          onTextureUpdate={() => {}}
        />

        {/* Independent Zoom & Pan Adjustment */}
        <JerseyViewportControls />
      </div>

      {/* Studio Category Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-neutral-100 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-900/60 p-1.5 gap-1 shrink-0 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[58px] py-1.5 px-2 rounded-lg text-[11px] font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100/60 dark:hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="tracking-tight text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel Content */}
      <div className="p-4 flex-1 space-y-5">
        {activeTab === 'templates' && <JerseyTemplatePicker />}

        {activeTab === 'colors' && <JerseyColorCustomizer />}

        {activeTab === 'stripes' && <JerseyStripeBuilder />}

        {activeTab === 'sleeves' && <JerseySleeveCustomizer />}

        {activeTab === 'text' && (
          <div className="space-y-4">
            <JerseyTextCustomizer
              onAddTextToActiveSurface={(opts) =>
                addText({
                  content: opts.content,
                  fontFamily: opts.fontFamily,
                  fontSize: opts.fontSize,
                  fontWeight: 'bold',
                  color: opts.color,
                  textAlign: 'center',
                })
              }
            />

            <div>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">
                {isSelectedText ? 'Edit Selected Text Box' : 'New Custom Text Layer'}
              </span>
              <TextEditor
                isEditingSelected={isSelectedText}
                initialValues={
                  isSelectedText
                    ? {
                        content: (selectedFabricObject as unknown as { text?: string }).text || '',
                        fontFamily:
                          (selectedFabricObject as unknown as { fontFamily?: string }).fontFamily ||
                          'Oswald, sans-serif',
                        fontSize:
                          (selectedFabricObject as unknown as { fontSize?: number }).fontSize || 64,
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
          </div>
        )}

        {activeTab === 'artwork' && (
          <div className="space-y-4">
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
                Upload Club Crest / Sponsor Badge
              </span>
              <ArtworkUploader onImageSelected={(dataUrl) => addImage(dataUrl)} />
            </div>
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
          <span>Jersey Template Engine</span>
        </span>
        <span className="font-mono text-neutral-400 dark:text-neutral-500">Phase 8 Ready</span>
      </div>
    </aside>
  );
};
