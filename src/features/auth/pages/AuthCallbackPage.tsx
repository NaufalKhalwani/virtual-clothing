import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { authService } from '@/services/supabase/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initAuth = useAuthStore((state) => state.initAuth);

  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Verifying your credentials...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      // 1. Check for errors in query params
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (errorParam || errorDescription) {
        setStatus('error');
        setErrorMessage(errorDescription || errorParam || 'Authentication verification failed.');
        return;
      }

      // 2. Check for type recovery in query or hash
      const typeParam = searchParams.get('type');
      const hash = window.location.hash;
      const isRecovery = typeParam === 'recovery' || hash.includes('type=recovery');

      // 3. Process PKCE exchange code if present
      const code = searchParams.get('code');
      if (code) {
        setMessage('Exchanging verification code with Supabase...');
        const res = await authService.exchangeCodeForSession(code);
        if (res.error) {
          setStatus('error');
          setErrorMessage(res.error);
          return;
        }
      }

      // 4. Synchronize application state
      await initAuth();

      // If this was a password recovery callback, redirect to reset password page
      if (isRecovery) {
        navigate('/reset-password', { replace: true });
        return;
      }

      // Successful verification
      setStatus('success');
      setMessage('Your email has been verified successfully!');

      // Redirect to projects after 1.5 seconds
      const timeout = setTimeout(() => {
        navigate('/projects', { replace: true });
      }, 1500);

      return () => clearTimeout(timeout);
    };

    processCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-slate-950">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-neutral-200/80 dark:border-slate-800 shadow-xl text-center transition-all">
        {status === 'processing' && (
          <div className="flex flex-col items-center gap-4 py-6">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Verifying Authentication
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{message}</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4 py-6 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Email Verified!
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{message}</p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors mt-2"
            >
              <span>Continue to My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4 py-6 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Verification Failed
              </h3>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 max-w-sm">
                {errorMessage || 'The verification link may be invalid or has already expired.'}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Link
                to="/verify-email"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                Resend Link
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-700 dark:text-neutral-300 font-semibold text-xs rounded-xl border border-neutral-200 dark:border-slate-700 transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
