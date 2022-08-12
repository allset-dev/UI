import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from 'store';

import { App as ASApp } from 'bundle/app';

import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ASApp />
    </BrowserRouter>
  </Provider>
);
