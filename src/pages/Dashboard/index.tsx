import { useState, useCallback } from 'react';

import { Container } from './styles';

import { Standing } from '../../Hooks/tournamentContext';

import { TimerCard } from './TimerCard';
import { TournamentInfoCard } from './TournamentInfoCard';
import { StandingsTable } from './StandingsTable';
import { PlayersTable } from './PlayersTable';

import { StandingModal } from '../../components/StandingModal';
import { PlayerModal } from '../../components/PlayerModal';

export function Dashboard() {
  const [isStandingsModalOpen, setIsStandingsModalOpen] = useState(false);

  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false);

  const [editedStanding, setEditedStanding] = useState(
    {} as Standing | undefined,
  );

  const handleOpenStandingsModal = useCallback((standing?: Standing) => {
    setIsStandingsModalOpen(true);
    setEditedStanding(standing);
  }, []);

  const handleOpenPlayersModal = useCallback(() => {
    setIsPlayersModalOpen(true);
  }, []);

  return (
    <Container>
      <StandingModal
        isOpen={isStandingsModalOpen}
        setIsStandingsModalOpen={setIsStandingsModalOpen}
        editedStanding={editedStanding}
      />
      <PlayerModal
        isOpen={isPlayersModalOpen}
        setIsPlayersModalOpen={setIsPlayersModalOpen}
      />
      <section>
        <TimerCard />
        <PlayersTable handleOpenPlayersModal={handleOpenPlayersModal} />
      </section>
      <section>
        <TournamentInfoCard />
        <h2>Organização das mesas</h2>
        <StandingsTable handleOpenStandingsModal={handleOpenStandingsModal} />
      </section>
    </Container>
  );
}
