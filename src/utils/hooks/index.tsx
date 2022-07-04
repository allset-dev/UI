import { useRef, useEffect, useMemo, useState } from 'react';
import { AxiosPromise, AxiosResponse } from 'axios';
import { convertRgb2Hex, isEqual, isMobile, setStatusAndNavBarStyles } from 'utils';

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

const NoErrorObj = { isError: false, errorMsg: '' };

type useApiProps = (...args: any) => AxiosPromise<any>;
type fetchResponce = (value: AxiosResponse<any, any>) => void;
type fetchReject = (error: any) => void;

export function useApi(api: useApiProps) {
  const axiosCancelToken = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ isError, errorMsg }, setIsError] = useState(NoErrorObj);

  function fetch(...args: any) {
    if (isLoading) {
      cancel();
    } else {
      setIsLoading(true);
      setIsError(NoErrorObj);
    }

    axiosCancelToken.current = new AbortController();

    return new Promise((res: fetchResponce, rej: fetchReject) => {
      api(axiosCancelToken.current.signal, ...args)
        .then((response) => {
          setIsLoading(false);
          res(response);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError({ isError: true, errorMsg: error });
          rej(error);
        });
    });
  }

  function cancel() {
    axiosCancelToken.current.abort();
  }

  return { fetch, cancel, isL: isLoading, isE: isError, errorMsg };
}

type UseRefStateReturns<T> = [T, (updatedValue: T) => void, () => T];
/**
 * same as use state, but we get a third param to get current value. This will be useful while working with settimeout, eventHandlers, promises and axios api calls.
 */
export function useRefState<T>(defaultValue: T): UseRefStateReturns<T> {
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

export function useSetMobilePreference() {
  if (isMobile) {
    const cssVariable = getComputedStyle(document.body).getPropertyValue('background-color');
    const bgColor = convertRgb2Hex(cssVariable);

    setStatusAndNavBarStyles(bgColor);
  }
}

export function useSetAppPreference() {
  useSetMobilePreference();
}
