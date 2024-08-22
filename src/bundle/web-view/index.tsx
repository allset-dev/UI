import { useEffect, useState } from 'react';

import { useTranslation } from 'utils/hooks';

import './index.scss';

export function WebView() {
  const { t } = useTranslation();

  //By IMDB ID => https://www.2embed.cc/embed/tt10676048
  //By IMDB ID => https://www.2embed.cc/embedtv/tt3107288&s=1&e=1

  const [episode, setEpisode] = useState(1);
  const [season] = useState(1);
  const [src] = useState(`https://www.2embed.skin/embedtv/tt4118466&s=${season}&e=${episode}`);

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
      <button
        onClick={() => {
          setEpisode(episode + 1);
        }}
      >
        {t('next')}
      </button>
      <iframe height="100%" id="iframe" src={src} style={{ border: 0 }} width="100%" />
    </div>
  );
}
