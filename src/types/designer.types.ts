export type GarmentType = 'tshirt' | 'jersey';

export type TShirtSurface = 'front' | 'back';

export type JerseyPanel =
  | 'front'
  | 'back'
  | 'right'
  | 'left'
  | 'rightShoulder'
  | 'leftShoulder';

export type SurfaceKey = TShirtSurface | JerseyPanel;

export interface BaseElement {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  zIndex: number;
}

export interface DesignImage extends BaseElement {
  type: 'image';
  assetId?: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignText extends BaseElement {
  type: 'text';
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  width?: number;
  height?: number;
}

export type DesignElement = DesignImage | DesignText;

export interface SurfaceDesign {
  color: string;
  elements: DesignElement[];
  textureDataUrl?: string | null;
  canvasJson?: string | null;
}

export interface DesignerState {
  garmentType: GarmentType;
  selectedSurface: string;
  selectedElementId: string | null;
  baseColor: string;
  isDirty: boolean;

  // Separate persistent surfaces for both garments
  tshirtSurfaces: Record<string, SurfaceDesign>;
  jerseySurfaces: Record<string, SurfaceDesign>;
  surfaces: Record<string, SurfaceDesign>;

  // History
  history: {
    past: Array<Record<string, SurfaceDesign>>;
    future: Array<Record<string, SurfaceDesign>>;
  };

  // Actions
  setGarmentType: (type: GarmentType) => void;
  selectSurface: (surface: string) => void;
  setBaseColor: (color: string) => void;
  setSurfaceColor: (surface: string, color: string) => void;
  setSurfaceTexture: (surface: string, dataUrl: string | null, canvasJson?: string | null) => void;

  addElement: (surface: string, element: DesignElement) => void;
  updateElement: (surface: string, elementId: string, updates: Partial<DesignElement>) => void;
  removeElement: (surface: string, elementId: string) => void;
  duplicateElement: (surface: string, elementId: string) => void;
  selectElement: (id: string | null) => void;
  resetSurface: (surface: string) => void;
  resetAll: () => void;

  // History Actions
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
}
