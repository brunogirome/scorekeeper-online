import { Header } from '../../components/Header';

import {
  Container,
  Bracket,
  PlayerCard,
  Score,
  PlayerText,
  Table,
} from './styles';

export function Standings() {
  const rounds = [
    {
      table: 1,
      player1: {
        name: 'Rafael Souza Dragons',
        deck: 'Player deck',
        wins: 5,
        draws: 0,
        looses: 0,
      },
      player2: {
        name: 'Dudu "FizzSuaMãeChorar"',
        deck: 'Player deck',
        wins: 4,
        draws: 0,
        looses: 1,
      },
      score_1: 0,
      score_2: 1,
      extra_time: 0,
    },
    {
      table: 2,
      player1: {
        name: 'Player 3',
        deck: 'Player deck',
        wins: 4,
        draws: 1,
        looses: 0,
      },
      player2: {
        name: 'Player 4',
        deck: 'Player deck',
        wins: 3,
        draws: 1,
        looses: 1,
      },
      score_1: 0,
      score_2: 0,
      extra_time: 3,
    },
  ];

  return (
    <Container>
      <Header />
      <Bracket>
        <h1>MESA</h1>
        <ul>
          {rounds.map(round => (
            <li key={round.table}>
              <PlayerCard side="left">
                <PlayerText side="left">
                  <p>
                    <span>({round.player1.deck})</span> {round.player1.name}
                  </p>
                  <span>
                    {round.player1.wins} W - {round.player1.draws} D -
                    {round.player1.looses} L
                  </span>
                </PlayerText>
                <Score side="left">{round.score_1}</Score>
              </PlayerCard>
              <Table>
                {round.table}
                {round.extra_time > 0 && <span>+00:{round.extra_time}0</span>}
              </Table>
              <PlayerCard side="right">
                <Score side="right">{round.score_2}</Score>
                <PlayerText side="right">
                  <p>
                    {round.player2.name} <span>({round.player2.deck})</span>
                  </p>
                  <span>
                    {round.player2.wins} W - {round.player2.draws} D -
                    {round.player2.looses} L
                  </span>
                </PlayerText>
              </PlayerCard>
            </li>
          ))}
        </ul>
      </Bracket>
    </Container>
  );
}
