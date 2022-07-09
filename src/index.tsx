import { createRoot } from 'react-dom/client';

import { App as ASApp } from './bundle/app';
import './index.scss';

const App = () => {
  return <ASApp />;
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
