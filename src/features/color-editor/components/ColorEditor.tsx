import React, { useState, useEffect } from 'react';
import { PRESET_COLORS, DEFAULT_TSHIRT_COLOR } from '@/constants/design.constants';
import { useDesignerStore } from '@/stores/designer.store';
import { RotateCcw, Check } from 'lucide-react';

export const ColorEditor: React.FC = () => {
  const baseColor = useDesignerStore((state) => state.baseColor);
  const setBaseColor = useDesignerStore((state) => state.setBaseColor);
  const [hexInput, setHexInput] = useState(baseColor);

  useEffect(() => {
    setHexInput(baseColor);
  }, [baseColor]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setBaseColor(val.toUpperCase());
    }
  };

  const handleReset = () => {
    setBaseColor(DEFAULT_TSHIRT_COLOR);
    setHexInput(DEFAULT_TSHIRT_COLOR);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Garment Color</h3>
          <p className="text-xs text-neutral-500">Pick preset or customize hex code</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-neutral-100"
          title="Reset to default white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Preset Swatches Grid */}
      <div className="grid grid-cols-6 gap-2.5">
        {PRESET_COLORS.map((item) => {
          const isSelected = baseColor.toUpperCase() === item.hex.toUpperCase();
          return (
            <button
              key={item.hex}
              type="button"
              onClick={() => setBaseColor(item.hex)}
              className={`group relative w-full aspect-square rounded-lg border transition-all duration-150 flex items-center justify-center ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-600/30 scale-105 shadow-xs'
                  : 'border-neutral-200 hover:border-neutral-400 hover:scale-105'
              }`}
              style={{ backgroundColor: item.hex }}
              title={`${item.name} (${item.hex})`}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    item.hex === '#FFFFFF' || item.hex === '#F59E0B' || item.hex === '#F472B6'
                      ? 'text-neutral-900'
                      : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Color Input and Hex Display */}
      <div className="pt-2 border-t border-neutral-100">
        <label className="text-xs font-medium text-neutral-700 block mb-1.5">
          Custom HEX Color
        </label>
        <div className="flex items-center gap-2">
          {/* Native Color Picker trigger */}
          <div className="relative w-10 h-10 rounded-lg border border-neutral-200 overflow-hidden shrink-0 shadow-2xs">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Click to open color palette"
            />
            <div
              className="w-full h-full"
              style={{ backgroundColor: baseColor }}
            />
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              placeholder="#FFFFFF"
              maxLength={7}
              className="w-full px-3 py-2 text-xs font-mono font-medium uppercase border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
