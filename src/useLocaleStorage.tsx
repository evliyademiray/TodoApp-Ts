/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
export function useLocaleStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [T, typeof setValue];
}