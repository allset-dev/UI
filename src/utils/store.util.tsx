import { useEffect, useState } from 'react';

import { storageUtil } from './storage.util';

export const storeUtil = {
  createStore<T>(storageKey: string) {
    function getValue() {
      return storageUtil.getItem<T>(storageKey);
    }

    function setValueFn(updatedValue: T) {
      storageUtil.setItem(storageKey, updatedValue);
    }

    return {
      useState(): [T, (updatedValue: T) => void, () => T] {
        const [value, setValue] = useState<T>(getValue);

        useEffect(() => {
          return storageUtil.onChanged(() => {
            setValue(getValue());
          });
        }, []);

        return [value, setValueFn, getValue];
      },
      get: getValue,
      set: setValueFn,
    };
  },
};
