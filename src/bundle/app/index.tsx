import HomePage from 'bundle/home-page';
import { useSetAppPreference } from 'utils';

import './index.scss';

export function App() {
  useSetAppPreference();

  return <HomePage />;
}
