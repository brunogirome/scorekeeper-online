import { Container } from './styles';

import { Timer } from '../../components/Timer';

export function Header() {
  const title = 'Regional Dimension Force - Duel Shop - São Paulo';
  const round_description = 'Final';

  return (
    <Container>
      <div className="content">
        <div className="logo" />
        <div className="text">
          <h2>{title}</h2>
          <h1>{round_description}</h1>
        </div>
        <Timer />
      </div>
    </Container>
  );
}
