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
          x: j,
          y: i,
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
      const randomRow = Math.floor(Math.random() * rows);
      const randomColumn = Math.floor(Math.random() * columns);
      const randomCell = cells[randomRow][randomColumn];

      if (randomCell.hasMine) {
        i--;
      } else {
        randomCell.hasMine = true;
      }
    }

    return cells;
  }

  const initializeGames = () => {
    let cells = generateCells();
    let bombPlantedCells = plantBomb(cells);
    setCells(bombPlantedCells);
  }

  return (
    <div className="minesweeper-container" style={{
      width: rows * 40 + 20,
      height: columns * 40 + 120
    }}>
      <div className="minesweeper-header">Header</div>
      <div className="minesweeper-board">
        {
          cells.map((cell, index) => (
            <Row
              cells={cell}
              key={index}
            />
          ))
        }
      </div>
    </div>
  )
}
