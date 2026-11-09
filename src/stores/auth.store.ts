import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { authService } from '@/services/supabase/auth.service';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';

  // Actions
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  initAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, displayName?: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isAuthModalOpen: false,
  authModalMode: 'signin',

  openAuthModal: (mode = 'signin') => set({ isAuthModalOpen: true, authModalMode: mode, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),
  clearError: () => set({ error: null }),

  initAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await authService.getCurrentUser();
      const session = await authService.getSession();
      set({ user, session, isLoading: false });

      // Listen to auth changes
      authService.onAuthStateChange((_event, newSession) => {
        set({
          session: newSession,
          user: newSession?.user || null,
        });
      });
    } catch (err: unknown) {
      set({ isLoading: false, error: err instanceof Error ? err.message : 'Auth initialization failed' });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authService.signIn(email, password);
    if (error) {
      set({ isLoading: false, error });
      return false;
    }
    set({
      user: data?.user || null,
      session: data?.session || null,
      isLoading: false,
      isAuthModalOpen: false,
      error: null,
    });
    return true;
  },

  signUp: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authService.signUp(email, password, displayName);
    if (error) {
      set({ isLoading: false, error });
      return false;
    }
    set({
      user: data?.user || null,
      session: data?.session || null,
      isLoading: false,
      isAuthModalOpen: false,
      error: null,
    });
    return true;
  },

  signOut: async () => {
    set({ isLoading: true });
    await authService.signOut();
    set({ user: null, session: null, isLoading: false, error: null });
  },
}));
