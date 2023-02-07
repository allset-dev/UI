import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import Chess from 'bundle/chess';
import HomePage from 'bundle/home-page';
import GoogleInterview from 'bundle/interview-questions/Google';
import Login from 'bundle/login';

export interface RouteProps {
  path: string;
  component: () => ReactNode;
}

export const StandaloneRoutes: RouteProps[] = [
  {
    path: '/chess',
    component: Chess,
  },
  {
    path: '/interview-questions',
    component: GoogleInterview,
  },
];

export const AppLoggedoutRoutes: RouteProps[] = [
  {
    path: '/home-page',
    component: () => <HomePage />,
  },
  {
    path: '/login',
    component: () => <Login />,
  },
  {
    path: '*',
    component: () => {
      return <Navigate replace to="/home-page" />;
    },
  },
];

export const AppLoggedInRoutes: RouteProps[] = [
  {
    path: '/dashboard',
    component: () => {
      return <div />;
    },
  },
  {
    path: '*',
    component: () => {
      return <Navigate replace to="/dashboard" />;
    },
  },
];
