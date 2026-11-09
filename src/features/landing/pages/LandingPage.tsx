import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { HeroGarmentViewer } from '@/features/landing/components/HeroGarmentViewer';
import {
  Rotate3d,
  Palette,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shirt,
  Type,
  Image as ImageIcon,
  SunMoon,
  ChevronRight,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-slate-950 text-neutral-900 dark:text-white flex flex-col transition-colors duration-200">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy, CTAs, Badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Real-Time Interactive 3D Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.12]">
              Design Your Style. <br />
              <span className="text-blue-600 dark:text-blue-400">See It in 3D.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Create custom T-shirts and sports jerseys with an interactive 3D design studio.
              Customize colors, add artwork, and preview every detail before production.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                to="/designer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all"
              >
                <span>Start Designing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/designer/tshirt"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 hover:bg-neutral-100 dark:hover:bg-slate-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm rounded-xl border border-neutral-200 dark:border-slate-800 shadow-2xs transition-colors"
              >
                <span>Explore Garments</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* Feature Check Badges */}
            <div className="mt-10 pt-8 border-t border-neutral-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>WebGL 3D Engine</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>360° Orbital Camera</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>PBR Materials</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Dark & Light Mode</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Garment Studio */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <HeroGarmentViewer />
          </div>
        </div>
      </section>

      {/* Garment Showcase Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-neutral-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Garment Studio Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1.5">
              Select Your Garment Type
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Pick a silhouette to start personalizing with real-time 3D canvas mapping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* T-Shirt Card */}
            <div className="group bg-neutral-50 dark:bg-slate-800/60 rounded-3xl border border-neutral-200 dark:border-slate-700/80 p-8 shadow-xs flex flex-col justify-between hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Shirt className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    Active • 3D GLB Model Ready
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  Crewneck T-Shirt
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  Classic crewneck silhouette with front & back decal projection, custom fabric colors, and print-ready texture mapping.
                </p>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/70 dark:border-slate-800 mb-8 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Validated 3D mesh with natural cloth folds and wrinkles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Independent Front and Back design canvases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>High-res decal projection without seam bleeding</span>
                  </div>
                </div>
              </div>

              <Link
                to="/designer/tshirt"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs group-hover:shadow-md"
              >
                <span>Customize T-Shirt</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sports Jersey Card */}
            <div className="group bg-neutral-50 dark:bg-slate-800/60 rounded-3xl border border-neutral-200 dark:border-slate-700/80 p-8 shadow-xs flex flex-col justify-between hover:border-neutral-300 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shadow-xs">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    Active • 3D V-Neck Mesh Live
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  V-Neck Sports Jersey
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  Authentic athletic V-neck jersey with 6 independent customizable surfaces: Front, Back, Left & Right Sleeves, and Raglan Shoulders.
                </p>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/70 dark:border-slate-800 mb-8 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Validated 3D V-neck mesh with athletic cloth geometry & rib collar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Squad typography, numbers, and sponsor badge support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Synchronized Fabric.js 2D composition engine</span>
                  </div>
                </div>
              </div>

              <Link
                to="/designer/jersey"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-sm rounded-xl transition-all shadow-xs"
              >
                <span>Launch Jersey Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Intuitive Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1.5">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            A frictionless four-step creation pipeline from blank canvas to realistic 3D preview.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center mb-4">
              01
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Choose Your Garment
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Select between classic crewneck T-shirts or technical multi-panel athletic sports jerseys.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center mb-4">
              02
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Customize Colors
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Apply any custom HEX color or pick from curated fabric swatches with realistic PBR surface roughness.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center mb-4">
              03
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Upload Artwork & Text
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Add custom vector graphics, PNG/JPEG logos, squad typography, numbers, and scale or rotate on canvas.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center mb-4">
              04
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Preview in Real-Time 3D
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Rotate, zoom, and inspect your garment from any orbital angle with realistic shadows and lighting presets.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-neutral-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1.5">
              Engineered for Precision & Realism
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Every feature below is implemented and active in your design environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Rotate3d className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                360° Orbital 3D Preview
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Full orbital rotation with camera presets (Front, Back, Left, Right, Isometric) and smooth damping controls.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                Custom Fabric Colors
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Dynamic HEX color picker and curated swatch palettes mapped directly to Three.js PBR cloth materials.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                Artwork Upload & Paste
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Import PNG, JPEG, SVG artwork via file selector or direct clipboard paste with alpha transparency preservation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Type className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                Typography Engine
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Add text layers with font families, size, color, bold/italic styles, and live transforms directly on fabric.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                Front & Back Multi-Surface
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Separated front and back canvases with distinct layer management, history undo/redo, and depth-tested decals.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <SunMoon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                Dark & Light Theme Mode
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Persistent system & manual theme toggling across all canvases, toolbars, viewports, and navigation components.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="relative p-10 sm:p-14 rounded-3xl bg-neutral-900 dark:bg-slate-900 text-white overflow-hidden border border-neutral-800 dark:border-slate-800 shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Bring Your Custom Apparel to Life?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Launch the 3D design studio now. Customize every surface, preview in real-time WebGL, and inspect your creations in 360 degrees.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/designer/tshirt"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
              >
                <span>Start Designing Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/designer/jersey"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
              >
                <span>Open Jersey Studio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-neutral-900 dark:bg-slate-950 text-neutral-400 text-xs border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Virtual Clothing Designer. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/designer/tshirt" className="hover:text-white transition-colors">
              T-Shirt 3D Customizer
            </Link>
            <Link to="/designer/jersey" className="hover:text-white transition-colors">
              Jersey 3D Customizer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
