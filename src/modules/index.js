import React, { useState } from 'react';

import Field from './Field/Field';

function Minesweeper() {
  const [FiledVariables, setFiledVariables] = useState({
    rows: 10,
    columns: 8,
    mines: 5,
  })
  const handleInput = () => {
    const row = prompt("Please enter rows", 10);
    const cols = prompt("Please enter columns", 10);
    const mine = prompt("Please enter mines", 20);
    const rows = row && row < 100 ? row : 10;
    const columns = cols && cols < 100 ? cols : 10;
    const mines = mine && mine < rows * columns ? mine : 20;

    setFiledVariables({
      rows,
      columns,
      mines,
    })
  }

  return (
    <div className="App">
      <Field
        rows={FiledVariables.rows}
        columns={FiledVariables.columns}
        mines={FiledVariables.mines}
        handleInput={handleInput}
      />
    </div>
  );
}

export default Minesweeper;
