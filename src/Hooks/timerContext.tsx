import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from 'react';

interface TimerState {
  roundTime: number;
  roundTimeEnd: number;
  remainingTime: number;
  isPlaying: boolean;
}

interface TimerContextData {
  timer: TimerState;
  playPause(): void;
}

interface Props {
  children: React.ReactNode;
}

const TimerContext = createContext<TimerContextData>({} as TimerContextData);

export function TimerProvider({ children }: Props) {
  const [timerState, setTimerState] = useState<TimerState>(() => {
    const localTimer = JSON.parse(
      localStorage.getItem('@TOOnline:timer') || '{}',
    ) as TimerState;

    return localTimer || ({} as TimerState);
  });

  const playPause = useCallback(() => {
    const timer = timerState;

    const { isPlaying, remainingTime, roundTime, roundTimeEnd } = timer;

    if (isPlaying) {
      timer.remainingTime = roundTimeEnd - Date.parse(new Date().toISOString());
    } else if (remainingTime > 0) {
      timer.roundTimeEnd = Date.parse(new Date().toISOString()) + remainingTime;
    }

    timer.isPlaying = !isPlaying;

    if (roundTimeEnd === 0) {
      const startedDate = new Date();

      timer.roundTimeEnd = startedDate.setMinutes(
        startedDate.getMinutes() + roundTime,
      );
    }

    localStorage.setItem('@TOOnline:timer', JSON.stringify(timer));

    setTimerState(timer);
  }, []);

  const provider = useMemo<TimerContextData>(
    () => ({ timer: timerState, playPause }),
    [],
  );

  return (
    <TimerContext.Provider value={provider}>{children}</TimerContext.Provider>
  );
}

export function useTimer(): TimerContextData {
  const context = useContext(TimerContext);

  return context;
}
