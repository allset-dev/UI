import { useState } from 'react';

import './index.scss';

const initialBoard = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];
function ChessBoard() {
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number }>(undefined);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      if (selectedSquare.col === col && selectedSquare.row === row) {
        setSelectedSquare(undefined);
        return;
      }
      const newBoard = [...board];
      newBoard[row][col] = board[selectedSquare.row][selectedSquare.col];
      newBoard[selectedSquare.row][selectedSquare.col] = ' ';
      setBoard(newBoard);
      setSelectedSquare(undefined);
    } else {
      setSelectedSquare({ row, col });
    }
  };

  const renderSquare = (row: number, col: number) => {
    const isSelected = selectedSquare && selectedSquare.row === row && selectedSquare.col === col;
    return (
      <div
        className={`square${isSelected ? ' selected' : ''}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {board[row][col]}
      </div>
    );
  };

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;
