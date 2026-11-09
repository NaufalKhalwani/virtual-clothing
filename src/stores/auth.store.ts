import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { authService } from '@/services/supabase/auth.service';
import { isSupabaseConfigured } from '@/services/supabase/supabase.client';

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated' | 'unverified';

interface AuthState {
  user: User | null;
  session: Session | null;
  authStatus: AuthStatus;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'forgot';

  // Actions
  openAuthModal: (mode?: 'signin' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  clearError: () => void;
  initAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; unverified?: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; needsVerification?: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  handleAuthCallback: () => Promise<{ success: boolean; type?: string; error?: string }>;
}

let authSubscription: { unsubscribe: () => void } | null = null;

const computeAuthStatus = (user: User | null, isLoading: boolean): AuthStatus => {
  if (isLoading) return 'initializing';
  if (!user) return 'unauthenticated';

  // Check email confirmation status from Supabase user object
  if (isSupabaseConfigured) {
    const isConfirmed = Boolean(user.email_confirmed_at || (user as { confirmed_at?: string }).confirmed_at);
    if (!isConfirmed) {
      return 'unverified';
    }
  }

  return 'authenticated';
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  authStatus: 'initializing',
  isLoading: true,
  error: null,
  isAuthModalOpen: false,
  authModalMode: 'signin',

  openAuthModal: (mode = 'signin') => set({ isAuthModalOpen: true, authModalMode: mode, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),
  clearError: () => set({ error: null }),

  initAuth: async () => {
    try {
      set({ isLoading: true, authStatus: 'initializing' });
      const user = await authService.getCurrentUser();
      const session = await authService.getSession();

      const authStatus = computeAuthStatus(user, false);
      set({ user, session, authStatus, isLoading: false });

      // Clean up previous subscription if already registered
      if (authSubscription) {
        authSubscription.unsubscribe();
        authSubscription = null;
      }

      // Subscribe to real-time auth state changes
      const { data } = authService.onAuthStateChange((_event, newSession) => {
        const currentUser = newSession?.user || null;
        const newStatus = computeAuthStatus(currentUser, false);
        set({
          session: newSession,
          user: currentUser,
          authStatus: newStatus,
          isLoading: false,
        });
      });

      authSubscription = data.subscription;
    } catch (err: unknown) {
      set({
        isLoading: false,
        authStatus: 'unauthenticated',
        error: err instanceof Error ? err.message : 'Auth initialization failed',
      });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authService.signIn(email, password);

    if (error) {
      const isUnconfirmed = error.toLowerCase().includes('email not confirmed');
      set({ isLoading: false, error });
      return { success: false, unverified: isUnconfirmed, error };
    }

    const user = data?.user || null;
    const session = data?.session || null;
    const authStatus = computeAuthStatus(user, false);

    set({
      user,
      session,
      authStatus,
      isLoading: false,
      isAuthModalOpen: false,
      error: null,
    });

    return { success: true };
  },

  signUp: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authService.signUp(email, password, displayName);

    if (error) {
      set({ isLoading: false, error });
      return { success: false, error };
    }

    const user = data?.user || null;
    const session = data?.session || null;
    const needsVerification = data?.needsVerification ?? false;
    const authStatus = computeAuthStatus(user, false);

    set({
      user,
      session,
      authStatus,
      isLoading: false,
      isAuthModalOpen: false,
      error: null,
    });

    return { success: true, needsVerification };
  },

  resendVerification: async (email: string) => {
    set({ isLoading: true, error: null });
    const { error } = await authService.resendVerification(email);
    set({ isLoading: false });

    if (error) {
      set({ error });
      return { success: false, error };
    }

    return { success: true };
  },

  sendPasswordReset: async (email: string) => {
    set({ isLoading: true, error: null });
    const { error } = await authService.resetPasswordForEmail(email);
    set({ isLoading: false });

    if (error) {
      set({ error });
      return { success: false, error };
    }

    return { success: true };
  },

  updatePassword: async (password: string) => {
    set({ isLoading: true, error: null });
    const { error } = await authService.updatePassword(password);
    set({ isLoading: false });

    if (error) {
      set({ error });
      return { success: false, error };
    }

    return { success: true };
  },

  handleAuthCallback: async () => {
    try {
      set({ isLoading: true });
      await get().initAuth();
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Callback failed';
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    await authService.signOut();
    set({
      user: null,
      session: null,
      authStatus: 'unauthenticated',
      isLoading: false,
      error: null,
    });
  },
}));
