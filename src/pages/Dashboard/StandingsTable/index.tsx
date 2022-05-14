import { MdSave, MdDelete, MdModeEditOutline } from 'react-icons/md';

import { useTournament, Standing } from '../../../Hooks/tournamentContext';

import { Container } from './styles';

interface StandingsTableProps {
  handleOpenStandingsModal(): void;
}

export function StandingsTable({
  handleOpenStandingsModal,
}: StandingsTableProps) {
  const { standings } = useTournament();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Player 1</th>
            <th> </th>
            <th> </th>
            <th> </th>
            <th>Player2</th>
            <th>Tempo Extra</th>
            <th className="last-row">
              <button type="button" onClick={handleOpenStandingsModal}>
                Adicionar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map(standing => (
            <tr key={standing.table}>
              <td className="table-number">
                <span>{standing.table}</span>
              </td>
              <td className="player-info">
                <div>
                  <p className="player-name">
                    <input
                      type="text"
                      placeholder="Nome do jogador"
                      value={standing.player1.name}
                    />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input
                      type="text"
                      placeholder="Deck utilizado"
                      value={standing.player1.currentDeck}
                    />
                  </p>
                </div>
              </td>
              <td className="player-score">
                <input
                  type="text"
                  placeholder="0"
                  value={standing.scorePlayer1}
                />
              </td>
              <td className="vs-row">
                <span>VS.</span>
              </td>
              <td className="player-score">
                <input
                  type="number"
                  placeholder="0"
                  value={standing.scorePlayer2}
                />
              </td>
              <td className="player-info">
                <div>
                  <p className="player-name">
                    <input
                      type="text"
                      placeholder="Nome do jogador"
                      value={standing.player2.name}
                    />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input
                      type="text"
                      placeholder="Deck utilizado"
                      value={standing.player2.currentDeck}
                    />
                  </p>
                </div>
              </td>
              <td className="extra-info">
                <input
                  type="number"
                  placeholder="Tempo em minutos"
                  value={standing.timeExtension}
                />
                <button type="button">
                  <MdModeEditOutline />
                </button>
                <button type="button">
                  <MdSave />
                </button>
                <button type="button">
                  <MdDelete />
                </button>
              </td>
              <td> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
