import { ReactNode } from 'react';

import HomePage from 'bundle/home-page';

interface Routes {
  path: string;
  component: () => ReactNode;
}

export const AppLoggedoutRoutes: Routes[] = [
  {
    path: '/',
    component: () => <HomePage />,
  },
];

export const AppLoggedInRoutes: Routes[] = [
  {
    path: '/',
    component: () => {
      return <div>Dashboard</div>;
    },
  },
];
