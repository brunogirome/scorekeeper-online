import { useState, useCallback } from 'react';

import { Container } from './styles';

import { TimerCard } from './TimerCard';
import { TournamentInfoCard } from './TournamentInfoCard';
import { StandingsTable } from './StandingsTable';
import { PlayersTable } from './PlayersTable';

import { StandingModal } from '../../components/StandingModal';
import { PlayerModal } from '../../components/PlayerModal';

export function Dashboard() {
  const [isStandingsModalOpen, setIsStandingsModalOpen] = useState(false);

  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false);

  const handleOpenStandingsModal = useCallback(() => {
    setIsStandingsModalOpen(true);
  }, []);

  const handleOpenPlayersModal = useCallback(() => {
    setIsPlayersModalOpen(true);
  }, []);

  return (
    <Container>
      <StandingModal
        isOpen={isStandingsModalOpen}
        setIsStandingsModalOpen={setIsStandingsModalOpen}
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
