import { useEffect } from 'react';

import './index.scss';

export function WebView() {
  useEffect(() => {
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return 'Did you save your stuff?';
    };

    setInterval(() => {
      caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));
      localStorage.clear();
      sessionStorage.clear();
    }, 1000);
  }, []);

  return (
    <div className="as-web-view">
      <iframe
        allowFullScreen
        frameBorder={0}
        height="100%"
        id="iframe"
        src="https://www.2embed.to/embed/imdb/tv?id=tt6226232&s=5&e=1"
        width="100%"
      />
    </div>
  );
}
