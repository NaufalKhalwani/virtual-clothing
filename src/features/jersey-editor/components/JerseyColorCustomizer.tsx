import React, { useState } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import type { JerseyColors } from '../types/jersey-template.types';
import { Palette, Check } from 'lucide-react';

const PRESET_JERSEY_PALETTES: { name: string; colors: JerseyColors }[] = [
  {
    name: 'Royal Navy & Gold',
    colors: {
      primary: '#1E3A8A',
      secondary: '#FFFFFF',
      stripe: '#F59E0B',
      collar: '#FFFFFF',
      sleeve: '#1E3A8A',
      accent: '#F59E0B',
    },
  },
  {
    name: 'Rossoneri Red & Black',
    colors: {
      primary: '#18181B',
      secondary: '#FFFFFF',
      stripe: '#DC2626',
      collar: '#DC2626',
      sleeve: '#18181B',
      accent: '#DC2626',
    },
  },
  {
    name: 'Celtic Emerald & White',
    colors: {
      primary: '#047857',
      secondary: '#FFFFFF',
      stripe: '#FFFFFF',
      collar: '#F59E0B',
      sleeve: '#047857',
      accent: '#F59E0B',
    },
  },
  {
    name: 'Albiceleste Sky & White',
    colors: {
      primary: '#38BDF8',
      secondary: '#FFFFFF',
      stripe: '#FFFFFF',
      collar: '#18181B',
      sleeve: '#38BDF8',
      accent: '#18181B',
    },
  },
  {
    name: 'Pitch Black & Imperial Gold',
    colors: {
      primary: '#0F172A',
      secondary: '#1E293B',
      stripe: '#F59E0B',
      collar: '#F59E0B',
      sleeve: '#0F172A',
      accent: '#F59E0B',
    },
  },
  {
    name: 'Cyber Teal & Neon Pink',
    colors: {
      primary: '#0D9488',
      secondary: '#F43F5E',
      stripe: '#F43F5E',
      collar: '#F43F5E',
      sleeve: '#0D9488',
      accent: '#F43F5E',
    },
  },
];

const COLOR_SWATCHES = [
  '#FFFFFF', '#F8FAFC', '#94A3B8', '#475569', '#18181B', '#0F172A',
  '#DC2626', '#EA580C', '#F59E0B', '#16A34A', '#0D9488', '#2563EB',
  '#1E3A8A', '#7C3AED', '#DB2777', '#38BDF8', '#F43F5E', '#EAB308',
];

export const JerseyColorCustomizer: React.FC = () => {
  const jerseyColors = useDesignerStore((state) => state.jerseyColors);
  const setJerseyColors = useDesignerStore((state) => state.setJerseyColors);

  const [activePart, setActivePart] = useState<keyof JerseyColors>('primary');

  const parts: { key: keyof JerseyColors; label: string; desc: string }[] = [
    { key: 'primary', label: 'Primary Fabric', desc: 'Main torso fabric base' },
    { key: 'secondary', label: 'Secondary / Block', desc: 'Contrast split & accents' },
    { key: 'stripe', label: 'Stripes & Graphics', desc: 'Chest & torso stripes' },
    { key: 'collar', label: 'V-Neck Rib Collar', desc: 'Collar rib & bisban binding' },
    { key: 'sleeve', label: 'Sleeves Base', desc: 'Raglan sleeve fabric' },
    { key: 'accent', label: 'Trim & Details', desc: 'Cuffs, numbers & stitching' },
  ];

  const handleColorChange = (hex: string) => {
    setJerseyColors({ [activePart]: hex });
  };

  const handlePaletteSelect = (colors: JerseyColors) => {
    setJerseyColors(colors);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Jersey Color Studio
          </h3>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Customize individual kit sections with precision HEX and real PBR shaders.
        </p>
      </div>

      {/* Preset Curated Palettes */}
      <div>
        <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">
          Curated Athletic Kits
        </span>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_JERSEY_PALETTES.map((pal) => (
            <button
              key={pal.name}
              type="button"
              onClick={() => handlePaletteSelect(pal.colors)}
              className="text-left p-2 rounded-xl border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 bg-neutral-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 transition-all text-[11px]"
            >
              <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate mb-1">
                {pal.name}
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: pal.colors.primary }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: pal.colors.secondary }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: pal.colors.collar }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: pal.colors.stripe }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Element Selector Tabs */}
      <div>
        <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">
          Select Component to Tint
        </span>
        <div className="space-y-1.5">
          {parts.map((p) => {
            const isSelected = activePart === p.key;
            const currentColor = jerseyColors[p.key] || '#FFFFFF';

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActivePart(p.key)}
                className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500'
                    : 'border-neutral-200/80 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    {p.label}
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    {p.desc}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium text-neutral-500 uppercase">
                    {currentColor}
                  </span>
                  <span
                    className="w-6 h-6 rounded-lg border border-neutral-300 dark:border-slate-700 shadow-2xs shrink-0"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Swatches & Hex Input for Active Part */}
      <div className="p-3 bg-neutral-50 dark:bg-slate-900/60 rounded-xl border border-neutral-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Tinting: {parts.find((p) => p.key === activePart)?.label}
          </span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={jerseyColors[activePart] || '#FFFFFF'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              value={jerseyColors[activePart] || '#FFFFFF'}
              onChange={(e) => handleColorChange(e.target.value)}
              maxLength={7}
              className="w-20 px-2 py-1 text-xs font-mono border border-neutral-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 uppercase"
            />
          </div>
        </div>

        {/* Quick Swatches Grid */}
        <div className="grid grid-cols-6 gap-2 pt-1">
          {COLOR_SWATCHES.map((hex) => {
            const isMatch = (jerseyColors[activePart] || '').toLowerCase() === hex.toLowerCase();

            return (
              <button
                key={hex}
                type="button"
                onClick={() => handleColorChange(hex)}
                className={`w-full aspect-square rounded-lg border flex items-center justify-center transition-all ${
                  isMatch
                    ? 'border-blue-600 scale-105 shadow-2xs ring-2 ring-blue-500/40'
                    : 'border-neutral-300 dark:border-slate-700 hover:scale-105'
                }`}
                style={{ backgroundColor: hex }}
                title={hex}
              >
                {isMatch && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      hex === '#FFFFFF' || hex === '#F8FAFC' || hex === '#38BDF8'
                        ? 'text-neutral-900'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
