/* eslint-disable i18next/no-literal-string */
import { useEffect, useState } from 'react';

export function Controls() {
  const [keyDown, setKeyDown] = useState<any>();

  useEffect(() => {
    window.addEventListener('keyup', (event) => {
      setKeyDown(JSON.stringify(event.code));
    });
  }, []);

  return (
    <div className="App" style={{ fontSize: '100px' }}>
      keydown: {keyDown}
    </div>
  );
}

export enum FIRE_TV_KEYS {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  ENTER = 'Enter',
  CONTEXT_MENU = 'ContextMenu',
  MEDIA_REWIND = 'MediaRewind',
  MEDIA_FORWARD = 'MediaFastForward',
  MEDIA_PLAY_PAUSE = 'MediaPlayPause',
  BACK = 'GoBack',
}
