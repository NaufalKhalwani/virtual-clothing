import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

interface Props {
  className?: string;
}

export const ExportNotice: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      className={`p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-neutral-900 dark:text-white">
            Production & Vendor Guidelines
          </p>
          <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            Files exported here are high-resolution digital design assets (up to 4096×4096 px). Before
            sending to physical garment manufacturing (sublimation, screen printing, or DTF), confirm
            your vendor’s physical sizing (cm/inches), required bleed margins, safe print areas, and
            CMYK color profile specs.
          </p>
        </div>
      </div>
    </div>
  );
};

export const GPUCapabilityNotice: React.FC<{ maxTextureSize?: number }> = ({ maxTextureSize = 4096 }) => {
  return (
    <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
      <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
      <span>Hardware WebGL Max Texture Dimension: {maxTextureSize}×{maxTextureSize} px</span>
    </div>
  );
};
