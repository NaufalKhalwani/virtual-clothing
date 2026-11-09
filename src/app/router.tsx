import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { DesignerSelectionPage } from '@/features/designer/pages/DesignerSelectionPage';
import { TShirtEditorPage } from '@/features/tshirt-editor/pages/TShirtEditorPage';
import { JerseyEditorPage } from '@/features/jersey-editor/pages/JerseyEditorPage';
import { ProjectsPage } from '@/features/projects/pages/ProjectsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
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
