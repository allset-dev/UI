import { useEffect, useState } from 'react';

import './index.scss';

export function WebView() {
  const [src] = useState('https://player.vimeo.com/video/804796236');

  useEffect(() => {
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return 'Did you save your stuff?';
    };

    setInterval(() => {
      caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));
    }, 1000);
  }, []);

  return (
    <div className="as-web-view">
      <iframe
        height="100%"
        id="iframe"
        src={src}
        style={{ border: 0 }}
        width="100%"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  );
}
