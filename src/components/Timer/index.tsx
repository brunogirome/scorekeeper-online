import { useState, useEffect, useRef, useCallback } from 'react';

import { useTimer } from '../../Hooks/timerContext';

interface Props {
  playSong: boolean;
}

export function Timer({ playSong }: Props) {
  const Ref = useRef<NodeJS.Timer | null>(null);

  const { roundTime, remainingTime, isPlaying, roundTimeEnd } = useTimer();

  const formatTime = useCallback(
    (
      timeInMilleSeconds: number,
      type: 'minutesSeconds' | 'milleseconds',
    ): string => {
      if (type === 'milleseconds') {
        const milleseconds = Math.floor(timeInMilleSeconds % 1000);

        let formattedMilleseconds: string = milleseconds.toString();

        if (milleseconds < 100) {
          formattedMilleseconds = `0${milleseconds}`;
        } else if (milleseconds < 10) {
          formattedMilleseconds = `00${milleseconds}`;
        }

        return `:${formattedMilleseconds.slice(0, 2)}`;
      }

      const minutes = Math.floor(timeInMilleSeconds / 1000 / 60);

      const seconds = Math.floor((timeInMilleSeconds / 1000) % 60);

      return `${minutes > 9 ? minutes : `0${minutes}`}:${
        seconds > 9 ? seconds : `0${seconds}`
      }`;
    },
    [],
  );

  const [minutesSeconds, setMinutesSeconds] = useState<string>(() => {
    if (remainingTime === 0) {
      return `${roundTime > 9 ? roundTime : `0${roundTime}`}:00`;
    }

    return formatTime(remainingTime, 'minutesSeconds');
  });

  const [milleseconds, setMilleseconds] = useState<string>(() => {
    if (remainingTime === 0) {
      return ':00';
    }

    return formatTime(remainingTime, 'milleseconds');
  });

  useEffect(() => {
    if (Ref.current) clearInterval(Ref.current);

    let timeRemaining = roundTimeEnd - Date.parse(new Date().toISOString());

    if (timeRemaining > 0 && isPlaying) {
      const id = setInterval(() => {
        timeRemaining = roundTimeEnd - Date.parse(new Date().toISOString());

        if (timeRemaining < 0) {
          setMilleseconds(':00');

          return;
        }

        setMinutesSeconds(formatTime(timeRemaining, 'minutesSeconds'));

        setMilleseconds(formatTime(timeRemaining, 'milleseconds'));
      }, 10);

      Ref.current = id;
    }

    if (minutesSeconds + milleseconds === '00:00:00') {
      const audio = new Audio('/bell.mp3');
      audio.play();
    }
  }, [formatTime, isPlaying, milleseconds, minutesSeconds, roundTimeEnd]);

  return (
    <div className="timer-number">
      <p>
        {minutesSeconds}
        <span>{milleseconds}</span>
      </p>
    </div>
  );
}
