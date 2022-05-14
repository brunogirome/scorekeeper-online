import { useCallback, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';

import { usePlayer } from '../../Hooks/playerContext';

import { Container, ButtonContainer } from './styles';

interface PlayerModalProps {
  isOpen: boolean;
  setIsPlayersModalOpen: (isOpen: boolean) => void;
}

export function PlayerModal({
  isOpen,
  setIsPlayersModalOpen,
}: PlayerModalProps) {
  const handleCloseNewPlayersModal = useCallback(
    () => setIsPlayersModalOpen(false),
    [setIsPlayersModalOpen],
  );

  const { addPlayer } = usePlayer();

  const [name, setName] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const player = {
        id: uuid(),
        name,
        currentDeck: '',
        wins: 0,
        draws: 0,
        looses: 0,
        currentTable: 0,
      };

      addPlayer({ player });

      handleCloseNewPlayersModal();
    },
    [name, addPlayer, handleCloseNewPlayersModal],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseNewPlayersModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleSubmit}>
        <h1>Insira um novo jogador</h1>

        <div>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome do jogador"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <ButtonContainer>
          <button type="button" onClick={handleCloseNewPlayersModal}>
            Cancelar
          </button>
          <button type="submit">Adicionar</button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}
