import Login from 'bundle/login';
import { useSetAppPreference } from 'utils';

import './index.scss';

export function App() {
  useSetAppPreference();

  return <Login />;
}
