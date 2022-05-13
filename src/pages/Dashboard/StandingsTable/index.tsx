import { useState, useCallback } from 'react';
import { MdSave, MdDelete, MdModeEditOutline } from 'react-icons/md';

import { Player } from '../../../Hooks/playerContext';
import { useTournament, Standing } from '../../../Hooks/tournamentContext';

import { Container } from './styles';

interface StandingsTableProps {
  handleOpenStandingsModal(): void;
}

export function StandingsTable({
  handleOpenStandingsModal,
}: StandingsTableProps) {
  const { standings } = useTournament();

  const [localStandings, setLocalStandings] = useState<Standing[]>(
    standings || [],
  );

  const handleAddEmptyStanding = useCallback(() => {
    const newLocalStandings = localStandings;

    newLocalStandings.push({
      round: 1,
      table: localStandings.length + 1,
      player1: {} as Player,
      player2: {} as Player,
      scorePlayer1: 0,
      scorePlayer2: 0,
      scoreTournamentPlayer1: '1-2-3',
      scoreTournamentPlayer2: '4-5-6',
      timeExtension: 0,
    });

    handleOpenStandingsModal();

    setLocalStandings([...newLocalStandings]);
  }, [localStandings]);

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
              <button type="button" onClick={handleAddEmptyStanding}>
                Adicionar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {localStandings.map(localStanding => (
            <tr key={localStanding.table}>
              <td className="table-number">
                <span>{localStanding.table}</span>
              </td>
              <td className="player-info">
                <div>
                  <p className="player-name">
                    <input type="text" placeholder="nome do jogador" />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input type="text" placeholder="Deck utilizado" />
                  </p>
                </div>
              </td>
              <td className="player-score">
                <input type="text" placeholder="0" />
              </td>
              <td className="vs-row">
                <span>VS.</span>
              </td>
              <td className="player-score">
                <input type="number" placeholder="0" />
              </td>
              <td className="player-info">
                <div>
                  <p className="player-name">
                    <input type="text" placeholder="nome do jogador" />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input type="text" placeholder="Deck utilizado" />
                  </p>
                </div>
              </td>
              <td className="extra-info">
                <input type="number" placeholder="Tempo em minutos" />
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
