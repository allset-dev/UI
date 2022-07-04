export function requestFullScreen(element: HTMLElement = document.body) {
  const requestMethod = element.requestFullscreen;

  if (requestMethod) {
    requestMethod.call(element);
  } else {
    // eslint-disable-next-line no-console
    console.error('Oops. Request method failed.');
  }
}

export function exitFullScreen() {
  try {
    document.exitFullscreen();
  } catch {
    //
  }
}

export function convertRgb2Hex(s: string) {
  const rgbArray = s.match(/[0-9]+/g);

  return rgbArray.reduce((a, b) => {
    return a + (Number(b) | 256).toString(16).slice(1);
  }, '#');
}
