import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Shirt, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export const DesignerSelectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50/60 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 md:py-20 flex flex-col justify-center">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Choose Garment to Customize
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            Select a clothing template to enter the 3D customization studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {/* T-Shirt Card */}
          <Link
            to="/designer/tshirt"
            className="group relative bg-white rounded-2xl border-2 border-transparent hover:border-blue-600 p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shirt className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                Live & Interactive
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Classic T-Shirt
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Crewneck short-sleeve T-shirt. Full 360-degree rotation, lighting controls, front & back surfaces, and custom fabric swatches.
              </p>
              <div className="space-y-2 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real 3D GLB model loaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Front and Back surface editing</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-blue-600 font-semibold text-sm">
              <span>Open T-Shirt Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Jersey Card */}
          <Link
            to="/designer/jersey"
            className="group relative bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 p-8 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-neutral-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-3">
                Phase 4 Roadmap
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Athletic Jersey
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Sport jersey with multi-panel construction. Front, back, side panels, and shoulder regions configured for athletic team customizers.
              </p>
              <div className="space-y-2 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                  <span>6 independent editing surfaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                  <span>Numbers and squad typography</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-neutral-700 font-semibold text-sm">
              <span>View Jersey Specifications</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};
