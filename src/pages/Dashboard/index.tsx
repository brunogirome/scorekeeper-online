import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  FocusEvent,
} from 'react';

import {
  Container,
  TimerContainer,
  PlayerTable,
  TourntamentInfo,
  TournamentBracket,
} from './styles';

import { useTimer } from '../../Hooks/timerContext';
import { Timer } from '../../components/Timer/index';

export function Dashboard() {
  const { playPause, setRoundTime, roundTime } = useTimer();

  const [roundTimeValue, setRoundTimeValue] = useState<string>(
    roundTime.toString(),
  );

  const handleRoundTime = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setRoundTimeValue(roundTimeValue);
      setRoundTime({ minutes: parseInt(roundTimeValue, 10) });
    },
    [roundTimeValue],
  );

  const handleRountTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRoundTimeValue(e.target.value);
    },
    [],
  );

  // const handleRoundTimeBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
  //   setRoundTimeValue(e.target.value);
  //   setRoundTime({ minutes: parseInt(roundTimeValue, 10) });
  // }, []);

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
                onChange={handleRountTimeChange}
                // onBlur={handleRoundTimeBlur}
              />
            </form>
            <form>
              <span>Descrição</span>
              <input type="text" placeholder="Descrição da rodada" />
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
            <span>Nome do torneio:</span>
            <input
              type="text"
              placeholder="Nome que será exibido na tela de pontuação"
            />
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
                  <button type="button">Adicionar</button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-number">
                  <span>1</span>
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
                </td>
                <td> </td>
              </tr>
            </tbody>
          </table>
        </TournamentBracket>
      </section>
    </Container>
  );
}
