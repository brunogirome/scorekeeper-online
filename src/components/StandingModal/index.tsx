import {
  useCallback,
  FormEvent,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import Modal from 'react-modal';

import { usePlayer, Player } from '../../Hooks/playerContext';
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
  setIsStandingsModalOpen: (isOpen: boolean) => void;
}

interface AvailablePlayer extends Player {
  isPlayer1: boolean;
  isPlayer2: boolean;
}

const EMPTY_PLAYER = {
  id: '',
  name: '',
  currentDeck: '',
  wins: 0,
  draws: 0,
  looses: 0,
  currentTable: 0,
};

export function StandingModal({
  isOpen,
  setIsStandingsModalOpen,
}: StandingModalProps) {
  const { standings, addStanding } = useTournament();
  const { players, editPlayer } = usePlayer();

  const currentTable = standings.length + 1;

  const getAvailablePlayers = useCallback(
    () =>
      players
        .filter(player => player.currentTable === 0)
        .map(player => ({
          ...player,
          isPlayer1: false,
          isPlayer2: false,
        })),
    [players],
  );

  const [availablePlayers, setAvailablePlayers] = useState(
    [] as AvailablePlayer[],
  );

  const [selectedPlayer1, setSelectedPlayer1] = useState<Player>(EMPTY_PLAYER);

  const [selectedPlayer2, setSelectedPlayer2] = useState<Player>(EMPTY_PLAYER);

  const handleSelectPlayer = useCallback(
    ({
      player,
      playerNumber,
    }: {
      player: AvailablePlayer;
      playerNumber: 1 | 2;
    }) => {
      const playerIndex = availablePlayers.findIndex(
        findPlayer => findPlayer.id === player.id,
      );

      let newAvailablePlayers = availablePlayers;

      const { isPlayer1, isPlayer2 } = availablePlayers[playerIndex];

      const selectedPlayer = { ...player, currentTable };

      if (
        (isPlayer1 && playerNumber === 1) ||
        (isPlayer2 && playerNumber === 2)
      ) {
        return;
      }

      newAvailablePlayers = newAvailablePlayers.map(availablePlayer => {
        const newAvailablePlayer = availablePlayer;

        if (playerNumber === 1 && availablePlayer.isPlayer1) {
          newAvailablePlayer.isPlayer1 = false;
          return newAvailablePlayer;
        }

        if (playerNumber === 2 && availablePlayer.isPlayer2) {
          newAvailablePlayer.isPlayer2 = false;
          return newAvailablePlayer;
        }

        return availablePlayer;
      });

      if (playerNumber === 1) {
        setSelectedPlayer1(selectedPlayer);
      } else {
        setSelectedPlayer2(selectedPlayer);
      }

      if (isPlayer2 && playerNumber === 1) {
        newAvailablePlayers[playerIndex].isPlayer1 = true;
        newAvailablePlayers[playerIndex].isPlayer2 = false;
        setAvailablePlayers([...newAvailablePlayers]);

        setSelectedPlayer2(EMPTY_PLAYER);

        return;
      }

      if (isPlayer1 && playerNumber === 2) {
        newAvailablePlayers[playerIndex].isPlayer1 = false;
        newAvailablePlayers[playerIndex].isPlayer2 = true;
        setAvailablePlayers([...newAvailablePlayers]);

        setSelectedPlayer1(EMPTY_PLAYER);
        return;
      }

      if (playerNumber === 1) {
        newAvailablePlayers[playerIndex].isPlayer1 = true;
      } else {
        newAvailablePlayers[playerIndex].isPlayer2 = true;
      }

      setAvailablePlayers([...newAvailablePlayers]);
    },
    [availablePlayers, currentTable],
  );

  const handleCloseNewStandingsModal = useCallback(() => {
    setIsStandingsModalOpen(false);
  }, [setIsStandingsModalOpen]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      editPlayer({ player: selectedPlayer1 });

      editPlayer({ player: selectedPlayer2 });

      const standing = {
        round: 0,
        table: currentTable,
        player1: selectedPlayer1,
        player2: selectedPlayer2,
        scorePlayer1: 0,
        scorePlayer2: 0,
        scoreTournamentPlayer1: `V${selectedPlayer1.wins} - E${selectedPlayer1.draws} - D${selectedPlayer1.looses}`,
        scoreTournamentPlayer2: `V${selectedPlayer2.wins} - E${selectedPlayer2.draws} - D${selectedPlayer2.looses}`,
        timeExtension: 0,
      };

      addStanding({ standing });
    },
    [selectedPlayer1, selectedPlayer2, editPlayer, currentTable, addStanding],
  );

  const handleChangeScore = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      value: 'wins' | 'draws' | 'looses',
      playerNumber: 1 | 2,
    ) => {
      if (playerNumber === 1) {
        const newSelectedPlayer = selectedPlayer1;
        newSelectedPlayer[value] = Number.parseInt(e.target.value, 10);
        setSelectedPlayer1({ ...newSelectedPlayer });
      } else {
        const newSelectedPlayer = selectedPlayer2;
        newSelectedPlayer[value] = Number.parseInt(e.target.value, 10);
        setSelectedPlayer2({ ...newSelectedPlayer });
      }
    },
    [selectedPlayer1, selectedPlayer2],
  );

  useEffect(() => {
    setAvailablePlayers([...getAvailablePlayers()]);
  }, [players, setAvailablePlayers, getAvailablePlayers]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseNewStandingsModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleSubmit}>
        <h1>Criação da mesa {currentTable}</h1>

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
                <tr key={player.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={player.isPlayer1}
                      onChange={() =>
                        handleSelectPlayer({
                          player,
                          playerNumber: 1,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={player.isPlayer2}
                      onChange={() =>
                        handleSelectPlayer({
                          player,
                          playerNumber: 2,
                        })
                      }
                    />
                  </td>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <input
              type="text"
              placeholder="Player 1"
              readOnly
              value={selectedPlayer1.name}
            />
            <span>VS.</span>
            <input
              type="text"
              placeholder="Player 2"
              readOnly
              value={selectedPlayer2.name}
            />
          </div>
        </PlayerSelector>
        <h2>Decks</h2>
        <PlayersDecks>
          <div>
            <span>Player 1</span>
            <input
              type="text"
              placeholder="Nome do deck"
              value={selectedPlayer1.currentDeck}
              onChange={e =>
                setSelectedPlayer1({
                  ...selectedPlayer1,
                  currentDeck: e.target.value,
                })
              }
            />
          </div>
          <div>
            <span>Player 2</span>
            <input
              type="text"
              placeholder="Nome do deck"
              value={selectedPlayer2.currentDeck}
              onChange={e =>
                setSelectedPlayer2({
                  ...selectedPlayer2,
                  currentDeck: e.target.value,
                })
              }
            />
          </div>
        </PlayersDecks>
        <h2>Scores</h2>
        <PlayersScores>
          <div>
            <span>Player 1</span>
            <div>
              <div>
                <span>V</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleChangeScore(e, 'wins', 1)}
                  value={selectedPlayer1.wins}
                />
              </div>
              <div>
                <span>E</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleChangeScore(e, 'draws', 1)}
                  value={selectedPlayer1.draws}
                />
              </div>
              <div>
                <span>D</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleChangeScore(e, 'looses', 1)}
                  value={selectedPlayer1.looses}
                />
              </div>
            </div>
          </div>
          <div>
            <span>Player 2</span>
            <div>
              <div>
                <span>V</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleChangeScore(e, 'wins', 2)}
                  value={selectedPlayer2.wins}
                />
              </div>
              <div>
                <span>E</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleChangeScore(e, 'draws', 2)}
                  value={selectedPlayer2.draws}
                />
              </div>
              <div>
                <span>D</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleChangeScore(e, 'looses', 2)}
                  value={selectedPlayer2.looses}
                />
              </div>
            </div>
          </div>
        </PlayersScores>
        <ButtonContainer>
          <button onClick={handleCloseNewStandingsModal} type="button">
            Cancelar
          </button>
          <button type="submit">Adicionar</button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}
