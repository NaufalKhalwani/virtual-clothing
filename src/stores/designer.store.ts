import { create } from 'zustand';
import type { DesignerState, DesignElement, GarmentType, SurfaceDesign, DesignText } from '@/types/designer.types';
import type {
  JerseyTemplateId,
  JerseyColors,
  StripeElementConfig,
  SleevePatternConfig,
  SurfaceViewport,
} from '@/features/jersey-editor/types/jersey-template.types';
import { DEFAULT_TSHIRT_COLOR } from '@/constants/design.constants';
import {
  DEFAULT_JERSEY_COLORS,
  DEFAULT_LEFT_SLEEVE,
  DEFAULT_RIGHT_SLEEVE,
  JERSEY_TEMPLATES,
} from '@/features/jersey-editor/constants/jersey-templates.constants';
import { generateSleevePatternDataUrl } from '@/features/jersey-editor/services/jersey-pattern.service';
import {
  buildJerseyTemplateSurfaces,
  renderCompositeTexture,
} from '@/features/jersey-editor/services/jersey-template-renderer';

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

const createDefaultSurfaceViewports = (): Record<string, SurfaceViewport> => ({
  front: { zoom: 1.0, panX: 0, panY: 0 },
  back: { zoom: 1.0, panX: 0, panY: 0 },
  left: { zoom: 1.0, panX: 0, panY: 0 },
  right: { zoom: 1.0, panX: 0, panY: 0 },
  leftShoulder: { zoom: 1.0, panX: 0, panY: 0 },
  rightShoulder: { zoom: 1.0, panX: 0, panY: 0 },
});

const initialTShirtSurfaces = createDefaultTShirtSurfaces();
const initialJerseySurfaces = createDefaultJerseySurfaces();
const initialSurfaceViewports = createDefaultSurfaceViewports();

export const useDesignerStore = create<DesignerState>((set, get) => ({
  garmentType: 'tshirt',
  selectedSurface: 'front',
  selectedElementId: null,
  baseColor: DEFAULT_TSHIRT_COLOR,
  isDirty: false,
  currentProjectId: null,
  currentProjectName: 'Untitled Design',
  isSaving: false,
  lastSavedAt: null,
  tshirtSurfaces: initialTShirtSurfaces,
  jerseySurfaces: initialJerseySurfaces,
  surfaces: initialTShirtSurfaces,

  // Jersey Template & Advanced Customization
  jerseyTemplateId: null,
  jerseyColors: { ...DEFAULT_JERSEY_COLORS },
  jerseyStripes: [],
  leftSleevePattern: { ...DEFAULT_LEFT_SLEEVE },
  rightSleevePattern: { ...DEFAULT_RIGHT_SLEEVE },

  // Independent 2D Viewports
  surfaceViewports: initialSurfaceViewports,

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

  startNewProject: (garmentType?: GarmentType) => {
    const target = garmentType || get().garmentType;
    if (target === 'jersey') {
      const newJersey = createDefaultJerseySurfaces();
      set({
        garmentType: 'jersey',
        baseColor: DEFAULT_JERSEY_COLORS.primary,
        jerseySurfaces: newJersey,
        surfaces: newJersey,
        selectedSurface: 'front',
        selectedElementId: null,
        currentProjectId: null,
        currentProjectName: 'Untitled Design',
        jerseyTemplateId: null,
        jerseyColors: { ...DEFAULT_JERSEY_COLORS },
        jerseyStripes: [],
        leftSleevePattern: { ...DEFAULT_LEFT_SLEEVE },
        rightSleevePattern: { ...DEFAULT_RIGHT_SLEEVE },
        isDirty: false,
        history: { past: [], future: [] },
      });
    } else {
      const newTShirt = createDefaultTShirtSurfaces();
      set({
        garmentType: 'tshirt',
        baseColor: DEFAULT_TSHIRT_COLOR,
        tshirtSurfaces: newTShirt,
        surfaces: newTShirt,
        selectedSurface: 'front',
        selectedElementId: null,
        currentProjectId: null,
        currentProjectName: 'Untitled Design',
        isDirty: false,
        history: { past: [], future: [] },
      });
    }
  },

  setJerseyTemplate: (templateId: JerseyTemplateId) => {
    get().pushHistory();
    const preset = JERSEY_TEMPLATES.find((t) => t.id === templateId) || JERSEY_TEMPLATES[0];
    const newSurfaces = buildJerseyTemplateSurfaces(
      preset,
      preset.defaultColors,
      preset.defaultStripes,
      preset.defaultLeftSleeve,
      preset.defaultRightSleeve,
      get().surfaces
    );

    set({
      jerseyTemplateId: templateId,
      jerseyColors: { ...preset.defaultColors },
      jerseyStripes: [...preset.defaultStripes],
      leftSleevePattern: { ...preset.defaultLeftSleeve },
      rightSleevePattern: { ...preset.defaultRightSleeve },
      baseColor: preset.defaultColors.primary,
      surfaces: newSurfaces,
      jerseySurfaces: newSurfaces,
      isDirty: true,
    });
  },

  setJerseyColors: (colors: Partial<JerseyColors>) => {
    get().pushHistory();
    const state = get();
    const updatedColors: JerseyColors = { ...state.jerseyColors, ...colors };

    // Update sleeve patterns base color if sleeve color changed
    const updatedLeft = {
      ...state.leftSleevePattern,
      primaryColor: updatedColors.sleeve,
      accentColor: updatedColors.accent,
    };
    const updatedRight = {
      ...state.rightSleevePattern,
      primaryColor: updatedColors.sleeve,
      accentColor: updatedColors.accent,
    };

    // Update stripes color if stripe color changed
    const updatedStripes = colors.stripe
      ? state.jerseyStripes.map((s) => ({ ...s, color: colors.stripe! }))
      : state.jerseyStripes;

    const leftTex = generateSleevePatternDataUrl(updatedLeft);
    const rightTex = generateSleevePatternDataUrl(updatedRight);

    // Re-render front and back composite textures
    const frontTexts = (state.surfaces.front?.elements || []).filter(
      (el) => el.type === 'text'
    ) as DesignText[];
    const backTexts = (state.surfaces.back?.elements || []).filter(
      (el) => el.type === 'text'
    ) as DesignText[];

    const frontTex = renderCompositeTexture(frontTexts, updatedStripes, 'front');
    const backTex = renderCompositeTexture(backTexts, updatedStripes, 'back');

    const updatedSurfaces: Record<string, SurfaceDesign> = {
      ...state.surfaces,
      front: {
        ...(state.surfaces.front || { elements: [] }),
        color: updatedColors.primary,
        textureDataUrl: frontTex || state.surfaces.front?.textureDataUrl,
      },
      back: {
        ...(state.surfaces.back || { elements: [] }),
        color: updatedColors.primary,
        textureDataUrl: backTex || state.surfaces.back?.textureDataUrl,
      },
      left: {
        ...(state.surfaces.left || { elements: [] }),
        color: updatedColors.sleeve,
        textureDataUrl: leftTex,
      },
      right: {
        ...(state.surfaces.right || { elements: [] }),
        color: updatedColors.sleeve,
        textureDataUrl: rightTex,
      },
      leftShoulder: {
        ...(state.surfaces.leftShoulder || { elements: [] }),
        color: updatedColors.primary,
      },
      rightShoulder: {
        ...(state.surfaces.rightShoulder || { elements: [] }),
        color: updatedColors.primary,
      },
    };

    set({
      jerseyColors: updatedColors,
      jerseyStripes: updatedStripes,
      leftSleevePattern: updatedLeft,
      rightSleevePattern: updatedRight,
      baseColor: updatedColors.primary,
      surfaces: updatedSurfaces,
      jerseySurfaces: updatedSurfaces,
      isDirty: true,
    });
  },

  setJerseyStripes: (stripes: StripeElementConfig[]) => {
    get().pushHistory();
    const state = get();
    const frontTexts = (state.surfaces.front?.elements || []).filter(
      (el) => el.type === 'text'
    ) as DesignText[];
    const backTexts = (state.surfaces.back?.elements || []).filter(
      (el) => el.type === 'text'
    ) as DesignText[];

    const frontTex = renderCompositeTexture(frontTexts, stripes, 'front');
    const backTex = renderCompositeTexture(backTexts, stripes, 'back');

    const updatedSurfaces: Record<string, SurfaceDesign> = {
      ...state.surfaces,
      front: {
        ...(state.surfaces.front || { elements: [] }),
        textureDataUrl: frontTex,
      },
      back: {
        ...(state.surfaces.back || { elements: [] }),
        textureDataUrl: backTex,
      },
    };

    set({
      jerseyStripes: stripes,
      surfaces: updatedSurfaces,
      jerseySurfaces: updatedSurfaces,
      isDirty: true,
    });
  },

  addJerseyStripe: (stripe: StripeElementConfig) => {
    const newStripes = [...get().jerseyStripes, stripe];
    get().setJerseyStripes(newStripes);
  },

  updateJerseyStripe: (id: string, updates: Partial<StripeElementConfig>) => {
    const newStripes = get().jerseyStripes.map((s) => (s.id === id ? { ...s, ...updates } : s));
    get().setJerseyStripes(newStripes);
  },

  removeJerseyStripe: (id: string) => {
    const newStripes = get().jerseyStripes.filter((s) => s.id !== id);
    get().setJerseyStripes(newStripes);
  },

  setLeftSleevePattern: (config: Partial<SleevePatternConfig>) => {
    get().pushHistory();
    const state = get();
    const updated: SleevePatternConfig = { ...state.leftSleevePattern, ...config };
    const texUrl = generateSleevePatternDataUrl(updated);

    const updatedSurfaces: Record<string, SurfaceDesign> = {
      ...state.surfaces,
      left: {
        ...(state.surfaces.left || { elements: [] }),
        color: updated.primaryColor,
        textureDataUrl: texUrl,
      },
    };

    set({
      leftSleevePattern: updated,
      surfaces: updatedSurfaces,
      jerseySurfaces: updatedSurfaces,
      isDirty: true,
    });
  },

  setRightSleevePattern: (config: Partial<SleevePatternConfig>) => {
    get().pushHistory();
    const state = get();
    const updated: SleevePatternConfig = { ...state.rightSleevePattern, ...config };
    const texUrl = generateSleevePatternDataUrl(updated);

    const updatedSurfaces: Record<string, SurfaceDesign> = {
      ...state.surfaces,
      right: {
        ...(state.surfaces.right || { elements: [] }),
        color: updated.primaryColor,
        textureDataUrl: texUrl,
      },
    };

    set({
      rightSleevePattern: updated,
      surfaces: updatedSurfaces,
      jerseySurfaces: updatedSurfaces,
      isDirty: true,
    });
  },

  // Viewport Zoom & Pan Actions (Independent per Surface)
  setSurfaceZoom: (surface: string, zoom: number) => {
    const clamped = Math.min(2.5, Math.max(0.5, zoom));
    set((state) => ({
      surfaceViewports: {
        ...state.surfaceViewports,
        [surface]: {
          ...(state.surfaceViewports[surface] || { panX: 0, panY: 0 }),
          zoom: clamped,
        },
      },
    }));
  },

  setSurfacePan: (surface: string, panX: number, panY: number) => {
    const clampedX = Math.min(300, Math.max(-300, panX));
    const clampedY = Math.min(300, Math.max(-300, panY));
    set((state) => ({
      surfaceViewports: {
        ...state.surfaceViewports,
        [surface]: {
          ...(state.surfaceViewports[surface] || { zoom: 1.0 }),
          panX: clampedX,
          panY: clampedY,
        },
      },
    }));
  },

  resetSurfaceViewport: (surface: string) => {
    set((state) => ({
      surfaceViewports: {
        ...state.surfaceViewports,
        [surface]: { zoom: 1.0, panX: 0, panY: 0 },
      },
    }));
  },

  fitSurfaceToCanvas: (surface: string) => {
    set((state) => ({
      surfaceViewports: {
        ...state.surfaceViewports,
        [surface]: { zoom: 1.0, panX: 0, panY: 0 },
      },
    }));
  },

  centerSurfaceHorizontally: (surface: string) => {
    set((state) => ({
      surfaceViewports: {
        ...state.surfaceViewports,
        [surface]: {
          ...(state.surfaceViewports[surface] || { zoom: 1.0, panY: 0 }),
          panX: 0,
        },
      },
    }));
  },

  centerSurfaceVertically: (surface: string) => {
    set((state) => ({
      surfaceViewports: {
        ...state.surfaceViewports,
        [surface]: {
          ...(state.surfaceViewports[surface] || { zoom: 1.0, panX: 0 }),
          panY: 0,
        },
      },
    }));
  },

  setCurrentProject: (id: string | null, name: string) => {
    set({ currentProjectId: id, currentProjectName: name });
  },

  loadProjectData: (
    garmentType,
    baseColor,
    loadedSurfaces,
    projectId,
    projectName,
    templateData
  ) => {
    set({
      garmentType,
      baseColor,
      surfaces: loadedSurfaces,
      ...(garmentType === 'jersey'
        ? {
            jerseySurfaces: loadedSurfaces,
            jerseyTemplateId: templateData?.jerseyTemplateId || null,
            jerseyColors: templateData?.jerseyColors || { ...DEFAULT_JERSEY_COLORS },
            jerseyStripes: templateData?.jerseyStripes || [],
            leftSleevePattern: templateData?.leftSleevePattern || { ...DEFAULT_LEFT_SLEEVE },
            rightSleevePattern: templateData?.rightSleevePattern || { ...DEFAULT_RIGHT_SLEEVE },
            surfaceViewports: templateData?.surfaceViewports || createDefaultSurfaceViewports(),
          }
        : { tshirtSurfaces: loadedSurfaces }),
      currentProjectId: projectId || null,
      currentProjectName: projectName || 'Untitled Design',
      selectedSurface: 'front',
      selectedElementId: null,
      isDirty: false,
      history: { past: [], future: [] },
    });
  },

  setIsSaving: (isSaving: boolean) => set({ isSaving }),

  markSaved: (timestamp) => {
    set({
      isDirty: false,
      isSaving: false,
      lastSavedAt: timestamp || new Date().toISOString(),
    });
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
