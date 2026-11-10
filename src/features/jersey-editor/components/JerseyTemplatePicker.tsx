import React, { useState, useMemo } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import { JERSEY_TEMPLATES } from '../constants/jersey-templates.constants';
import type { JerseyTemplateCategory, JerseyTemplateId } from '../types/jersey-template.types';
import {
  Check,
  Sparkles,
  AlertTriangle,
  Search,
  Eye,
} from 'lucide-react';

export const JerseyTemplatePicker: React.FC = () => {
  const jerseyTemplateId = useDesignerStore((state) => state.jerseyTemplateId);
  const setJerseyTemplate = useDesignerStore((state) => state.setJerseyTemplate);
  const isDirty = useDesignerStore((state) => state.isDirty);

  const [activeCategory, setActiveCategory] = useState<JerseyTemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');
  const [confirmTemplateId, setConfirmTemplateId] = useState<JerseyTemplateId | null>(null);

  const categories: { id: JerseyTemplateCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Kits' },
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'athletic', label: 'Athletic' },
    { id: 'elite', label: 'Elite' },
  ];

  // Filter templates by category and search term
  const filteredTemplates = useMemo(() => {
    return JERSEY_TEMPLATES.filter((tmpl) => {
      // Exclude legacy duplicates from list if modern equivalent exists
      const isLegacyDuplicate = tmpl.id.includes('(Legacy)') || tmpl.name.includes('(Legacy)');
      if (isLegacyDuplicate) return false;

      const matchesCat = activeCategory === 'all' || tmpl.category === activeCategory;
      const matchesSearch =
        tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSelectTemplate = (id: JerseyTemplateId) => {
    if (id === jerseyTemplateId) return;

    if (isDirty) {
      setConfirmTemplateId(id);
    } else {
      setJerseyTemplate(id);
    }
  };

  const handleConfirmChange = () => {
    if (confirmTemplateId) {
      setJerseyTemplate(confirmTemplateId);
      setConfirmTemplateId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Premium Jersey Templates ({filteredTemplates.length})
            </h3>
          </div>

          {/* Front / Back Thumbnail Toggle */}
          <div className="flex items-center p-0.5 bg-neutral-200/70 dark:bg-slate-800 rounded-lg text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setPreviewSide('front')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                previewSide === 'front'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => setPreviewSide('back')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                previewSide === 'back'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Back
            </button>
          </div>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Professional authentic tournament kits with customizable fabric patterns, colors, and squad lettering.
        </p>
      </div>

      {/* Confirmation Dialog when isDirty */}
      {confirmTemplateId && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-snug">
              Applying a new template will update fabric colors, stripes, and layout. Proceed?
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setConfirmTemplateId(null)}
              className="px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-amber-100/60 dark:hover:bg-amber-900/40 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmChange}
              className="px-2.5 py-1 text-[11px] font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-2xs transition-colors"
            >
              Apply Template
            </button>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates (e.g., stripes, sash, royal)..."
          className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 dark:border-slate-800 rounded-xl bg-neutral-50/70 dark:bg-slate-900/50 text-neutral-900 dark:text-white placeholder:text-neutral-400"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isCatActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 transition-all ${
                isCatActive
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-0.5">
        {filteredTemplates.map((tmpl) => {
          const isSelected =
            jerseyTemplateId === tmpl.id ||
            (jerseyTemplateId === 'classic-hoops' && tmpl.id === 'retro-horizontal') ||
            (jerseyTemplateId === 'vertical-stripes' && tmpl.id === 'heritage-stripes') ||
            (jerseyTemplateId === 'two-tone' && tmpl.id === 'split-identity') ||
            (jerseyTemplateId === 'minimalist-pro' && tmpl.id === 'minimal-pro') ||
            (jerseyTemplateId === 'modern-geometric' && tmpl.id === 'power-geometry');

          const svgContent = previewSide === 'front' ? tmpl.thumbnailSvgFront : tmpl.thumbnailSvgBack;

          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handleSelectTemplate(tmpl.id)}
              className={`group text-left p-2.5 rounded-xl border transition-all duration-150 relative flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500 shadow-2xs'
                  : 'border-neutral-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-neutral-300 dark:hover:border-slate-700 hover:bg-neutral-50/70 dark:hover:bg-slate-800/80'
              }`}
            >
              {/* Category Badge & Active Check */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-neutral-400">
                  {tmpl.category}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Accurate SVG Kit Thumbnail */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 dark:bg-slate-950/70 mb-2 flex items-center justify-center p-1.5 border border-neutral-200/50 dark:border-slate-800 relative">
                <div
                  className="w-18 h-18 drop-shadow-sm transition-transform group-hover:scale-105"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
                <span className="absolute bottom-1 right-1 text-[8px] font-mono font-semibold px-1 py-0.2 rounded bg-black/50 text-white flex items-center gap-0.5">
                  <Eye className="w-2 h-2" />
                  {previewSide.toUpperCase()}
                </span>
              </div>

              {/* Template Info & Swatches */}
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {tmpl.name}
                  </div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5 leading-tight">
                    {tmpl.description}
                  </p>
                </div>

                {/* Color Swatch Dots */}
                <div className="flex items-center gap-1 mt-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: tmpl.defaultColors.primary }}
                    title={`Primary: ${tmpl.defaultColors.primary}`}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: tmpl.defaultColors.secondary }}
                    title={`Secondary: ${tmpl.defaultColors.secondary}`}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: tmpl.defaultColors.collar }}
                    title={`Collar: ${tmpl.defaultColors.collar}`}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: tmpl.defaultColors.stripe }}
                    title={`Stripe: ${tmpl.defaultColors.stripe}`}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
