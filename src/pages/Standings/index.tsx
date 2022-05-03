import { Header } from '../Header';

import { Container, PlayerCard, Score, PlayerText, Tables } from './styles';

export function Standings() {
  const players1 = [
    {
      id: 1,
      name: 'Lucas paiva',
      deck: 'Dragon Ruler',
      wins: 5,
      draws: 3,
      looses: 2,
      score: 0,
    },
    {
      id: 2,
      name: 'Bianca Oliveira',
      deck: 'Swordsoul Tenyi',
      wins: 10,
      draws: 0,
      looses: 0,
      score: 1,
    },
    {
      id: 3,
      name: 'Maria França',
      deck: 'Gladiator Beast',
      wins: 7,
      draws: 0,
      looses: 2,
      score: 1,
    },
    {
      id: 4,
      name: 'Daniel Richard',
      deck: 'DAD Return',
      wins: 1,
      draws: 1,
      looses: 5,
      score: 0,
    },
  ];

  const players2 = [
    {
      id: 5,
      name: 'Breno Silva',
      deck: 'Prank-kids adventure Destiny',
      wins: 5,
      draws: 1,
      looses: 3,
      score: 1,
    },
    {
      id: 6,
      name: 'Fernando Nascimento',
      deck: 'BAPK',
      wins: 4,
      draws: 0,
      looses: 0,
      score: 0,
    },
    {
      id: 7,
      name: 'Alan Crépão',
      deck: 'Cyberse Eldlich Adventure',
      wins: 5,
      draws: 0,
      looses: 0,
      score: 2,
    },
    {
      id: 8,
      name: 'Vitor Azul',
      deck: 'Virutual World P.U.N.K.',
      wins: 12,
      draws: 0,
      looses: 0,
      score: 1,
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <h1>MESA</h1>
        <div>
          <div>
            {players1.map(player => (
              <PlayerCard side="left" key={player.id}>
                <PlayerText side="left">
                  <p>
                    <span>({player.deck})</span> {player.name}
                  </p>
                  <span>
                    {player.wins} W - {player.draws} D - {player.looses} L
                  </span>
                </PlayerText>
                <Score side="left">{player.score}</Score>
              </PlayerCard>
            ))}
          </div>
          <Tables>
            <div>
              1<span>+03:00</span>
            </div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </Tables>
          <div>
            {players2.map(player => (
              <PlayerCard side="right" key={player.id}>
                <Score side="right">{player.score}</Score>
                <PlayerText side="right">
                  <p>
                    {player.name} <span>({player.deck})</span>
                  </p>
                  <span>
                    {player.wins} W - {player.draws} D - {player.looses} L
                  </span>
                </PlayerText>
              </PlayerCard>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
