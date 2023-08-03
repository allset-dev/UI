/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useEffect, useState } from 'react';

import { storageUtil } from './storage.util';

let currentStoreIndex = 1;

export interface ContextStore<T> {
  value?: T;
  setValue: (updatedValue?: T) => void;
}

export function createContext<T>(localStorageKey: string, defaultValue?: T) {
  const storeId = getStoreId(currentStoreIndex);
  currentStoreIndex = currentStoreIndex + 1;

  const Context = React.createContext<ContextStore<T>>({
    value: undefined,
    setValue: () => {},
  });

  function Provider(props: CreateContextProviderProps) {
    const [value, setValue] = useState<ContextStore<T>['value']>(
      (props.storageValues[localStorageKey] as ContextStore<T>['value']) || defaultValue
    );

    useEffect(() => {
      document.addEventListener(storeId, onStorageValueChange);

      return () => {
        document.removeEventListener(storeId, onStorageValueChange);
      };
    }, []);

    function setValueFn(updatedValue?: T) {
      setValue(updatedValue);
      storageUtil.setItem<ContextStore<T>['value']>(localStorageKey, updatedValue);
    }

    function onStorageValueChange(event: Event) {
      const updatedValue = (event as CustomEvent).detail.updatedValue;
      setValue(updatedValue);
    }

    return (
      <Context.Provider value={{ value, setValue: setValueFn }}>{props.children}</Context.Provider>
    );
  }

  function useContext(): [ContextStore<T>['value'], ContextStore<T>['setValue']] {
    const state = React.useContext(Context);

    return [state.value, state.setValue];
  }

  /**
   * This function can be used to get value outside of react component, like in service's, api's, serviceWorker's, etc,.
   * This function won't re-render react component on value change, so this should not be used in react components. Use useContext in react components
   * @returns Value storaged in localstorage
   */
  async function get(): Promise<ContextStore<T>['value']> {
    return await storageUtil.getItem<T>(localStorageKey);
  }

  /**
   * This function can be used to set value outside of react component, like in service's, api's, serviceWorker's, etc,.
   * Setting value though this function will also update the useContext return value.
   */
  async function set(updatedValue?: T): Promise<void> {
    document.dispatchEvent(
      new CustomEvent(storeId, {
        detail: {
          updatedValue,
        },
      })
    );

    return await storageUtil.setItem<ContextStore<T>['value']>(localStorageKey, updatedValue);
  }

  return {
    Provider,
    useContext,
    get,
    set,
  };
}

function getStoreId(index: number) {
  return `store-${index}`;
}

export interface CreateContextProviderProps {
  children: ReactNode;
  storageValues: AnyMap;
}

type AnyMap<K extends string = string> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in K]: any;
};
