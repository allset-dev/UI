import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

export interface ASTRoutes {
  path: string;
  component: ReactNode;
}

export interface ASRoutesProps {
  routes: ASTRoutes[];
  defaultRouteComponent: ASTRoutes['component'];
}

export function ASRoutes(props: ASRoutesProps) {
  const { routes, defaultRouteComponent } = props;

  return (
    <Routes>
      {routes.map((route, routeIndex) => {
        const { path, component } = route;

        return <Route key={routeIndex} path={path} element={component} />;
      })}
      <Route key={'*'} path={'*'} element={defaultRouteComponent} />
    </Routes>
  );
}
