import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { isSupabaseConfigured } from '@/services/supabase/supabase.client';
import { BrandLogo } from '@/components/brand/BrandLogo';
import {
  X,
  Lock,
  Mail,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const navigate = useNavigate();
  const isAuthModalOpen = useAuthStore((state) => state.isAuthModalOpen);
  const authModalMode = useAuthStore((state) => state.authModalMode);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const sendPasswordReset = useAuthStore((state) => state.sendPasswordReset);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isUnconfirmed, setIsUnconfirmed] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);
    setIsUnconfirmed(false);

    if (!email.trim()) {
      setLocalError('Please enter an email address.');
      return;
    }

    if (authModalMode === 'forgot') {
      const res = await sendPasswordReset(email.trim());
      if (res.success) {
        setResetSent(true);
      }
      return;
    }

    if (!password) {
      setLocalError('Please enter a password.');
      return;
    }

    if (authModalMode === 'signup') {
      if (password.length < 8) {
        setLocalError('Password must be at least 8 characters long.');
        return;
      }
      const res = await signUp(email.trim(), password, displayName.trim());
      if (res.success) {
        if (res.needsVerification) {
          closeAuthModal();
          navigate(`/verify-email?email=${encodeURIComponent(email.trim())}`);
        }
      }
    } else {
      const res = await signIn(email.trim(), password);
      if (!res.success && res.unverified) {
        setIsUnconfirmed(true);
      }
    }
  };

  const switchMode = (mode: 'signin' | 'signup' | 'forgot') => {
    clearError();
    setLocalError(null);
    setResetSent(false);
    setIsUnconfirmed(false);
    openAuthModal(mode);
  };

  const displayedError = localError || error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
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
          <div className="mb-3 flex justify-center">
            <BrandLogo variant="symbol" size="lg" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {authModalMode === 'signin' && 'Welcome Back'}
            {authModalMode === 'signup' && 'Create an Account'}
            {authModalMode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {authModalMode === 'signin' && 'Sign in to access and manage your custom clothing projects'}
            {authModalMode === 'signup' && 'Sign up to save and persist your 3D apparel designs'}
            {authModalMode === 'forgot' && 'Enter your email to receive a recovery link'}
          </p>
        </div>

        {/* Sandbox Notice if unconfigured */}
        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Local Sandbox Mode:</strong> Configure <code className="font-mono text-[10px] bg-blue-100 dark:bg-blue-900/60 px-1 py-0.5 rounded">.env.local</code> to connect your live Supabase project.
            </span>
          </div>
        )}

        {/* Error Alert */}
        {displayedError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <div className="flex-1 space-y-1">
              <p>{displayedError}</p>
              {isUnconfirmed && (
                <button
                  type="button"
                  onClick={() => {
                    closeAuthModal();
                    navigate(`/verify-email?email=${encodeURIComponent(email)}`);
                  }}
                  className="inline-block font-semibold underline text-rose-800 dark:text-rose-200 hover:text-rose-900"
                >
                  Click here to resend verification link
                </button>
              )}
            </div>
          </div>
        )}

        {/* Forgot Password Success State */}
        {resetSent ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Recovery link sent to <span className="font-semibold text-neutral-900 dark:text-white">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          /* Form */
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

            {authModalMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Password {authModalMode === 'signup' && <span className="font-normal text-neutral-400">(min. 8)</span>}
                  </label>
                  {authModalMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={authModalMode === 'signup' ? 8 : 1}
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
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : authModalMode === 'signin' ? (
                <span>Sign In</span>
              ) : authModalMode === 'signup' ? (
                <span>Create Account</span>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>
        )}

        {/* Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-neutral-200/80 dark:border-slate-800 text-center text-xs text-neutral-500 dark:text-neutral-400">
          {authModalMode === 'signin' && (
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
          )}

          {authModalMode === 'signup' && (
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

          {authModalMode === 'forgot' && (
            <p>
              Remember your password?{' '}
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
