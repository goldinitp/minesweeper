import React from 'react';
import Cell from '../Cell/Cell';

export default function Row(props) {
  const { cells, handleClick } = props;

  const renderCells = cells.map((cell, index) => (
    <Cell
      cell={cell}
      key={index}
      handleClick={handleClick}
    />
  ))

  return (
    <div className="row-container">
      {renderCells}
    </div>
  )
}
