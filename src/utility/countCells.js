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

export {
  countOpenCells,
}