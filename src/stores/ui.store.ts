import { create } from 'zustand';
import type { CameraPreset } from '@/constants/design.constants';

interface UIState {
  activeCameraPreset: CameraPreset;
  autoRotate: boolean;
  wireframe: boolean;
  activeTab: 'color' | 'upload' | 'text' | 'layers';
  isMobileDrawerOpen: boolean;

  setActiveCameraPreset: (preset: CameraPreset) => void;
  setAutoRotate: (enabled: boolean) => void;
  toggleAutoRotate: () => void;
  setWireframe: (enabled: boolean) => void;
  toggleWireframe: () => void;
  setActiveTab: (tab: 'color' | 'upload' | 'text' | 'layers') => void;
  setIsMobileDrawerOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeCameraPreset: 'front',
  autoRotate: false,
  wireframe: false,
  activeTab: 'color',
  isMobileDrawerOpen: false,

  setActiveCameraPreset: (preset) => set({ activeCameraPreset: preset }),
  setAutoRotate: (enabled) => set({ autoRotate: enabled }),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  setWireframe: (enabled) => set({ wireframe: enabled }),
  toggleWireframe: () => set((s) => ({ wireframe: !s.wireframe })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
}));
