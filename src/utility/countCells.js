const countOpenCells = (cells, rows, columns) => {
  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (cells[i][j].isOpen) {
        count++
      }
    }
  }

  return count;
}

const handleEmptyCell = (cell, emptyCellsQueue, makeVisibleCellsQueue, cells, rows, columns) => {
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

export {
  countOpenCells,
  handleEmptyCell
}