import { Navigate } from 'react-router-dom';

import { ASRoutes } from 'components';
import { useSetAppPreference } from 'utils';

import Chess from 'bundle/chess';
import { ControlWebView } from 'bundle/control-web-view';
import { GlobalModals } from 'bundle/global-modals';
import HomePage from 'bundle/home-page';
import InterviewQuestions from 'bundle/interview-questions';
import Login from 'bundle/login';
import { WebView } from 'bundle/web-view';

const isLoggedIn = false;

export function App() {
  useSetAppPreference();

  return (
    <>
      <GlobalModals />
      <ASRoutes
        routes={[
          {
            path: '/chess',
            component: <Chess />,
          },
          {
            path: '/interview-questions',
            component: <InterviewQuestions />,
          },
          {
            path: '/w',
            component: <WebView />,
          },
          { path: '/control', component: <ControlWebView /> },
        ]}
        defaultRouteComponent={<AppRoutes />}
      />
    </>
  );
}

function AppRoutes() {
  if (isLoggedIn) {
    return <LoggedInRoutes />;
  } else {
    return <LoggedOutRoutes />;
  }
}

function LoggedInRoutes() {
  return (
    <ASRoutes
      routes={[
        {
          path: '/dashboard',
          component: <div />,
        },
      ]}
      defaultRouteComponent={<Navigate replace to="/dashboard" />}
    />
  );
}

function LoggedOutRoutes() {
  return (
    <ASRoutes
      routes={[
        {
          path: '/home-page',
          component: <HomePage />,
        },
        {
          path: '/login',
          component: <Login />,
        },
      ]}
      defaultRouteComponent={<Navigate replace to="/home-page" />}
    />
  );
}
