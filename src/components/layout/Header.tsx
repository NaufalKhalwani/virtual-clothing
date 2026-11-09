import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shirt, Sparkles, ArrowLeft, RotateCcw } from 'lucide-react';
import { useDesignerStore } from '@/stores/designer.store';

export const Header: React.FC = () => {
  const location = useLocation();
  const isDesigner = location.pathname.startsWith('/designer/');
  const garmentType = useDesignerStore((state) => state.garmentType);
  const resetAll = useDesignerStore((state) => state.resetAll);

  return (
    <header className="h-16 px-4 md:px-6 bg-white border-b border-neutral-200/80 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Brand & Navigation */}
      <div className="flex items-center gap-4">
        {isDesigner && (
          <Link
            to="/designer"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
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
              <span className="font-semibold text-sm tracking-tight text-neutral-900">
                Virtual Clothing
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60 uppercase">
                3D
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              Interactive 3D Garment Customizer
            </p>
          </div>
        </Link>
      </div>

      {/* Middle Context (when in editor) */}
      {isDesigner && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700">
          <span className="capitalize">{garmentType} Customizer</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500">Real-time 3D Viewport</span>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {isDesigner ? (
          <>
            <button
              type="button"
              onClick={resetAll}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
              title="Reset all design modifications"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>

            <Link
              to="/designer/jersey"
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                garmentType === 'jersey'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              Jersey
            </Link>

            <Link
              to="/designer/tshirt"
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                garmentType === 'tshirt'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
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
      </div>
    </header>
  );
};
