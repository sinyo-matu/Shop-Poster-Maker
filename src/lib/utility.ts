import { atom, PrimitiveAtom } from "jotai";
import { SetStateAction } from "react";

export function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
}

export const random = (length = 8) => {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

type Storage<Value> = {
  getItem: (key: string) => Value | Promise<Value>;
  setItem: (key: string, newValue: Value) => void | Promise<void>;
};

const defaultStorage: Storage<unknown> = {
  getItem: (key) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      throw new Error("no value stored");
    }
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  },
};

export function atomWithStorage<Value>(
  key: string,
  initialValue: Value,
  storage: Storage<Value> = defaultStorage as Storage<Value>
): PrimitiveAtom<Value> {
  const getInitialValue = () => {
    try {
      return storage.getItem(key);
    } catch {
      storage.setItem(key, initialValue);
      return initialValue;
    }
  };

  const baseAtom = atom(initialValue);

  baseAtom.onMount = (setAtom) => {
    Promise.resolve(getInitialValue()).then(setAtom);
  };

  const anAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: SetStateAction<Value>) => {
      const newValue =
        typeof update === "function"
          ? (update as (prev: Value) => Value)(get(baseAtom))
          : update;
      set(baseAtom, newValue);
      storage.setItem(key, newValue);
    }
  );

  return anAtom;
}

export function getYearMonthDay() {
  const date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}
