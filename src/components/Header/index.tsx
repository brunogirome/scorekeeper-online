import { Container, TimerContainer } from './styles';

import { Timer } from '../Timer';
import { useTimer } from '../../Hooks/timerContext';

export function Header() {
  const title = 'Regional Dimension Force - Duel Shop - São Paulo';
  const roundDescription = 'Final';

  const { roundTime } = useTimer();

  return (
    <Container>
      <div className="content">
        <div className="logo" />
        <div className="text">
          <h2>{title}</h2>
          <h1>{roundDescription}</h1>
        </div>
        <TimerContainer>
          <h1>{roundTime} minutos</h1>
          <Timer />
        </TimerContainer>
      </div>
    </Container>
  );
}
