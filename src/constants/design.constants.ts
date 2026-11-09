export const PRESET_COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Pitch Black', hex: '#18181B' },
  { name: 'Heather Gray', hex: '#6B7280' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Forest Green', hex: '#15803D' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Amber Gold', hex: '#F59E0B' },
  { name: 'Sunset Orange', hex: '#F97316' },
  { name: 'Deep Purple', hex: '#7C3AED' },
  { name: 'Pastel Pink', hex: '#F472B6' },
] as const;

export const DEFAULT_TSHIRT_COLOR = '#FFFFFF';

export const CAMERA_PRESETS = {
  front: { position: [0, 0, 2.5] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  back: { position: [0, 0, -2.5] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  left: { position: [-2.5, 0, 0] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  right: { position: [2.5, 0, 0] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  isometric: { position: [1.8, 1.2, 2.0] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
} as const;

export type CameraPreset = keyof typeof CAMERA_PRESETS;
