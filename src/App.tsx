import { GlobalStyle } from './styles/global';

import { AppProvider } from './Hooks';

import { Standings } from './pages/Standings';
// import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <>
      <AppProvider>
        <Standings />
      </AppProvider>
      <GlobalStyle />
    </>
  );
}
