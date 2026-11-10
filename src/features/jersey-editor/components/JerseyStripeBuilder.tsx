import React, { useState } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import type { StripeElementConfig, StripeOrientation, StripeSurfaceScope } from '../types/jersey-template.types';
import {
  Trash2,
  Sliders,
  Rows3,
  Columns3,
  ShieldCheck,
  Zap,
  Maximize,
  Sparkles,
} from 'lucide-react';

const PATTERN_PRESETS: { id: StripeOrientation; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'horizontal', label: 'Hoops', icon: Rows3 },
  { id: 'vertical', label: 'Vertical', icon: Columns3 },
  { id: 'sash', label: 'Sash', icon: Zap },
  { id: 'panel', label: 'Chest Block', icon: Maximize },
  { id: 'gradient', label: 'Gradient', icon: Sparkles },
  { id: 'geometric', label: 'Geometric', icon: Sliders },
];

export const JerseyStripeBuilder: React.FC = () => {
  const jerseyStripes = useDesignerStore((state) => state.jerseyStripes);
  const addJerseyStripe = useDesignerStore((state) => state.addJerseyStripe);
  const updateJerseyStripe = useDesignerStore((state) => state.updateJerseyStripe);
  const removeJerseyStripe = useDesignerStore((state) => state.removeJerseyStripe);
  const jerseyColors = useDesignerStore((state) => state.jerseyColors);

  const [selectedStripeId, setSelectedStripeId] = useState<string | null>(
    jerseyStripes.length > 0 ? jerseyStripes[0].id : null
  );

  const activeStripe = jerseyStripes.find((s) => s.id === selectedStripeId) || jerseyStripes[0];

  const handleCreateStripe = (orientation: StripeOrientation) => {
    const newStripe: StripeElementConfig = {
      id: `stripe_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orientation,
      surface: 'both',
      count: orientation === 'vertical' ? 5 : orientation === 'horizontal' ? 4 : 1,
      thickness: orientation === 'sash' ? 140 : orientation === 'panel' ? 180 : 54,
      spacing: 64,
      positionY: 512,
      positionX: 512,
      color: jerseyColors.stripe || '#FFFFFF',
      secondaryColor: jerseyColors.secondary || '#18181B',
      opacity: 1,
      protectText: true,
      angle: orientation === 'sash' ? -45 : 0,
    };

    addJerseyStripe(newStripe);
    setSelectedStripeId(newStripe.id);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Professional Fabric Pattern Engine
          </h3>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Render athletic pattern stripes beneath your logos, text, and squad numbers with zero overlap interference.
        </p>
      </div>

      {/* Pattern Type Quick-Add Grid */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1.5">
          Add Fabric Pattern Type
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {PATTERN_PRESETS.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleCreateStripe(p.id)}
                className="p-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-[11px] font-semibold flex flex-col items-center justify-center gap-1 border border-neutral-200/80 dark:border-slate-700 transition-colors shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>+ {p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pattern Layers List */}
      {jerseyStripes.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block">
            Fabric Pattern Groups ({jerseyStripes.length})
          </span>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-0.5">
            {jerseyStripes.map((stripe, idx) => {
              const isSelected = activeStripe?.id === stripe.id;

              return (
                <div
                  key={stripe.id}
                  onClick={() => setSelectedStripeId(stripe.id)}
                  className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500'
                      : 'border-neutral-200/80 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center -space-x-1 shrink-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: stripe.color }}
                      />
                      {stripe.secondaryColor && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: stripe.secondaryColor }}
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 capitalize">
                        {stripe.orientation} #{idx + 1}
                      </span>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block capitalize">
                        {stripe.surface} • {stripe.count} bands • {stripe.thickness}px
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeJerseyStripe(stripe.id);
                    }}
                    className="p-1 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
                    title="Delete pattern group"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Pattern Detailed Settings */}
      {activeStripe && (
        <div className="p-3 bg-neutral-50 dark:bg-slate-900/60 rounded-xl border border-neutral-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
              Edit {activeStripe.orientation} Pattern
            </span>

            {/* Dual Colors: Primary + Secondary */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1" title="Primary Stripe Color">
                <input
                  type="color"
                  value={activeStripe.color}
                  onChange={(e) => updateJerseyStripe(activeStripe.id, { color: e.target.value })}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <span className="text-[9px] font-mono text-neutral-500 uppercase">
                  {activeStripe.color}
                </span>
              </div>

              <div className="flex items-center gap-1" title="Secondary / Alternating Stripe Color">
                <input
                  type="color"
                  value={activeStripe.secondaryColor || '#18181B'}
                  onChange={(e) => updateJerseyStripe(activeStripe.id, { secondaryColor: e.target.value })}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <span className="text-[9px] font-mono text-neutral-500 uppercase">
                  {activeStripe.secondaryColor || '#18181B'}
                </span>
              </div>
            </div>
          </div>

          {/* Text Protection Exclusion Zone Switch */}
          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-800/80 rounded-lg border border-neutral-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 block leading-tight">
                  Protect Squad Number & Sponsor
                </span>
                <span className="text-[9px] text-neutral-500 dark:text-neutral-400 block">
                  Excludes pattern lines from crossing numbers & sponsor
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={activeStripe.protectText ?? true}
              onChange={(e) => updateJerseyStripe(activeStripe.id, { protectText: e.target.checked })}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Surface Scope Selector */}
          <div>
            <label className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
              Apply Surface Scope
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['both', 'front', 'back', 'left', 'right', 'leftShoulder'] as StripeSurfaceScope[]).map((tgt) => (
                <button
                  key={tgt}
                  type="button"
                  onClick={() => updateJerseyStripe(activeStripe.id, { surface: tgt })}
                  className={`py-1 text-[11px] font-semibold rounded-lg capitalize border transition-all ${
                    activeStripe.surface === tgt
                      ? 'border-blue-600 bg-blue-600 text-white shadow-2xs'
                      : 'border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {tgt}
                </button>
              ))}
            </div>
          </div>

          {/* Stripe Count */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
                Pattern Count / Density
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {activeStripe.count}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={activeStripe.count}
              onChange={(e) => updateJerseyStripe(activeStripe.id, { count: Number(e.target.value) })}
              className="w-full accent-blue-600 h-1"
            />
          </div>

          {/* Band Thickness */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
                Stripe Width / Band Thickness
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {activeStripe.thickness}px
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={220}
              value={activeStripe.thickness}
              onChange={(e) => updateJerseyStripe(activeStripe.id, { thickness: Number(e.target.value) })}
              className="w-full accent-blue-600 h-1"
            />
          </div>

          {/* Spacing (if count > 1) */}
          {activeStripe.count > 1 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Band Spacing Interval
                </label>
                <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                  {activeStripe.spacing}px
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={160}
                value={activeStripe.spacing}
                onChange={(e) => updateJerseyStripe(activeStripe.id, { spacing: Number(e.target.value) })}
                className="w-full accent-blue-600 h-1"
              />
            </div>
          )}

          {/* Position Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
                Position Center ({activeStripe.orientation === 'horizontal' ? 'Y' : 'X'})
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {activeStripe.orientation === 'horizontal' ? activeStripe.positionY : activeStripe.positionX}px
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={924}
              value={activeStripe.orientation === 'horizontal' ? activeStripe.positionY : activeStripe.positionX}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (activeStripe.orientation === 'horizontal') {
                  updateJerseyStripe(activeStripe.id, { positionY: val });
                } else {
                  updateJerseyStripe(activeStripe.id, { positionX: val });
                }
              }}
              className="w-full accent-blue-600 h-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};
