import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const UrlPage = lazy(() => import('./pages/UrlPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: ':shortenUrlKey', element: <UrlPage /> },

      { path: 'login', element: <LoginPage /> },

      { path: 'register', element: <RegisterPage /> },

      {
        path: 'analytics/:shortenUrlKey',
        element: <AnalyticsPage />,
      },

      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export default router;