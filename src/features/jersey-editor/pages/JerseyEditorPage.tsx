import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import { Layers, AlertCircle, ArrowLeft, Shirt, CheckCircle2 } from 'lucide-react';
import { useDesignerStore } from '@/stores/designer.store';

export const JerseyEditorPage: React.FC = () => {
  const setGarmentType = useDesignerStore((state) => state.setGarmentType);

  useEffect(() => {
    setGarmentType('jersey');
  }, [setGarmentType]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-10 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Phase 4: Jersey Designer
              </span>
              <h1 className="text-2xl font-bold text-neutral-900 mt-1">
                Jersey 3D Customizer
              </h1>
            </div>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 mb-6 flex items-start gap-3 text-xs text-amber-800 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-1">
                Asset Status: 3D Jersey Model Pending
              </span>
              In strict accordance with SRS Section 8.1 & 24.5, Phase 1 & 2 focus on the complete 3D T-Shirt Viewer using the real GLB model (`tshirt.glb`). The multi-panel athletic jersey GLB asset is scheduled for Phase 4.
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-neutral-900">
              Required 3D Asset Specifications (SRS Section 8.1 & 8.4):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>Format: Optimized binary GLTF (`public/models/jersey.glb`)</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>Independent Panels: Front, Back, Left Side, Right Side, Left Shoulder, Right Shoulder</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>UV Unwrapping: Non-overlapping islands per panel</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>Materials: PBR Metallic Roughness workflow</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-neutral-100">
            <Link
              to="/designer/tshirt"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              <Shirt className="w-4 h-4" />
              <span>Switch to Active T-Shirt 3D Customizer</span>
            </Link>
            <Link
              to="/designer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selection</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
