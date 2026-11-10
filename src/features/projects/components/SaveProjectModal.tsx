import React, { useState, useEffect } from 'react';
import { useDesignerStore } from '@/stores/designer.store';
import { useAuthStore } from '@/stores/auth.store';
import { projectService } from '@/services/supabase/project.service';
import { storageService } from '@/services/supabase/storage.service';
import type { ProjectDesignData } from '@/types/project.types';
import { X, Save, AlertCircle, CheckCircle2, PlusCircle, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (projectId: string, name: string) => void;
}

export const SaveProjectModal: React.FC<Props> = ({ isOpen, onClose, onSaved }) => {
  const user = useAuthStore((state) => state.user);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const garmentType = useDesignerStore((state) => state.garmentType);
  const baseColor = useDesignerStore((state) => state.baseColor);
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const currentProjectId = useDesignerStore((state) => state.currentProjectId);
  const currentProjectName = useDesignerStore((state) => state.currentProjectName);
  const setCurrentProject = useDesignerStore((state) => state.setCurrentProject);
  const markSaved = useDesignerStore((state) => state.markSaved);
  const setIsSaving = useDesignerStore((state) => state.setIsSaving);
  const isSaving = useDesignerStore((state) => state.isSaving);

  const [saveMode, setSaveMode] = useState<'update' | 'new'>('new');
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(false);
      setIsLocalSaved(false);
      if (currentProjectId) {
        setSaveMode('update');
        setProjectName(currentProjectName);
      } else {
        setSaveMode('new');
        setProjectName(
          `${garmentType === 'jersey' ? 'Jersey' : 'T-Shirt'} Design ${new Date().toLocaleDateString()}`
        );
      }
    }
  }, [isOpen, currentProjectId, currentProjectName, garmentType]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      openAuthModal('signin');
      return;
    }

    if (!projectName.trim()) {
      setError('Please provide a project name');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Serialize clean design data
      const serializedSurfaces: ProjectDesignData['surfaces'] = {};
      for (const [key, val] of Object.entries(surfaces)) {
        serializedSurfaces[key] = {
          color: val.color,
          elements: val.elements,
          canvasJson: val.canvasJson || null,
          textureDataUrl: val.textureDataUrl || null,
        };
      }

      const designData: ProjectDesignData = {
        version: 1,
        garmentType,
        baseColor,
        selectedSurface,
        surfaces: serializedSurfaces,
        ...(garmentType === 'jersey'
          ? {
              jerseyTemplateId: useDesignerStore.getState().jerseyTemplateId,
              jerseyColors: useDesignerStore.getState().jerseyColors,
              jerseyStripes: useDesignerStore.getState().jerseyStripes,
              leftSleevePattern: useDesignerStore.getState().leftSleevePattern,
              rightSleevePattern: useDesignerStore.getState().rightSleevePattern,
              surfaceViewports: useDesignerStore.getState().surfaceViewports,
            }
          : {}),
      };

      // Generate front thumbnail from active or front surface
      const thumbnailSource = surfaces.front?.textureDataUrl || surfaces[selectedSurface]?.textureDataUrl || null;
      let thumbnailUrl: string | null = null;

      if (thumbnailSource) {
        const thumbResult = await storageService.uploadThumbnail(
          user.id,
          saveMode === 'update' && currentProjectId ? currentProjectId : `thumb_${Date.now()}`,
          thumbnailSource
        );
        thumbnailUrl = thumbResult.url || thumbnailSource;
      }

      let isFallback = false;

      if (saveMode === 'update' && currentProjectId) {
        // Update existing project
        const { data, error: updateErr, isLocalFallback } = await projectService.updateProject(currentProjectId, {
          name: projectName.trim(),
          thumbnail_url: thumbnailUrl,
          design_data: designData,
        });

        if (updateErr || !data) {
          throw new Error(updateErr || 'Failed to update project');
        }

        isFallback = !!isLocalFallback;
        setCurrentProject(data.id, data.name);
        markSaved(data.updated_at);
        setIsLocalSaved(isFallback);
        setSuccess(true);
        if (onSaved) onSaved(data.id, data.name);
      } else {
        // Create brand new project!
        const { data, error: createErr, isLocalFallback } = await projectService.createProject(user.id, {
          name: projectName.trim(),
          garment_type: garmentType,
          thumbnail_url: thumbnailUrl,
          design_data: designData,
        });

        if (createErr || !data) {
          throw new Error(createErr || 'Failed to create project');
        }

        isFallback = !!isLocalFallback;
        setCurrentProject(data.id, data.name);
        markSaved(data.updated_at);
        setIsLocalSaved(isFallback);
        setSuccess(true);
        if (onSaved) onSaved(data.id, data.name);
      }

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, isFallback ? 2200 : 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-neutral-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-neutral-900 dark:text-white transition-all select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Save className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Save Clothing Project</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Persist all layers, fabric colors, typography, and 3D textures
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-semibold">
                {saveMode === 'update' && currentProjectId
                  ? 'Project successfully updated!'
                  : 'New project successfully created!'}
              </p>
              {isLocalSaved && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">
                  Saved to local storage (remote Supabase table &apos;public.projects&apos; is awaiting migration).
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Action Choice: Update Current vs Save as New Project */}
          {currentProjectId && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Save Action
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-slate-800 rounded-2xl border border-neutral-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setSaveMode('update');
                    setProjectName(currentProjectName);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-xl text-xs transition-all ${
                    saveMode === 'update'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="font-semibold text-xs">Update Current</span>
                  </div>
                  <span className="text-[10px] opacity-75 truncate max-w-[130px] mt-0.5">
                    ({currentProjectName})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSaveMode('new');
                    setProjectName(`${currentProjectName} (Copy)`);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-xl text-xs transition-all ${
                    saveMode === 'new'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span className="font-semibold text-xs">+ Save as New</span>
                  </div>
                  <span className="text-[10px] opacity-75 truncate max-w-[130px] mt-0.5">
                    Create new entry
                  </span>
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Summer Tour 2026 Jersey"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-slate-700 bg-neutral-50 dark:bg-slate-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-slate-800/60 rounded-xl border border-neutral-200/70 dark:border-slate-700/70 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
            <div className="flex justify-between">
              <span>Garment Type:</span>
              <span className="font-semibold capitalize text-neutral-900 dark:text-white">{garmentType}</span>
            </div>
            <div className="flex justify-between">
              <span>Fabric Color:</span>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-slate-600"
                  style={{ backgroundColor: baseColor }}
                />
                <span>{baseColor}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Configured Surfaces:</span>
              <span className="font-mono text-neutral-900 dark:text-white">
                {Object.keys(surfaces).length} surfaces
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-slate-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>
                    {saveMode === 'update' && currentProjectId
                      ? 'Update Project'
                      : '+ Save as New Project'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
