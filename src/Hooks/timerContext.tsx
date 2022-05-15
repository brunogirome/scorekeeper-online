import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

interface TimerContextData {
  roundTime: number;
  roundTimeEnd: number;
  remainingTime: number;
  isPlaying: boolean;
  setRoundTime({ minutes }: { minutes: number }): void;
  playPause(): void;
}

interface Props {
  children: React.ReactNode;
}

const TimerContext = createContext<TimerContextData>({} as TimerContextData);

export function TimerProvider({ children }: Props) {
  const [roundTime, setRoundTimeLocal] = useState<number>(() => {
    const storageRoundTime = parseInt(
      localStorage.getItem('@TOOnline:timer:roundTime') || '0',
      10,
    );

    return storageRoundTime;
  });

  const [roundTimeEnd, setRoundTimeEnd] = useState<number>(() => {
    const storageRoundTimeEnd = parseInt(
      localStorage.getItem('@TOOnline:timer:roundTimeEnd') || '0',
      10,
    );

    return storageRoundTimeEnd;
  });

  const [remainingTime, setRemainingTime] = useState<number>(() => {
    const storageRemainingTime = parseInt(
      localStorage.getItem('@TOOnline:timer:remainingTime') || '0',
      10,
    );

    return storageRemainingTime;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    const playing =
      localStorage.getItem('@TOOnline:timer:isPlaying') === 'true';

    return playing;
  });

  function setRoundTime({ minutes }: { minutes: number }): void {
    localStorage.setItem('@TOOnline:timer:roundTime', minutes.toString());
    setRoundTimeLocal(minutes);
  }

  const playPause = useCallback(() => {
    if (isPlaying) {
      const newRemainingTime =
        roundTimeEnd - Date.parse(new Date().toISOString());

      localStorage.setItem(
        '@TOOnline:timer:remainingTime',
        newRemainingTime.toString(),
      );

      setRemainingTime(newRemainingTime);
    } else if (remainingTime > 0) {
      const newRoundTimeEnd =
        Date.parse(new Date().toISOString()) + remainingTime;

      localStorage.setItem(
        '@TOOnline:timer:roundTimeEnd',
        newRoundTimeEnd.toString(),
      );

      setRoundTimeEnd(newRoundTimeEnd);
    }

    const newIsPlaying = !isPlaying;

    localStorage.setItem('@TOOnline:timer:isPlaying', newIsPlaying.toString());
    setIsPlaying(newIsPlaying);

    if (roundTimeEnd === 0) {
      const startedDate = new Date();

      const newRoundTimeEnd = startedDate.setMinutes(
        startedDate.getMinutes() + roundTime,
      );

      localStorage.setItem(
        '@TOOnline:timer:roundTimeEnd',
        newRoundTimeEnd.toString(),
      );
      setRoundTimeEnd(newRoundTimeEnd);
    }
  }, [isPlaying, remainingTime, roundTime, roundTimeEnd]);

  function parseIntWithNull(value: string | null): number {
    return parseInt(value || '0', 10);
  }

  const onStorageUpdate = useCallback((e: StorageEvent) => {
    const { key, newValue } = e;

    switch (key) {
      case '@TOOnline:timer:isPlaying':
        setIsPlaying(newValue === 'true');
        break;
      case '@TOOnline:timer:roundTime':
        setRoundTimeLocal(parseIntWithNull(newValue));
        break;
      case '@TOOnline:timer:roundTimeEnd':
        setRoundTimeEnd(parseIntWithNull(newValue));
        break;
      case '@TOOnline:timer:remainingTime':
        setRemainingTime(parseIntWithNull(newValue));
        break;
      default:
    }
  }, []);

  useEffect(() => {
    setIsPlaying(localStorage.getItem('@TOOnline:timer:isPlaying') === 'true');

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, [isPlaying, onStorageUpdate]);

  useEffect(() => {
    setRoundTimeLocal(
      parseIntWithNull(localStorage.getItem('@TOOnline:timer:roundTime')),
    );

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, [onStorageUpdate, roundTime]);

  useEffect(() => {
    setRoundTimeEnd(
      parseIntWithNull(localStorage.getItem('@TOOnline:timer:roundTimeEnd')),
    );

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, [onStorageUpdate, roundTimeEnd]);

  useEffect(() => {
    setRemainingTime(
      parseIntWithNull(localStorage.getItem('@TOOnline:timer:remainingTime')),
    );

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, [onStorageUpdate, remainingTime]);

  const provider = useMemo(
    () => ({
      roundTime,
      roundTimeEnd,
      remainingTime,
      isPlaying,
      setRoundTime,
      playPause,
    }),
    [roundTime, roundTimeEnd, remainingTime, isPlaying, playPause],
  );

  return (
    <TimerContext.Provider value={provider}>{children}</TimerContext.Provider>
  );
}

export function useTimer(): TimerContextData {
  const context = useContext(TimerContext);

  return context;
}
