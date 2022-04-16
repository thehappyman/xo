import { createContext, useContext, useEffect, useState } from "react";
import { calcBestMove, CalcWinner } from "../helpers/CalcSquares";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
    const {showModal, hideModal, setModalMode} = useContext(ModalContext);

    const [screen, setScreen] = useState('start');
    const [activeUser, setActiveUser] = useState('x');
    const [playMode, setPlayMode] = useState('user');
    const [squares, setSquares] = useState(new Array(9).fill(''));
    const [xnext, setXnext] = useState(false);
    const [winner, setWinner] = useState(null);
    const [winnerLine, setWinnerLine] = useState(null);
    const [ties, setTies] = useState({x:0, o:0});

    useEffect (() => {
        
        const currentUser = xnext ? 'o' : 'x';
        if(playMode === 'cpu' && currentUser !== activeUser && !winner) {
            cpuNextMove(squares);
        }
        checkNoWinner();
    }, [xnext, winner, screen]
    )

    const changePlayMode = mode => {
        setPlayMode(mode);
        setScreen('game');
    }

    const handleReset = () => {
        setScreen('start');
        hideModal();
        setWinner(null);
        setWinnerLine(null);
        setTies({x:0, o:0});
        setXnext(false);
        setSquares(new Array(9).fill(''));
    };

    const handleNextRound = () => {
        setScreen('game');
        hideModal();
        setSquares(new Array(9).fill(''));
        setWinner(null);
        setWinnerLine(null);
        setXnext(false);
    };

    const checkNoWinner = () => {
        const move = squares.filter((sq) => sq === '');
        if(move.length === 0){
            setWinner('no');
            showModal();
            setModalMode('winner');
        }
    }

    const handleSquareClick = (ix) => {
        if(squares[ix] || winner){
            return;
        }
        let currentUser = xnext ? 'o' : 'x';
        if(playMode === 'cpu' && currentUser !== activeUser){
            return;
        }

        let ns = [...squares];
        ns[ix] = !xnext ? 'x' : 'o';

        setSquares(ns);
        setXnext(!xnext);

        // check winner !
        checkWinner(ns);
    }

    const checkWinner = (ns) => {
        const isWinner = CalcWinner(ns);
        if (isWinner){
            setWinner(isWinner.winner);
            setWinnerLine(isWinner.line);
            //set Ties
            const nties = {...ties};
            nties[isWinner.winner] += 1;
            setTies(nties);
            showModal();
            setModalMode('winner');
        };
    };

    const cpuNextMove = (sq) => {
        const bestMove = calcBestMove(sq, activeUser === '' ? 'o' : 'x');
        let ns = [...squares];
        ns[bestMove] = !xnext ? 'x' : 'o';
        setSquares(ns);
        setXnext(!xnext);
        checkWinner(ns);
    }

    return (
        <GameContext.Provider
            value={{
                screen,
                activeUser,
                squares,
                xnext,
                ties,
                winner,
                winnerLine,
                handleSquareClick,
                setActiveUser,
                changePlayMode,
                handleReset,
                handleNextRound              
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
};

export {GameContext, GameState};