import React from 'react';
import { useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

export const LoadingOverlay: React.FC = () => {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs transition-opacity duration-300">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-neutral-200">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <span className="text-sm font-medium text-neutral-800">
          Loading 3D Garment...
        </span>
        <div className="w-48 h-1.5 bg-neutral-100 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 mt-2">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
