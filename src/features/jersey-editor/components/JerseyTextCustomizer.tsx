import React, { useState } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import type { DesignText } from '@/types/designer.types';
import { Type, User, Hash, Shield, Sparkles, Trash2 } from 'lucide-react';

const ATHLETIC_FONTS = [
  'Oswald, sans-serif',
  'Montserrat, sans-serif',
  'Impact, sans-serif',
  'Bebas Neue, sans-serif',
  'Inter, sans-serif',
];

interface JerseyTextCustomizerProps {
  onAddTextToActiveSurface?: (text: {
    content: string;
    fontFamily: string;
    fontSize: number;
    color: string;
  }) => void;
}

export const JerseyTextCustomizer: React.FC<JerseyTextCustomizerProps> = ({
  onAddTextToActiveSurface,
}) => {
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const addElement = useDesignerStore((state) => state.addElement);
  const updateElement = useDesignerStore((state) => state.updateElement);
  const removeElement = useDesignerStore((state) => state.removeElement);
  const jerseyColors = useDesignerStore((state) => state.jerseyColors);

  // Extract text elements from currently active surface
  const currentElements = surfaces[selectedSurface]?.elements || [];
  const textElements = currentElements.filter((el) => el.type === 'text') as DesignText[];

  const [selectedTextId, setSelectedTextId] = useState<string | null>(
    textElements.length > 0 ? textElements[0].id : null
  );

  const activeText = textElements.find((t) => t.id === selectedTextId) || textElements[0];

  const handleAddPresetText = (type: 'team' | 'sponsor' | 'player' | 'number') => {
    let preset: Partial<DesignText>;

    switch (type) {
      case 'team':
        preset = {
          content: 'TEAM NAME',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 32,
          fontWeight: 'bold',
          color: jerseyColors.accent || '#F59E0B',
          x: 512,
          y: 280,
        };
        break;
      case 'sponsor':
        preset = {
          content: 'SPONSOR',
          fontFamily: 'Oswald, sans-serif',
          fontSize: 44,
          fontWeight: 'bold',
          color: jerseyColors.secondary || '#FFFFFF',
          x: 512,
          y: 490,
        };
        break;
      case 'player':
        preset = {
          content: 'PLAYER',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 36,
          fontWeight: 'bold',
          color: jerseyColors.secondary || '#FFFFFF',
          x: 512,
          y: 230,
        };
        break;
      case 'number':
        preset = {
          content: '10',
          fontFamily: 'Oswald, sans-serif',
          fontSize: 96,
          fontWeight: 'bold',
          color: jerseyColors.accent || '#F59E0B',
          x: 512,
          y: 440,
        };
        break;
    }

    const newElement: DesignText = {
      id: `text_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type: 'text',
      content: preset.content || 'NEW TEXT',
      fontFamily: preset.fontFamily || 'Montserrat, sans-serif',
      fontSize: preset.fontSize || 36,
      fontWeight: 'bold',
      color: preset.color || '#FFFFFF',
      textAlign: 'center',
      x: preset.x || 512,
      y: preset.y || 512,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: currentElements.length + 1,
    };

    addElement(selectedSurface, newElement);
    setSelectedTextId(newElement.id);

    if (onAddTextToActiveSurface) {
      onAddTextToActiveSurface({
        content: newElement.content,
        fontFamily: newElement.fontFamily,
        fontSize: newElement.fontSize,
        color: newElement.color,
      });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Type className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Athletic Typography Studio
          </h3>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Add and customize team names, sponsors, player names, and squad numbers on {selectedSurface.toUpperCase()} panel.
        </p>
      </div>

      {/* Quick Athletic Presets */}
      <div className="grid grid-cols-2 gap-2">
        {selectedSurface === 'front' ? (
          <>
            <button
              type="button"
              onClick={() => handleAddPresetText('team')}
              className="p-2.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-200 dark:border-slate-700 shadow-2xs transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+ Team Crest Text</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddPresetText('sponsor')}
              className="p-2.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-200 dark:border-slate-700 shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+ Chest Sponsor</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handleAddPresetText('player')}
              className="p-2.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-200 dark:border-slate-700 shadow-2xs transition-colors"
            >
              <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+ Player Name</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddPresetText('number')}
              className="p-2.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-200 dark:border-slate-700 shadow-2xs transition-colors"
            >
              <Hash className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+ Squad Number</span>
            </button>
          </>
        )}
      </div>

      {/* Text Elements on Current Panel */}
      {textElements.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block">
            Text Elements on {selectedSurface.toUpperCase()} ({textElements.length})
          </span>
          <div className="space-y-1">
            {textElements.map((txt) => {
              const isSelected = activeText?.id === txt.id;

              return (
                <div
                  key={txt.id}
                  onClick={() => setSelectedTextId(txt.id)}
                  className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500'
                      : 'border-neutral-200/80 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: txt.color }}
                    />
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      "{txt.content}"
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                      {txt.fontSize}px
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeElement(selectedSurface, txt.id);
                    }}
                    className="p-1 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                    title="Delete text"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Text Controls */}
      {activeText && (
        <div className="p-3.5 bg-neutral-50 dark:bg-slate-900/60 rounded-xl border border-neutral-200/80 dark:border-slate-800 space-y-3.5">
          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide block">
            Edit Selected Lettering
          </span>

          {/* Text Content Input */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
              Text Content
            </label>
            <input
              type="text"
              value={activeText.content}
              onChange={(e) =>
                updateElement(selectedSurface, activeText.id, { content: e.target.value })
              }
              className="w-full px-3 py-1.5 text-xs border border-neutral-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 font-semibold uppercase"
            />
          </div>

          {/* Font Family Selector */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
              Athletic Font Family
            </label>
            <select
              value={activeText.fontFamily}
              onChange={(e) =>
                updateElement(selectedSurface, activeText.id, { fontFamily: e.target.value })
              }
              className="w-full px-3 py-1.5 text-xs border border-neutral-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            >
              {ATHLETIC_FONTS.map((font) => (
                <option key={font} value={font}>
                  {font.split(',')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Color & Size */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeText.color}
                  onChange={(e) =>
                    updateElement(selectedSurface, activeText.id, { color: e.target.value })
                  }
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  {activeText.color}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Size
                </label>
                <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                  {activeText.fontSize}px
                </span>
              </div>
              <input
                type="range"
                min={16}
                max={140}
                value={activeText.fontSize}
                onChange={(e) =>
                  updateElement(selectedSurface, activeText.id, {
                    fontSize: Number(e.target.value),
                  })
                }
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
