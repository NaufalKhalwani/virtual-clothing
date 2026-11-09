import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryEmail = searchParams.get('email') || '';

  const user = useAuthStore((state) => state.user);
  const resendVerification = useAuthStore((state) => state.resendVerification);
  const initAuth = useAuthStore((state) => state.initAuth);

  const targetEmail = queryEmail || user?.email || 'your email';

  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setResendSuccess(false);
    setResendError(null);

    const res = await resendVerification(targetEmail);
    setIsResending(false);

    if (res.success) {
      setResendSuccess(true);
      setCooldown(60); // 60s cooldown
    } else {
      setResendError(res.error || 'Failed to resend confirmation email.');
    }
  };

  const handleCheckStatus = async () => {
    setIsChecking(true);
    await initAuth();
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between max-w-7xl mx-auto px-4">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-900 py-10 px-6 sm:px-10 rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-xl text-center transition-all">
          <div className="w-14 h-14 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Check your inbox
          </h2>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We sent a verification link to:
          </p>
          <p className="font-semibold text-xs text-neutral-900 dark:text-white mt-0.5 break-all">
            {targetEmail}
          </p>
          <p className="mt-3 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Click the link inside the email to confirm your account and unlock project cloud
            persistence and 3D export.
          </p>

          {/* Feedback Banners */}
          {resendSuccess && (
            <div className="mt-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Verification email resent! Please check your inbox and spam folder.</span>
            </div>
          )}

          {resendError && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300 flex items-center justify-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{resendError}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || isResending}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending email...</span>
                </>
              ) : cooldown > 0 ? (
                <span>Resend available in {cooldown}s</span>
              ) : (
                <span>Resend Verification Email</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleCheckStatus}
              disabled={isChecking}
              className="w-full py-2.5 px-4 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-700 dark:text-neutral-300 font-semibold text-xs rounded-xl border border-neutral-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking status...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>I have confirmed my email</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-slate-800 text-center">
            <Link
              to="/login"
              className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
