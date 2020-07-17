import React from 'react';

import Field from './Field/Field';

function Minesweeper() {
  const FiledVariables = {
    rows: 15,
    columns: 15,
    mines: 15,
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
