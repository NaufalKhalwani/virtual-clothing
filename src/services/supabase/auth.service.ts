import { supabase, isSupabaseConfigured } from './supabase.client';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

// Local storage fallback for development / guest sandbox if Supabase is not configured
const LOCAL_USER_KEY = 'vcd_sandbox_user';

export interface AuthResponse<T = unknown> {
  data: T | null;
  error: string | null;
}

export const authService = {
  async signUp(email: string, password: string, displayName?: string): Promise<AuthResponse<{ user: User | null; session: Session | null }>> {
    if (!isSupabaseConfigured) {
      // Local development mock user
      const mockUser = {
        id: `local_user_${Date.now()}`,
        email,
        user_metadata: { display_name: displayName || email.split('@')[0] },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;

      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
      return { data: { user: mockUser, session: null }, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0],
          },
        },
      });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Sign up failed' };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse<{ user: User | null; session: Session | null }>> {
    if (!isSupabaseConfigured) {
      // Local development mock user
      const mockUser = {
        id: `local_user_${Date.now()}`,
        email,
        user_metadata: { display_name: email.split('@')[0] },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;

      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
      return { data: { user: mockUser, session: null }, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Sign in failed' };
    }
  },

  async signOut(): Promise<AuthResponse<void>> {
    localStorage.removeItem(LOCAL_USER_KEY);
    if (!isSupabaseConfigured) {
      return { data: undefined, error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { data: null, error: error.message };
      }
      return { data: undefined, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Sign out failed' };
    }
  },

  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) {
      return null;
    }
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!isSupabaseConfigured) {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    return supabase.auth.onAuthStateChange(callback);
  },
};
