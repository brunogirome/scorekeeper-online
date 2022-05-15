import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { MdSave, MdDelete, MdModeEditOutline } from 'react-icons/md';

import { useTournament, Standing } from '../../../Hooks/tournamentContext';

import { Container } from './styles';

interface StandingsTableProps {
  handleOpenStandingsModal(standing: Standing | undefined): void;
}

interface LocalStanding extends Standing {
  isEditable: boolean;
}

export function StandingsTable({
  handleOpenStandingsModal,
}: StandingsTableProps) {
  const { standings, editStandings } = useTournament();

  const [localStandings, setLocalStandings] = useState([] as LocalStanding[]);

  useEffect(() => {
    setLocalStandings(
      standings.map(standing => ({ ...standing, isEditable: false })),
    );
  }, [standings]);

  const handleEdit = useCallback(
    (standing: Standing) => {
      handleOpenStandingsModal(standing);
    },
    [handleOpenStandingsModal],
  );

  const handleInput = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      field: 'scorePlayer1' | 'scorePlayer2' | 'timeExtension',
      standing: Standing,
    ) => {
      let parsedValue = parseInt(e.target.value, 10);

      parsedValue = Number.isNaN(parsedValue) ? 0 : parsedValue;

      if (parsedValue > 2 || parsedValue < 0) {
        return;
      }

      const standingIndex = localStandings.findIndex(
        findStanding => findStanding.table === standing.table,
      );

      const newStandings = localStandings;

      switch (field) {
        case 'scorePlayer1':
          newStandings[standingIndex][field] = parsedValue;
          break;
        case 'scorePlayer2':
          newStandings[standingIndex][field] = parsedValue;
          break;
        case 'timeExtension':
          newStandings[standingIndex][field] = parsedValue;
          break;
        default:
          break;
      }

      setLocalStandings([...newStandings]);
    },
    [localStandings],
  );

  const handleSave = useCallback(
    (localStanding: LocalStanding) => {
      const standingIndex = localStandings.findIndex(
        findStanding => findStanding.table === localStanding.table,
      );

      const standing: Omit<LocalStanding, 'isEditable'> =
        localStandings[standingIndex];

      editStandings({ standing });
    },
    [editStandings, localStandings],
  );

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
              <button
                type="button"
                onClick={() => handleOpenStandingsModal(undefined)}
              >
                Adicionar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {localStandings.map(standing => (
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
                      readOnly
                    />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input
                      type="text"
                      placeholder="Deck utilizado"
                      value={standing.player1.currentDeck}
                      readOnly
                    />
                  </p>
                </div>
              </td>
              <td className="player-score">
                <input
                  type="text"
                  placeholder="0"
                  value={standing.scorePlayer1}
                  onChange={e => handleInput(e, 'scorePlayer1', standing)}
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
                  onChange={e => handleInput(e, 'scorePlayer2', standing)}
                />
              </td>
              <td className="player-info">
                <div>
                  <p className="player-name">
                    <input
                      type="text"
                      placeholder="Nome do jogador"
                      value={standing.player2.name}
                      readOnly
                    />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input
                      type="text"
                      placeholder="Deck utilizado"
                      value={standing.player2.currentDeck}
                      readOnly
                    />
                  </p>
                </div>
              </td>
              <td className="extra-info">
                <input
                  type="number"
                  placeholder="Tempo em minutos"
                  value={standing.timeExtension}
                  onChange={e => handleInput(e, 'timeExtension', standing)}
                />
                <button type="button" onClick={() => handleSave(standing)}>
                  <MdSave />
                </button>
                <button type="button" onClick={() => handleEdit(standing)}>
                  <MdModeEditOutline />
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
