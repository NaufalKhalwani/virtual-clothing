import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import {
  Rotate3d,
  Palette,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Shirt,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Real-time Interactive 3D Web Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Design Your Clothes. <br className="hidden sm:inline" />
          <span className="text-blue-600">See Every Detail in 3D.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Create your own custom T-shirts and sports jerseys. Customize colors,
          preview in realistic 360-degree 3D, and prepare print-ready clothing designs.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/designer/tshirt"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all hover:shadow-md"
          >
            <span>Launch T-Shirt 3D Customizer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/designer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-semibold text-sm rounded-xl transition-colors border border-neutral-200"
          >
            <span>View All Garments</span>
          </Link>
        </div>

        {/* Feature badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>WebGL 3D Accelerated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>360° Orbital Camera</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Realistic PBR Materials</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mobile & Touch Optimized</span>
          </div>
        </div>
      </section>

      {/* Product Selection Section */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Select Your Garment Type
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Choose from classic crewneck T-shirts or technical sports jerseys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* T-Shirt Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs flex flex-col justify-between hover:border-blue-500/50 hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Shirt className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                  Active • Phase 1 & 2 Ready
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  T-Shirt Designer
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Customize a realistic crewneck T-shirt in 3D. Control studio lighting, rotate 360 degrees, inspect seams, and apply custom fabric palettes.
                </p>
                <ul className="space-y-2 text-xs text-neutral-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Real 3D GLB model with realistic cloth folds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Front and Back camera preset views</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Instant PBR color customization</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/designer/tshirt"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
              >
                <span>Customize T-Shirt</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Jersey Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
                  Upcoming • Phase 4
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Jersey Designer
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Technical multi-surface sports jersey customization. Edit front, back, right, left, and both shoulder panels independently.
                </p>
                <ul className="space-y-2 text-xs text-neutral-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>6 independent editable panel regions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>Player name and squad number typography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>Club badges and sponsor placement</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/designer/jersey"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm rounded-xl transition-colors border border-neutral-200"
              >
                <span>Open Jersey Preview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Engineered for Precision & Realism
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Powered by Three.js and React Three Fiber for accurate 3D preview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Rotate3d className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 mb-2">
              True 360° Orbital Camera
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Rotate, orbit, and zoom in with dampening controls. Switch instantly between front, back, and side perspectives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 mb-2">
              Real-time Fabric Colorizing
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              High precision HEX color selection and curated fabric swatches rendered through PBR materials with realistic cloth roughness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 mb-2">
              No Fake Mockups
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every garment is rendered using real GLTF/GLB polygonal geometry, realistic studio illumination, and soft contact shadows.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Virtual Clothing Designer. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/designer/tshirt" className="hover:text-white transition-colors">
              T-Shirt 3D
            </Link>
            <Link to="/designer/jersey" className="hover:text-white transition-colors">
              Jersey 3D
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
