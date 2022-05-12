import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { MdSave, MdDelete, MdModeEditOutline } from 'react-icons/md';

import {
  Container,
  TimerContainer,
  PlayerTable,
  TourntamentInfo,
  TournamentBracket,
} from './styles';

import { useTimer } from '../../Hooks/timerContext';
import { Player } from '../../Hooks/playerContext';
import { useTournament, Standing } from '../../Hooks/tournamentContext';
import { Timer } from '../../components/Timer/index';

export function Dashboard() {
  const { playPause, setRoundTime, roundTime } = useTimer();

  const { tournament, setTournament, standings } = useTournament();

  const [tournamentNameLocal, setTournamentName] = useState<string>(
    tournament.tournamentName,
  );

  const [roundDescriptionLocal, setRoundDescription] = useState<string>(
    tournament.roundDescription,
  );

  const [roundTimeValue, setRoundTimeValue] = useState<string>(
    roundTime.toString(),
  );

  const [localStandings, setLocalStandings] = useState<Standing[]>(standings);

  const handleTournamentName = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const tournamentLocal = tournament;

      tournament.tournamentName = tournamentNameLocal;

      setTournament({ tournament: { ...tournamentLocal } });
    },
    [tournamentNameLocal],
  );
  const handleTournamentRound = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const tournamentLocal = tournament;

      tournament.roundDescription = roundDescriptionLocal;

      setTournament({ tournament: { ...tournamentLocal } });
    },
    [roundDescriptionLocal],
  );

  const handleRoundTime = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setRoundTimeValue(roundTimeValue);
      setRoundTime({ minutes: parseInt(roundTimeValue, 10) });
    },
    [roundTimeValue],
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

    setLocalStandings([...newLocalStandings]);

    console.log(JSON.stringify([...localStandings]));
  }, [localStandings]);

  const handleRoundTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRoundTimeValue(e.target.value);
    },
    [],
  );

  const handleTournamentNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTournamentName(e.target.value);
    },
    [],
  );

  const handleTournamentRoundDescription = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRoundDescription(e.target.value);
    },
    [],
  );

  return (
    <Container>
      <section>
        <TimerContainer>
          <Timer />
          <button type="button" onClick={playPause}>
            Iniciar rodada
          </button>
          <div>
            <form onSubmit={handleRoundTime}>
              <span>Tempo</span>
              <input
                type="text"
                placeholder="Tempo em minutos"
                value={roundTimeValue}
                onChange={handleRoundTimeChange}
              />
            </form>
            <form onSubmit={handleTournamentRound}>
              <span>Descrição</span>
              <input
                type="text"
                placeholder="Descrição da rodada"
                value={roundDescriptionLocal}
                onChange={handleTournamentRoundDescription}
              />
            </form>
          </div>
        </TimerContainer>
        <PlayerTable>
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
                  <div>add</div>
                </td>
              </tr>
              <tr>
                <td>Player name</td>
                <td>10 V - 10 E - 10 D</td>
              </tr>
              <tr>
                <td>Player name</td>
                <td>0 V - 0 E - 0 D</td>
              </tr>
              <tr>
                <td>Player name</td>
                <td>0 V - 0 E - 0 D</td>
              </tr>
            </tbody>
          </table>
        </PlayerTable>
      </section>
      <section>
        <TourntamentInfo>
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
                Participantes: <span>13</span>
              </p>
              <p>
                Rodadas: <span>3</span>
              </p>
              <p>
                Início da rodada: <span>13:30</span>
              </p>
              <div>
                <button type="button">Finalizar rodada</button>
              </div>
            </div>
            <div className="checkboxRow">
              <h3>FINAIS</h3>
              <p>
                Rodada Final? <input type="checkbox" />
              </p>
              <p>
                Ícone de jogador genérico? <input type="checkbox" />
              </p>
              <p>
                Usar foto dos jogadores? <input type="checkbox" />
              </p>
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
        </TourntamentInfo>
        <h2>Organização das mesas</h2>
        <TournamentBracket>
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
        </TournamentBracket>
      </section>
    </Container>
  );
}
