import { Route, Routes } from 'react-router-dom';

import { useSetAppPreference } from 'utils';

import { GlobalModals } from 'bundle/global-modals';

import { AppLoggedInRoutes, AppLoggedoutRoutes, StandaloneRoutes } from './routes';

const isLoggedIn = false;

export function App() {
  useSetAppPreference();

  const routes = isLoggedIn ? AppLoggedInRoutes : AppLoggedoutRoutes;

  return (
    <>
      <GlobalModals />
      <Routes>
        {[...StandaloneRoutes, ...routes].map((route, routeIndex) => {
          const { path, component } = route;

          return <Route key={routeIndex} path={path} element={component()} />;
        })}
      </Routes>
    </>
  );
}
