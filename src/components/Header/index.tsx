import { Container, TimerContainer } from './styles';

import { Timer } from '../Timer';
import { useTimer } from '../../Hooks/timerContext';
import { useTournament } from '../../Hooks/tournamentContext';

export function Header() {
  const { roundTime } = useTimer();

  const { tournament } = useTournament();

  return (
    <Container>
      <div className="content">
        <div className="logo" />
        <div className="text">
          <h2>{tournament.tournamentName}</h2>
          <h1>{tournament.roundDescription}</h1>
        </div>
        <TimerContainer>
          <h1>{roundTime} minutos</h1>
          <Timer />
        </TimerContainer>
      </div>
    </Container>
  );
}
