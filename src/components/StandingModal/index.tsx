import { useCallback, FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { usePlayer } from '../../Hooks/playerContext';
import { useTournament } from '../../Hooks/tournamentContext';

import {
  Container,
  PlayerSelector,
  PlayersDecks,
  PlayersScores,
  ButtonContainer,
} from './styles';

interface StandingModalProps {
  isOpen: boolean;
  setIsStandingModalOpen: (isOpen: boolean) => void;
}

interface AvailablePlayer {
  key: string;
  isPlayer1: boolean;
  isPlayer2: boolean;
  name: string;
}

export function StandingModal({
  isOpen,
  setIsStandingModalOpen,
}: StandingModalProps) {
  const { standings } = useTournament();
  const { players } = usePlayer();

  const [availablePlayers, setAvailablePlayers] = useState<AvailablePlayer[]>(
    () =>
      players
        .filter(player => player.currentTable === 0)
        .map(player => ({
          key: player.id,
          isPlayer1: false,
          isPlayer2: false,
          name: player.name,
        })),
  );

  const handleSelectPlayer = useCallback(
    ({ key, playerNumber }: { key: string; playerNumber: 1 | 2 }) => {
      const playerIndex = players.findIndex(player => player.id === key);

      let newAvailablePlayers = availablePlayers;

      const { isPlayer1, isPlayer2 } = availablePlayers[playerIndex];

      if (
        (isPlayer1 && playerNumber === 1) ||
        (isPlayer2 && playerNumber === 2)
      ) {
        return;
      }

      newAvailablePlayers = newAvailablePlayers.map(player => {
        const newPlayer = player;

        if (playerNumber === 1 && player.isPlayer1) {
          newPlayer.isPlayer1 = false;
          return { ...newPlayer };
        }

        if (playerNumber === 2 && player.isPlayer2) {
          newPlayer.isPlayer2 = false;
          return { ...newPlayer };
        }

        return player;
      });

      if (isPlayer2 && playerNumber === 1) {
        newAvailablePlayers[playerIndex].isPlayer2 = false;
        newAvailablePlayers[playerIndex].isPlayer1 = true;
        setAvailablePlayers([...newAvailablePlayers]);
        return;
      }

      if (isPlayer1 && playerNumber === 2) {
        newAvailablePlayers[playerIndex].isPlayer2 = false;
        newAvailablePlayers[playerIndex].isPlayer1 = true;
        setAvailablePlayers([...newAvailablePlayers]);
        return;
      }

      if (playerNumber === 1) {
        newAvailablePlayers[playerIndex].isPlayer1 = true;
      } else {
        newAvailablePlayers[playerIndex].isPlayer2 = true;
      }

      setAvailablePlayers([...newAvailablePlayers]);
    },
    [],
  );

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsStandingModalOpen(false);
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleSubmit}>
        <h1>Criação da mesa {standings.length + 1}</h1>

        <h2>Jogadores</h2>
        <PlayerSelector>
          <table>
            <thead>
              <tr>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {availablePlayers.map(player => (
                <tr key={player.key}>
                  <td>
                    <input
                      type="checkbox"
                      checked={player.isPlayer1}
                      onChange={() =>
                        handleSelectPlayer({ key: player.key, playerNumber: 1 })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={player.isPlayer2}
                      onChange={() =>
                        handleSelectPlayer({ key: player.key, playerNumber: 2 })
                      }
                    />
                  </td>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <input type="text" placeholder="Player 1" readOnly />
            <span>VS.</span>
            <input type="text" placeholder="Player 2" readOnly />
          </div>
        </PlayerSelector>
        <h2>Decks</h2>
        <PlayersDecks>
          <div>
            <span>Player 1</span>
            <input type="text" placeholder="Nome do deck" />
          </div>
          <div>
            <span>Player 2</span>
            <input type="text" placeholder="Nome do deck" />
          </div>
        </PlayersDecks>
        <h2>Scores</h2>
        <PlayersScores>
          <div>
            <span>Player 1</span>
            <div>
              <div>
                <span>V</span>
                <input type="number" placeholder="0" />
              </div>
              <div>
                <span>E</span>
                <input type="number" placeholder="0" />
              </div>
              <div>
                <span>D</span>
                <input type="number" placeholder="0" />
              </div>
            </div>
          </div>
          <div>
            <span>Player 2</span>
            <div>
              <div>
                <span>V</span>
                <input type="number" placeholder="0" />
              </div>
              <div>
                <span>E</span>
                <input type="number" placeholder="0" />
              </div>
              <div>
                <span>D</span>
                <input type="number" placeholder="0" />
              </div>
            </div>
          </div>
        </PlayersScores>
        <ButtonContainer>
          <button type="submit">Cancelar</button>
          <button type="submit">Adicionar</button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}
