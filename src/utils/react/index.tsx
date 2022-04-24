import { useState } from 'react';

export function useFallbackState(
  defaultValue?: any,
  parentState?: any,
  setParentState?: React.Dispatch<any>
) {
  const parentStateUndefined = parentState === undefined;

  const [state, setState] = useState(parentStateUndefined ? defaultValue : parentState);

  const localState = parentStateUndefined ? state : parentState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setLocalState(latestState: any) {
    setState(latestState);

    if (typeof setParentState === 'function') {
      setParentState(latestState);
    }
  }

  return [localState, setLocalState];
}

// /**
//  * same as use state, but we get a third param to get current value.
//  * This will be useful while working with settimeout, promises and axios api calls.
//  * @template T
//  * @param {T} defaultValue - Default value for fallback useState.
//  * @return {[T, (updatedValue: T) => void, () => T]} setParentState - Handler to set parent state.
//  */
// export function useRefState(defaultValue) {
//   const ref = useRef(defaultValue);
//   const [useStateValue, setUseStateValue] = useState(defaultValue);

//   function setValue(updatedValue) {
//     ref.current = updatedValue;
//     setUseStateValue(updatedValue);
//   }

//   function getValue() {
//     return ref.current;
//   }

//   return [useStateValue, setValue, getValue];
// }

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
