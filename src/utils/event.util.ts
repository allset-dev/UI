export const eventUtil = {
  createEvent(eventKey: string) {
    return {
      dispatch() {
        document.dispatchEvent(new Event(eventKey));
      },
      listen(listernerFn: () => void) {
        const listernerFunction = () => {
          listernerFn();
        };

        document.addEventListener(eventKey, listernerFunction);

        return () => {
          document.removeEventListener(eventKey, listernerFunction);
        };
      },
    };
  },
};
