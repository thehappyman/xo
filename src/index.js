import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GameState } from './context/GameContext';
import { ModalState } from './context/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <ModalState>
      <GameState>
        <App />
      </GameState>
    </ModalState>
  </React.StrictMode>,
  document.getElementById('root')
);
