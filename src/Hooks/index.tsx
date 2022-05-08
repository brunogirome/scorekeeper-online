import React from 'react';
import { TimerProvider } from './timerContext';

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return <TimerProvider>{children}</TimerProvider>;
}
