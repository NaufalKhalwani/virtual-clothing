import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';

interface ArtworkUploaderProps {
  onImageSelected: (dataUrl: string) => void;
  className?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const ArtworkUploader: React.FC<ArtworkUploaderProps> = ({
  onImageSelected,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setErrorMessage(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setErrorMessage('Unsupported file format. Please upload PNG, JPG, or WebP.');
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage('File size exceeds the 10 MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onImageSelected(result);
        }
      };
      reader.onerror = () => {
        setErrorMessage('Failed to read image file. Please try another image.');
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  // Global Clipboard Paste Listener
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [processFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 scale-[1.01]'
            : 'border-neutral-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-neutral-50/80 dark:hover:bg-slate-800/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 text-center mb-1">
          Click to upload or drag & drop
        </p>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center mb-2">
          PNG, JPG, or WebP up to 10 MB
        </p>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-slate-800 text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
          <span>Tip: Press</span>
          <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 border border-neutral-300 dark:border-slate-600 rounded font-semibold text-neutral-800 dark:text-white">
            Ctrl+V
          </kbd>
          <span>to paste from clipboard</span>
        </div>
      </div>
    </div>
  );
};
