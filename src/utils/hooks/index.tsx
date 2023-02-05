import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation as useReactTranslation } from 'react-i18next';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LanguageDictionary } from 'localization/language/en-us';

import { isEqual, isMobile, setStatusAndNavBarStyles } from 'utils';

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

type useApiProps<TData> = (abortSignal: AbortSignal, ...args: any) => Promise<TData>;
type fetchResponce<TData> = (value: TData) => void;
type fetchReject = (error: any) => void;

export function useApi<TData = any>(api: useApiProps<TData>) {
  const axiosCancelToken = useRef<AbortController>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<TData>(null);

  function fetch(...args: any) {
    if (isLoading) {
      cancel();
    } else {
      setIsLoading(true);
      setError(null);
    }

    axiosCancelToken.current = new AbortController();

    return new Promise((res: fetchResponce<TData>, rej: fetchReject) => {
      api(axiosCancelToken.current.signal, ...args)
        .then((response) => {
          setIsLoading(false);
          setData(response);
          res(response);
        })
        .catch((error: Error) => {
          setError(error);
          setIsLoading(false);
          rej(error);
        });
    });
  }

  function cancel() {
    axiosCancelToken.current.abort();
  }

  useEffect(() => {
    fetch();
  }, []);

  return { fetch, cancel, isLoading, isError: Boolean(error), error, data };
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
    setStatusAndNavBarStyles();
  }
}

export function useSetAppPreference() {
  gsap.registerPlugin(ScrollTrigger);
  useSetMobilePreference();
}

export function useTranslation() {
  interface TypedTFunction {
    t: (key: keyof LanguageDictionary) => string;
  }

  const { t } = useReactTranslation();

  return { t } as TypedTFunction;
}
