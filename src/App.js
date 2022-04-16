import './index.css'
import Board from './components/board/Board';
import Start from './components/start/Start';
import Modal from './components/modal/Modal';
import { useContext } from 'react';
import { GameContext } from './context/GameContext';

const App = () => {
  const { screen } = useContext(GameContext);

  return (
    <div className='App'>
      <div className='container'>
        {screen === 'start' && <Start />}
        {screen === 'game' && <Board />}
      </div>
      <Modal />
    </div>
  );
};

export default App;