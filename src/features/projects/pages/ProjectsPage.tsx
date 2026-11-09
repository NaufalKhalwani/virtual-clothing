import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/stores/auth.store';
import { useDesignerStore } from '@/stores/designer.store';
import { projectService } from '@/services/supabase/project.service';
import type { Project } from '@/types/project.types';
import type { SurfaceDesign } from '@/types/designer.types';
import {
  FolderPlus,
  Search,
  Shirt,
  Layers,
  Copy,
  Trash2,
  Edit2,
  ExternalLink,
  Lock,
  ArrowRight,
  MoreVertical,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoadingAuth = useAuthStore((state) => state.isLoading);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const loadProjectData = useDesignerStore((state) => state.loadProjectData);
  const startNewProject = useDesignerStore((state) => state.startNewProject);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocalFallback, setIsLocalFallback] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [garmentFilter, setGarmentFilter] = useState<'all' | 'tshirt' | 'jersey'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'name'>('latest');

  // Modals / Dialog state
  const [renamingProject, setRenamingProject] = useState<Project | null>(null);
  const [newName, setNewName] = useState('');
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, isLocalFallback: fallback } = await projectService.listProjects(user.id, {
      search: searchQuery,
      garmentType: garmentFilter,
      sortBy,
    });
    setProjects(data);
    setIsLocalFallback(!!fallback);
    setIsLoading(false);
  }, [user, searchQuery, garmentFilter, sortBy]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenProject = (project: Project) => {
    // Restore all surfaces from project design_data
    const design = project.design_data;
    const restoredSurfaces: Record<string, SurfaceDesign> = {};

    for (const [key, val] of Object.entries(design.surfaces || {})) {
      restoredSurfaces[key] = {
        color: val.color || design.baseColor,
        elements: val.elements || [],
        canvasJson: val.canvasJson || null,
        textureDataUrl: val.textureDataUrl || null,
      };
    }

    loadProjectData(
      project.garment_type,
      design.baseColor,
      restoredSurfaces,
      project.id,
      project.name
    );

    if (project.garment_type === 'jersey') {
      navigate('/designer/jersey');
    } else {
      navigate('/designer/tshirt');
    }
  };

  const handleDuplicate = async (project: Project) => {
    setActiveMenuId(null);
    const { data } = await projectService.duplicateProject(project.id);
    if (data) {
      fetchProjects();
    }
  };

  const handleSaveRename = async () => {
    if (!renamingProject || !newName.trim()) return;
    await projectService.updateProject(renamingProject.id, { name: newName.trim() });
    setRenamingProject(null);
    fetchProjects();
  };

  const handleConfirmDelete = async () => {
    if (!deletingProject) return;
    await projectService.deleteProject(deletingProject.id);
    setDeletingProject(null);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-slate-950 text-neutral-900 dark:text-white flex flex-col transition-colors duration-200">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Projects</h1>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Manage, customize, and reopen your saved 3D clothing designs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                startNewProject('tshirt');
                navigate('/designer/tshirt');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-neutral-100 dark:hover:bg-slate-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-slate-700 shadow-2xs transition-colors"
            >
              <Shirt className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+ New T-Shirt</span>
            </button>
            <button
              type="button"
              onClick={() => {
                startNewProject('jersey');
                navigate('/designer/jersey');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>+ New Jersey</span>
            </button>
          </div>
        </div>

        {/* Guest View: User Not Signed In */}
        {!user && !isLoadingAuth ? (
          <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-neutral-200 dark:border-slate-800 max-w-xl mx-auto my-8 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-200/60 dark:border-blue-900/50">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold mb-2">Sign In to Save & Access Projects</h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
              Create an account or sign in to persist your clothing projects across sessions, manage artwork assets, and load designs directly into the 3D studio.
            </p>
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <span>Sign In / Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {isLocalFallback && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-200 shadow-2xs">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Mode Penyimpanan Lokal Aktif</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 leading-relaxed">
                    Tabel Supabase <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/60 rounded font-mono text-[11px]">public.projects</code> belum dibuat pada remote database. Desain Anda tetap tersimpan aman di browser ini, dan akan otomatis disinkronkan ke Supabase setelah SQL migration dijalankan di SQL Editor dashboard Supabase.
                  </p>
                </div>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-neutral-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by name..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="inline-flex bg-neutral-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium border border-neutral-200/70 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setGarmentFilter('all')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      garmentFilter === 'all'
                        ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setGarmentFilter('tshirt')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      garmentFilter === 'tshirt'
                        ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    T-Shirt
                  </button>
                  <button
                    type="button"
                    onClick={() => setGarmentFilter('jersey')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      garmentFilter === 'jersey'
                        ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs text-blue-600 dark:text-blue-400'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Jersey
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest' | 'name')}
                  className="px-3 py-1.5 bg-neutral-100 dark:bg-slate-800 rounded-xl border border-neutral-200/70 dark:border-slate-700 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-hidden"
                >
                  <option value="latest">Latest Modified</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div className="py-20 text-center text-neutral-400">
                <div className="w-8 h-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
                <span className="text-xs">Loading projects...</span>
              </div>
            ) : projects.length === 0 ? (
              /* Empty State */
              <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-neutral-200 dark:border-slate-800 p-8 shadow-xs">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 dark:bg-slate-800 text-neutral-500 flex items-center justify-center mb-3">
                  <FolderPlus className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold mb-1">No Projects Found</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-6">
                  {searchQuery || garmentFilter !== 'all'
                    ? 'No projects match your current filters. Try adjusting your search query.'
                    : 'You haven’t saved any custom clothing designs yet. Start personalizing a garment now!'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    to="/designer/tshirt"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    <span>Design T-Shirt</span>
                  </Link>
                  <Link
                    to="/designer/jersey"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    <span>Design Jersey</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => {
                  const isMenuOpen = activeMenuId === project.id;
                  const formattedDate = new Date(project.updated_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <div
                      key={project.id}
                      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-500/50 transition-all flex flex-col justify-between"
                    >
                      {/* Top Thumbnail Section */}
                      <div
                        onClick={() => handleOpenProject(project)}
                        className="relative aspect-[4/3] bg-neutral-100 dark:bg-slate-800/80 cursor-pointer overflow-hidden flex items-center justify-center"
                      >
                        {project.thumbnail_url ? (
                          <img
                            src={project.thumbnail_url}
                            alt={project.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-neutral-400">
                            {project.garment_type === 'jersey' ? (
                              <Layers className="w-12 h-12" />
                            ) : (
                              <Shirt className="w-12 h-12" />
                            )}
                            <span className="text-[11px] font-medium capitalize">
                              {project.garment_type} Design
                            </span>
                          </div>
                        )}

                        {/* Garment Type Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-2xs ${
                              project.garment_type === 'jersey'
                                ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60'
                                : 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60'
                            }`}
                          >
                            {project.garment_type === 'jersey' ? 'V-Neck Jersey' : 'T-Shirt'}
                          </span>
                        </div>

                        {/* Fabric Color Indicator */}
                        <div
                          className="absolute top-3 right-3 w-6 h-6 rounded-full border border-white dark:border-slate-800 shadow-xs"
                          style={{ backgroundColor: project.design_data?.baseColor || '#FFFFFF' }}
                          title={`Fabric color: ${project.design_data?.baseColor || '#FFFFFF'}`}
                        />
                      </div>

                      {/* Card Bottom Body */}
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div
                          onClick={() => handleOpenProject(project)}
                          className="min-w-0 flex-1 cursor-pointer"
                        >
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-neutral-400">
                            <Clock className="w-3 h-3" />
                            <span>{formattedDate}</span>
                          </div>
                        </div>

                        {/* Dropdown Menu Button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(isMenuOpen ? null : project.id);
                            }}
                            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {isMenuOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 bottom-full mb-1.5 w-40 bg-white dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700 shadow-xl py-1 z-30 text-xs animate-scale-up"
                            >
                              <button
                                type="button"
                                onClick={() => handleOpenProject(project)}
                                className="w-full px-3 py-2 text-left flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-700"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                                <span>Open in Editor</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  setRenamingProject(project);
                                  setNewName(project.name);
                                }}
                                className="w-full px-3 py-2 text-left flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-700"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Rename</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDuplicate(project)}
                                className="w-full px-3 py-2 text-left flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-700"
                              >
                                <Copy className="w-3.5 h-3.5" />
                                <span>Duplicate</span>
                              </button>
                              <div className="my-1 border-t border-neutral-100 dark:border-slate-700" />
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  setDeletingProject(project);
                                }}
                                className="w-full px-3 py-2 text-left flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Rename Modal */}
        {renamingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200 dark:border-slate-800 p-6 shadow-2xl">
              <h3 className="text-sm font-bold mb-3">Rename Project</h3>
              <input
                type="text"
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRename();
                  if (e.key === 'Escape') setRenamingProject(null);
                }}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-slate-800 rounded-xl border border-neutral-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-600 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRenamingProject(null)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-slate-700 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveRename}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200 dark:border-slate-800 p-6 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold mb-1">Delete Project?</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5 leading-relaxed">
                Are you sure you want to delete <strong>"{deletingProject.name}"</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeletingProject(null)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-slate-700 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
