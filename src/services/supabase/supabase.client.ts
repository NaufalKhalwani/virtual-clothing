import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Checks if Supabase credentials are properly configured with real values
 * (and not just default placeholder strings).
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-supabase-project') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
);

// Fallback dummy URL and key for development/preview when .env has not been customized yet
const effectiveUrl = isSupabaseConfigured
  ? (supabaseUrl as string)
  : 'https://placeholder-vcd.supabase.co';

const effectiveKey = isSupabaseConfigured
  ? (supabaseAnonKey as string)
  : 'placeholder-anon-key';

export const supabase: SupabaseClient = createClient(effectiveUrl, effectiveKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'vcd_supabase_auth_token',
  },
});
