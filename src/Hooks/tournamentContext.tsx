import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

import { Player } from './playerContext';
import { getLocalStorage } from '../utils/getLocalStorage';

export interface Standing {
  table: number;
  player1: Player;
  player2: Player;
  scorePlayer1: number;
  scorePlayer2: number;
  scoreTournamentPlayer1: string;
  scoreTournamentPlayer2: string;
  timeExtension: number;
}

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
  standings: Standing[];
  storeLogo: string;
  setStoreLogo(logo: string): void;
  setTournament({ tournament }: { tournament: Tournament }): void;
  addStanding({ standing }: { standing: Standing }): void;
  editStandings({ standing }: { standing: Standing }): void;
  removeStanding(table: number): void;
  clearStandings(): void;
}

interface Props {
  children: React.ReactNode;
}

const TournamentContext = createContext<TournamentContextData>(
  {} as TournamentContextData,
);

export function TournamentProvider({ children }: Props) {
  const [data, setData] = useState<Tournament>(() =>
    getLocalStorage<Tournament>({ storage: '@TOOnline:tournament' }),
  );

  const [storeLogo, setStoreLogoLocal] = useState<string>(
    localStorage.getItem('@TOOnline:storelogo') || '',
  );

  const setStoreLogo = useCallback((logo: string) => {
    localStorage.setItem('@TOOnline:storelogo', logo);
    setStoreLogoLocal(logo);
  }, []);

  const [standings, setStandings] = useState<Standing[]>(() =>
    getLocalStorage<Standing[]>({
      storage: '@TOOnline:tournament:standings',
      array: true,
    }),
  );

  const setTournament = useCallback(
    ({ tournament }: { tournament: Tournament }) => {
      localStorage.setItem('@TOOnline:tournament', JSON.stringify(tournament));
      setData({ ...tournament });
    },
    [setData],
  );

  const addStanding = useCallback(
    ({ standing }: { standing: Standing }) => {
      const newStandings = [...standings, standing];

      localStorage.setItem(
        '@TOOnline:tournament:standings',
        JSON.stringify(newStandings),
      );
      setStandings(newStandings);
    },
    [standings],
  );

  const removeStanding = useCallback(
    (table: number) => {
      let tableNumber = 0;

      const newStandings = standings
        .filter(({ table: findTable }) => findTable !== table)
        .map(standing => {
          tableNumber += 1;
          return { ...standing, table: tableNumber };
        });

      localStorage.setItem(
        '@TOOnline:tournament:standings',
        JSON.stringify(newStandings),
      );

      setStandings([...newStandings]);
    },
    [standings],
  );

  const clearStandings = useCallback(() => {
    localStorage.setItem('@TOOnline:tournament:standings', '[]');
    setStandings([]);
  }, []);

  const editStandings = useCallback(
    ({ standing }: { standing: Standing }) => {
      const newStandings = standings;

      const index = standings.findIndex(
        findStanding => findStanding.table === standing.table,
      );

      newStandings[index] = standing;

      localStorage.setItem(
        '@TOOnline:tournament:standings',
        JSON.stringify(newStandings),
      );
      setStandings([...newStandings]);
    },
    [standings],
  );

  function onStorageUpdate(e: StorageEvent) {
    const { key, newValue } = e;

    switch (key) {
      case '@TOOnline:tournament':
        setData(JSON.parse(newValue || '{}') as Tournament);
        break;
      case '@TOOnline:tournament:standings':
        setStandings(JSON.parse(newValue || '[]') as Standing[]);
        break;
      default:
    }
  }

  useEffect(() => {
    setData(
      getLocalStorage<Tournament>({
        storage: '@TOOnline:tournament',
        array: true,
      }),
    );

    window.addEventListener('storage', onStorageUpdate);

    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  useEffect(() => {
    setStandings(
      getLocalStorage<Standing[]>({
        storage: '@TOOnline:tournament:standings',
        array: true,
      }),
    );

    window.addEventListener('storage', onStorageUpdate);

    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  const provider = useMemo(
    () => ({
      setTournament,
      standings,
      addStanding,
      editStandings,
      removeStanding,
      tournament: data,
      clearStandings,
      storeLogo,
      setStoreLogo,
    }),
    [
      data,
      setTournament,
      addStanding,
      editStandings,
      removeStanding,
      standings,
      clearStandings,
      storeLogo,
      setStoreLogo,
    ],
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
