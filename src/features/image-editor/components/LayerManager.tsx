import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Image as ImageIcon, Type } from 'lucide-react';
import type { Canvas, FabricObject } from 'fabric';

interface LayerManagerProps {
  canvas: Canvas | null;
  onLayerChange: () => void;
}

export const LayerManager: React.FC<LayerManagerProps> = ({
  canvas,
  onLayerChange,
}) => {
  if (!canvas) return null;

  const objects = canvas.getObjects();
  const activeObject = canvas.getActiveObject();

  if (objects.length === 0) {
    return (
      <div className="p-6 text-center rounded-xl bg-neutral-50 border border-neutral-200">
        <p className="text-xs text-neutral-500">No artwork or text elements on this surface.</p>
        <p className="text-[11px] text-neutral-400 mt-1">
          Upload an image or add text to start building layers.
        </p>
      </div>
    );
  }

  const handleSelect = (obj: FabricObject) => {
    canvas.setActiveObject(obj);
    canvas.renderAll();
    onLayerChange();
  };

  const handleBringForward = (obj: FabricObject) => {
    canvas.bringObjectForward(obj);
    canvas.renderAll();
    onLayerChange();
  };

  const handleSendBackward = (obj: FabricObject) => {
    canvas.sendObjectBackwards(obj);
    canvas.renderAll();
    onLayerChange();
  };

  const handleDelete = (obj: FabricObject) => {
    canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.renderAll();
    onLayerChange();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
        <span>Layer Stack (Top to Bottom)</span>
        <span>{objects.length} elements</span>
      </div>

      <div className="space-y-1.5 max-h-60 overflow-y-auto">
        {[...objects].reverse().map((obj, index) => {
          const isSelected = activeObject === obj;
          const isText = obj.type === 'textbox' || obj.type === 'text';
          const label = isText
            ? (obj as unknown as { text?: string }).text?.slice(0, 20) || 'Text Layer'
            : 'Image Layer';

          return (
            <div
              key={index}
              onClick={() => handleSelect(obj)}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-2xs'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {isText ? (
                  <Type className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
                )}
                <span className="text-xs font-medium truncate">{label}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => handleBringForward(obj)}
                  className="p-1 text-neutral-400 hover:text-neutral-800 rounded hover:bg-neutral-200/60"
                  title="Bring Forward"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSendBackward(obj)}
                  className="p-1 text-neutral-400 hover:text-neutral-800 rounded hover:bg-neutral-200/60"
                  title="Send Backward"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(obj)}
                  className="p-1 text-red-400 hover:text-red-600 rounded hover:bg-red-50"
                  title="Delete Layer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
