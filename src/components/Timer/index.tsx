import { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from './styles';

export function Timer() {
  const Ref = useRef<any>(null);

  const tournament = { roundTime: 5, isPaused: true };

  const [roundTimeEnd, setRoundTimeEnd] = useState(0);

  const [play, setPlay] = useState(!tournament.isPaused);

  const [remainingTime, setRemainingTime] = useState(0);

  const [minutesSeconds, setMinutesSeconds] = useState(
    (tournament.roundTime > 9
      ? tournament.roundTime
      : '0' + tournament.roundTime) + ':00',
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
    let timeRemaining = roundTimeEnd - Date.parse(new Date().toISOString());

    if (Ref.current) clearInterval(Ref.current);

    if (roundTimeEnd > 0 && play) {
      const id = setInterval(() => {
        timeRemaining = roundTimeEnd - Date.parse(new Date().toISOString());

        if (timeRemaining < 0) {
          setMilleseconds(':00');

          return;
        }

        const minutes = Math.floor(timeRemaining / 1000 / 60);

        const seconds = Math.floor((timeRemaining / 1000) % 60);

        setMinutesSeconds(
          (minutes > 9 ? minutes : '0' + minutes) +
            ':' +
            (seconds > 9 ? seconds : '0' + seconds),
        );

        const milleseconds = Math.floor(timeRemaining % 1000);

        let formattedMilleseconds: string = milleseconds.toString();

        if (milleseconds < 100) {
          formattedMilleseconds = '0' + milleseconds;
        } else if (milleseconds < 10) {
          formattedMilleseconds = '00' + milleseconds;
        }

        formattedMilleseconds = formattedMilleseconds.slice(0, 2);

        setMilleseconds(':' + formattedMilleseconds);
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
          <button onClick={playPause}>amongUs</button>
        </div>
      </div>
    </Container>
  );
}
