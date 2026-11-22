import React from 'react';
import { BrandLogo } from '@/components/brand/BrandLogo';

export const PageLoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-50/80 dark:bg-slate-950 transition-colors duration-200 p-4">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <BrandLogo variant="horizontal" size="lg" />
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <div className="w-3.5 h-3.5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading studio...</span>
        </div>
      </div>
    </div>
  );
};
