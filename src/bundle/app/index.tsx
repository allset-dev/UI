import { Navigate, Route, Routes } from 'react-router-dom';

import { useSetAppPreference } from 'utils';

import { GlobalModals } from 'bundle/global-modals';

import { AppLoggedInRoutes, AppLoggedoutRoutes } from './routes';

const isLoggedIn = false;

export function App() {
  useSetAppPreference();

  const routes = isLoggedIn ? AppLoggedInRoutes : AppLoggedoutRoutes;

  return (
    <>
      <GlobalModals />
      <Routes>
        {routes.map((route, routeIndex) => {
          const { path, component } = route;

          return <Route key={routeIndex} path={path} element={component()} />;
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
