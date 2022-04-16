import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import Xicon from '../icons/Xicon';
import Oicon from '../icons/Oicon';

const Win = () => {
    const {winner, handleReset, handleNextRound, activeUser} = useContext(GameContext);
    return (
        <div className='score'>
            {winner && winner === activeUser && winner !== 'no' ? (
            <>
            <p>you win !</p>
            <h3 className={`score__title ${winner === 'o' ? 'text-yellow' : 'text-blue'}`}> 
            {(winner === 'x') ? (<Xicon />) : <Oicon />}
            Takes the round</h3>
            </>
            ): winner && winner !== activeUser && winner !== 'no' ? (
                <>
                <p>you lose !</p>
                <h3 className={`score__title ${winner === 'o' ? 'text-yellow' : 'text-blue'}`}> 
                {(winner === 'x') ? (<Xicon />) : <Oicon />}
                Takes the round</h3>
                </>
            ) :
            (
                <h3 className='score__title text-yellow'>No winner !</h3>
            )}
            <div className='score__btns'>
                <button className='btn btn-sm' onClick={handleReset}>Quit</button>
                <button className='btn btn-sm btn-yellow' onClick={handleNextRound}>Next Round</button>
            </div>
        </div>
    );
};

export default Win;