export * from './jsx';

// /**
//  * Async functions that will rendered only when the provided ref element is still in DOM. i.e only if the provided ref element is not unmounted.
//  * These functions are to restrict un-wanted triggering of functions after unmounting an element.
//  * @param {React.MutableRefObject<any>} param
//  * @returns {{
//  *    isSubscribed: () => boolean,
//  *    asyncSetTimeout: (callback: () => void, ms?: number) => void,
//  * }}
//  */
// export function useAsyncFunctions({ ref }) {
//   function isSubscribed() {
//     return Boolean(get(ref, ['current']));
//   }

//   function asyncSetTimeoutCallback(callback, delay) {
//     if (isSubscribed()) {
//       setTimeout(() => {
//         if (isSubscribed()) {
//           callback();
//         }
//       }, delay);
//     }
//   }

//   return {
//     isSubscribed,
//     asyncSetTimeout: useCallback(asyncSetTimeoutCallback, []),
//   };
// }
