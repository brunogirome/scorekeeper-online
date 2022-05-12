export function getLocalStorage<T>(storage: string) {
  return JSON.parse(localStorage.getItem(storage) || '{}') as T;
}
