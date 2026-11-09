import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { DesignerSelectionPage } from '@/features/designer/pages/DesignerSelectionPage';
import { TShirtEditorPage } from '@/features/tshirt-editor/pages/TShirtEditorPage';
import { JerseyEditorPage } from '@/features/jersey-editor/pages/JerseyEditorPage';
import { ProjectsPage } from '@/features/projects/pages/ProjectsPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { VerifyEmailPage } from '@/features/auth/pages/VerifyEmailPage';
import { AuthCallbackPage } from '@/features/auth/pages/AuthCallbackPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { GuestRoute } from '@/features/auth/components/GuestRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/forgot-password',
    element: (
      <GuestRoute>
        <ForgotPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/projects',
    element: (
      <ProtectedRoute>
        <ProjectsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/designer',
    element: <DesignerSelectionPage />,
  },
  {
    path: '/designer/tshirt',
    element: <TShirtEditorPage />,
  },
  {
    path: '/designer/jersey',
    element: <JerseyEditorPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
