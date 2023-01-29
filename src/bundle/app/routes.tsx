import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import HomePage from 'bundle/home-page';

export interface RouteProps {
  path: string;
  component: () => ReactNode;
}

export const StandaloneRoutes: RouteProps[] = [];

export const AppLoggedoutRoutes: RouteProps[] = [
  {
    path: '/login',
    component: () => <HomePage />,
  },
  {
    path: '*',
    component: () => {
      return <Navigate to="/login" />;
    },
  },
];

export const AppLoggedInRoutes: RouteProps[] = [
  {
    path: '/dashboard',
    component: () => {
      return <div>Dashboard</div>;
    },
  },
  {
    path: '*',
    component: () => {
      return <Navigate to="/dashboard" />;
    },
  },
];
