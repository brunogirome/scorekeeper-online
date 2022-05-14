import { useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { MdAddCircleOutline } from 'react-icons/md';

import { Container } from './styles';

import { usePlayer, Player } from '../../../Hooks/playerContext';
import { formatScoreInString } from '../../../utils/formatScoreInString';

interface PlayersTableProps {
  handleOpenPlayersModal(): void;
}

export function PlayersTable({ handleOpenPlayersModal }: PlayersTableProps) {
  const { players, removePlayer } = usePlayer();

  const handleRemovePlayer = useCallback(
    (player: Player) =>
      confirmAlert({
        message: `Deseja remover o player ${player.name}?`,
        buttons: [
          { label: 'Sim', onClick: () => removePlayer(player.id) },
          { label: 'Não', onClick: () => undefined },
        ],
      }),
    [removePlayer],
  );

  return (
    <Container>
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <button type="button" onClick={handleOpenPlayersModal}>
                <MdAddCircleOutline />
              </button>
            </td>
          </tr>
          {players.map(player => (
            <tr key={player.id} onClick={() => handleRemovePlayer(player)}>
              <td>{player.name}</td>
              <td>{formatScoreInString({ player })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
