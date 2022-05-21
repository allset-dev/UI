import { useEffect } from 'react';
import { useRefState } from 'utils';

export default function HomePage() {
  const [mouseDownCounter, setMouseDownCounter, getMouseDownCounter] = useRefState(0);

  useEffect(() => {
    window.addEventListener('mousedown', () => {
      setMouseDownCounter(getMouseDownCounter() + 1);
    });
  }, []);

  return <div>{mouseDownCounter}</div>;
}
