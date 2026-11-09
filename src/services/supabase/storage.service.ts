import { supabase, isSupabaseConfigured } from './supabase.client';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

export const storageService = {
  /**
   * Upload an artwork file to the project-artwork storage bucket
   */
  async uploadArtwork(userId: string, file: File): Promise<UploadResult> {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return { url: null, error: 'Invalid file format. Please upload PNG, JPG, WebP, or SVG.' };
    }

    // Validate size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { url: null, error: 'File size exceeds maximum limit of 10MB.' };
    }

    const readAsDataUrl = (): Promise<UploadResult> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ url: reader.result as string, error: null });
        reader.onerror = () => resolve({ url: null, error: 'Failed to read local file' });
        reader.readAsDataURL(file);
      });
    };

    if (!isSupabaseConfigured) {
      return readAsDataUrl();
    }

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${userId}/${Date.now()}_${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from('project-artwork')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.warn('[storageService] Artwork bucket upload failed, using DataURL fallback:', error.message);
        return readAsDataUrl();
      }

      const { data: publicUrlData } = supabase.storage
        .from('project-artwork')
        .getPublicUrl(data.path);

      return { url: publicUrlData.publicUrl, error: null };
    } catch (err: unknown) {
      console.warn('[storageService] Artwork upload exception, using fallback:', err);
      return readAsDataUrl();
    }
  },

  /**
   * Upload a project thumbnail preview image
   */
  async uploadThumbnail(userId: string, projectId: string, dataUrl: string): Promise<UploadResult> {
    if (!isSupabaseConfigured) {
      return { url: dataUrl, error: null };
    }

    try {
      // Convert Data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const filePath = `${userId}/${projectId}.png`;

      const { data, error } = await supabase.storage
        .from('project-thumbnails')
        .upload(filePath, blob, {
          contentType: 'image/png',
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        // Fallback to dataUrl directly so thumbnail is never lost
        console.warn('[storageService] Thumbnail bucket upload failed, using DataURL fallback:', error.message);
        return { url: dataUrl, error: null };
      }

      const { data: publicUrlData } = supabase.storage
        .from('project-thumbnails')
        .getPublicUrl(data.path);

      return { url: publicUrlData.publicUrl, error: null };
    } catch {
      return { url: dataUrl, error: null };
    }
  },
};
