import { useEffect } from 'react';

import './index.scss';

export function WebView() {
  useEffect(() => {
    window.addEventListener('beforeunload', function (event) {
      event.preventDefault();
      event.returnValue = '';
    });
  }, []);

  return (
    <div className="as-web-view">
      <iframe
        allowFullScreen
        frameBorder={0}
        height="100%"
        id="iframe"
        src={`https://tamilhdbox.com/cook-with-comali-season-3-17-04-2022/`}
        width="100%"
      />
    </div>
  );
}
