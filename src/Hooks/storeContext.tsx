import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

interface Store {
  name: string;
  logo: string;
  site: string;
  instagram: string;
  twitter: string;
  facebook: string;
}

interface StoreContextData {
  store: Store;
  setStore({ store }: { store: Store }): void;
}

interface Props {
  children: React.ReactNode;
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData);

export function StoreProvider({ children }: Props) {
  const getLocalStorage = useCallback(
    () => JSON.parse(localStorage.getItem('@TOOnline:store') || '{}') as Store,
    [],
  );

  const [data, setData] = useState<Store>(() => getLocalStorage());

  const setStore = useCallback(
    ({ store }: { store: Store }) => {
      setData({ ...store });
    },
    [setData],
  );

  function onStorageUpdate(e: StorageEvent) {
    const { key, newValue } = e;

    if (key === '@TOOnline:store') {
      setData(JSON.parse(newValue || '') as Store);
    }
  }

  useEffect(() => {
    setData(getLocalStorage());

    window.addEventListener('storage', onStorageUpdate);

    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  const provider = useMemo(
    () => ({
      setStore,
      store: data,
    }),
    [data, setStore],
  );

  return (
    <StoreContext.Provider value={provider}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreContextData {
  const context = useContext(StoreContext);

  return context;
}
