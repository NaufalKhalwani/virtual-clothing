import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { Loader2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const GuestRoute: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/projects';
  const user = useAuthStore((state) => state.user);
  const authStatus = useAuthStore((state) => state.authStatus);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading || authStatus === 'initializing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // If user is already authenticated and verified, redirect away from guest pages
  if (user && authStatus === 'authenticated') {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
