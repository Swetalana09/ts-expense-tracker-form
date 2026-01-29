import { useState, useEffect } from "react";
import { storageService, STORAGE_KEY } from "../services";

export function useLocalStorage<T>(initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storageService.getItem<T>(initialValue);
  });

  useEffect(() => {
    storageService.setItem(storedValue);
  }, [storedValue]);
  return [storedValue, setStoredValue] as const;
}
export { STORAGE_KEY };
