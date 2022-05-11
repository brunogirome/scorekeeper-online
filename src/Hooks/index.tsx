import React from 'react';
import { TimerProvider } from './timerContext';
import { TournamentProvider } from './tournamentContext';
import { StoreProvider } from './storeContext';

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <StoreProvider>
      <TournamentProvider>
        <TimerProvider>{children}</TimerProvider>
      </TournamentProvider>
    </StoreProvider>
  );
}
