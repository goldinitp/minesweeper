import React, { useState, useEffect } from 'react';
import Row from '../Row/Row';

export default function Field(props) {
  const { rows, columns, mines } = props;
  const [cells, setCells] = useState([]);

  useEffect(() => {
    initializeGames();
  }, []);

  const generateCells = () => {
    let cells = [];

    for (let i = 0; i < rows; i++) {
      cells.push([]);
      for (let j = 0; j < columns; j++) {
        cells[i].push({
          x: i,
          y: j,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        })
      }
    }

    return cells;
  }

  const plantBomb = (cells) => {
    for (let i = 0; i < mines; i++) {
      const randomColumn = Math.floor(Math.random() * rows);
      const randomRow = Math.floor(Math.random() * columns);
      const randomCell = cells[randomRow][randomColumn];

      const indexesArray = [
        [randomRow - 1, randomColumn - 1],
        [randomRow - 1, randomColumn],
        [randomRow - 1, randomColumn + 1],
        [randomRow, randomColumn + 1],
        [randomRow + 1, randomColumn + 1],
        [randomRow + 1, randomColumn],
        [randomRow + 1, randomColumn - 1],
        [randomRow, randomColumn - 1]
      ];

      if (randomCell.hasMine) {
        i--;
      } else {
        randomCell.hasMine = true;
        indexesArray.forEach((index) => {
          const row = index[0];
          const col = index[1];

          if (row >= 0 && col >= 0 && row < rows && col < columns) {
            cells[row][col].hasFlag = true
            cells[row][col].count++;
          }
        });
      }
    }

    return cells;
  }

  const initializeGames = () => {
    let cells = generateCells();
    let bombPlantedCells = plantBomb(cells);
    setCells(bombPlantedCells);
  }

  const handleEmptyCell = (cell, emptyCellsQueue, makeVisibleCellsQueue) => {
    if (cell.isOpen || cell.hasMine) {
      return
    }
    if (cell.count) {
      makeVisibleCellsQueue.push(cell);
      return;
    }

    if (emptyCellsQueue.includes(`${cell.x},${cell.y}`)) {
      return
    }

    emptyCellsQueue.push(`${cell.x},${cell.y}`)

    // proper empty case handle
    const colOuter = cell.y;
    const rowOuter = cell.x;

    const indexesArray = [
      [rowOuter - 1, colOuter - 1],
      [rowOuter - 1, colOuter],
      [rowOuter - 1, colOuter + 1],
      [rowOuter, colOuter + 1],
      [rowOuter + 1, colOuter + 1],
      [rowOuter + 1, colOuter],
      [rowOuter + 1, colOuter - 1],
      [rowOuter, colOuter - 1]
    ];

    indexesArray.forEach((index) => {
      const row = index[0];
      const col = index[1];

      if (row >= 0 && col >= 0 && row < rows && col < columns) {
        const cell = cells[row][col];
        handleEmptyCell(cell, emptyCellsQueue, makeVisibleCellsQueue);
      }
    });
    return
  }

  const handleClick = (cell) => {
    if (cell.isOpen) {
      return
    }
    if (cell.hasMine) {
      // setTimeout(() => {
      const cellsCopy = cells;
      cellsCopy[cell.x][cell.y].isOpen = true;
      setCells([...cellsCopy]);
      alert('Game over!!')
      initializeGames();
      // }, 4000);
      return
    }
    if (cell.count) {
      const cellsCopy = cells;
      cellsCopy[cell.x][cell.y].isOpen = true;
      setCells([...cellsCopy]);
      return
    } else {
      // empty cases
      const emptyCellsQueue = [];
      const makeVisibleCellsQueue = [];

      handleEmptyCell(cell, emptyCellsQueue, makeVisibleCellsQueue);

      makeVisibleCellsQueue.forEach((cell) => cells[cell.x][cell.y].isOpen = true)
      console.log(emptyCellsQueue);
      emptyCellsQueue.forEach((cell) => {
        const cellCordinates = cell.split(',');
        cells[cellCordinates[0]][cellCordinates[1]].isOpen = true
      })
      setCells([...cells]);
    }
  }

  return (
    <div className="minesweeper-container" style={{
      width: (rows * 40) + (rows * 4),
      height: (columns * 40 + 100) + columns * 4
    }}>
      <div className="minesweeper-header">Header</div>
      <div className="minesweeper-board">
        {
          cells.map((cell, index) => (
            <Row
              cells={cell}
              key={index}
              handleClick={handleClick}
            />
          ))
        }
      </div>
    </div>
  )
}
