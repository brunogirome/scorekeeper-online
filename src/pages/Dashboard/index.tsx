import { Container, PlayerTable } from './styles';

import { TimerCard } from './TimerCard';
import { TournamentInfoCard } from './TournamentInfoCard';
import { StandingsTable } from './StandingsTable/index';

export function Dashboard() {
  return (
    <Container>
      <section>
        <TimerCard />
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
            </tbody>
          </table>
        </PlayerTable>
      </section>
      <section>
        <TournamentInfoCard />
        <h2>Organização das mesas</h2>
        <StandingsTable />
      </section>
    </Container>
  );
}
