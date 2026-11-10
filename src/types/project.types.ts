import type { GarmentType, DesignElement } from './designer.types';
import type {
  JerseyTemplateId,
  JerseyColors,
  StripeElementConfig,
  SleevePatternConfig,
  SurfaceViewport,
} from '@/features/jersey-editor/types/jersey-template.types';

export interface SurfaceDesignData {
  color: string;
  elements: DesignElement[];
  canvasJson?: string | null;
  textureDataUrl?: string | null;
}

export interface ProjectDesignData {
  version: number;
  garmentType: GarmentType;
  baseColor: string;
  selectedSurface: string;
  surfaces: Record<string, SurfaceDesignData>;
  // Phase 8 Jersey Template & Customization
  jerseyTemplateId?: JerseyTemplateId | null;
  jerseyColors?: JerseyColors;
  jerseyStripes?: StripeElementConfig[];
  leftSleevePattern?: SleevePatternConfig;
  rightSleevePattern?: SleevePatternConfig;
  surfaceViewports?: Record<string, SurfaceViewport>;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  garment_type: GarmentType;
  thumbnail_url: string | null;
  design_data: ProjectDesignData;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  garment_type: GarmentType;
  thumbnail_url?: string | null;
  design_data: ProjectDesignData;
}

export interface UpdateProjectInput {
  name?: string;
  thumbnail_url?: string | null;
  design_data?: ProjectDesignData;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}
