import React, { Component, type ReactNode } from 'react';
import { AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface Props {
  children: ReactNode;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class JerseyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Jersey 3D Viewport caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'An unexpected 3D rendering error occurred.';

      return (
        <div className="relative w-full h-full min-h-[450px] bg-neutral-100/90 dark:bg-slate-950/90 rounded-2xl overflow-hidden border border-neutral-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200 dark:border-slate-800 shadow-xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-full">
                  3D Engine Caught Error
                </span>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                  Unable to Render 3D Jersey
                </h3>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              The 3D model loader encountered an issue. The 3D viewport was isolated safely to protect the rest of the application.
            </p>

            <div className="p-3 bg-neutral-50 dark:bg-slate-800/60 rounded-xl border border-neutral-200/80 dark:border-slate-700/80 mb-4 font-mono text-[11px] text-rose-600 dark:text-rose-400 break-words">
              {errorMessage}
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/60 text-[11px] text-blue-700 dark:text-blue-300 mb-5">
              <Layers className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>Your 2D design panels, artwork, text, and layers remain safe and editable.</span>
            </div>

            <button
              type="button"
              onClick={this.handleRetry}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry 3D Viewport</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
