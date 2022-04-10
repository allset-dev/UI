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
