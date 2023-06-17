'use client';

import { ReactElement } from 'react';
import GameBoardCell from './components/game-board-cell';
import { Apple, Cord2D } from '@/common';
import { isEqualCord } from '@/helpers';

interface Props {
  rowNum: number;
  colNum: number;
  snakeCords: Cord2D[];
  appleCord: Cord2D;
  appleType: Apple;
}

export default function GameBoard({ rowNum, colNum, snakeCords, appleCord, appleType }: Props) {
  const render = () => {
    const gameBoard: ReactElement[] = [];

    for (let row = 0; row < rowNum; row++) {
      for (let col = 0; col < colNum; col++) {
        const isSnakeCord = Boolean(snakeCords.filter((cord) => row === cord.x && col === cord.y).length);
        const isDarkCell = (row + col) % 2 === 0;
        const isAppleCord = isEqualCord(appleCord, { x: row, y: col });

        gameBoard.push(
          <GameBoardCell
            isSnake={isSnakeCord}
            isAppleCell={isAppleCord}
            appleType={appleType}
            key={`board-cell-${row}-${col}`}
            isDarkCell={isDarkCell}
          />,
        );
      }
    }

    return gameBoard;
  };

  return (
    <div
      className={'grid max-w-[500px]'}
      style={{
        gridTemplateRows: `repeat(${rowNum}, 1fr)`,
        gridTemplateColumns: `repeat(${colNum}, 1fr)`,
      }}
    >
      {render()}
    </div>
  );
}
