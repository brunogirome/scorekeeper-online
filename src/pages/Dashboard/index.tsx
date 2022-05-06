import { Container, Timer, PlayerTable, TourntamentInfo } from './styles';

export function Dashboard() {
  const minutesSeconds = '40:00';
  const milleseconds = ':00';

  return (
    <Container>
      <section>
        <Timer>
          <h1>
            {minutesSeconds} <span>{milleseconds}</span>
          </h1>
          <button type="button">Iniciar rodada</button>
          <div>
            <p>
              <span>Tempo</span>
              <input type="text" placeholder="Tempo em minutos" />
            </p>
            <p>
              <span>Descrição</span>
              <input type="text" placeholder="Descrição da rodada" />
            </p>
          </div>
        </Timer>
        <PlayerTable>
          <table cellSpacing={0} cellPadding={0}>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
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
                Início: <span>13:30</span>
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
        <div>
          <table>
            <tr>
              <th> </th>
              <th>Player 1</th>
              <th> </th>
              <th> </th>
              <th> </th>
              <th>Player2</th>
              <th>Tempo Extra</th>
              <th>
                <button type="button">Adicionar</button>
              </th>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <div>
                  <p>
                    <input type="text" placeholder="nome do jogador" />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input type="text" placeholder="Deck utilizado" />
                  </p>
                </div>
              </td>
              <td>
                <input type="text" placeholder="0" />
              </td>
              <td>VS.</td>
              <td>
                <input type="text" placeholder="0" />
              </td>
              <td>
                <div>
                  <p>
                    <input type="text" placeholder="nome do jogador" />
                  </p>
                  <p>
                    <span>Deck</span>
                    <input type="text" placeholder="Deck utilizado" />
                  </p>
                </div>
              </td>
              <td>
                <input type="text" placeholder="Tempo em minutos" />
              </td>
            </tr>
          </table>
        </div>
      </section>
    </Container>
  );
}
