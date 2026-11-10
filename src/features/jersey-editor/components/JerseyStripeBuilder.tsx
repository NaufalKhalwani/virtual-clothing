import React, { useState } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import type { StripeElementConfig, StripeOrientation } from '../types/jersey-template.types';
import { Trash2, Sliders, Rows3, Columns3 } from 'lucide-react';

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
      count: orientation === 'vertical' ? 3 : 2,
      thickness: 36,
      spacing: 48,
      positionY: 512,
      positionX: 512,
      color: jerseyColors.stripe || '#FFFFFF',
      opacity: 1,
    };

    addJerseyStripe(newStripe);
    setSelectedStripeId(newStripe.id);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Stripe & Graphic Builder
          </h3>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Build procedural horizontal hooping or vertical tournament stripes across front and back.
        </p>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleCreateStripe('horizontal')}
          className="p-2.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-200 dark:border-slate-700 transition-colors shadow-2xs"
        >
          <Rows3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>+ Horizontal Hoops</span>
        </button>

        <button
          type="button"
          onClick={() => handleCreateStripe('vertical')}
          className="p-2.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-200 dark:border-slate-700 transition-colors shadow-2xs"
        >
          <Columns3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>+ Vertical Stripes</span>
        </button>
      </div>

      {/* Stripe Layers List */}
      {jerseyStripes.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block">
            Configured Stripe Groups ({jerseyStripes.length})
          </span>
          <div className="space-y-1">
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
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: stripe.color }}
                    />
                    <div>
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 capitalize">
                        {stripe.orientation} Stripe #{idx + 1}
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
                    title="Delete stripe group"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Stripe Controls */}
      {activeStripe && (
        <div className="p-3.5 bg-neutral-50 dark:bg-slate-900/60 rounded-xl border border-neutral-200/80 dark:border-slate-800 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
              Edit {activeStripe.orientation} Stripe
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={activeStripe.color}
                onChange={(e) => updateJerseyStripe(activeStripe.id, { color: e.target.value })}
                className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                {activeStripe.color}
              </span>
            </div>
          </div>

          {/* Surface Target (Front, Back, Both) */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
              Apply Surface Target
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['both', 'front', 'back'] as const).map((tgt) => (
                <button
                  key={tgt}
                  type="button"
                  onClick={() => updateJerseyStripe(activeStripe.id, { surface: tgt })}
                  className={`py-1 text-xs font-semibold rounded-lg capitalize border transition-all ${
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
              <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                Number of Stripes
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {activeStripe.count}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              value={activeStripe.count}
              onChange={(e) => updateJerseyStripe(activeStripe.id, { count: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Stripe Thickness */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                Band Thickness (px)
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {activeStripe.thickness}px
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={120}
              value={activeStripe.thickness}
              onChange={(e) =>
                updateJerseyStripe(activeStripe.id, { thickness: Number(e.target.value) })
              }
              className="w-full accent-blue-600"
            />
          </div>

          {/* Spacing (if count > 1) */}
          {activeStripe.count > 1 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Band Spacing (px)
                </label>
                <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                  {activeStripe.spacing}px
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={140}
                value={activeStripe.spacing}
                onChange={(e) =>
                  updateJerseyStripe(activeStripe.id, { spacing: Number(e.target.value) })
                }
                className="w-full accent-blue-600"
              />
            </div>
          )}

          {/* Position Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                {activeStripe.orientation === 'horizontal' ? 'Vertical Center (Y)' : 'Horizontal Center (X)'}
              </label>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                {activeStripe.orientation === 'horizontal' ? activeStripe.positionY : activeStripe.positionX}
              </span>
            </div>
            <input
              type="range"
              min={150}
              max={850}
              value={
                activeStripe.orientation === 'horizontal' ? activeStripe.positionY : activeStripe.positionX
              }
              onChange={(e) => {
                const val = Number(e.target.value);
                if (activeStripe.orientation === 'horizontal') {
                  updateJerseyStripe(activeStripe.id, { positionY: val });
                } else {
                  updateJerseyStripe(activeStripe.id, { positionX: val });
                }
              }}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};
