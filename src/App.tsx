import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './routes';

import { GlobalStyle } from './styles/global';

import { AppProvider } from './Hooks';

export function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
}
