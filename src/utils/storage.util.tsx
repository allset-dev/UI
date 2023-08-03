import { eventUtil } from './event.util';

const storageName = 'appStorage';

const storageValueChangedEvent = eventUtil.createEvent('storageValueChanged');

export const storageUtil = {
  getItem<T = string>(key: string): T | undefined {
    const storageItems = deSerialize<AnyMap>(localStorage.getItem(storageName)) || {};

    return storageItems[key];
  },
  setItem<T = string>(key: string, value: T) {
    const storageItems = deSerialize<AnyMap>(localStorage.getItem(storageName)) || {};

    if (value === undefined) {
      delete storageItems[key];
    } else {
      storageItems[key] = value;
    }

    localStorage.setItem(storageName, serialize(storageItems));
    storageValueChangedEvent.dispatch();
  },
  clear() {
    localStorage.clear();
    storageValueChangedEvent.dispatch();
  },
  removeItem(key: string) {
    const storageItems = deSerialize<AnyMap>(localStorage.getItem(storageName)) || {};
    delete storageItems[key];
    localStorage.setItem(storageName, serialize(storageItems));
    storageValueChangedEvent.dispatch();
  },
  key(index: number): string | undefined {
    const storageItems = deSerialize<AnyMap>(localStorage.getItem(storageName)) || {};

    return Object.keys(storageItems)[index];
  },
  getAll(): AnyMap {
    return deSerialize<AnyMap>(localStorage.getItem(storageName)) || {};
  },
  onChanged: storageValueChangedEvent.listen,
};

function serialize<T>(value: T): string {
  return JSON.stringify(value);
}

function deSerialize<T>(value: string | null | undefined): T | undefined {
  return value ? JSON.parse(value) : undefined;
}

type AnyMap<K extends string = string> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in K]: any;
};
