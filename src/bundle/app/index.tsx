import { Route, Routes } from 'react-router-dom';

import { useSetAppPreference } from 'utils';

import { GlobalModals } from 'bundle/global-modals';

import './index.scss';

import { AppLogoutRoutes } from './routes';

export function App() {
  useSetAppPreference();

  return (
    <>
      <GlobalModals />
      <Routes>
        {AppLogoutRoutes.map((route, routeIndex) => {
          const { path, Component } = route;

          return <Route key={routeIndex} path={path} element={<Component />} />;
        })}
      </Routes>
    </>
  );
}
