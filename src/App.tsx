import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';

import { Routes } from './routes';

import { GlobalStyle } from './styles/global';

import { AppProvider } from './Hooks';

import 'react-confirm-alert/src/react-confirm-alert.css';

Modal.setAppElement('#root');

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
