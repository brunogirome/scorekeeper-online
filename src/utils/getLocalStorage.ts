interface Props {
  storage: string;
  array?: boolean;
}

export function getLocalStorage<T>({ storage, array = false }: Props) {
  const emptyParser = !array ? '{}' : '[]';

  return JSON.parse(localStorage.getItem(storage) || emptyParser) as T;
}
