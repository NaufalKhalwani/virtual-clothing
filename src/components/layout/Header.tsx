import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shirt,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Save,
  FolderKanban,
  LogOut,
  LogIn,
  Download,
  FolderPlus,
} from 'lucide-react';
import { useDesignerStore } from '@/stores/designer.store';
import { useAuthStore } from '@/stores/auth.store';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { SaveProjectModal } from '@/features/projects/components/SaveProjectModal';
import { ExportModal } from '@/features/export/components/ExportModal';

export const Header: React.FC = () => {
  const location = useLocation();
  const isDesigner = location.pathname.startsWith('/designer/');
  const garmentType = useDesignerStore((state) => state.garmentType);
  const resetAll = useDesignerStore((state) => state.resetAll);
  const startNewProject = useDesignerStore((state) => state.startNewProject);
  const currentProjectName = useDesignerStore((state) => state.currentProjectName);
  const isDirty = useDesignerStore((state) => state.isDirty);
  const isSaving = useDesignerStore((state) => state.isSaving);

  const user = useAuthStore((state) => state.user);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const signOut = useAuthStore((state) => state.signOut);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Warn on browser tab close/reload if there are unsaved modifications
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const displayName =
    (user?.user_metadata as { display_name?: string } | undefined)?.display_name ||
    user?.email?.split('@')[0] ||
    'Designer';

  return (
    <>
      <header className="h-16 px-3 sm:px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-neutral-200/80 dark:border-slate-800 flex items-center justify-between sticky top-0 z-40 select-none transition-colors duration-200">
        {/* Brand & Navigation */}
        <div className="flex items-center gap-3">
          {isDesigner && (
            <Link
              to="/designer"
              className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Back to Garment Selection"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-white">
                  Virtual Clothing
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800 uppercase">
                  3D
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Interactive 3D Garment Customizer
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-neutral-200 dark:border-slate-800">
            <Link
              to="/projects"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/projects'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-slate-800'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              My Projects
            </Link>
          </nav>
        </div>

        {/* Middle Context (when in editor) */}
        {isDesigner && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-slate-800 rounded-full border border-neutral-200 dark:border-slate-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 max-w-xs truncate">
            <span className="capitalize text-neutral-500 dark:text-neutral-400">{garmentType}:</span>
            <span className="font-semibold text-neutral-900 dark:text-white truncate">{currentProjectName}</span>
            {isDirty && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Unsaved modifications" />
            )}
          </div>
        )}

        {/* Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick link to Projects if on mobile or small screen */}
          <Link
            to="/projects"
            className="lg:hidden p-1.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="My Projects"
          >
            <FolderKanban className="w-4 h-4" />
          </Link>

          {isDesigner ? (
            <>
              {/* Save Project Button */}
              <button
                type="button"
                onClick={() => setIsSaveModalOpen(true)}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
                title="Save design to cloud database"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
                {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
              </button>

              {/* Start New Project Button */}
              <button
                type="button"
                onClick={() => {
                  if (isDirty && !window.confirm('Start a new design? Any unsaved modifications on the current canvas will be cleared.')) {
                    return;
                  }
                  startNewProject();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-neutral-200 dark:border-slate-700"
                title="Start a new blank project"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>

              {/* Export Assets Button */}
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 border border-neutral-300/80 dark:border-slate-700 rounded-lg shadow-xs transition-colors"
                title="Export 2D artwork, 3D mockups, or baked UV textures"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              <button
                type="button"
                onClick={resetAll}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-neutral-200 dark:border-slate-700"
                title="Reset all design modifications"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>

              <Link
                to="/designer/jersey"
                className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                  garmentType === 'jersey'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-slate-800'
                }`}
              >
                Jersey
              </Link>

              <Link
                to="/designer/tshirt"
                className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                  garmentType === 'tshirt'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-slate-800'
                }`}
              >
                T-Shirt
              </Link>
            </>
          ) : (
            <Link
              to="/designer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio</span>
            </Link>
          )}

          {/* User Auth Profile / Sign In */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-800 border border-neutral-200/80 dark:border-slate-700 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate">{displayName}</span>
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-neutral-100 dark:border-slate-700">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/projects"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <FolderKanban className="w-3.5 h-3.5 text-neutral-500" />
                    My Projects
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-800 border border-neutral-200/80 dark:border-slate-700 rounded-lg transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Global Dark/Light Mode Toggle */}
          <ThemeToggle />
        </div>
      </header>

      {/* Global Modals */}
      <AuthModal />
      <SaveProjectModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} />
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </>
  );
};
