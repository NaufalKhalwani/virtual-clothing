import React, { Suspense, Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { TShirtModel } from './TShirtModel';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { LoadingOverlay } from './LoadingOverlay';
import { ViewportToolbar } from './ViewportToolbar';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Unable to load 3D Viewer
          </h3>
          <p className="text-sm text-neutral-600 max-w-md mb-4">
            {this.state.error?.message ||
              'Your browser may not support WebGL hardware acceleration, or the 3D model asset could not be loaded.'}
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Viewer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const Viewer3D: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[450px] bg-neutral-50/50 rounded-2xl overflow-hidden border border-neutral-200/60 select-none">
      <WebGLErrorBoundary>
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 2.5], fov: 45 }}
            gl={{
              antialias: true,
              preserveDrawingBuffer: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Lighting />
            <TShirtModel />
            <CameraRig />
          </Canvas>
        </Suspense>

        <LoadingOverlay />
        <ViewportToolbar />
      </WebGLErrorBoundary>
    </div>
  );
};
