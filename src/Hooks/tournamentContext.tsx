import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

interface Tournament {
  id: string;
  tournamentName: string;
  date: Date;
  roundDescription: string;
  isFinished: boolean;
  isFinals: boolean;
  showDeck: boolean;
  showScore: boolean;
}

interface TournamentContextData {
  tournament: Tournament;
  setTournament({ tournament }: { tournament: Tournament }): void;
}

interface Props {
  children: React.ReactNode;
}

const TournamentContext = createContext<TournamentContextData>(
  {} as TournamentContextData,
);

export function TournamentProvider({ children }: Props) {
  const getLocalStorage = useCallback(
    () =>
      JSON.parse(
        localStorage.getItem('@TOOnline:tournament') || '{}',
      ) as Tournament,
    [],
  );

  const [data, setData] = useState<Tournament>(() => getLocalStorage());

  const setTournament = useCallback(
    ({ tournament }: { tournament: Tournament }) => {
      localStorage.setItem('@TOOnline:tournament', JSON.stringify(tournament));
      setData({ ...tournament });
    },
    [setData],
  );

  function onStorageUpdate(e: StorageEvent) {
    const { key, newValue } = e;

    if (key === '@TOOnline:tournament') {
      setData(JSON.parse(newValue || '') as Tournament);
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
      setTournament,
      tournament: data,
    }),
    [data, setTournament],
  );

  return (
    <TournamentContext.Provider value={provider}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament(): TournamentContextData {
  const context = useContext(TournamentContext);

  return context;
}
