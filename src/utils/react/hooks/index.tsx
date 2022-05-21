import { useRef, useEffect, useMemo, useState } from 'react';
import { AxiosPromise, AxiosResponse } from 'axios';

import { isEqual } from 'utils';

export function useComponentWillMount(willMountCallback: () => () => void) {
  // NOTE:(REACT) using useRef because useState will re-render the component.
  const ref: { current: boolean | (() => void) } = useRef(false);

  if (!ref.current) {
    ref.current = willMountCallback() || true;
  }

  useEffect(() => {
    if (typeof ref.current === 'function') {
      return ref.current;
    }
  }, []);

  return ref;
}

function useDeepCompareMemoize(value: any) {
  const ref: { current: any } = useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

/**
 * Same as useEffect but deep compares dependencies
 */
export function useDeepCompareEffect(callback: () => void, dependencies: any[]) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

/**
 * Same as useMemo but deep compares dependencies
 */
export function useDeepCompareMemo(callback: () => void, dependencies: any[]) {
  return useMemo(callback, dependencies.map(useDeepCompareMemoize));
}

const DefaultError = { isError: false, errorMsg: '' };

type useApiProps = (...args: any) => AxiosPromise<any>;

export function useApi(api: useApiProps) {
  const axiosCancelToken = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ isError, errorMsg }, setIsError] = useState(DefaultError);

  function fetch(...args: any) {
    if (isLoading) {
      cancel();
    } else {
      setIsLoading(true);
      setIsError(DefaultError);
    }

    axiosCancelToken.current = new AbortController();

    return new Promise(
      (resolve: (value: AxiosResponse<any, any>) => void, reject: (error: any) => void) => {
        api(axiosCancelToken.current.signal, ...args)
          .then((response) => {
            setIsLoading(false);
            resolve(response);
          })
          .catch((error) => {
            setIsLoading(false);
            setIsError({ isError: true, errorMsg: error });
            reject(error);
          });
      }
    );
  }

  function cancel() {
    axiosCancelToken.current.abort();
  }

  return { fetch, cancel, isL: isLoading, isE: isError, errorMsg };
}

/**
 * same as use state, but we get a third param to get current value. This will be useful while working with settimeout, eventHandlers, promises and axios api calls.
 */
export function useRefState<T>(defaultValue: T): [T, (updatedValue: T) => void, () => T] {
  const ref = useRef(defaultValue);
  const [state, setState] = useState(defaultValue);

  function setStateFn(updatedValue: any) {
    ref.current = updatedValue;
    setState(updatedValue);
  }

  function getValueFn() {
    return ref.current;
  }

  return [state, setStateFn, getValueFn];
}

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
