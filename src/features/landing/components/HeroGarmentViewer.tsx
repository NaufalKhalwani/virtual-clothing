import React, { Suspense, useState, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { GLTF } from 'three-stdlib';
import { Rotate3d, Sparkles, Check } from 'lucide-react';

const TSHIRT_PATH = '/models/tshirt.glb';

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male?: THREE.Mesh;
    [key: string]: unknown;
  };
  materials: {
    lambert1?: THREE.MeshStandardMaterial;
    [key: string]: unknown;
  };
};

const HERO_FABRIC_PRESETS = [
  { name: 'Royal Cobalt', hex: '#2563EB' },
  { name: 'Obsidian Black', hex: '#18181B' },
  { name: 'Clean White', hex: '#F8FAFC' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Crimson Red', hex: '#DC2626' },
];

const GarmentMesh: React.FC<{ fabricColor: string }> = ({ fabricColor }) => {
  const { nodes, materials } = useGLTF(TSHIRT_PATH) as unknown as GLTFResult;

  const dynamicMaterial = useMemo(() => {
    if (materials.lambert1) {
      const mat = materials.lambert1.clone() as THREE.MeshStandardMaterial;
      mat.roughness = 0.6;
      mat.metalness = 0.05;
      mat.side = THREE.DoubleSide;
      return mat;
    }
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.6,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, [materials.lambert1]);

  // Update color dynamically and dispose on unmount
  useEffect(() => {
    dynamicMaterial.color.set(fabricColor);
    dynamicMaterial.needsUpdate = true;
  }, [fabricColor, dynamicMaterial]);

  useEffect(() => {
    return () => {
      dynamicMaterial.dispose();
    };
  }, [dynamicMaterial]);

  if (!nodes.T_Shirt_male) return null;

  return (
    <Center top>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={dynamicMaterial}
      />
    </Center>
  );
};

const StudioLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} />
      <directionalLight position={[0, -2, 2]} intensity={0.25} />
    </>
  );
};

const InteractiveControls: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.7}
      dampingFactor={0.06}
      enableDamping
      autoRotate
      autoRotateSpeed={1.0}
    />
  );
};

class HeroWebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-xs text-neutral-500">
          <Rotate3d className="w-8 h-8 text-neutral-400 mb-2 opacity-50" />
          <p className="font-semibold text-neutral-700 dark:text-neutral-300">3D Preview Standby</p>
          <p className="text-[11px] mt-1">WebGL is disabled or unsupported on this device.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export const HeroGarmentViewer: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>(HERO_FABRIC_PRESETS[0].hex);

  return (
    <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[520px] rounded-3xl bg-neutral-100/80 dark:bg-slate-900/90 border border-neutral-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between transition-all">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-neutral-400 dark:text-neutral-500">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-medium">Initializing 3D Studio...</span>
            </div>
          }
        >
          <HeroWebGLErrorBoundary>
            <Canvas
              shadows
              camera={{ position: [0, 0, 2.2], fov: 45 }}
              dpr={[1, 2]}
              gl={{
                antialias: true,
                powerPreference: 'high-performance',
              }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <StudioLighting />
              <GarmentMesh fabricColor={selectedColor} />
              <ContactShadows
                position={[0, -0.65, 0]}
                opacity={0.45}
                scale={2.2}
                blur={1.8}
                far={1.2}
              />
              <InteractiveControls />
            </Canvas>
          </HeroWebGLErrorBoundary>
        </Suspense>
      </div>

      {/* Floating Badges */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-neutral-200/70 dark:border-slate-700/70 text-neutral-800 dark:text-neutral-200 text-xs font-semibold shadow-xs">
          <Rotate3d className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin-slow" />
          <span>Interactive 3D Engine</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/70 backdrop-blur-md border border-blue-200/60 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-[11px] font-medium shadow-xs">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>Real GLB Mesh</span>
        </div>
      </div>

      {/* Interactive Bottom Color Palette */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-t from-white/95 dark:from-slate-900/95 via-white/80 dark:via-slate-900/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
            Fabric Tint:
          </span>
          <div className="flex items-center gap-1.5">
            {HERO_FABRIC_PRESETS.map((preset) => {
              const isSelected = selectedColor === preset.hex;
              return (
                <button
                  key={preset.hex}
                  type="button"
                  onClick={() => setSelectedColor(preset.hex)}
                  title={preset.name}
                  aria-label={`Select ${preset.name} fabric color`}
                  className={`relative w-6 h-6 rounded-full border transition-all ${
                    isSelected
                      ? 'ring-2 ring-blue-600 dark:ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-110 border-transparent'
                      : 'border-neutral-300 dark:border-slate-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check
                        className={`w-3 h-3 ${
                          preset.hex === '#F8FAFC' ? 'text-neutral-900' : 'text-white'
                        }`}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium tracking-tight">
          Drag to orbit • 360° Studio View
        </div>
      </div>
    </div>
  );
};
