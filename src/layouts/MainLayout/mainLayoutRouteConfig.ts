import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));

const mainLayoutRouteConfig = [
  {
    path: '/home',
    component: Home,
  },
];

export default mainLayoutRouteConfig;
