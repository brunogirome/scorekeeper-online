import { useState, useCallback, FormEvent, ChangeEvent } from 'react';

import { useTournament } from '../../../Hooks/tournamentContext';

import { Container } from './styles';

export function TournamentInfoCard() {
  const { tournament, setTournament } = useTournament();

  const [tournamentNameLocal, setTournamentName] = useState<string>(
    tournament.tournamentName,
  );

  const handleTournamentName = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const tournamentLocal = tournament;

      tournament.tournamentName = tournamentNameLocal;

      setTournament({ tournament: { ...tournamentLocal } });
    },
    [tournamentNameLocal],
  );

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
    </Container>
  );
}
