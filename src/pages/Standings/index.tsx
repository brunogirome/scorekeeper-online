import { useTournament } from '../../Hooks/tournamentContext';
import { formatScoreInString } from '../../utils/formatScoreInString';

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
  const { standings } = useTournament();

  return (
    <Container>
      <Header />
      <Bracket>
        <h1>MESA</h1>
        <ul>
          {standings.map(standing => (
            <li key={standing.table}>
              <PlayerCard side="left">
                <PlayerText side="left">
                  <p>
                    {standing.player1.currentDeck && (
                      <span>({standing.player1.currentDeck})</span>
                    )}
                    {standing.player1.name}
                  </p>
                  <span>
                    {formatScoreInString({ player: standing.player1 })}
                  </span>
                </PlayerText>
                <Score side="left">{standing.scorePlayer1}</Score>
              </PlayerCard>
              <Table>
                {standing.table}
                {standing.timeExtension > 0 && (
                  <span>
                    +
                    {standing.timeExtension > 9
                      ? standing.timeExtension
                      : `0${standing.timeExtension}`}
                    :00
                  </span>
                )}
              </Table>
              <PlayerCard side="right">
                <Score side="right">{standing.scorePlayer2}</Score>
                <PlayerText side="right">
                  <p>
                    {standing.player2.name}
                    {standing.player2.currentDeck && (
                      <span>({standing.player2.currentDeck})</span>
                    )}
                  </p>
                  <span>
                    {formatScoreInString({ player: standing.player1 })}
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
