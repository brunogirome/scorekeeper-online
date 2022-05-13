import {
  useState,
  useCallback,
  createContext,
  useMemo,
  useContext,
} from 'react';

export interface Player {
  id: string;
  name: string;
  currentTable: number;
  wins: number;
  draws: number;
  looses: number;
  current_deck: string;
}

interface PlayerContextData {
  players: Player[];
  getPlayer(id: string): Player | null;
  addPlayer({ player }: { player: Player }): void;
  editPlayer({ player }: { player: Player }): void;
  removePlayer(id: string): void | null;
}

interface Props {
  children: React.ReactNode;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export function PlayerProvider({ children }: Props) {
  const getLocalStorage = useCallback(
    () =>
      JSON.parse(localStorage.getItem('@TOOnline:players') || '[]') as Player[],
    [],
  );

  const [data, setData] = useState<Player[]>(() => getLocalStorage());

  const getPlayer = useCallback(
    (id: string) => {
      const findPlayer = data.filter(player => player.id === id)[0];

      if (!findPlayer) {
        return null;
      }

      return findPlayer;
    },
    [data],
  );

  const addPlayer = useCallback(
    ({ player }: { player: Player }) => {
      const newData = data;

      newData.push(player);

      localStorage.setItem('@TOOnline:players', JSON.stringify(newData));
      setData(newData);
    },
    [data],
  );

  const editPlayer = useCallback(
    ({ player }: { player: Player }) => {
      const newData = data;

      const index = data.findIndex(playerIndex => playerIndex.id === player.id);

      newData[index] = player;

      localStorage.setItem('@TOOnline:players', JSON.stringify(newData));
      setData(newData);
    },
    [data],
  );

  const removePlayer = useCallback(
    (id: string) => {
      const newData = data;

      const index = data.findIndex(playerIndex => playerIndex.id === id);

      newData.splice(index, 1);

      localStorage.setItem('@TOOnline:players', JSON.stringify(newData));
      setData(newData);
    },
    [data],
  );

  const provider = useMemo(
    () => ({
      players: data,
      getPlayer,
      addPlayer,
      editPlayer,
      removePlayer,
    }),
    [],
  );

  return (
    <PlayerContext.Provider value={provider}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  return context;
}
