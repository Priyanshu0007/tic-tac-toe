import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helper';

import './style/root.scss';

const App = () => {
  const newGame=[{ board: Array(9).fill(null), isXNext: true },]
  const [history, setHistory] = useState(newGame);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const {winner,winningSquare}= calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }

        return square;
      });

      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });

    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame=()=>{
    setHistory(newGame);
    setCurrentMove(0);
  }
  return (
    <div className="app">
      <h1>TIC <span className='text-green'>TAC</span> TOE</h1>
      <StatusMessage winner={winner} current={current}></StatusMessage>
      <button type='button' onClick={onNewGame} className={`btn-reset ${winner?"active":""}`}>Start New Game</button>
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquare={winningSquare}/>
      <h2 style={{fontWeight:"normal"}}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className='bg-balls' />
    </div>
  );
};

export default App;