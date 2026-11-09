import { supabase, isSupabaseConfigured } from './supabase.client';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

// Local storage fallback for development / guest sandbox if Supabase is not configured
const LOCAL_USER_KEY = 'vcd_sandbox_user';

export interface AuthResponse<T = unknown> {
  data: T | null;
  error: string | null;
}

export const authService = {
  /**
   * Register a new user with email, password, and display name
   */
  async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthResponse<{ user: User | null; session: Session | null; needsVerification?: boolean }>> {
    if (!isSupabaseConfigured) {
      // Local development mock user
      const mockUser = {
        id: `local_user_${Date.now()}`,
        email,
        user_metadata: { display_name: displayName || email.split('@')[0] },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString(),
      } as unknown as User;

      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
      return { data: { user: mockUser, session: null, needsVerification: false }, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0],
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { data: null, error: error.message };
      }

      // Check if user already exists (Supabase returns empty identities array when user already exists)
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return {
          data: null,
          error: 'An account with this email already exists. Please sign in or reset your password.',
        };
      }

      const needsVerification = !data.session && Boolean(data.user && !data.user.email_confirmed_at);

      return {
        data: {
          user: data.user,
          session: data.session,
          needsVerification,
        },
        error: null,
      };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Sign up failed' };
    }
  },

  /**
   * Sign in user with email and password
   */
  async signIn(
    email: string,
    password: string
  ): Promise<AuthResponse<{ user: User | null; session: Session | null }>> {
    if (!isSupabaseConfigured) {
      // Local development mock user
      const mockUser = {
        id: `local_user_${Date.now()}`,
        email,
        user_metadata: { display_name: email.split('@')[0] },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString(),
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

  /**
   * Resend signup confirmation email
   */
  async resendVerification(email: string): Promise<AuthResponse<void>> {
    if (!isSupabaseConfigured) {
      return { data: undefined, error: null };
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: undefined, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to resend confirmation email' };
    }
  },

  /**
   * Send password reset email
   */
  async resetPasswordForEmail(email: string): Promise<AuthResponse<void>> {
    if (!isSupabaseConfigured) {
      return { data: undefined, error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: undefined, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to send password reset email' };
    }
  },

  /**
   * Update user's password (used in Reset Password flow)
   */
  async updatePassword(password: string): Promise<AuthResponse<void>> {
    if (!isSupabaseConfigured) {
      return { data: undefined, error: null };
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: undefined, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update password' };
    }
  },

  /**
   * Exchange OAuth or verification code for a valid Supabase session
   */
  async exchangeCodeForSession(code: string): Promise<AuthResponse<Session | null>> {
    if (!isSupabaseConfigured) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return { data: null, error: error.message };
      }
      return { data: data.session, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to exchange verification code' };
    }
  },

  /**
   * Sign out current user
   */
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

  /**
   * Get active session
   */
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) {
      return null;
    }
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  /**
   * Listen to authentication state changes with clean unsubscribe
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!isSupabaseConfigured) {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    return supabase.auth.onAuthStateChange(callback);
  },
};
