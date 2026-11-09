/**
 * Utilities for sanitizing export file names and triggering client downloads
 */

export const sanitizeFileName = (name: string): string => {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'clothing-design'
  );
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

export const downloadDataUrl = (dataUrl: string, filename: string): void => {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  const res = await fetch(dataUrl);
  return await res.blob();
};
