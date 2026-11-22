import React, { useState } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import type { SleevePatternConfig, SleevePatternType } from '../types/jersey-template.types';
import { Shirt, Check, Copy } from 'lucide-react';

const SLEEVE_PATTERN_TYPES: { id: SleevePatternType; name: string; desc: string }[] = [
  { id: 'solid', name: 'Solid Color', desc: 'Clean unpatterned fabric' },
  { id: 'horizontal-stripes', name: 'Horizontal Bands', desc: 'Classic athletic hoop bands' },
  { id: 'vertical-stripes', name: 'Vertical Stripes', desc: 'Lengthening parallel stripes' },
  { id: 'diagonal-stripes', name: 'Diagonal Stripes', desc: 'Dynamic speed stripes' },
  { id: 'speed-bars', name: 'Speed 3-Bars', desc: 'Iconic shoulder-to-arm athletic bars' },
  { id: 'chevrons', name: 'Speed Chevrons', desc: 'Downward dynamic speed chevrons' },
  { id: 'geometric', name: 'Geometric Facets', desc: 'Modern tournament diamond tessellation' },
  { id: 'gradient', name: 'Linear Gradient', desc: 'Smooth ombre color transition' },
  { id: 'cuff-accent', name: 'Cuff Band & Pinstripe', desc: 'Professional rib cuff accent' },
  { id: 'retro-geometric', name: 'Retro 90s Chevrons', desc: 'Angular geometric sleeve chevrons' },
  { id: 'tonal-jacquard', name: 'Tonal Jacquard', desc: 'Subtle micro-weave texture overlay' },
  { id: 'multi-width-stripes', name: 'Multi-Width Stripes', desc: 'Rhythmic multi-gauge vertical stripes' },
  { id: 'colorblock', name: 'Color Block Shoulder', desc: 'Asymmetric top-arm panel with contrast piping' },
];

export const JerseySleeveCustomizer: React.FC = () => {
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left');

  const leftPattern = useDesignerStore((state) => state.leftSleevePattern);
  const rightPattern = useDesignerStore((state) => state.rightSleevePattern);
  const setLeftSleevePattern = useDesignerStore((state) => state.setLeftSleevePattern);
  const setRightSleevePattern = useDesignerStore((state) => state.setRightSleevePattern);

  const currentPattern: SleevePatternConfig = activeSide === 'left' ? leftPattern : rightPattern;

  const handleUpdate = (updates: Partial<SleevePatternConfig>) => {
    if (activeSide === 'left') {
      setLeftSleevePattern(updates);
    } else {
      setRightSleevePattern(updates);
    }
  };

  const handleCopyToOther = () => {
    if (activeSide === 'left') {
      setRightSleevePattern({ ...leftPattern });
    } else {
      setLeftSleevePattern({ ...rightPattern });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Shirt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Sleeve Pattern Studio
          </h3>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Independently customize Left & Right raglan sleeve patterns, stripes, and cuff accents.
        </p>
      </div>

      {/* Left / Right Side Selector */}
      <div className="flex p-1 bg-neutral-100 dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setActiveSide('left')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSide === 'left'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <span>Left Sleeve</span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ backgroundColor: leftPattern.primaryColor }}
          />
        </button>

        <button
          type="button"
          onClick={() => setActiveSide('right')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSide === 'right'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <span>Right Sleeve</span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ backgroundColor: rightPattern.primaryColor }}
          />
        </button>
      </div>

      {/* Copy Pattern Button */}
      <button
        type="button"
        onClick={handleCopyToOther}
        className="w-full py-1.5 px-3 bg-neutral-50 hover:bg-neutral-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-neutral-200 dark:border-slate-800 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-1.5 transition-colors"
      >
        <Copy className="w-3.5 h-3.5 text-neutral-500" />
        <span>Mirror {activeSide === 'left' ? 'Left' : 'Right'} Pattern to {activeSide === 'left' ? 'Right' : 'Left'} Sleeve</span>
      </button>

      {/* Pattern Type Selector */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block">
          Select Motif Pattern
        </span>
        <div className="grid grid-cols-1 gap-1.5">
          {SLEEVE_PATTERN_TYPES.map((pt) => {
            const isSelected = currentPattern.type === pt.id;

            return (
              <button
                key={pt.id}
                type="button"
                onClick={() => handleUpdate({ type: pt.id })}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500 shadow-2xs'
                    : 'border-neutral-200/80 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    {pt.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    {pt.desc}
                  </div>
                </div>

                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pattern Settings & Colors */}
      <div className="p-3.5 bg-neutral-50 dark:bg-slate-900/60 rounded-xl border border-neutral-200/80 dark:border-slate-800 space-y-3.5">
        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide block">
          {activeSide.toUpperCase()} Sleeve Colors & Sizing
        </span>

        {/* Primary Color */}
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
            Fabric Base Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentPattern.primaryColor}
              onChange={(e) => handleUpdate({ primaryColor: e.target.value })}
              className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <span className="text-[10px] font-mono text-neutral-500 uppercase">
              {currentPattern.primaryColor}
            </span>
          </div>
        </div>

        {/* Accent Color (if not solid) */}
        {currentPattern.type !== 'solid' && (
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
              Pattern Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentPattern.accentColor}
                onChange={(e) => handleUpdate({ accentColor: e.target.value })}
                className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                {currentPattern.accentColor}
              </span>
            </div>
          </div>
        )}

        {/* Stripe Count (for stripe types) */}
        {(currentPattern.type === 'horizontal-stripes' ||
          currentPattern.type === 'vertical-stripes') && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                Number of Stripes
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {currentPattern.stripeCount || 3}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              value={currentPattern.stripeCount || 3}
              onChange={(e) => handleUpdate({ stripeCount: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>
        )}

        {/* Thickness */}
        {currentPattern.type !== 'solid' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                Element Thickness / Height
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {currentPattern.thickness || 28}px
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={80}
              value={currentPattern.thickness || 28}
              onChange={(e) => handleUpdate({ thickness: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>
        )}
      </div>
    </div>
  );
};
