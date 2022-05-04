import { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from './styles';

export function Timer() {
  const Ref = useRef<NodeJS.Timer | null>(null);

  // Context variables
  const tournament = { roundTime: 40, isPaused: true };

  const [roundTimeEnd, setRoundTimeEnd] = useState(0);

  const [play, setPlay] = useState(!tournament.isPaused);

  const [remainingTime, setRemainingTime] = useState(0);
  // End of context variables

  const [minutesSeconds, setMinutesSeconds] = useState(
    tournament.roundTime > 9
      ? `${tournament.roundTime}:00`
      : `0${tournament.roundTime}:00`,
  );

  const [milleseconds, setMilleseconds] = useState(':00');

  const playPause = useCallback(() => {
    if (play) {
      setRemainingTime(roundTimeEnd - Date.parse(new Date().toISOString()));
    } else if (remainingTime > 0) {
      setRoundTimeEnd(Date.parse(new Date().toISOString()) + remainingTime);
    }

    setPlay(!play);

    if (roundTimeEnd === 0) {
      const startedDate = new Date();

      setRoundTimeEnd(
        startedDate.setMinutes(startedDate.getMinutes() + tournament.roundTime),
      );
    }
  }, [play, tournament.roundTime, remainingTime, roundTimeEnd]);

  useEffect(() => {
    if (Ref.current) clearInterval(Ref.current);

    if (roundTimeEnd > 0 && play) {
      const id = setInterval(() => {
        const timeRemaining =
          roundTimeEnd - Date.parse(new Date().toISOString());

        if (timeRemaining < 0) {
          setMilleseconds(':00');

          return;
        }

        const minutes = Math.floor(timeRemaining / 1000 / 60);

        const seconds = Math.floor((timeRemaining / 1000) % 60);

        setMinutesSeconds(
          `${minutes > 9 ? minutes : `0${minutes}`}:${
            seconds > 9 ? seconds : `0${seconds}`
          }`,
        );

        const currentMilleseconds = Math.floor(timeRemaining % 1000);

        let formattedMilleseconds: string = currentMilleseconds.toString();

        if (currentMilleseconds < 100) {
          formattedMilleseconds = `0${currentMilleseconds}`;
        } else if (currentMilleseconds < 10) {
          formattedMilleseconds = `00${currentMilleseconds}`;
        }

        formattedMilleseconds = formattedMilleseconds.slice(0, 2);

        setMilleseconds(`:${formattedMilleseconds}`);
      }, 10);

      Ref.current = id;
    }
  }, [play, roundTimeEnd]);

  return (
    <Container>
      <h1>{tournament.roundTime} minutos</h1>
      <div>
        <div>
          <p>{minutesSeconds}</p>
          <span>{milleseconds}</span>
          <button type="button" onClick={playPause}>
            amongUs
          </button>
        </div>
      </div>
    </Container>
  );
}
