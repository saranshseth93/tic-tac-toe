import React, { useState } from "react";

const GameBoard = ({ playerEmoji, opponentEmoji, onGameOver }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const checkForWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || checkForWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isPlayerTurn ? playerEmoji : opponentEmoji;
    setBoard(newBoard);
    setIsPlayerTurn(!isPlayerTurn);

    const winner = checkForWinner(newBoard);
    if (winner) {
      onGameOver(winner);
    } else if (!newBoard.includes(null)) {
      onGameOver("Draw");
    }
  };

  return (
    <div className="game-board grid grid-cols-3">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`cell p-4 text-2xl border border-slate-700 transition duration-300 hover:bg-blue-100 ${
            index === 0 ? "rounded-tl-lg" : ""
          } ${index === 2 ? "rounded-tr-lg" : ""} ${
            index === 6 ? "rounded-bl-lg" : ""
          } ${index === 8 ? "rounded-br-lg" : ""}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
