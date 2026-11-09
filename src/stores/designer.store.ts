import { create } from 'zustand';
import type { DesignerState, DesignElement, GarmentType, SurfaceDesign } from '@/types/designer.types';
import { DEFAULT_TSHIRT_COLOR } from '@/constants/design.constants';

const createDefaultSurfaces = (): Record<string, SurfaceDesign> => ({
  front: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
  back: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
});

export const useDesignerStore = create<DesignerState>((set, get) => ({
  garmentType: 'tshirt',
  selectedSurface: 'front',
  selectedElementId: null,
  baseColor: DEFAULT_TSHIRT_COLOR,
  isDirty: false,
  surfaces: createDefaultSurfaces(),

  history: {
    past: [],
    future: [],
  },

  setGarmentType: (type: GarmentType) => {
    if (type === 'jersey') {
      set({
        garmentType: 'jersey',
        selectedSurface: 'front',
        selectedElementId: null,
        surfaces: {
          front: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
          back: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
          right: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
          left: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
          rightShoulder: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
          leftShoulder: { color: DEFAULT_TSHIRT_COLOR, elements: [], textureDataUrl: null, canvasJson: null },
        },
        history: { past: [], future: [] },
      });
    } else {
      set({
        garmentType: 'tshirt',
        selectedSurface: 'front',
        selectedElementId: null,
        surfaces: createDefaultSurfaces(),
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
      return {
        surfaces: {
          ...state.surfaces,
          [surface]: {
            ...surfaceData,
            textureDataUrl: dataUrl,
            canvasJson: canvasJson !== undefined ? canvasJson : surfaceData.canvasJson,
          },
        },
        isDirty: true,
      };
    });
  },

  addElement: (surface: string, element: DesignElement) => {
    get().pushHistory();
    set((state) => {
      const surfaceData = state.surfaces[surface] || { color: state.baseColor, elements: [] };
      return {
        surfaces: {
          ...state.surfaces,
          [surface]: {
            ...surfaceData,
            elements: [...surfaceData.elements, element],
          },
        },
        selectedElementId: element.id,
        isDirty: true,
      };
    });
  },

  updateElement: (surface: string, elementId: string, updates: Partial<DesignElement>) => {
    set((state) => {
      const surfaceData = state.surfaces[surface];
      if (!surfaceData) return state;

      return {
        surfaces: {
          ...state.surfaces,
          [surface]: {
            ...surfaceData,
            elements: surfaceData.elements.map((el) =>
              el.id === elementId ? ({ ...el, ...updates } as DesignElement) : el
            ),
          },
        },
        isDirty: true,
      };
    });
  },

  removeElement: (surface: string, elementId: string) => {
    get().pushHistory();
    set((state) => {
      const surfaceData = state.surfaces[surface];
      if (!surfaceData) return state;

      return {
        surfaces: {
          ...state.surfaces,
          [surface]: {
            ...surfaceData,
            elements: surfaceData.elements.filter((el) => el.id !== elementId),
          },
        },
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

      return {
        surfaces: {
          ...state.surfaces,
          [surface]: {
            ...surfaceData,
            elements: [...surfaceData.elements, duplicated],
          },
        },
        selectedElementId: newId,
        isDirty: true,
      };
    });
  },

  selectElement: (id: string | null) => set({ selectedElementId: id }),

  resetSurface: (surface: string) => {
    get().pushHistory();
    set((state) => ({
      surfaces: {
        ...state.surfaces,
        [surface]: {
          color: state.baseColor,
          elements: [],
          textureDataUrl: null,
          canvasJson: null,
        },
      },
      selectedElementId: null,
      isDirty: true,
    }));
  },

  resetAll: () => {
    get().pushHistory();
    set({
      baseColor: DEFAULT_TSHIRT_COLOR,
      surfaces: createDefaultSurfaces(),
      selectedElementId: null,
      isDirty: false,
    });
  },

  pushHistory: () => {
    const { surfaces, history } = get();
    // Deep clone surfaces for immutable history entry
    const snapshot = JSON.parse(JSON.stringify(surfaces));
    set({
      history: {
        past: [...history.past.slice(-20), snapshot],
        future: [],
      },
    });
  },

  undo: () => {
    const { history, surfaces } = get();
    if (history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    const currentSnapshot = JSON.parse(JSON.stringify(surfaces));

    set({
      surfaces: previous,
      selectedElementId: null,
      history: {
        past: newPast,
        future: [currentSnapshot, ...history.future],
      },
    });
  },

  redo: () => {
    const { history, surfaces } = get();
    if (history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);
    const currentSnapshot = JSON.parse(JSON.stringify(surfaces));

    set({
      surfaces: next,
      selectedElementId: null,
      history: {
        past: [...history.past, currentSnapshot],
        future: newFuture,
      },
    });
  },
}));
