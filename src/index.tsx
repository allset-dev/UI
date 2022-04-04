import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';

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
        src="https://www.2embed.ru/embed/tmdb/tv?id=1418&s=11&e=8"
        width="100%"
      />
      {/* <div className="as-app-content" /> */}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
