import React, { useState } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import { JERSEY_TEMPLATES } from '../constants/jersey-templates.constants';
import type { JerseyTemplateId } from '../types/jersey-template.types';
import { Check, Sparkles, AlertTriangle } from 'lucide-react';

export const JerseyTemplatePicker: React.FC = () => {
  const jerseyTemplateId = useDesignerStore((state) => state.jerseyTemplateId);
  const setJerseyTemplate = useDesignerStore((state) => state.setJerseyTemplate);
  const isDirty = useDesignerStore((state) => state.isDirty);

  const [confirmTemplateId, setConfirmTemplateId] = useState<JerseyTemplateId | null>(null);

  const handleSelectTemplate = (id: JerseyTemplateId) => {
    if (id === jerseyTemplateId) return;

    // If design has changes, show lightweight confirmation
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
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Jersey Starter Templates
          </h3>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Select an iconic tournament template. All colors, stripes, and text remain fully customizable.
        </p>
      </div>

      {/* Confirmation Banner if dirty */}
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

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {JERSEY_TEMPLATES.map((tmpl) => {
          const isSelected = jerseyTemplateId === tmpl.id;

          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handleSelectTemplate(tmpl.id)}
              className={`group text-left p-2.5 rounded-xl border transition-all duration-150 relative flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500 shadow-2xs'
                  : 'border-neutral-200/90 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-900/40 hover:border-neutral-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800/80'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 dark:bg-slate-950/60 mb-2 flex items-center justify-center p-2 border border-neutral-200/50 dark:border-slate-800">
                <div
                  className="w-16 h-16 drop-shadow-sm transition-transform group-hover:scale-105"
                  dangerouslySetInnerHTML={{ __html: tmpl.thumbnailSvg }}
                />
              </div>

              {/* Template Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                      {tmpl.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5 leading-tight">
                    {tmpl.description}
                  </p>
                </div>

                {/* Color Swatch Preview */}
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
