import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import { useTournament } from '../../../Hooks/tournamentContext';
import { usePlayer } from '../../../Hooks/playerContext';
import { useTimer } from '../../../Hooks/timerContext';

import { Container } from './styles';

export function TournamentInfoCard() {
  const {
    tournament,
    setTournament,
    standings,
    clearStandings,
    storeLogo,
    setStoreLogo,
  } = useTournament();
  const { players, editPlayer } = usePlayer();

  const { resetTimer } = useTimer();

  const [tournamentNameLocal, setTournamentName] = useState<string>(
    tournament.tournamentName,
  );

  const handleTournamentName = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const newTounrament = tournament;

      tournament.tournamentName = tournamentNameLocal;

      setTournament({ tournament: { ...newTounrament } });
    },
    [setTournament, tournament, tournamentNameLocal],
  );

  const handleFinishRound = useCallback(() => {
    const finishTournamentFunction = () => {
      standings.forEach(standing => {
        const { player1, player2, scorePlayer1, scorePlayer2 } = standing;

        if (scorePlayer1 === scorePlayer2) {
          editPlayer({
            player: { ...player1, draws: player1.draws + 1, currentTable: 0 },
          });

          editPlayer({
            player: { ...player2, draws: player2.draws + 1, currentTable: 0 },
          });
        } else if (scorePlayer1 > scorePlayer2) {
          editPlayer({
            player: { ...player1, wins: player1.wins + 1, currentTable: 0 },
          });

          editPlayer({
            player: { ...player2, looses: player2.looses + 1, currentTable: 0 },
          });
        } else {
          editPlayer({
            player: { ...player2, wins: player2.wins + 1, currentTable: 0 },
          });

          editPlayer({
            player: { ...player1, looses: player1.looses + 1, currentTable: 0 },
          });
        }
      });

      clearStandings();

      resetTimer();
    };

    confirmAlert({
      message: `Deseja finalizar a rodada atual?`,
      buttons: [
        { label: 'Sim', onClick: finishTournamentFunction },
        { label: 'Não', onClick: () => undefined },
      ],
    });
  }, [clearStandings, editPlayer, standings, resetTimer]);

  const handleTournamentNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTournamentName(e.target.value);
    },
    [],
  );

  return (
    <Container>
      <div>
        <form onSubmit={handleTournamentName}>
          <span>Nome do torneio:</span>
          <input
            type="text"
            placeholder="Nome que será exibido na tela de pontuação"
            value={tournamentNameLocal}
            onChange={handleTournamentNameChange}
          />
        </form>
      </div>
      <div>
        <div className="generalInfo">
          <p>
            Participantes: <span>{players.length}</span>
          </p>
          <p>
            Rodadas: <span>TBA</span>
          </p>
          <p>
            Início da rodada: <span>TBA</span>
          </p>
          <div>
            <button type="button" onClick={handleFinishRound}>
              Finalizar rodada
            </button>
          </div>
        </div>
        <div className="checkboxRow">
          <h3>FINAIS</h3>
          <p>TBA</p>
          {/* <p>
            Rodada Final? <input type="checkbox" />
          </p>
          <p>
            Ícone de jogador genérico? <input type="checkbox" />
          </p>
          <p>
            Usar foto dos jogadores? <input type="checkbox" />
          </p> */}
        </div>
        <div className="checkboxRow">
          <h3>EXIBIÇÃO</h3>
          <p>
            Exibir deck dos jogadores? <input type="checkbox" />
          </p>
          <p>
            Exibir score dos jogadores? <input type="checkbox" />
          </p>
        </div>
        <div>
          <button type="button">Finalizar torneio</button>
        </div>
      </div>
    </Container>
  );
}
