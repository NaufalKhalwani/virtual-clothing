import React, { useState, useEffect } from 'react';
import { Trash2, Copy, Move, RotateCw, Eye, Maximize2 } from 'lucide-react';
import type { FabricObject } from 'fabric';

interface ImagePropertiesProps {
  selectedObject: FabricObject | null;
  onUpdate: (updates: { scale?: number; angle?: number; opacity?: number }) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onCenter: () => void;
}

export const ImageProperties: React.FC<ImagePropertiesProps> = ({
  selectedObject,
  onUpdate,
  onDelete,
  onDuplicate,
  onCenter,
}) => {
  const [scale, setScale] = useState(1);
  const [angle, setAngle] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (selectedObject) {
      setScale(Number((selectedObject.scaleX || 1).toFixed(2)));
      setAngle(Math.round(selectedObject.angle || 0));
      setOpacity(selectedObject.opacity ?? 1);
    }
  }, [selectedObject]);

  if (!selectedObject) return null;

  const handleScaleChange = (val: number) => {
    setScale(val);
    onUpdate({ scale: val });
  };

  const handleAngleChange = (val: number) => {
    setAngle(val);
    onUpdate({ angle: val });
  };

  const handleOpacityChange = (val: number) => {
    setOpacity(val);
    onUpdate({ opacity: val });
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-800">
          Selected Artwork Controls
        </span>
        <button
          type="button"
          onClick={onCenter}
          className="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
        >
          <Move className="w-3 h-3" />
          Center
        </button>
      </div>

      {/* Scale Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-neutral-600 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" />
            Size / Scale
          </span>
          <span className="font-mono text-neutral-500">{scale}x</span>
        </div>
        <input
          type="range"
          min={0.1}
          max={2.5}
          step={0.05}
          value={scale}
          onChange={(e) => handleScaleChange(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Rotation Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-neutral-600 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5" />
            Rotation
          </span>
          <span className="font-mono text-neutral-500">{angle}°</span>
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={angle}
          onChange={(e) => handleAngleChange(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Opacity Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-neutral-600 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Opacity
          </span>
          <span className="font-mono text-neutral-500">{Math.round(opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(e) => handleOpacityChange(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-2">
        <button
          type="button"
          onClick={onDuplicate}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
        >
          <Copy className="w-3.5 h-3.5" />
          Duplicate
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
};
