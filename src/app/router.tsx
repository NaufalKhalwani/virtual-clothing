import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { PageLoadingFallback } from '@/components/common/PageLoadingFallback';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { GuestRoute } from '@/features/auth/components/GuestRoute';

// Lazy-loaded routes for optimal initial bundle size and on-demand resource streaming
const DesignerSelectionPage = lazy(() =>
  import('@/features/designer/pages/DesignerSelectionPage').then((m) => ({ default: m.DesignerSelectionPage }))
);
const TShirtEditorPage = lazy(() =>
  import('@/features/tshirt-editor/pages/TShirtEditorPage').then((m) => ({ default: m.TShirtEditorPage }))
);
const JerseyEditorPage = lazy(() =>
  import('@/features/jersey-editor/pages/JerseyEditorPage').then((m) => ({ default: m.JerseyEditorPage }))
);
const ProjectsPage = lazy(() =>
  import('@/features/projects/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('@/features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const VerifyEmailPage = lazy(() =>
  import('@/features/auth/pages/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage }))
);
const AuthCallbackPage = lazy(() =>
  import('@/features/auth/pages/AuthCallbackPage').then((m) => ({ default: m.AuthCallbackPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('@/features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);

const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<PageLoadingFallback />}>{component}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        {withSuspense(<LoginPage />)}
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        {withSuspense(<RegisterPage />)}
      </GuestRoute>
    ),
  },
  {
    path: '/verify-email',
    element: withSuspense(<VerifyEmailPage />),
  },
  {
    path: '/auth/callback',
    element: withSuspense(<AuthCallbackPage />),
  },
  {
    path: '/forgot-password',
    element: (
      <GuestRoute>
        {withSuspense(<ForgotPasswordPage />)}
      </GuestRoute>
    ),
  },
  {
    path: '/reset-password',
    element: withSuspense(<ResetPasswordPage />),
  },
  {
    path: '/projects',
    element: (
      <ProtectedRoute>
        {withSuspense(<ProjectsPage />)}
      </ProtectedRoute>
    ),
  },
  {
    path: '/designer',
    element: withSuspense(<DesignerSelectionPage />),
  },
  {
    path: '/designer/tshirt',
    element: withSuspense(<TShirtEditorPage />),
  },
  {
    path: '/designer/jersey',
    element: withSuspense(<JerseyEditorPage />),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
