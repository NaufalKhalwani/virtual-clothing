export type ExportType = 'artwork-2d' | 'mockup-3d' | 'uv-texture';

export type ExportResolution = 1024 | 2048 | 4096;

export type ExportFormat = 'png' | 'jpeg' | 'zip';

export type CameraAngle = 'front' | 'back' | 'left' | 'right' | 'isometric';

export type ExportBackground = 'transparent' | 'white' | 'studio';

export interface Export2DOptions {
  resolution: ExportResolution;
  format: 'png' | 'jpeg';
  surface: string | 'all';
  background: 'transparent' | 'white' | 'fabric';
}

export interface Export3DOptions {
  resolution: ExportResolution;
  format: 'png' | 'jpeg';
  cameraAngle: CameraAngle;
  background: ExportBackground;
}

export interface ExportUVOptions {
  resolution: ExportResolution;
  format: 'png' | 'jpeg';
}

export interface ExportProgress {
  step: string;
  progress: number; // 0 to 100
}
