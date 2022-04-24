import { AxiosPromise, AxiosResponse } from 'axios';
import { useRef, useEffect, useMemo, useState } from 'react';
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

interface useApiProps {
  api: (...args: any) => AxiosPromise<any>;
  onSuccess?: (response: AxiosResponse<any>) => void;
  onError?: (error: any) => void;
}

export function useApi(props: useApiProps) {
  const { api, onSuccess, onError } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [{ isError, errorMsg }, setIsError] = useState(DefaultError);

  function fetch(...args: any) {
    setIsLoading(true);
    setIsError(DefaultError);

    api(...args)
      .then((response) => {
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        setIsError({ isError: true, errorMsg: error });
        if (onError) {
          onError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function cancel() {
    //
  }
  return { fetch, cancel, isL: isLoading, isE: isError, errorMsg };
}
