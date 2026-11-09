import { create } from 'zustand';
import type { DesignerState, DesignElement, GarmentType, SurfaceDesign } from '@/types/designer.types';
import { DEFAULT_TSHIRT_COLOR } from '@/constants/design.constants';

const createDefaultTShirtSurfaces = (): Record<string, SurfaceDesign> => ({
  front: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  back: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
});

const createDefaultJerseySurfaces = (): Record<string, SurfaceDesign> => ({
  front: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  back: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  left: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  right: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  leftShoulder: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  rightShoulder: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
});

const initialTShirtSurfaces = createDefaultTShirtSurfaces();
const initialJerseySurfaces = createDefaultJerseySurfaces();

export const useDesignerStore = create<DesignerState>((set, get) => ({
  garmentType: 'tshirt',
  selectedSurface: 'front',
  selectedElementId: null,
  baseColor: DEFAULT_TSHIRT_COLOR,
  isDirty: false,
  tshirtSurfaces: initialTShirtSurfaces,
  jerseySurfaces: initialJerseySurfaces,
  surfaces: initialTShirtSurfaces,

  history: {
    past: [],
    future: [],
  },

  setGarmentType: (type: GarmentType) => {
    const state = get();
    if (state.garmentType === type) return;

    if (type === 'jersey') {
      // Save current surfaces to tshirtSurfaces before switching
      set({
        garmentType: 'jersey',
        tshirtSurfaces: state.surfaces,
        surfaces: state.jerseySurfaces,
        selectedSurface: 'front',
        selectedElementId: null,
        history: { past: [], future: [] },
      });
    } else {
      // Save current surfaces to jerseySurfaces before switching
      set({
        garmentType: 'tshirt',
        jerseySurfaces: state.surfaces,
        surfaces: state.tshirtSurfaces,
        selectedSurface: 'front',
        selectedElementId: null,
        history: { past: [], future: [] },
      });
    }
  },

  selectSurface: (surface: string) => {
    set({ selectedSurface: surface, selectedElementId: null });
  },

  setBaseColor: (color: string) => {
    const currentSurfaces = get().surfaces;
    const updatedSurfaces: Record<string, SurfaceDesign> = {};
    for (const key of Object.keys(currentSurfaces)) {
      updatedSurfaces[key] = {
        ...currentSurfaces[key],
        color,
      };
    }
    set({
      baseColor: color,
      surfaces: updatedSurfaces,
      isDirty: true,
    });
  },

  setSurfaceColor: (surface: string, color: string) => {
    set((state) => ({
      surfaces: {
        ...state.surfaces,
        [surface]: {
          ...(state.surfaces[surface] || { elements: [] }),
          color,
        },
      },
      isDirty: true,
    }));
  },

  setSurfaceTexture: (surface: string, dataUrl: string | null, canvasJson?: string | null) => {
    set((state) => {
      const surfaceData = state.surfaces[surface] || { color: state.baseColor, elements: [] };
      const updated = {
        ...state.surfaces,
        [surface]: {
          ...surfaceData,
          textureDataUrl: dataUrl,
          canvasJson: canvasJson !== undefined ? canvasJson : surfaceData.canvasJson,
        },
      };

      if (state.garmentType === 'jersey') {
        return { surfaces: updated, jerseySurfaces: updated, isDirty: true };
      }
      return { surfaces: updated, tshirtSurfaces: updated, isDirty: true };
    });
  },

  addElement: (surface: string, element: DesignElement) => {
    get().pushHistory();
    set((state) => {
      const surfaceData = state.surfaces[surface] || { color: state.baseColor, elements: [] };
      const updated = {
        ...state.surfaces,
        [surface]: {
          ...surfaceData,
          elements: [...surfaceData.elements, element],
        },
      };

      if (state.garmentType === 'jersey') {
        return { surfaces: updated, jerseySurfaces: updated, selectedElementId: element.id, isDirty: true };
      }
      return { surfaces: updated, tshirtSurfaces: updated, selectedElementId: element.id, isDirty: true };
    });
  },

  updateElement: (surface: string, elementId: string, updates: Partial<DesignElement>) => {
    set((state) => {
      const surfaceData = state.surfaces[surface];
      if (!surfaceData) return state;

      const updated = {
        ...state.surfaces,
        [surface]: {
          ...surfaceData,
          elements: surfaceData.elements.map((el) =>
            el.id === elementId ? ({ ...el, ...updates } as DesignElement) : el
          ),
        },
      };

      if (state.garmentType === 'jersey') {
        return { surfaces: updated, jerseySurfaces: updated, isDirty: true };
      }
      return { surfaces: updated, tshirtSurfaces: updated, isDirty: true };
    });
  },

  removeElement: (surface: string, elementId: string) => {
    get().pushHistory();
    set((state) => {
      const surfaceData = state.surfaces[surface];
      if (!surfaceData) return state;

      const updated = {
        ...state.surfaces,
        [surface]: {
          ...surfaceData,
          elements: surfaceData.elements.filter((el) => el.id !== elementId),
        },
      };

      if (state.garmentType === 'jersey') {
        return {
          surfaces: updated,
          jerseySurfaces: updated,
          selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
          isDirty: true,
        };
      }
      return {
        surfaces: updated,
        tshirtSurfaces: updated,
        selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
        isDirty: true,
      };
    });
  },

  duplicateElement: (surface: string, elementId: string) => {
    get().pushHistory();
    set((state) => {
      const surfaceData = state.surfaces[surface];
      if (!surfaceData) return state;

      const elementToDup = surfaceData.elements.find((el) => el.id === elementId);
      if (!elementToDup) return state;

      const newId = `elem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const duplicated: DesignElement = {
        ...elementToDup,
        id: newId,
        x: elementToDup.x + 20,
        y: elementToDup.y + 20,
        zIndex: surfaceData.elements.length + 1,
      };

      const updated = {
        ...state.surfaces,
        [surface]: {
          ...surfaceData,
          elements: [...surfaceData.elements, duplicated],
        },
      };

      if (state.garmentType === 'jersey') {
        return { surfaces: updated, jerseySurfaces: updated, selectedElementId: newId, isDirty: true };
      }
      return { surfaces: updated, tshirtSurfaces: updated, selectedElementId: newId, isDirty: true };
    });
  },

  selectElement: (id: string | null) => set({ selectedElementId: id }),

  resetSurface: (surface: string) => {
    get().pushHistory();
    set((state) => {
      const updated = {
        ...state.surfaces,
        [surface]: {
          color: state.baseColor,
          elements: [],
          textureDataUrl: null,
          canvasJson: null,
        },
      };

      if (state.garmentType === 'jersey') {
        return { surfaces: updated, jerseySurfaces: updated, selectedElementId: null, isDirty: true };
      }
      return { surfaces: updated, tshirtSurfaces: updated, selectedElementId: null, isDirty: true };
    });
  },

  resetAll: () => {
    get().pushHistory();
    const state = get();
    if (state.garmentType === 'jersey') {
      const newJersey = createDefaultJerseySurfaces();
      set({
        baseColor: DEFAULT_TSHIRT_COLOR,
        jerseySurfaces: newJersey,
        surfaces: newJersey,
        selectedElementId: null,
        isDirty: false,
      });
    } else {
      const newTShirt = createDefaultTShirtSurfaces();
      set({
        baseColor: DEFAULT_TSHIRT_COLOR,
        tshirtSurfaces: newTShirt,
        surfaces: newTShirt,
        selectedElementId: null,
        isDirty: false,
      });
    }
  },

  pushHistory: () => {
    const { surfaces, history } = get();
    const snapshot = JSON.parse(JSON.stringify(surfaces));
    set({
      history: {
        past: [...history.past.slice(-20), snapshot],
        future: [],
      },
    });
  },

  undo: () => {
    const { history, surfaces, garmentType } = get();
    if (history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    const currentSnapshot = JSON.parse(JSON.stringify(surfaces));

    set({
      surfaces: previous,
      ...(garmentType === 'jersey' ? { jerseySurfaces: previous } : { tshirtSurfaces: previous }),
      selectedElementId: null,
      history: {
        past: newPast,
        future: [currentSnapshot, ...history.future],
      },
    });
  },

  redo: () => {
    const { history, surfaces, garmentType } = get();
    if (history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);
    const currentSnapshot = JSON.parse(JSON.stringify(surfaces));

    set({
      surfaces: next,
      ...(garmentType === 'jersey' ? { jerseySurfaces: next } : { tshirtSurfaces: next }),
      selectedElementId: null,
      history: {
        past: [...history.past, currentSnapshot],
        future: newFuture,
      },
    });
  },
}));
