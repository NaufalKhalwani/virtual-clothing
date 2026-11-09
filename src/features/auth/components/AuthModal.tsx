import React, { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { isSupabaseConfigured } from '@/services/supabase/supabase.client';
import { X, Lock, Mail, User, AlertCircle, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const isAuthModalOpen = useAuthStore((state) => state.isAuthModalOpen);
  const authModalMode = useAuthStore((state) => state.authModalMode);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (authModalMode === 'signup') {
      await signUp(email, password, displayName);
    } else {
      await signIn(email, password);
    }
  };

  const switchMode = (mode: 'signin' | 'signup') => {
    clearError();
    openAuthModal(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-neutral-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-neutral-900 dark:text-white transition-all select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {authModalMode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {authModalMode === 'signin'
              ? 'Sign in to access and manage your custom clothing projects'
              : 'Sign up to save, customize, and persist your 3D apparel designs'}
          </p>
        </div>

        {/* Local mode indicator (if real Supabase env is not configured yet) */}
        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Local Sandbox Mode:</strong> Supabase environment variables can be configured via <code className="font-mono text-[10px] bg-blue-100 dark:bg-blue-900/60 px-1 py-0.5 rounded">.env</code>. You can sign in with any email to test full persistence!
            </span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Display Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 dark:border-slate-700 bg-neutral-50 dark:bg-slate-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="designer@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 dark:border-slate-700 bg-neutral-50 dark:bg-slate-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-neutral-300 dark:border-slate-700 bg-neutral-50 dark:bg-slate-800 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : authModalMode === 'signin' ? (
              <span>Sign In</span>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-neutral-200/80 dark:border-slate-800 text-center text-xs text-neutral-500 dark:text-neutral-400">
          {authModalMode === 'signin' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Security badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500">
          <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          <span>Protected by Supabase Auth with Row Level Security (RLS)</span>
        </div>
      </div>
    </div>
  );
};
