import { create } from 'zustand';
import type { CameraPreset } from '@/constants/design.constants';
import { getInitialTheme, applyThemeToDom, type ThemeMode } from '@/services/theme.service';

interface UIState {
  theme: ThemeMode;
  activeCameraPreset: CameraPreset;
  autoRotate: boolean;
  wireframe: boolean;
  activeTab: 'color' | 'upload' | 'text' | 'layers';
  isMobileDrawerOpen: boolean;

  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setActiveCameraPreset: (preset: CameraPreset) => void;
  setAutoRotate: (enabled: boolean) => void;
  toggleAutoRotate: () => void;
  setWireframe: (enabled: boolean) => void;
  toggleWireframe: () => void;
  setActiveTab: (tab: 'color' | 'upload' | 'text' | 'layers') => void;
  setIsMobileDrawerOpen: (open: boolean) => void;
}

const initialTheme = getInitialTheme();
applyThemeToDom(initialTheme);

export const useUIStore = create<UIState>((set) => ({
  theme: initialTheme,
  activeCameraPreset: 'front',
  autoRotate: false,
  wireframe: false,
  activeTab: 'color',
  isMobileDrawerOpen: false,

  setTheme: (theme: ThemeMode) => {
    applyThemeToDom(theme);
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme: ThemeMode = state.theme === 'light' ? 'dark' : 'light';
      applyThemeToDom(nextTheme);
      return { theme: nextTheme };
    });
  },

  setActiveCameraPreset: (preset) => set({ activeCameraPreset: preset }),
  setAutoRotate: (enabled) => set({ autoRotate: enabled }),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  setWireframe: (enabled) => set({ wireframe: enabled }),
  toggleWireframe: () => set((s) => ({ wireframe: !s.wireframe })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
}));
