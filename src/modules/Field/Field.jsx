import React, { useState, useEffect, useCallback } from 'react';
import Row from '../Row/Row';
import Header from '../header/Header';
import { countOpenCells } from '../../utility/countCells';

export default function Field(props) {
  const { rows, columns, mines, handleInput } = props;
  const [cells, setCells] = useState([]);
  const [openCells, setOpenCells] = useState(0);
  const totalCellsToOpenToWin = rows * columns - mines;
  const [err, setErr] = useState('');
  let timer = null;
  const [startTimer, setStartTimer] = useState(false);

  const initializeGames = () => {
    let cells = generateCells();
    let bombPlantedCells = plantBomb(cells);
    setCells(bombPlantedCells);
    setOpenCells(0);
    setErr('');
    timer = null;
    setStartTimer(false);
  };

  useEffect(() => {
    initializeGames();
  }, [rows, columns, mines]);

  useEffect(() => {
    if (err.length) {
      alert(err);
      initializeGames();
    }
  }, [err, initializeGames]);


  useEffect(() => {
    if (totalCellsToOpenToWin === openCells) {
      alert('Congratulations!! You won');
      setOpenCells(0);
      initializeGames();
    }
  }, [cells, openCells, initializeGames, totalCellsToOpenToWin]);

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
      const randomColumn = Math.floor(Math.random() * columns);
      const randomRow = Math.floor(Math.random() * rows);
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
    // console.log(cell);
    if (!timer) {
      setStartTimer(true);
    }
    const cellsCopy = [...cells];
    let err = '';

    if (cell.isOpen) {
      return
    }
    if (cell.hasMine) {
      cellsCopy[cell.x][cell.y].isOpen = true;
      err = 'Oh no!! You lost it!!';
    }
    if (cell.count) {
      cellsCopy[cell.x][cell.y].isOpen = true;
    } else {
      // empty cases
      const emptyCellsQueue = [];
      const makeVisibleCellsQueue = [];

      handleEmptyCell(cell, emptyCellsQueue, makeVisibleCellsQueue);

      makeVisibleCellsQueue.forEach((cell) => cellsCopy[cell.x][cell.y].isOpen = true)
      emptyCellsQueue.forEach((cell) => {
        const cellCoordinates = cell.split(',');
        cellsCopy[cellCoordinates[0]][cellCoordinates[1]].isOpen = true
      })
    }

    const count = countOpenCells(cellsCopy, rows, columns);
    setCells([...cellsCopy]);
    setOpenCells(count);

    if (err.length) {
      setErr(err);
    }
  }

  return (
    <div className="minesweeper-container" style={{
      width: (columns * 40) + (columns * 4),
      height: (rows * 40 + 100) + rows * 4
    }}>
      <Header opencells={openCells} startTimer={startTimer} initializeGames={initializeGames} handleInput={handleInput} />
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
