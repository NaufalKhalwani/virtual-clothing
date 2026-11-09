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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-neutral-900 dark:text-white flex flex-col transition-colors duration-200">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Real-time Interactive 3D Web Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Design Your Clothes. <br className="hidden sm:inline" />
          <span className="text-blue-600 dark:text-blue-400">See Every Detail in 3D.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200/80 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm rounded-xl transition-colors border border-neutral-200 dark:border-slate-700"
          >
            <span>View All Garments</span>
          </Link>
        </div>

        {/* Feature badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>WebGL 3D Accelerated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>360° Orbital Camera</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Realistic PBR Materials</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Dark & Light Mode</span>
          </div>
        </div>
      </section>

      {/* Product Selection Section */}
      <section className="py-16 bg-neutral-50 dark:bg-slate-900 border-y border-neutral-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Select Your Garment Type
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Choose from classic crewneck T-shirts or technical sports jerseys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* T-Shirt Card */}
            <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-neutral-200 dark:border-slate-700 p-8 shadow-xs flex flex-col justify-between hover:border-blue-500/50 hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <Shirt className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
                  Active • Decals & Real GLB
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  T-Shirt Designer
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  Customize a realistic crewneck T-shirt in 3D. Upload artwork, add typography, rotate 360 degrees, and apply custom fabric palettes.
                </p>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Real 3D GLB model with realistic cloth folds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Front and Back surface decal projection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Multi-format artwork upload & clipboard paste</span>
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
            <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-neutral-200 dark:border-slate-700 p-8 shadow-xs flex flex-col justify-between hover:border-neutral-300 dark:hover:border-slate-600 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-slate-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                  6 Design Surfaces
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Jersey Designer
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  Technical sports jersey customization. Edit front, back, right, left, and both shoulder panels with team typography and numbers.
                </p>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>6 independent design panels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Squad typography and jersey lettering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Club badges and sponsor placement</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/designer/jersey"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-100 dark:bg-slate-700 hover:bg-neutral-200 dark:hover:bg-slate-600 text-neutral-800 dark:text-neutral-200 font-semibold text-sm rounded-xl transition-colors border border-neutral-200 dark:border-slate-600"
              >
                <span>Launch Jersey Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Engineered for Precision & Realism
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Powered by Three.js, React Three Fiber, and Fabric.js for real-time 3D custom apparel preview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Rotate3d className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
              True 360° Orbital Camera
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Rotate, orbit, and zoom in with dampening controls. Switch instantly between front, back, and side perspectives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
              Real-time Fabric Colorizing
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              HEX color selection and curated fabric swatches rendered through PBR materials with realistic cloth roughness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
              No Fake Mockups
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every garment is rendered using real GLTF/GLB polygonal geometry, realistic studio illumination, and soft contact shadows.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-neutral-900 dark:bg-slate-950 text-neutral-400 text-xs border-t border-neutral-800">
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
