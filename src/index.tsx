import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

const App = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', function (event) {
      event.preventDefault();
      event.returnValue = '';
    });
  }, []);

  return (
    <div className="as-app">
      <iframe
        allowFullScreen
        frameBorder={0}
        height="100%"
        id="iframe"
        src="https://tamilhdbox.com/cook-with-comali-season-3-10-04-2022/"
        width="100%"
      />
      {/* <div className="as-app-content" /> */}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
