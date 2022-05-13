import React from 'react';
import { TimerProvider } from './timerContext';
import { TournamentProvider } from './tournamentContext';
import { StoreProvider } from './storeContext';
import { PlayerProvider } from './playerContext';

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <StoreProvider>
      <TournamentProvider>
        <PlayerProvider>
          <TimerProvider>{children}</TimerProvider>
        </PlayerProvider>
      </TournamentProvider>
    </StoreProvider>
  );
}
