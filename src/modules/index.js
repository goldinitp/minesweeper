import React from 'react';

import Field from './Field/Field';

function Minesweeper() {
  const FiledVariables = {
    rows: 10,
    columns: 10,
    mines: 10,
    flags: 10
  }
  return (
    <div className="App">
      <Field
        rows={FiledVariables.rows}
        columns={FiledVariables.columns}
        mines={FiledVariables.mines}
      />
    </div>
  );
}

export default Minesweeper;
