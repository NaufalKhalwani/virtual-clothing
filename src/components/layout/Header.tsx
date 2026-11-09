import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shirt, Sparkles, ArrowLeft, RotateCcw } from 'lucide-react';
import { useDesignerStore } from '@/stores/designer.store';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Header: React.FC = () => {
  const location = useLocation();
  const isDesigner = location.pathname.startsWith('/designer/');
  const garmentType = useDesignerStore((state) => state.garmentType);
  const resetAll = useDesignerStore((state) => state.resetAll);

  return (
    <header className="h-16 px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-neutral-200/80 dark:border-slate-800 flex items-center justify-between sticky top-0 z-40 select-none transition-colors duration-200">
      {/* Brand & Navigation */}
      <div className="flex items-center gap-4">
        {isDesigner && (
          <Link
            to="/designer"
            className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Back to Garment Selection"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-white">
                Virtual Clothing
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800 uppercase">
                3D
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
              Interactive 3D Garment Customizer
            </p>
          </div>
        </Link>
      </div>

      {/* Middle Context (when in editor) */}
      {isDesigner && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-slate-800 rounded-full border border-neutral-200 dark:border-slate-700 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          <span className="capitalize">{garmentType} Customizer</span>
          <span className="text-neutral-400 dark:text-neutral-500">•</span>
          <span className="text-neutral-500 dark:text-neutral-400">Real-time 3D Viewport</span>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {isDesigner ? (
          <>
            <button
              type="button"
              onClick={resetAll}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-neutral-200 dark:border-slate-700"
              title="Reset all design modifications"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>

            <Link
              to="/designer/jersey"
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                garmentType === 'jersey'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-slate-800'
              }`}
            >
              Jersey
            </Link>

            <Link
              to="/designer/tshirt"
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                garmentType === 'tshirt'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-slate-800'
              }`}
            >
              T-Shirt
            </Link>
          </>
        ) : (
          <Link
            to="/designer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Launch Designer
          </Link>
        )}

        {/* Global Dark/Light Mode Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};
