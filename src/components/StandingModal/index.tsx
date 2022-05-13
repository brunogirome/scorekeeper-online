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
  currentDeck: string;
}

interface SelectedPlayer {
  id: string;
  name: string;
  deck: string;
}

export function StandingModal({
  isOpen,
  setIsStandingModalOpen,
}: StandingModalProps) {
  const { standings, addStanding } = useTournament();
  const { players, getPlayer, editPlayer } = usePlayer();

  const [availablePlayers, setAvailablePlayers] = useState<AvailablePlayer[]>(
    () =>
      players
        .filter(player => player.currentTable === 0)
        .map(({ id, name, currentDeck }) => ({
          key: id,
          isPlayer1: false,
          isPlayer2: false,
          name,
          currentDeck,
        })),
  );

  const [selectedPlayer1, setSelectedPlayer1] = useState<SelectedPlayer>({
    id: '',
    name: '',
    deck: '',
  } as SelectedPlayer);

  const [selectedPlayer2, setSelectedPlayer2] = useState<SelectedPlayer>({
    id: '',
    name: '',
    deck: '',
  } as SelectedPlayer);

  const [victorysPlayer1, setVictorysPlayer1] = useState(0);

  const [drawsPlayer1, setDrawsPlayer1] = useState(0);

  const [loosesPlayer1, setLoosesPlayer1] = useState(0);

  const [victorysPlayer2, setVictorysPlayer2] = useState(0);

  const [drawsPlayer2, setDrawsPlayer2] = useState(0);

  const [loosesPlayer2, setLoosesPlayer2] = useState(0);

  const handleSelectPlayer = useCallback(
    ({
      key,
      playerNumber,
      deck,
    }: {
      key: string;
      playerNumber: 1 | 2;
      deck: string;
    }) => {
      const playerIndex = players.findIndex(player => player.id === key);

      let newAvailablePlayers = availablePlayers;

      const { isPlayer1, isPlayer2, name } = availablePlayers[playerIndex];

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

      if (playerNumber === 1) {
        setSelectedPlayer1({ id: key, name, deck });
      } else {
        setSelectedPlayer2({ id: key, name, deck });
      }

      if (isPlayer2 && playerNumber === 1) {
        newAvailablePlayers[playerIndex].isPlayer1 = true;
        newAvailablePlayers[playerIndex].isPlayer2 = false;
        setAvailablePlayers([...newAvailablePlayers]);

        setSelectedPlayer2({ id: '', name: '', deck: '' });
        return;
      }

      if (isPlayer1 && playerNumber === 2) {
        newAvailablePlayers[playerIndex].isPlayer1 = false;
        newAvailablePlayers[playerIndex].isPlayer2 = true;
        setAvailablePlayers([...newAvailablePlayers]);

        setSelectedPlayer1({ id: '', name: '', deck: '' });
        return;
      }

      if (playerNumber === 1) {
        newAvailablePlayers[playerIndex].isPlayer1 = true;
      } else {
        newAvailablePlayers[playerIndex].isPlayer2 = true;
      }

      setAvailablePlayers([...newAvailablePlayers]);
    },
    [players, availablePlayers],
  );

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsStandingModalOpen(false);
  }, [selectedPlayer1]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      console.log(selectedPlayer1);

      const player1 = getPlayer(selectedPlayer1.id);

      const player2 = getPlayer(selectedPlayer2.id);

      player1.currentDeck = selectedPlayer1.deck;

      player2.currentDeck = selectedPlayer2.deck;

      editPlayer({ player: player1 });

      editPlayer({ player: player2 });

      const newStanding = {
        round: 0,
        player1,
        player2,
        scorePlayer1: 0,
        scorePlayer2: 0,
        scoreTournamentPlayer1: `V${victorysPlayer1} - E${drawsPlayer1} - D${loosesPlayer1}`,
        scoreTournamentPlayer2: `V${victorysPlayer2} - E${drawsPlayer2} - D${loosesPlayer2}`,
        table: standings.length + 1,
        timeExtension: 0,
      };

      // addStanding({
      //   standing: newStanding,
      // });

      console.log(newStanding);
    },
    [selectedPlayer1, selectedPlayer2],
  );

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
                        handleSelectPlayer({
                          key: player.key,
                          playerNumber: 1,
                          deck: player.currentDeck,
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
                          key: player.key,
                          playerNumber: 2,
                          deck: player.currentDeck,
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
              value={selectedPlayer1.deck}
              onChange={e =>
                setSelectedPlayer1({ ...selectedPlayer1, deck: e.target.value })
              }
            />
          </div>
          <div>
            <span>Player 2</span>
            <input
              type="text"
              placeholder="Nome do deck"
              value={selectedPlayer2.deck}
              onChange={e =>
                setSelectedPlayer2({ ...selectedPlayer2, deck: e.target.value })
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
                  onChange={e =>
                    setVictorysPlayer1(Number.parseInt(e.target.value, 10))
                  }
                  value={victorysPlayer1}
                />
              </div>
              <div>
                <span>E</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e =>
                    setDrawsPlayer1(Number.parseInt(e.target.value, 10))
                  }
                  value={drawsPlayer1}
                />
              </div>
              <div>
                <span>D</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e =>
                    setLoosesPlayer1(Number.parseInt(e.target.value, 10))
                  }
                  value={loosesPlayer1}
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
                  onChange={e =>
                    setVictorysPlayer2(Number.parseInt(e.target.value, 10))
                  }
                  value={victorysPlayer2}
                />
              </div>
              <div>
                <span>E</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e =>
                    setDrawsPlayer2(Number.parseInt(e.target.value, 10))
                  }
                  value={drawsPlayer2}
                />
              </div>
              <div>
                <span>D</span>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e =>
                    setLoosesPlayer2(Number.parseInt(e.target.value, 10))
                  }
                  value={loosesPlayer2}
                />
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
