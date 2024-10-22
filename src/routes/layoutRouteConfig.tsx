import { AuthRedirectWrapper } from '@/components/AuthRedirectWrapper';
import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router';
const Login = lazy(() => import('../pages/Auth/Login'));
const SignUp = lazy(() => import('../pages/Auth/SignUp'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const Mainlayout = lazy(() => import('@/layouts/MainLayout/Mainlayout'));
const VerifyEmail = lazy(() => import('@/pages/Auth/VerifyEmail'));
const ResetPassword = lazy(() => import('@/pages/Auth/ResetPassword'));
/**
 * Routes that require authorization are protected using the ProtectedRouteWrapper component (default authorization is user authentication).
 * Authenticated users are redirected to the home page using the AuthRedirectWrapper component.
 *
 * @returns An array of RouteObject defining the routes of the application.
 */
export const getRouteConfig = (): RouteObject[] => {
  return [
    {
      path: '/login',
      element: (
        <AuthRedirectWrapper>
          <Login />
        </AuthRedirectWrapper>
      ),
    },
    {
      path: '/sign-up',
      element: (
        <AuthRedirectWrapper>
          <SignUp />
        </AuthRedirectWrapper>
      ),
    },
    {
      path: '/forgot-password',
      element: (
        <AuthRedirectWrapper>
          <ForgotPassword />
        </AuthRedirectWrapper>
      ),
    },
    {
      path: '/verify-email',
      element: (
        <AuthRedirectWrapper>
          <VerifyEmail />
        </AuthRedirectWrapper>
      ),
    },
    {
      path: '/reset-password',
      element: (
        <AuthRedirectWrapper>
          <ResetPassword />
        </AuthRedirectWrapper>
      ),
    },
    {
      path: '/',
      element: <Navigate to={'/home'} replace />,
    },
    {
      path: '/*',
      element: (
        <ProtectedRouteWrapper>
          <Mainlayout />
        </ProtectedRouteWrapper>
      ),
    },
  ];
};
