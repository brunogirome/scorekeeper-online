import { Container, TimerContainer } from './styles';

import { Timer } from '../Timer';
import { useTimer } from '../../Hooks/timerContext';
import { useTournament } from '../../Hooks/tournamentContext';

import StoreLogo from '../../assets/index.png';

export function Header() {
  const { roundTime } = useTimer();

  const { tournament } = useTournament();

  return (
    <Container storeLogo={StoreLogo}>
      <div className="content">
        <img className="logo" src={StoreLogo} alt="store_logo" />
        <div className="text">
          <h2>{tournament.tournamentName}</h2>
          <h1>{tournament.roundDescription}</h1>
        </div>
        <TimerContainer>
          <h1>{roundTime} minutos</h1>
          <Timer playSong />
        </TimerContainer>
      </div>
    </Container>
  );
}
