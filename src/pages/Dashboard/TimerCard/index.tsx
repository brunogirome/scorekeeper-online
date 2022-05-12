import { useState, useCallback, FormEvent, ChangeEvent } from 'react';

import { Container } from './styles';

import { useTimer } from '../../../Hooks/timerContext';
import { useTournament } from '../../../Hooks/tournamentContext';

import { Timer } from '../../../components/Timer/index';

export function TimerCard() {
  const { tournament, setTournament } = useTournament();

  const { playPause, setRoundTime, roundTime } = useTimer();

  const [roundDescriptionLocal, setRoundDescription] = useState<string>(
    tournament.roundDescription,
  );

  const [roundTimeValue, setRoundTimeValue] = useState<string>(
    roundTime.toString(),
  );

  const handleTournamentRound = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const tournamentLocal = tournament;

      tournament.roundDescription = roundDescriptionLocal;

      setTournament({ tournament: { ...tournamentLocal } });
    },
    [roundDescriptionLocal],
  );

  const handleTournamentRoundDescription = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRoundDescription(e.target.value);
    },
    [],
  );

  const handleRoundTime = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setRoundTimeValue(roundTimeValue);
      setRoundTime({ minutes: parseInt(roundTimeValue, 10) });
    },
    [roundTimeValue],
  );

  const handleRoundTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRoundTimeValue(e.target.value);
    },
    [],
  );

  return (
    <Container>
      <Timer />
      <button type="button" onClick={playPause}>
        Iniciar rodada
      </button>
      <div>
        <form onSubmit={handleRoundTime}>
          <span>Tempo</span>
          <input
            type="text"
            placeholder="Tempo em minutos"
            value={roundTimeValue}
            onChange={handleRoundTimeChange}
          />
        </form>
        <form onSubmit={handleTournamentRound}>
          <span>Descrição</span>
          <input
            type="text"
            placeholder="Descrição da rodada"
            value={roundDescriptionLocal}
            onChange={handleTournamentRoundDescription}
          />
        </form>
      </div>
    </Container>
  );
}
